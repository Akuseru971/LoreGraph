import type { GlyphContour, GlyphPoint } from "./glyph-constellation";

export const MIN_LETTER_GAP = 0.06;
export const WORD_TARGET_HEIGHT = 0.24;
export const HEIGHT_SQUASH = 0.82;
export const MIN_STARS_PER_LETTER = 6;
export const MAX_STARS_PER_LETTER = 24;

function dist(a: GlyphPoint, b: GlyphPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function boundsOf(points: GlyphPoint[]) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}

function centroid(points: GlyphPoint[]): GlyphPoint {
  let x = 0;
  let y = 0;
  for (const p of points) {
    x += p.x;
    y += p.y;
  }
  return { x: x / points.length, y: y / points.length };
}

function polygonArea(points: GlyphPoint[]): number {
  if (points.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y - points[j].x * points[i].y;
  }
  return area / 2;
}

function pointInPolygon(point: GlyphPoint, polygon: GlyphPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function perpendicularDistance(point: GlyphPoint, lineStart: GlyphPoint, lineEnd: GlyphPoint): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  if (dx === 0 && dy === 0) return dist(point, lineStart);
  const t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (dx * dx + dy * dy);
  const proj = {
    x: lineStart.x + t * dx,
    y: lineStart.y + t * dy,
  };
  return dist(point, proj);
}

/** Ramer–Douglas–Peucker polyline simplification. */
export function simplifyPolyline(points: GlyphPoint[], epsilon: number): GlyphPoint[] {
  if (points.length <= 2) return points;
  let maxDist = 0;
  let index = 0;
  const end = points.length - 1;
  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(points[i], points[0], points[end]);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist > epsilon) {
    const left = simplifyPolyline(points.slice(0, index + 1), epsilon);
    const right = simplifyPolyline(points.slice(index), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [points[0], points[end]];
}

function contourPerimeter(points: GlyphPoint[], closed: boolean): number {
  let p = 0;
  for (let i = 0; i < points.length - 1; i++) p += dist(points[i], points[i + 1]);
  if (closed && points.length > 2) p += dist(points[points.length - 1], points[0]);
  return p;
}

/** Evenly resample a polyline to N points along arc length. */
export function resamplePolyline(points: GlyphPoint[], count: number, closed = false): GlyphPoint[] {
  if (points.length < 2 || count < 2) return points;
  const segments: GlyphPoint[] = closed ? [...points, points[0]] : points;
  const lengths: number[] = [];
  let total = 0;
  for (let i = 0; i < segments.length - 1; i++) {
    const len = dist(segments[i], segments[i + 1]);
    lengths.push(len);
    total += len;
  }
  if (total < 1e-8) return [points[0], points[points.length - 1]].slice(0, count);

  const result: GlyphPoint[] = [];
  const step = total / (count - (closed ? 0 : 1));
  let seg = 0;
  let segT = 0;

  for (let i = 0; i < count; i++) {
    const target = closed ? (i / count) * total : Math.min(total, i * step);
    while (seg < lengths.length - 1 && segT + lengths[seg] < target) {
      segT += lengths[seg];
      seg++;
    }
    const local = lengths[seg] > 0 ? (target - segT) / lengths[seg] : 0;
    const a = segments[seg];
    const b = segments[Math.min(seg + 1, segments.length - 1)];
    result.push({
      x: a.x + (b.x - a.x) * local,
      y: a.y + (b.y - a.y) * local,
    });
  }
  return result;
}

function angleAt(points: GlyphPoint[], i: number): number {
  const prev = points[Math.max(0, i - 1)];
  const cur = points[i];
  const next = points[Math.min(points.length - 1, i + 1)];
  const v1x = prev.x - cur.x;
  const v1y = prev.y - cur.y;
  const v2x = next.x - cur.x;
  const v2y = next.y - cur.y;
  const dot = v1x * v2x + v1y * v2y;
  const m1 = Math.hypot(v1x, v1y);
  const m2 = Math.hypot(v2x, v2y);
  if (m1 < 1e-8 || m2 < 1e-8) return 0;
  return Math.acos(Math.max(-1, Math.min(1, dot / (m1 * m2))));
}

export type SimplifiedContourRole = "primary" | "secondary";

export interface SimplifiedContour {
  points: GlyphPoint[];
  closed: boolean;
  role: SimplifiedContourRole;
}

/** Classify and keep only readable outer structure — skip counters and noise. */
export function selectReadableContours(contours: GlyphContour[]): GlyphContour[] {
  if (!contours.length) return [];
  const ranked = contours
    .map((c) => ({
      contour: c,
      area: Math.abs(polygonArea(c.points)),
      perimeter: contourPerimeter(c.points, c.closed),
    }))
    .sort((a, b) => b.perimeter - a.perimeter);

  const kept: GlyphContour[] = [];
  const primary = ranked[0]?.contour;
  if (!primary) return [];

  kept.push(primary);

  for (let i = 1; i < ranked.length; i++) {
    const { contour, area } = ranked[i];
    const c = centroid(contour.points);
    const insidePrimary = pointInPolygon(c, primary.points);
    const primaryArea = Math.abs(polygonArea(primary.points));

    if (insidePrimary && area < primaryArea * 0.35) continue;
    if (kept.length >= 2) break;
    if (area < primaryArea * 0.08) continue;
    kept.push(contour);
  }

  return kept;
}

function targetStarCount(char: string, perimeter: number): number {
  const simple = new Set(["I", "T", "L", "E", "F", "1"]);
  const loop = new Set(["O", "C", "D", "Q", "0"]);
  const complex = new Set(["A", "R", "B", "P", "K", "M", "N", "S", "X", "Y", "Z"]);

  let base = 12;
  if (simple.has(char)) base = 8;
  else if (loop.has(char)) base = 12;
  else if (complex.has(char)) base = 16;

  const scaled = Math.round(base + perimeter * 0.015);
  return Math.max(MIN_STARS_PER_LETTER, Math.min(MAX_STARS_PER_LETTER, scaled));
}

/** Simplify one glyph's raw font contours into stylized constellation strokes. */
export function simplifyGlyphContours(char: string, rawContours: GlyphContour[]): SimplifiedContour[] {
  const selected = selectReadableContours(rawContours);
  const out: SimplifiedContour[] = [];

  for (let i = 0; i < selected.length; i++) {
    const contour = selected[i];
    const perim = contourPerimeter(contour.points, contour.closed);
    const epsilon = Math.max(2.5, perim * 0.055);
    const simplified = simplifyPolyline(contour.points, epsilon);
    const count = targetStarCount(char, perim);
    const points = resamplePolyline(simplified, count, contour.closed);
    out.push({
      points,
      closed: contour.closed,
      role: i === 0 ? "primary" : "secondary",
    });
  }

  return out;
}

/** Normalize glyph into consistent cap-height box with cinematic width bias. */
export function normalizeGlyphContours(contours: SimplifiedContour[]): SimplifiedContour[] {
  const allPoints = contours.flatMap((c) => c.points);
  if (!allPoints.length) return contours;
  const b = boundsOf(allPoints);
  const scale = 1 / Math.max(b.height, 1e-6);

  return contours.map((c) => ({
    ...c,
    points: c.points.map((p) => ({
      x: (p.x - b.minX) * scale,
      y: (p.y - b.minY) * scale * HEIGHT_SQUASH,
    })),
  }));
}

export function glyphBounds(contours: SimplifiedContour[]) {
  return boundsOf(contours.flatMap((c) => c.points));
}

export interface PlacedGlyph {
  char: string;
  contours: SimplifiedContour[];
  x: number;
  width: number;
}

export interface GlyphLayoutValidationIssue {
  message: string;
  letterIndex?: number;
}

/** Layout normalized glyphs with enforced letter gaps. */
export function layoutSimplifiedGlyphs(
  glyphs: Array<{ char: string; contours: SimplifiedContour[]; advance: number }>,
  letterGap = MIN_LETTER_GAP,
): { placed: PlacedGlyph[]; totalWidth: number } {
  const placed: PlacedGlyph[] = [];
  let cursor = 0;

  for (const g of glyphs) {
    const b = glyphBounds(g.contours);
    const width = Math.max(b.width, g.advance * 0.55);
    placed.push({
      char: g.char,
      contours: g.contours.map((c) => ({
        ...c,
        points: c.points.map((p) => ({
          x: p.x - b.minX + cursor,
          y: p.y - b.minY,
        })),
      })),
      x: cursor,
      width,
    });
    cursor += width + letterGap;
  }

  return { placed, totalWidth: Math.max(0, cursor - letterGap) };
}

export function validateGlyphLayout(placed: PlacedGlyph[]): GlyphLayoutValidationIssue[] {
  const issues: GlyphLayoutValidationIssue[] = [];
  for (let i = 0; i < placed.length - 1; i++) {
    const a = placed[i];
    const b = placed[i + 1];
    const aBounds = glyphBounds(a.contours);
    const bBounds = glyphBounds(b.contours);
    const gap = bBounds.minX - aBounds.maxX;
    if (gap < MIN_LETTER_GAP * 0.5) {
      issues.push({
        letterIndex: i,
        message: `Letters ${i} (${a.char}) and ${i + 1} (${b.char}) overlap or gap ${gap.toFixed(3)} < min`,
      });
    }
  }
  return issues;
}

/** Corner / terminal indices for primary star emphasis. */
export function primaryStarIndices(points: GlyphPoint[], closed: boolean): Set<number> {
  const primary = new Set<number>();
  if (points.length < 2) return primary;

  primary.add(0);
  primary.add(points.length - 1);

  for (let i = 1; i < points.length - 1; i++) {
    const angle = angleAt(points, i);
    if (angle < Math.PI * 0.62) primary.add(i);
  }

  if (closed) {
    const angle0 = angleAt(points, 0);
    if (angle0 < Math.PI * 0.62) primary.add(0);
  }

  return primary;
}

/** Count line segment intersections within a letter (high = tangled). */
export function countIntraGlyphCrossings(
  segments: Array<{ from: GlyphPoint; to: GlyphPoint }>,
): number {
  let crossings = 0;
  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 2; j < segments.length; j++) {
      if (segmentsIntersect(segments[i], segments[j])) crossings++;
    }
  }
  return crossings;
}

function segmentsIntersect(
  a: { from: GlyphPoint; to: GlyphPoint },
  b: { from: GlyphPoint; to: GlyphPoint },
): boolean {
  const d1 = direction(b.from, b.to, a.from);
  const d2 = direction(b.from, b.to, a.to);
  const d3 = direction(a.from, a.to, b.from);
  const d4 = direction(a.from, a.to, b.to);
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
    return true;
  }
  return false;
}

function direction(a: GlyphPoint, b: GlyphPoint, c: GlyphPoint): number {
  return (c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x);
}
