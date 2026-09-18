/**
 * Offline silhouette extraction utilities.
 * Mask → contour trace → RDP simplify → curvature-adaptive star sampling.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface ExtractedContour {
  id: string;
  points: Point2D[];
  closed: boolean;
  area: number;
}

export interface SilhouetteExtractionStats {
  maskWidth: number;
  maskHeight: number;
  rawContourPoints: number;
  simplifiedContourPoints: number;
  visibleStarCount: number;
  iconicStarCount: number;
  contourCount: number;
}

export interface SilhouetteCropTransform {
  /** Normalized focal point used for object-position (0–1). */
  focal: { x: number; y: number };
  /** Target aspect ratio of the cinematic frame. */
  aspectRatio: number;
  /** Splash asset is pre-cropped to this aspect; no extra crop when frame matches. */
  preCropped: boolean;
}

/** Ramer–Douglas–Peucker contour simplification (pixel space). */
export function rdpSimplify(points: Point2D[], epsilon: number): Point2D[] {
  if (points.length < 3) return points;

  let maxDist = 0;
  let maxIdx = 0;
  const start = points[0];
  const end = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], start, end);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }

  if (maxDist > epsilon) {
    const left = rdpSimplify(points.slice(0, maxIdx + 1), epsilon);
    const right = rdpSimplify(points.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }

  return [start, end];
}

function perpendicularDistance(p: Point2D, a: Point2D, b: Point2D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
  const projX = a.x + t * dx;
  const projY = a.y + t * dy;
  return Math.hypot(p.x - projX, p.y - projY);
}

/** Closed-contour RDP by finding the point farthest from chord start→end. */
export function rdpSimplifyClosed(points: Point2D[], epsilon: number): Point2D[] {
  if (points.length < 4) return points;
  const open = [...points, points[0]];
  const simplified = rdpSimplify(open, epsilon);
  if (simplified.length > 1) simplified.pop();
  return simplified;
}

export function curvatureAt(points: Point2D[], i: number, closed: boolean): number {
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

export interface AdaptiveSampleOptions {
  minSpacing: number;
  maxSpacing: number;
  curvatureBoost: number;
  highCurvatureThreshold: number;
}

export interface SampledStar {
  x: number;
  y: number;
  curvature: number;
  visualWeight: "LOW" | "MEDIUM" | "HIGH";
}

/** Adaptive spacing along a contour — denser at high-curvature regions. */
export function adaptiveSampleContour(
  points: Point2D[],
  closed: boolean,
  width: number,
  height: number,
  opts: AdaptiveSampleOptions,
): SampledStar[] {
  if (points.length < 2) return [];

  const stars: SampledStar[] = [];
  const segments = closed ? [...points, points[0]] : points;
  let acc = 0;

  for (let i = 0; i < segments.length - 1; i++) {
    const a = segments[i];
    const b = segments[i + 1];
    const segLen = Math.hypot(b.x - a.x, b.y - a.y);
    const curv = curvatureAt(points, i % points.length, closed);
    const spacing =
      opts.maxSpacing -
      Math.min(1, curv / opts.highCurvatureThreshold) *
        (opts.maxSpacing - opts.minSpacing) *
        opts.curvatureBoost;

    if (acc >= spacing || stars.length === 0) {
      const t = segLen > 0 ? acc / segLen : 0;
      const px = a.x + (b.x - a.x) * Math.min(1, t);
      const py = a.y + (b.y - a.y) * Math.min(1, t);
      const weight =
        curv >= opts.highCurvatureThreshold
          ? "HIGH"
          : curv >= opts.highCurvatureThreshold * 0.45
            ? "MEDIUM"
            : "LOW";
      stars.push({
        x: px / width,
        y: py / height,
        curvature: curv,
        visualWeight: weight,
      });
      acc = 0;
    }
    acc += segLen;
  }

  return stars;
}

/** Moore-neighbor outer boundary trace on a binary mask. */
export function traceOuterContour(
  mask: Uint8Array,
  width: number,
  height: number,
  componentId: Uint16Array,
  label: number,
): Point2D[] {
  let startX = -1;
  let startY = -1;
  for (let y = 0; y < height && startX < 0; y++) {
    for (let x = 0; x < width; x++) {
      if (componentId[y * width + x] === label) {
        startX = x;
        startY = y;
        break;
      }
    }
  }
  if (startX < 0) return [];

  const contour: Point2D[] = [];
  const dirs = [
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: -1 },
  ];

  let x = startX;
  let y = startY;
  let dir = 7;
  const maxSteps = width * height * 4;
  let steps = 0;

  do {
    contour.push({ x, y });
    let found = false;
    for (let d = 0; d < 8; d++) {
      const nd = (dir + d) % 8;
      const nx = x + dirs[nd].dx;
      const ny = y + dirs[nd].dy;
      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        componentId[ny * width + nx] === label
      ) {
        x = nx;
        y = ny;
        dir = (nd + 6) % 8;
        found = true;
        break;
      }
    }
    if (!found) break;
    steps++;
  } while ((x !== startX || y !== startY || contour.length < 4) && steps < maxSteps);

  return dedupeContourPoints(contour, 1.5);
}

function dedupeContourPoints(points: Point2D[], minDist: number): Point2D[] {
  const out: Point2D[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) >= minDist) {
      out.push(p);
    }
  }
  return out;
}

export function labelConnectedComponents(
  mask: Uint8Array,
  width: number,
  height: number,
): { labels: Uint16Array; areas: Map<number, number> } {
  const labels = new Uint16Array(width * height);
  const areas = new Map<number, number>();
  let nextLabel = 1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!mask[idx] || labels[idx]) continue;

      const label = nextLabel++;
      const stack = [idx];
      let area = 0;

      while (stack.length) {
        const ci = stack.pop()!;
        if (labels[ci] || !mask[ci]) continue;
        labels[ci] = label;
        area++;
        const cx = ci % width;
        const cy = Math.floor(ci / width);
        if (cx > 0) stack.push(ci - 1);
        if (cx < width - 1) stack.push(ci + 1);
        if (cy > 0) stack.push(ci - width);
        if (cy < height - 1) stack.push(ci + width);
      }

      areas.set(label, area);
    }
  }

  return { labels, areas };
}

export function morphClose(mask: Uint8Array, width: number, height: number, radius = 1): Uint8Array {
  const dilated = dilate(mask, width, height, radius);
  return erode(dilated, width, height, radius);
}

function dilate(mask: Uint8Array, width: number, height: number, radius: number): Uint8Array {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let on = false;
      for (let dy = -radius; dy <= radius && !on; dy++) {
        for (let dx = -radius; dx <= radius && !on; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height && mask[ny * width + nx]) {
            on = true;
          }
        }
      }
      out[y * width + x] = on ? 1 : 0;
    }
  }
  return out;
}

function erode(mask: Uint8Array, width: number, height: number, radius: number): Uint8Array {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let on = true;
      for (let dy = -radius; dy <= radius && on; dy++) {
        for (let dx = -radius; dx <= radius && on; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height || !mask[ny * width + nx]) {
            on = false;
          }
        }
      }
      out[y * width + x] = on ? 1 : 0;
    }
  }
  return out;
}

export interface MaskBuildOptions {
  /** Minimum luminance to consider foreground (0–1). */
  luminanceFloor: number;
  /** RGB distance from corner background reference. */
  colorDistanceThreshold: number;
  /** Minimum saturation for foreground (0–1). */
  saturationFloor: number;
}

/** Build a binary foreground mask from RGBA raw pixels. */
export function buildForegroundMask(
  data: Uint8Array,
  width: number,
  height: number,
  opts: MaskBuildOptions,
): Uint8Array {
  const mask = new Uint8Array(width * height);
  const corners = sampleCornerColors(data, width, height);
  const bgR = corners.reduce((s, c) => s + c.r, 0) / corners.length;
  const bgG = corners.reduce((s, c) => s + c.g, 0) / corners.length;
  const bgB = corners.reduce((s, c) => s + c.b, 0) / corners.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      const max = Math.max(r, g, b) / 255;
      const min = Math.min(r, g, b) / 255;
      const sat = max === 0 ? 0 : (max - min) / max;
      const dist = Math.hypot(r - bgR, g - bgG, b - bgB);

      const isFg =
        lum >= opts.luminanceFloor ||
        (dist >= opts.colorDistanceThreshold && lum >= 0.06) ||
        sat >= opts.saturationFloor;

      mask[y * width + x] = isFg ? 1 : 0;
    }
  }

  return mask;
}

function sampleCornerColors(
  data: Uint8Array,
  width: number,
  height: number,
): Array<{ r: number; g: number; b: number }> {
  const patch = 12;
  const samples: Array<{ r: number; g: number; b: number }> = [];
  const corners = [
    { x0: 0, y0: 0 },
    { x0: width - patch, y0: 0 },
    { x0: 0, y0: height - patch },
    { x0: width - patch, y0: height - patch },
  ];
  for (const { x0, y0 } of corners) {
    for (let y = y0; y < y0 + patch; y++) {
      for (let x = x0; x < x0 + patch; x++) {
        const i = (y * width + x) * 4;
        samples.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
      }
    }
  }
  return samples;
}

export function extractContoursFromMask(
  mask: Uint8Array,
  width: number,
  height: number,
  minAreaRatio = 0.002,
): ExtractedContour[] {
  const closed = morphClose(mask, width, height, 2);
  const { labels, areas } = labelConnectedComponents(closed, width, height);
  const minArea = width * height * minAreaRatio;
  const contours: ExtractedContour[] = [];

  for (const [label, area] of areas) {
    if (area < minArea) continue;
    const points = traceOuterContour(closed, width, height, labels, label);
    if (points.length < 8) continue;
    contours.push({
      id: `contour-${contours.length}`,
      points,
      closed: true,
      area,
    });
  }

  return contours.sort((a, b) => b.area - a.area);
}

export function normalizePoints(points: Point2D[], width: number, height: number): Point2D[] {
  return points.map((p) => ({ x: p.x / width, y: p.y / height }));
}
