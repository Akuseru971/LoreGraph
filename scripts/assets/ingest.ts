/**
 * LoreGraph asset ingestion — downloads masters, generates WebP variants.
 * Run: npm run assets:ingest [--force]
 */
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { parseCsvRecords } from "../../lib/lore-import/csv";
import { resolveFocalForCrop } from "../../lib/assets/focal-points";
import { MANUAL_OVERRIDE_PATHS } from "../../lib/assets/asset-overrides";
import {
  buildChampionIndexFromManifest,
  entitySlugFromId,
  recordToEntityMeta,
} from "../../lib/assets/manifest";
import type {
  AssetManifestIndex,
  AssetManifestRecord,
  EntityAssetMeta,
} from "../../lib/assets/types";
import { computeFocalCrop, VARIANT_SPECS } from "./crop";

const ROOT = process.cwd();
const MANIFEST = join(ROOT, "data/import/loregraph-asset-pack-v1/asset_manifest.csv");
const PUBLIC_ASSETS = join(ROOT, "public/assets");
const CACHE_DIR = join(ROOT, ".cache/assets/downloads");
const INDEX_OUT = join(ROOT, "data/assets/manifest-index.json");

const CONCURRENCY = 6;
const FORCE = process.argv.includes("--force");
const RETRIES = 3;

interface Stats {
  manifestRows: number;
  mastersDownloaded: number;
  variantsGenerated: number;
  cacheHits: number;
  failedDownloads: string[];
  lowResolution: string[];
  visualQaPending: number;
}

const stats: Stats = {
  manifestRows: 0,
  mastersDownloaded: 0,
  variantsGenerated: 0,
  cacheHits: 0,
  failedDownloads: [],
  lowResolution: [],
  visualQaPending: 0,
};

function ensureDir(path: string) {
  mkdirSync(path, { recursive: true });
}

function cacheKey(url: string): string {
  return createHash("sha256").update(url).digest("hex");
}

async function downloadWithRetry(url: string): Promise<Buffer | null> {
  const cached = join(CACHE_DIR, cacheKey(url));
  if (!FORCE && existsSync(cached)) {
    stats.cacheHits++;
    return readFileSync(cached);
  }

  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30000),
        headers: { "User-Agent": "LoreGraph-AssetIngest/1.0" },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length === 0) throw new Error("empty file");
      ensureDir(CACHE_DIR);
      writeFileSync(cached, buffer);
      return buffer;
    } catch (err) {
      if (attempt === RETRIES - 1) {
        stats.failedDownloads.push(`${url}: ${err}`);
        return null;
      }
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  return null;
}

async function pool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let i = 0;

  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function generateVariant(
  masterPath: string,
  outPath: string,
  spec: { width: number; height: number; mode: "CARD" | "HERO" | "CINEMATIC" },
  slug: string,
  manifestFocal: { desktop: { x: number; y: number }; mobile: { x: number; y: number } },
): Promise<boolean> {
  if (!FORCE && existsSync(outPath) && !MANUAL_OVERRIDE_PATHS.has(outPath)) {
    return false;
  }

  const focal = resolveFocalForCrop(slug, spec.mode, manifestFocal);
  const image = sharp(masterPath);
  const meta = await image.metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  if (srcW === 0 || srcH === 0) return false;

  const crop = computeFocalCrop(srcW, srcH, spec.width, spec.height, focal);

  ensureDir(dirname(outPath));
  await image
    .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
    .resize(spec.width, spec.height, { fit: "fill" })
    .webp({ quality: 88 })
    .toFile(outPath);

  stats.variantsGenerated++;
  return true;
}

async function processChampionMasters(records: AssetManifestRecord[]) {
  const masters = records.filter(
    (r) => r.entity_type === "CHAMPION" && r.asset_kind === "MASTER_SPLASH" && r.primary_url,
  );

  await pool(masters, CONCURRENCY, async (record) => {
    const slug = entitySlugFromId(record.entity_id);
    const dest = join(PUBLIC_ASSETS, record.local_path);
    const minW = parseInt(record.expected_min_width, 10) || 1200;
    const minH = parseInt(record.expected_min_height, 10) || 700;

    if (!FORCE && existsSync(dest) && !MANUAL_OVERRIDE_PATHS.has(dest)) {
      return;
    }

    const buffer = await downloadWithRetry(record.primary_url);
    if (!buffer) return;

    ensureDir(dirname(dest));
    writeFileSync(dest, buffer);
    stats.mastersDownloaded++;

    const meta = await sharp(dest).metadata();
    if ((meta.width ?? 0) < minW || (meta.height ?? 0) < minH) {
      stats.lowResolution.push(`${slug}: ${meta.width}x${meta.height}`);
    }
  });
}

async function processChampionLoading(records: AssetManifestRecord[]) {
  const loading = records.filter(
    (r) => r.entity_type === "CHAMPION" && r.asset_kind === "NATIVE_LOADING" && r.primary_url,
  );

  await pool(loading, CONCURRENCY, async (record) => {
    const dest = join(PUBLIC_ASSETS, record.local_path);
    if (!FORCE && existsSync(dest)) return;

    const buffer = await downloadWithRetry(record.primary_url);
    if (!buffer) return;

    ensureDir(dirname(dest));
    writeFileSync(dest, buffer);
  });
}

async function generateChampionVariants(records: AssetManifestRecord[]) {
  const champions = buildChampionIndexFromManifest(records);
  const variantMap: Array<{
    slug: string;
    kind: keyof typeof VARIANT_SPECS;
    localPath: string;
    focal: { desktop: { x: number; y: number }; mobile: { x: number; y: number } };
  }> = [];

  for (const record of records) {
    if (record.entity_type !== "CHAMPION") continue;
    const slug = entitySlugFromId(record.entity_id);
    const entry = champions[slug];
    if (!entry) continue;

    const focal = { desktop: entry.desktopFocal, mobile: entry.mobileFocal };

    if (record.asset_kind === "GENERATED_PORTRAIT_512") {
      variantMap.push({ slug, kind: "portrait", localPath: record.local_path, focal });
    } else if (record.asset_kind === "GENERATED_CARD_4X5") {
      variantMap.push({ slug, kind: "card", localPath: record.local_path, focal });
    } else if (record.asset_kind === "GENERATED_HERO_16X9") {
      variantMap.push({ slug, kind: "hero", localPath: record.local_path, focal });
    } else if (record.asset_kind === "GENERATED_CINEMATIC_9X16") {
      variantMap.push({ slug, kind: "cinematic", localPath: record.local_path, focal });
    }
  }

  await pool(variantMap, CONCURRENCY, async (item) => {
    const masterPath = join(PUBLIC_ASSETS, "champions/master", `${item.slug}.jpg`);
    if (!existsSync(masterPath)) return;

    const outPath = join(PUBLIC_ASSETS, item.localPath);
    const spec = VARIANT_SPECS[item.kind];
    await generateVariant(masterPath, outPath, spec, item.slug, item.focal);
  });
}

async function generateCompositeFallback(
  record: AssetManifestRecord,
): Promise<string | null> {
  const dest = join(PUBLIC_ASSETS, record.local_path);
  if (!FORCE && existsSync(dest)) return dest;

  ensureDir(dirname(dest));
  const w = parseInt(record.expected_min_width, 10) || 1600;
  const h = parseInt(record.expected_min_height, 10) || 900;

  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="#1a2030"/>
          <stop offset="100%" stop-color="#080b12"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#C9A96E" font-family="serif" font-size="48" opacity="0.6">${record.entity_name}</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(dest.replace(/\.(jpg|png)$/, ".webp"));
  const webpDest = dest.replace(/\.(jpg|png)$/, ".webp");
  return webpDest;
}

function markLocalPaths(index: AssetManifestIndex): AssetManifestIndex {
  for (const slug of Object.keys(index.champions)) {
    const c = index.champions[slug];
    for (const key of ["master", "portrait", "card", "hero", "cinematic", "loading"] as const) {
      const p = c[key];
      if (p) {
        const fsPath = join(ROOT, "public", p);
        if (!existsSync(fsPath)) c[key] = null;
      }
    }
  }

  for (const collection of [index.events, index.regions, index.factions, index.artifacts]) {
    for (const slug of Object.keys(collection)) {
      const meta = collection[slug];
      if (meta.publicPath) {
        const fsPath = join(ROOT, "public", meta.publicPath);
        meta.isLocal = existsSync(fsPath);
        if (!meta.isLocal) meta.publicPath = null;
      }
    }
  }

  return index;
}

async function main() {
  console.log("\nLoreGraph Asset Ingestion v1");
  console.log("============================\n");

  if (!existsSync(MANIFEST)) {
    console.error(`Manifest not found: ${MANIFEST}`);
    process.exit(1);
  }

  ensureDir(PUBLIC_ASSETS);
  ensureDir(join(ROOT, "data/assets"));

  const content = readFileSync(MANIFEST, "utf8");
  const records = parseCsvRecords<AssetManifestRecord>(content);
  stats.manifestRows = records.length;

  console.log(`Manifest rows: ${stats.manifestRows}`);
  console.log(`Force mode: ${FORCE}\n`);

  console.log("Downloading champion masters...");
  await processChampionMasters(records);

  console.log("Downloading champion loading art...");
  await processChampionLoading(records);

  console.log("Generating champion variants...");
  await generateChampionVariants(records);

  const champions = buildChampionIndexFromManifest(records);
  const events: Record<string, EntityAssetMeta> = {};
  const regions: Record<string, EntityAssetMeta> = {};
  const factions: Record<string, EntityAssetMeta> = {};
  const artifacts: Record<string, EntityAssetMeta> = {};

  console.log("Processing non-champion entities (composite fallbacks where needed)...");
  for (const record of records) {
    if (record.entity_type === "CHAMPION") continue;
    const slug = entitySlugFromId(record.entity_id);
    const meta = recordToEntityMeta(record);

    if (!record.primary_url) {
      const fallbackPath = await generateCompositeFallback(record);
      if (fallbackPath) {
        meta.publicPath = `/assets/${record.local_path.replace(/\.(jpg|png)$/, ".webp")}`;
        meta.isLocal = true;
        meta.isCompositeFallback = true;
        meta.qaStatus = "LOREGRAPH_COMPOSITE_FALLBACK";
      }
    }

    switch (record.entity_type) {
      case "EVENT":
        events[slug] = meta;
        break;
      case "REGION":
        regions[slug] = meta;
        break;
      case "FACTION":
        factions[slug] = meta;
        break;
      case "ARTIFACT":
        artifacts[slug] = meta;
        break;
    }
  }

  stats.visualQaPending = records.filter((r) => r.qa_status === "NEEDS_VISUAL_QA").length;

  // Mirror manifest entries under roster slugs where they differ.
  const ROSTER_ALIASES: Record<string, string> = {
    "bel-veth": "belveth",
    "cho-gath": "chogath",
    "k-sante": "ksante",
    "kai-sa": "kaisa",
    "kha-zix": "khazix",
    nunu: "nunu-willump",
    "rek-sai": "reksai",
    "vel-koz": "velkoz",
  };
  for (const [manifestKey, rosterKey] of Object.entries(ROSTER_ALIASES)) {
    if (champions[manifestKey]) {
      champions[rosterKey] = { ...champions[manifestKey], slug: rosterKey };
    }
  }

  const index: AssetManifestIndex = markLocalPaths({
    generatedAt: new Date().toISOString(),
    champions,
    events,
    regions,
    factions,
    artifacts,
    stats,
  });

  writeFileSync(INDEX_OUT, JSON.stringify(index, null, 2));

  console.log("\n--- Summary ---");
  console.log(`Masters downloaded: ${stats.mastersDownloaded}`);
  console.log(`Variants generated: ${stats.variantsGenerated}`);
  console.log(`Cache hits: ${stats.cacheHits}`);
  console.log(`Failed downloads: ${stats.failedDownloads.length}`);
  console.log(`Low resolution: ${stats.lowResolution.length}`);
  console.log(`Visual QA pending: ${stats.visualQaPending}`);
  console.log(`Index written: ${INDEX_OUT}\n`);

  if (stats.failedDownloads.length > 0) {
    console.log("Failures (first 10):");
    stats.failedDownloads.slice(0, 10).forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
