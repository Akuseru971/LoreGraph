import type {
  ChampionConstellation,
  ChampionConstellationAnchor,
  ConstellationContourGroup,
  ConstellationLine,
  ConstellationVisualWeight,
} from "@/types";
import { lineWeightForCategory } from "./constellation-builder";
import type { SampledStar, SilhouetteCropTransform } from "./silhouette-extraction";

export interface SilhouetteSourceProvenance {
  splashAssetKey: string;
  splashAssetPath: string;
  maskAssetPath: string;
  crop: SilhouetteCropTransform;
  contourVersion: string;
  extractionMethod: string;
  imageWidth: number;
  imageHeight: number;
  rawContourPoints: number;
  simplifiedContourPoints: number;
  extractedAt: string;
}

export interface ExtractedContourData {
  id: string;
  points: Array<{ x: number; y: number }>;
  closed: boolean;
  area: number;
}

export interface ExtractedSilhouetteData {
  provenance: SilhouetteSourceProvenance;
  contours: ExtractedContourData[];
  stars: Array<{
    id: string;
    x: number;
    y: number;
    contourId: string;
    index: number;
    visualWeight: ConstellationVisualWeight;
    curvature: number;
  }>;
}

export interface BuildFromExtractedOptions {
  id: string;
  characterId: string;
  heroStarId: string;
  splashFocal: { x: number; y: number };
  iconicAnchors?: ChampionConstellationAnchor[];
  detailAnchors?: ChampionConstellationAnchor[];
  extraLines?: ConstellationLine[];
  /** Skip connecting some contour segments for constellation aesthetic (0–1). */
  lineSkipProbability?: number;
}

/** Build a runtime constellation from precomputed extracted silhouette data. */
export function buildConstellationFromExtracted(
  data: ExtractedSilhouetteData,
  opts: BuildFromExtractedOptions,
): ChampionConstellation {
  const contourGroups: ConstellationContourGroup[] = data.contours.map((c, i) => ({
    id: c.id,
    label: c.id,
    revealPhase: i === 0 ? 1 : i < 3 ? 2 : 3,
  }));

  const contourAnchors: ChampionConstellationAnchor[] = data.stars.map((s) => ({
    id: s.id,
    x: s.x,
    y: s.y,
    category: "CONTOUR",
    visualWeight: s.visualWeight,
    revealPhase: contourGroups.find((g) => g.id === s.contourId)?.revealPhase ?? 2,
    contourGroup: s.contourId,
    lineWeight: s.visualWeight === "HIGH" ? "EMPHATIC" : "NORMAL",
  }));

  // Sequential connects along each contour path
  const byContour = new Map<string, typeof data.stars>();
  for (const s of data.stars) {
    const list = byContour.get(s.contourId) ?? [];
    list.push(s);
    byContour.set(s.contourId, list);
  }

  for (const [, stars] of byContour) {
    stars.sort((a, b) => a.index - b.index);
    for (let i = 0; i < stars.length; i++) {
      const anchor = contourAnchors.find((a) => a.id === stars[i].id);
      if (!anchor) continue;
      const next = stars[(i + 1) % stars.length];
      const isClosed = data.contours.find((c) => c.id === stars[0].contourId)?.closed;
      if (!isClosed && i === stars.length - 1) continue;
      // Break lines at low-weight segments for constellation feel
      if (
        stars[i].visualWeight === "LOW" &&
        stars[i + 1]?.visualWeight === "LOW" &&
        Math.random() < (opts.lineSkipProbability ?? 0.35)
      ) {
        continue;
      }
      anchor.connectsTo = [...(anchor.connectsTo ?? []), next.id];
    }
  }

  const iconic = opts.iconicAnchors ?? [];
  const detail = opts.detailAnchors ?? [];
  const anchors = [...contourAnchors, ...iconic, ...detail];

  const lines: ConstellationLine[] = [...(opts.extraLines ?? [])];
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

  return {
    id: opts.id,
    characterId: opts.characterId,
    heroStarId: opts.heroStarId,
    splashFocal: opts.splashFocal,
    anchors,
    lines,
    contourGroups,
    silhouetteSource: data.provenance,
  };
}

/** Deterministic line-skip using star id hash instead of Math.random at build time. */
export function buildConstellationFromExtractedDeterministic(
  data: ExtractedSilhouetteData,
  opts: BuildFromExtractedOptions,
): ChampionConstellation {
  const contourGroups: ConstellationContourGroup[] = data.contours.map((c, i) => ({
    id: c.id,
    label: c.id,
    revealPhase: i === 0 ? 1 : i < 3 ? 2 : 3,
  }));

  const contourAnchors: ChampionConstellationAnchor[] = data.stars.map((s) => ({
    id: s.id,
    x: s.x,
    y: s.y,
    category: "CONTOUR",
    visualWeight: s.visualWeight,
    revealPhase: contourGroups.find((g) => g.id === s.contourId)?.revealPhase ?? 2,
    contourGroup: s.contourId,
    lineWeight: s.visualWeight === "HIGH" ? "EMPHATIC" : "NORMAL",
  }));

  const byContour = new Map<string, typeof data.stars>();
  for (const s of data.stars) {
    const list = byContour.get(s.contourId) ?? [];
    list.push(s);
    byContour.set(s.contourId, list);
  }

  const skipProb = opts.lineSkipProbability ?? 0.35;

  for (const [, stars] of byContour) {
    stars.sort((a, b) => a.index - b.index);
    for (let i = 0; i < stars.length; i++) {
      const anchor = contourAnchors.find((a) => a.id === stars[i].id);
      if (!anchor) continue;
      const contour = data.contours.find((c) => c.id === stars[0].contourId);
      const isClosed = contour?.closed ?? true;
      if (!isClosed && i === stars.length - 1) continue;

      const nextIdx = (i + 1) % stars.length;
      const next = stars[nextIdx];
      const shouldSkip =
        stars[i].visualWeight === "LOW" &&
        stars[nextIdx]?.visualWeight === "LOW" &&
        hash01(stars[i].id) < skipProb;
      if (shouldSkip) continue;

      anchor.connectsTo = [...(anchor.connectsTo ?? []), next.id];
    }
  }

  const iconic = opts.iconicAnchors ?? [];
  const detail = opts.detailAnchors ?? [];
  const anchors = [...contourAnchors, ...iconic, ...detail];

  const lines: ConstellationLine[] = [...(opts.extraLines ?? [])];
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

  return {
    id: opts.id,
    characterId: opts.characterId,
    heroStarId: opts.heroStarId,
    splashFocal: opts.splashFocal,
    anchors,
    lines,
    contourGroups,
    silhouetteSource: data.provenance,
  };
}

function hash01(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 1000) / 1000;
}
