import type {
  ChampionConstellation,
  ChampionConstellationAnchor,
  ConstellationAnchorCategory,
  ConstellationContourGroup,
  ConstellationLine,
  ConstellationLineWeight,
  ConstellationVisualWeight,
} from "@/types";

export interface PathPoint {
  x: number;
  y: number;
}

export interface ContourPathDef {
  groupId: string;
  prefix: string;
  category: ConstellationAnchorCategory;
  revealPhase: number;
  visualWeight: ConstellationVisualWeight;
  lineWeight: ConstellationLineWeight;
  points: PathPoint[];
  /** Normalized spacing along path — smaller = denser anchors */
  spacing?: number;
  closed?: boolean;
}

export interface IconicAnchorDef {
  id: string;
  x: number;
  y: number;
  revealPhase: number;
  visualWeight?: ConstellationVisualWeight;
  contourGroup?: string;
  connectsTo?: string[];
  lineWeight?: ConstellationLineWeight;
}

const CATEGORY_REVEAL_ORDER: ConstellationAnchorCategory[] = [
  "CONTOUR",
  "ICONIC",
  "STRUCTURAL",
  "DETAIL",
  "ATMOSPHERIC",
];

export function densifyPolyline(
  points: PathPoint[],
  spacing = 0.012,
  closed = false,
): PathPoint[] {
  if (points.length < 2) return points;
  const result: PathPoint[] = [];
  const segments = closed
    ? [...points, points[0]]
    : points;
  for (let i = 0; i < segments.length - 1; i++) {
    const a = segments[i];
    const b = segments[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.ceil(len / spacing));
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      result.push({ x: a.x + dx * t, y: a.y + dy * t });
    }
  }
  if (!closed) {
    result.push(segments[segments.length - 1]);
  }
  return dedupePoints(result, spacing * 0.4);
}

function dedupePoints(points: PathPoint[], minDist: number): PathPoint[] {
  const out: PathPoint[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) >= minDist) {
      out.push(p);
    }
  }
  return out;
}

export function buildContourPathAnchors(path: ContourPathDef): ChampionConstellationAnchor[] {
  const spaced = densifyPolyline(path.points, path.spacing ?? 0.011, path.closed);
  return spaced.map((p, i) => {
    const nextId = path.closed
      ? `${path.prefix}-${(i + 1) % spaced.length}`
      : i < spaced.length - 1
        ? `${path.prefix}-${i + 1}`
        : undefined;
    return {
      id: `${path.prefix}-${i}`,
      x: round4(p.x),
      y: round4(p.y),
      category: path.category,
      visualWeight: path.visualWeight,
      revealPhase: path.revealPhase,
      contourGroup: path.groupId,
      connectsTo: nextId ? [nextId] : undefined,
      lineWeight: path.lineWeight,
    };
  });
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

export function buildIconicAnchors(
  defs: IconicAnchorDef[],
): ChampionConstellationAnchor[] {
  return defs.map((d) => ({
    id: d.id,
    x: d.x,
    y: d.y,
    category: "ICONIC" as const,
    visualWeight: d.visualWeight ?? "HIGH",
    revealPhase: d.revealPhase,
    contourGroup: d.contourGroup,
    connectsTo: d.connectsTo,
    lineWeight: d.lineWeight ?? "ICONIC",
  }));
}

export function buildStructuralAnchors(
  defs: Array<{
    id: string;
    x: number;
    y: number;
    revealPhase: number;
    connectsTo?: string[];
    contourGroup?: string;
  }>,
): ChampionConstellationAnchor[] {
  return defs.map((d) => ({
    id: d.id,
    x: d.x,
    y: d.y,
    category: "STRUCTURAL" as const,
    visualWeight: "MEDIUM" as const,
    revealPhase: d.revealPhase,
    contourGroup: d.contourGroup,
    connectsTo: d.connectsTo,
    lineWeight: "NORMAL" as const,
  }));
}

export function buildConstellationFromPaths(
  base: Omit<ChampionConstellation, "anchors" | "lines">,
  paths: ContourPathDef[],
  iconic: IconicAnchorDef[] = [],
  structural: Array<{
    id: string;
    x: number;
    y: number;
    revealPhase: number;
    connectsTo?: string[];
    contourGroup?: string;
  }> = [],
  extraLines: ConstellationLine[] = [],
  contourGroups: ConstellationContourGroup[] = [],
): ChampionConstellation {
  const pathAnchors = paths.flatMap(buildContourPathAnchors);
  const anchors = [
    ...pathAnchors,
    ...buildIconicAnchors(iconic),
    ...buildStructuralAnchors(structural),
  ];
  const lines = [...collectSequentialLines(pathAnchors), ...extraLines];
  return {
    ...base,
    anchors,
    lines,
    contourGroups,
  };
}

function collectSequentialLines(anchors: ChampionConstellationAnchor[]): ConstellationLine[] {
  const lines: ConstellationLine[] = [];
  for (const a of anchors) {
    for (const to of a.connectsTo ?? []) {
      lines.push({
        from: a.id,
        to,
        weight: a.lineWeight ?? lineWeightForCategory(a.category),
        category: a.category,
      });
    }
  }
  return lines;
}

export function lineWeightForCategory(
  category: ConstellationAnchorCategory,
): ConstellationLineWeight {
  switch (category) {
    case "CONTOUR":
      return "EMPHATIC";
    case "ICONIC":
      return "ICONIC";
    case "STRUCTURAL":
      return "NORMAL";
    case "DETAIL":
      return "SUBTLE";
    case "ATMOSPHERIC":
      return "SUBTLE";
    default:
      return "NORMAL";
  }
}

export function starRadiusForWeight(weight: ConstellationVisualWeight): number {
  switch (weight) {
    case "HERO":
      return 0.52;
    case "HIGH":
      return 0.38;
    case "MEDIUM":
      return 0.28;
    case "LOW":
      return 0.14;
    default:
      return 0.28;
  }
}

export function lineStrokeForWeight(weight: ConstellationLineWeight): {
  width: number;
  opacity: number;
} {
  switch (weight) {
    case "ICONIC":
      return { width: 0.22, opacity: 0.72 };
    case "EMPHATIC":
      return { width: 0.18, opacity: 0.58 };
    case "NORMAL":
      return { width: 0.12, opacity: 0.38 };
    case "SUBTLE":
      return { width: 0.08, opacity: 0.22 };
    default:
      return { width: 0.12, opacity: 0.38 };
  }
}

export function getHeroAnchorPosition(
  constellation: ChampionConstellation,
  heroStarId?: string,
): { x: number; y: number } {
  const id = heroStarId ?? constellation.heroStarId;
  const hero = constellation.anchors.find((a) => a.id === id);
  if (hero) return { x: hero.x, y: hero.y };
  return constellation.splashFocal ?? { x: 0.52, y: 0.3 };
}

export function orderedAnchorsByReveal(
  constellation: ChampionConstellation,
): ChampionConstellationAnchor[] {
  const categoryOrder = (c: ConstellationAnchorCategory) =>
    CATEGORY_REVEAL_ORDER.indexOf(c);
  return [...constellation.anchors].sort((a, b) => {
    const pa = a.revealPhase ?? categoryOrder(a.category);
    const pb = b.revealPhase ?? categoryOrder(b.category);
    if (pa !== pb) return pa - pb;
    const ca = categoryOrder(a.category);
    const cb = categoryOrder(b.category);
    if (ca !== cb) return ca - cb;
    return a.id.localeCompare(b.id);
  });
}

export function anchorsVisibleAtReveal(
  constellation: ChampionConstellation,
  revealProgress: number,
  maxPhase = 5,
): ChampionConstellationAnchor[] {
  const ordered = orderedAnchorsByReveal(constellation);
  const phase = 1 + revealProgress * (maxPhase - 1);
  const count = Math.ceil(
    ordered.filter((a) => (a.revealPhase ?? 3) <= phase).length *
      Math.min(1, revealProgress * 1.15),
  );
  return ordered.slice(0, Math.max(1, count));
}

export function linesForVisibleAnchors(
  constellation: ChampionConstellation,
  visibleIds: Set<string>,
  lineProgress: number,
): Array<ConstellationLine & { drawT: number }> {
  const lines = constellation.lines ?? [];
  const result: Array<ConstellationLine & { drawT: number }> = [];
  let i = 0;
  for (const line of lines) {
    if (!visibleIds.has(line.from) || !visibleIds.has(line.to)) continue;
    const drawT = Math.max(0, Math.min(1, lineProgress - i * 0.002));
    result.push({ ...line, drawT });
    i++;
  }
  return result;
}
