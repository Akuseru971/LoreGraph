import type {
  ChampionConstellationAnchor,
  ConstellationContourGroup,
  ConstellationLine,
} from "@/types";
import {
  layoutSimplifiedGlyphs,
  normalizeGlyphContours,
  primaryStarIndices,
  simplifyGlyphContours,
  validateGlyphLayout,
  WORD_TARGET_HEIGHT,
  type PlacedGlyph,
} from "./glyph-simplify";

export interface GlyphPoint {
  x: number;
  y: number;
}

export interface GlyphContour {
  points: GlyphPoint[];
  closed: boolean;
}

interface PathCommand {
  type: string;
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

function dist(a: GlyphPoint, b: GlyphPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function lerp(a: GlyphPoint, b: GlyphPoint, t: number): GlyphPoint {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function cubicAt(
  p0: GlyphPoint,
  p1: GlyphPoint,
  p2: GlyphPoint,
  p3: GlyphPoint,
  t: number,
): GlyphPoint {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

function quadAt(p0: GlyphPoint, p1: GlyphPoint, p2: GlyphPoint, t: number): GlyphPoint {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

const MAX_STEPS_PER_SEGMENT = 24;

/** Subdivide a cubic bezier with capped adaptive steps. */
function sampleCubic(
  p0: GlyphPoint,
  p1: GlyphPoint,
  p2: GlyphPoint,
  p3: GlyphPoint,
  spacing: number,
  out: GlyphPoint[],
): void {
  const steps = Math.min(
    MAX_STEPS_PER_SEGMENT,
    Math.max(2, Math.ceil(dist(p0, p3) / spacing)),
  );
  for (let i = 1; i <= steps; i++) {
    out.push(cubicAt(p0, p1, p2, p3, i / steps));
  }
}

function sampleQuad(
  p0: GlyphPoint,
  p1: GlyphPoint,
  p2: GlyphPoint,
  spacing: number,
  out: GlyphPoint[],
): void {
  const steps = Math.min(
    MAX_STEPS_PER_SEGMENT,
    Math.max(2, Math.ceil(dist(p0, p2) / spacing)),
  );
  for (let i = 1; i <= steps; i++) {
    out.push(quadAt(p0, p1, p2, i / steps));
  }
}

/** Flatten opentype path commands into sampled contours. */
export function flattenGlyphPath(
  commands: PathCommand[],
  baseSpacing = 0.012,
): GlyphContour[] {
  const contours: GlyphContour[] = [];
  let current: GlyphPoint[] = [];
  let pen: GlyphPoint = { x: 0, y: 0 };
  let start: GlyphPoint = { x: 0, y: 0 };

  const flush = (closed: boolean) => {
    if (current.length > 1) contours.push({ points: current, closed });
    current = [];
  };

  for (const cmd of commands) {
    if (cmd.type === "M") {
      flush(false);
      pen = { x: cmd.x!, y: cmd.y! };
      start = pen;
      current.push(pen);
    } else if (cmd.type === "L") {
      const next = { x: cmd.x!, y: cmd.y! };
      const steps = Math.min(
        MAX_STEPS_PER_SEGMENT,
        Math.max(1, Math.ceil(dist(pen, next) / baseSpacing)),
      );
      for (let i = 1; i <= steps; i++) {
        current.push(lerp(pen, next, i / steps));
      }
      pen = next;
    } else if (cmd.type === "C") {
      const p1 = { x: cmd.x1!, y: cmd.y1! };
      const p2 = { x: cmd.x2!, y: cmd.y2! };
      const p3 = { x: cmd.x!, y: cmd.y! };
      const spacing = baseSpacing * (0.65 + Math.min(1, dist(pen, p3) / 40) * 0.35);
      sampleCubic(pen, p1, p2, p3, spacing, current);
      pen = p3;
    } else if (cmd.type === "Q") {
      const p1 = { x: cmd.x1!, y: cmd.y1! };
      const p2 = { x: cmd.x!, y: cmd.y! };
      sampleQuad(pen, p1, p2, baseSpacing, current);
      pen = p2;
    } else if (cmd.type === "Z") {
      if (current.length > 0 && dist(pen, start) > baseSpacing * 0.5) {
        const steps = Math.max(1, Math.ceil(dist(pen, start) / baseSpacing));
        for (let i = 1; i <= steps; i++) {
          current.push(lerp(pen, start, i / steps));
        }
      }
      flush(true);
      pen = start;
    }
  }
  flush(false);
  return contours;
}

export interface LayoutGlyph {
  char: string;
  contours: GlyphContour[];
  advance: number;
}

export interface FontLayoutResult {
  glyphs: LayoutGlyph[];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  totalWidth: number;
}

/** Layout glyphs with real advance widths and optional tracking. */
export function layoutGlyphs(
  chars: string[],
  getGlyph: (char: string) => { contours: GlyphContour[]; advance: number } | null,
  tracking = 0.02,
): FontLayoutResult | null {
  const glyphs: LayoutGlyph[] = [];
  let totalWidth = 0;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const char of chars) {
    const g = getGlyph(char);
    if (!g) continue;
    glyphs.push({ char, contours: g.contours, advance: g.advance });
    totalWidth += g.advance + tracking;
    for (const c of g.contours) {
      for (const p of c.points) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
      }
    }
  }
  if (!glyphs.length) return null;
  totalWidth -= tracking;
  return { glyphs, bounds: { minX, maxX, minY, maxY }, totalWidth };
}

export interface BuildGlyphConstellationOptions {
  id: string;
  characterId: string;
  displayName: string;
  heroStarId: string;
  layout: FontLayoutResult;
  targetWidth?: number;
  targetHeight?: number;
  centerY?: number;
}

/** Convert laid-out glyph contours into simplified constellation anchor/line data. */
export function buildConstellationFromGlyphs(
  opts: BuildGlyphConstellationOptions,
): {
  anchors: ChampionConstellationAnchor[];
  lines: ConstellationLine[];
  contourGroups: ConstellationContourGroup[];
} {
  const targetWidth = opts.targetWidth ?? 0.7;
  const targetHeight = opts.targetHeight ?? WORD_TARGET_HEIGHT;
  const centerY = opts.centerY ?? 0.44;

  const simplifiedGlyphs = opts.layout.glyphs.map((g) => ({
    char: g.char,
    advance: g.advance,
    contours: normalizeGlyphContours(simplifyGlyphContours(g.char, g.contours)),
  }));

  const { placed, totalWidth } = layoutSimplifiedGlyphs(simplifiedGlyphs);
  const layoutIssues = validateGlyphLayout(placed);
  if (layoutIssues.length) {
    console.warn(`[${opts.displayName}] glyph layout issues:`, layoutIssues.map((i) => i.message));
  }

  const wordBounds = boundsFromPlaced(placed);
  const scaleX = targetWidth / Math.max(1e-6, totalWidth);
  const scaleY = targetHeight / Math.max(1e-6, wordBounds.height);
  const yOffset = centerY - (wordBounds.minY * scaleY + wordBounds.height * scaleY) / 2;
  const xOffset = 0.5 - (totalWidth * scaleX) / 2;

  const anchors: ChampionConstellationAnchor[] = [];
  const contourGroups: ConstellationContourGroup[] = [];
  const strokeLinks: Array<{ from: string; to: string; weight: ConstellationLine["weight"] }> = [];

  for (let li = 0; li < placed.length; li++) {
    const { char, contours } = placed[li];
    const groupId = `letter-${li}`;
    contourGroups.push({ id: groupId, label: char, revealPhase: 1 });

    for (let ci = 0; ci < contours.length; ci++) {
      const contour = contours[ci];
      const prefix = `${groupId}-c${ci}`;
      const primaries = primaryStarIndices(contour.points, contour.closed);
      const lineWeight = contour.role === "primary" ? "SUBTLE" : "SUBTLE";

      for (let pi = 0; pi < contour.points.length; pi++) {
        const p = contour.points[pi];
        const id = `${prefix}-p${pi}`;
        const isPrimary = primaries.has(pi);
        anchors.push({
          id,
          x: round4(xOffset + p.x * scaleX),
          y: round4(yOffset + p.y * scaleY),
          category: isPrimary ? "ICONIC" : "CONTOUR",
          visualWeight: isPrimary ? "HIGH" : "LOW",
          revealPhase: 1,
          contourGroup: groupId,
          lineWeight,
          connectsTo: [],
        });
        if (pi < contour.points.length - 1) {
          strokeLinks.push({
            from: id,
            to: `${prefix}-p${pi + 1}`,
            weight: lineWeight,
          });
        }
        if (contour.closed && pi === contour.points.length - 1 && contour.points.length > 2) {
          strokeLinks.push({ from: id, to: `${prefix}-p0`, weight: lineWeight });
        }
      }
    }
  }

  const midLetter = Math.floor(placed.length / 2);
  const midGroup = `letter-${midLetter}`;
  const midAnchors = anchors.filter((a) => a.contourGroup === midGroup);
  const heroAnchor =
    midAnchors.find((a) => a.visualWeight === "HIGH") ??
    midAnchors[Math.floor(midAnchors.length / 2)] ??
    anchors[Math.floor(anchors.length / 2)];

  if (heroAnchor) {
    const oldId = heroAnchor.id;
    heroAnchor.id = opts.heroStarId;
    heroAnchor.category = "ICONIC";
    heroAnchor.visualWeight = "HERO";
    heroAnchor.lineWeight = "SUBTLE";
    for (const link of strokeLinks) {
      if (link.from === oldId) link.from = opts.heroStarId;
      if (link.to === oldId) link.to = opts.heroStarId;
    }
  }

  for (const link of strokeLinks) {
    const from = anchors.find((a) => a.id === link.from);
    if (from) from.connectsTo = [...(from.connectsTo ?? []), link.to];
  }

  const lines: ConstellationLine[] = strokeLinks.map((link) => ({
    from: link.from,
    to: link.to,
    weight: link.weight,
    category: "CONTOUR",
  }));

  return { anchors, lines, contourGroups };
}

function boundsFromPlaced(placed: PlacedGlyph[]) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const g of placed) {
    for (const c of g.contours) {
      for (const p of c.points) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
      }
    }
  }
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
