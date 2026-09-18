/**
 * Offline pipeline: Aatrox splash → mask → contour → star sampling.
 * Run: npx tsx scripts/cinematic/extract-aatrox-silhouette.ts
 */
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import type { ExtractedSilhouetteData } from "../../lib/cinematic-v3/silhouette-constellation";
import {
  adaptiveSampleContour,
  buildForegroundMask,
  extractContoursFromMask,
  morphClose,
  rdpSimplifyClosed,
  type Point2D,
} from "../../lib/cinematic-v3/silhouette-extraction";

const ROOT = process.cwd();
const SPLASH_PATH = "public/assets/champions/generated/aatrox-hero-16x9.webp";
const SPLASH_PUBLIC = "/assets/champions/generated/aatrox-hero-16x9.webp";
const MASK_OUT = "public/assets/cinematic/masks/aatrox-hero-16x9-mask.png";
const MASK_PUBLIC = "/assets/cinematic/masks/aatrox-hero-16x9-mask.png";
const JSON_OUT = "data/cinematic/constellations/aatrox-silhouette.json";
const OVERLAY_OUT = "artifacts/cinematic/aatrox-contour-overlay.png";

const FOCAL = { x: 0.52, y: 0.3 };
const ASPECT = 16 / 9;
const CONTOUR_VERSION = "splash-mask-v1";

async function main() {
  const splashAbs = join(ROOT, SPLASH_PATH);
  const { data, info } = await sharp(splashAbs)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  console.log(`Splash: ${SPLASH_PATH} (${width}×${height})`);

  // Multi-seed flood fill from known character regions in the 16:9 hero crop
  const seeds = [
    { x: 0.52, y: 0.22 }, // head/horns
    { x: 0.42, y: 0.38 }, // chest
    { x: 0.68, y: 0.28 }, // blade
    { x: 0.22, y: 0.32 }, // left wing
    { x: 0.78, y: 0.30 }, // right wing / sword mass
    { x: 0.35, y: 0.55 }, // left arm
    { x: 0.48, y: 0.62 }, // legs
  ];
  let mask = floodFillFromSeeds(data, width, height, seeds, 48);

  // Exclude ground plane / battlefield debris (bottom strip + dark wide region)
  mask = excludeGroundPlane(mask, data, width, height);

  // Close small gaps inside character without merging distant parts
  mask = morphClose(mask, width, height, 1);

  mkdirSync(join(ROOT, "public/assets/cinematic/masks"), { recursive: true });
  mkdirSync(join(ROOT, "artifacts/cinematic"), { recursive: true });
  mkdirSync(join(ROOT, "data/cinematic/constellations"), { recursive: true });

  // Save mask PNG
  await sharp(Buffer.from(mask), { raw: { width, height, channels: 1 } })
    .png()
    .toFile(join(ROOT, MASK_OUT));

  const rawContours = extractContoursFromMask(mask, width, height, 0.0015);
  console.log(`Found ${rawContours.length} contour components`);

  let rawPointCount = 0;
  let simplifiedPointCount = 0;
  const contours: ExtractedSilhouetteData["contours"] = [];
  const stars: ExtractedSilhouetteData["stars"] = [];

  // Light simplification — preserve silhouette fidelity for recognizability
  const rdpEpsilon = Math.max(1.0, width * 0.0009);

  for (const c of rawContours) {
    rawPointCount += c.points.length;
    const simplified = rdpSimplifyClosed(c.points, rdpEpsilon);
    simplifiedPointCount += simplified.length;

    const sampled = adaptiveSampleContour(simplified, true, width, height, {
      minSpacing: width * 0.0026,
      maxSpacing: width * 0.011,
      curvatureBoost: 1.08,
      highCurvatureThreshold: 0.62,
    });

    // Extra stars at sharpest curvature peaks (horns, blade, wing tips)
    const boosted = boostHighCurvatureStars(sampled, simplified, true, width, height);

    const normPoints = simplified.map((p) => ({ x: round4(p.x / width), y: round4(p.y / height) }));
    contours.push({
      id: c.id,
      points: normPoints,
      closed: c.closed,
      area: c.area,
    });

    // Percentile-based visual weight — avoid marking every point HIGH
    const curvatures = boosted.map((s) => s.curvature).sort((a, b) => a - b);
    const p85 = curvatures[Math.floor(curvatures.length * 0.85)] ?? 1.5;
    const p55 = curvatures[Math.floor(curvatures.length * 0.55)] ?? 0.8;

    boosted.forEach((s, idx) => {
      const weight =
        s.curvature >= p85 ? "HIGH" : s.curvature >= p55 ? "MEDIUM" : "LOW";
      stars.push({
        id: `${c.id}-s${idx}`,
        x: round4(s.x),
        y: round4(s.y),
        contourId: c.id,
        index: idx,
        visualWeight: weight,
        curvature: round4(s.curvature),
      });
    });
  }

  const splashHash = createHash("sha256")
    .update(await sharp(splashAbs).toBuffer())
    .digest("hex")
    .slice(0, 12);

  const extracted: ExtractedSilhouetteData = {
    provenance: {
      splashAssetKey: `aatrox-hero-16x9@${splashHash}`,
      splashAssetPath: SPLASH_PUBLIC,
      maskAssetPath: MASK_PUBLIC,
      crop: {
        focal: FOCAL,
        aspectRatio: ASPECT,
        preCropped: true,
      },
      contourVersion: CONTOUR_VERSION,
      extractionMethod: "seed-flood-fill+ground-exclude+morph-close+moore-trace+rdp+curvature-sample",
      imageWidth: width,
      imageHeight: height,
      rawContourPoints: rawPointCount,
      simplifiedContourPoints: simplifiedPointCount,
      extractedAt: new Date().toISOString(),
    },
    contours,
    stars,
  };

  writeFileSync(join(ROOT, JSON_OUT), JSON.stringify(extracted, null, 2));

  // QA overlay: splash + contour points
  await renderOverlay(splashAbs, extracted, join(ROOT, OVERLAY_OUT));

  console.log("\n--- Extraction stats ---");
  console.log(`Mask: ${MASK_OUT}`);
  console.log(`JSON: ${JSON_OUT}`);
  console.log(`Overlay: ${OVERLAY_OUT}`);
  console.log(`Raw contour points: ${rawPointCount}`);
  console.log(`Simplified contour points: ${simplifiedPointCount}`);
  console.log(`Visible stars: ${stars.length}`);
  console.log(`Iconic (HIGH weight): ${stars.filter((s) => s.visualWeight === "HIGH").length}`);
  console.log(`Contours: ${contours.length}`);
}

/** Region-grow from normalized seed points using RGB color distance. */
function floodFillFromSeeds(
  data: Uint8Array,
  width: number,
  height: number,
  seeds: Array<{ x: number; y: number }>,
  tolerance: number,
): Uint8Array {
  const mask = new Uint8Array(width * height);
  const visited = new Uint8Array(width * height);

  for (const seed of seeds) {
    const sx = Math.round(seed.x * width);
    const sy = Math.round(seed.y * height);
    const si = (sy * width + sx) * 4;
    const sr = data[si];
    const sg = data[si + 1];
    const sb = data[si + 2];
    const queue = [sy * width + sx];

    while (queue.length) {
      const idx = queue.shift()!;
      if (visited[idx]) continue;
      const x = idx % width;
      const y = Math.floor(idx / width);
      const pi = idx * 4;
      const dist = Math.hypot(data[pi] - sr, data[pi + 1] - sg, data[pi + 2] - sb);
      if (dist > tolerance) continue;

      visited[idx] = 1;
      mask[idx] = 1;

      if (x > 0) queue.push(idx - 1);
      if (x < width - 1) queue.push(idx + 1);
      if (y > 0) queue.push(idx - width);
      if (y < height - 1) queue.push(idx + width);
    }
  }

  return mask;
}

/** Remove bottom battlefield debris disconnected from upper body mass. */
function excludeGroundPlane(
  mask: Uint8Array,
  data: Uint8Array,
  width: number,
  height: number,
): Uint8Array {
  const out = new Uint8Array(mask);
  const groundY = Math.floor(height * 0.78);
  for (let y = groundY; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const pi = i * 4;
      const lum = (0.299 * data[pi] + 0.587 * data[pi + 1] + 0.114 * data[pi + 2]) / 255;
      if (lum < 0.22) out[i] = 0;
    }
  }
  return out;
}

async function renderOverlay(
  splashPath: string,
  data: ExtractedSilhouetteData,
  outPath: string,
) {
  const w = data.provenance.imageWidth;
  const h = data.provenance.imageHeight;
  const base = await sharp(splashPath).resize(w, h).ensureAlpha().raw().toBuffer();

  for (const s of data.stars) {
    const px = Math.round(s.x * w);
    const py = Math.round(s.y * h);
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const x = px + dx;
        const y = py + dy;
        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        const i = (y * w + x) * 4;
        base[i] = 255;
        base[i + 1] = 220;
        base[i + 2] = 100;
        base[i + 3] = 255;
      }
    }
  }

  await sharp(Buffer.from(base), { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(outPath);
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

/** Insert additional stars at local curvature maxima along the contour. */
function boostHighCurvatureStars(
  stars: ReturnType<typeof adaptiveSampleContour>,
  contour: Point2D[],
  closed: boolean,
  width: number,
  height: number,
): ReturnType<typeof adaptiveSampleContour> {
  const extra: ReturnType<typeof adaptiveSampleContour> = [];
  const n = contour.length;
  for (let i = 0; i < n; i++) {
    const curv = curvatureAt(contour, i, closed);
    if (curv < 0.82) continue;
    const p = contour[i];
    const nx = p.x / width;
    const ny = p.y / height;
    const tooClose = stars.some(
      (s) => Math.hypot(s.x - nx, s.y - ny) < 0.008,
    );
    if (!tooClose) {
      extra.push({ x: nx, y: ny, curvature: curv, visualWeight: "HIGH" });
    }
  }
  return [...stars, ...extra];
}

function curvatureAt(
  points: Point2D[],
  i: number,
  closed: boolean,
): number {
  const n = points.length;
  if (n < 3) return 0;
  const prev = points[closed ? (i - 1 + n) % n : Math.max(0, i - 1)];
  const curr = points[i];
  const next = points[closed ? (i + 1) % n : Math.min(n - 1, i + 1)];
  const v1x = curr.x - prev.x;
  const v1y = curr.y - prev.y;
  const v2x = next.x - curr.x;
  const v2y = next.y - curr.y;
  const len1 = Math.hypot(v1x, v1y);
  const len2 = Math.hypot(v2x, v2y);
  if (len1 < 1e-6 || len2 < 1e-6) return 0;
  const dot = (v1x * v2x + v1y * v2y) / (len1 * len2);
  return Math.acos(Math.max(-1, Math.min(1, dot)));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
