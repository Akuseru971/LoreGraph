import extracted from "./aatrox-silhouette.json";
import { buildConstellationFromExtractedDeterministic } from "@/lib/cinematic-v3/silhouette-constellation";
import type { ExtractedSilhouetteData } from "@/lib/cinematic-v3/silhouette-constellation";
import type { ChampionConstellation } from "@/types";

const SILHOUETTE = extracted as ExtractedSilhouetteData;

/** Find nearest extracted star to a normalized frame position. */
function nearestStarId(nx: number, ny: number): string {
  let best = SILHOUETTE.stars[0];
  let bestD = Infinity;
  for (const s of SILHOUETTE.stars) {
    const d = (s.x - nx) ** 2 + (s.y - ny) ** 2;
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return best.id;
}

/** Highest-curvature star within a bounding region. */
function iconicStarInRegion(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  fallback: { x: number; y: number },
): string {
  const inRegion = SILHOUETTE.stars.filter(
    (s) => s.x >= x0 && s.x <= x1 && s.y >= y0 && s.y <= y1,
  );
  if (!inRegion.length) return nearestStarId(fallback.x, fallback.y);
  const best = inRegion.reduce((a, b) => (a.curvature >= b.curvature ? a : b));
  return best.id;
}

const BLADE_CORE_ID = iconicStarInRegion(0.58, 0.08, 0.78, 0.35, { x: 0.68, y: 0.2 });
const HORN_PEAK_ID = iconicStarInRegion(0.42, 0.02, 0.62, 0.18, { x: 0.52, y: 0.08 });
const LEFT_WING_ID = iconicStarInRegion(0.02, 0.18, 0.28, 0.48, { x: 0.12, y: 0.32 });
const BLADE_TIP_ID = iconicStarInRegion(0.62, 0.0, 0.82, 0.12, { x: 0.72, y: 0.04 });
const CLAW_ID = iconicStarInRegion(0.12, 0.38, 0.32, 0.58, { x: 0.2, y: 0.48 });

const bladeCoreStar = SILHOUETTE.stars.find((s) => s.id === BLADE_CORE_ID)!;

export const AATROX_CONSTELLATION: ChampionConstellation = buildConstellationFromExtractedDeterministic(
  SILHOUETTE,
  {
    id: "constellation:aatrox",
    characterId: "char:aatrox",
    heroStarId: "blade-core",
    splashFocal: { x: 0.52, y: 0.3 },
    lineSkipProbability: 0.08,
    contourGroupSettings: {
      "contour-0": { lineSkipProbability: 0.06 },
    },
    iconicRegionSettings: [
      { id: "horns", x0: 0.42, y0: 0, x1: 0.62, y1: 0.18, lineSkipProbability: 0 },
      { id: "blade", x0: 0.58, y0: 0, x1: 0.82, y1: 0.35, lineSkipProbability: 0 },
      { id: "leftWing", x0: 0, y0: 0.12, x1: 0.3, y1: 0.5, lineSkipProbability: 0.03 },
      { id: "rightWing", x0: 0.7, y0: 0.12, x1: 1, y1: 0.5, lineSkipProbability: 0.03 },
      { id: "claw", x0: 0.1, y0: 0.35, x1: 0.32, y1: 0.58, lineSkipProbability: 0.05 },
      { id: "torso", x0: 0.35, y0: 0.25, x1: 0.55, y1: 0.55, lineSkipProbability: 0.1 },
      { id: "legs", x0: 0.35, y0: 0.52, x1: 0.58, y1: 0.85, lineSkipProbability: 0.12 },
    ],
    iconicAnchors: [
      {
        id: "blade-core",
        x: bladeCoreStar.x,
        y: bladeCoreStar.y,
        category: "ICONIC",
        visualWeight: "HERO",
        revealPhase: 2,
        contourGroup: "contour-0",
        lineWeight: "ICONIC",
        connectsTo: [BLADE_TIP_ID],
      },
    ],
    detailAnchors: [
      {
        id: "chest-core",
        x: 0.48,
        y: 0.38,
        category: "DETAIL",
        visualWeight: "MEDIUM",
        revealPhase: 4,
        contourGroup: "contour-0",
        connectsTo: [nearestStarId(0.46, 0.36)],
        lineWeight: "SUBTLE",
      },
    ],
    extraLines: [],
  },
);

export const AATROX_PATH_TO_ANCHOR: Record<string, string> = {
  "cscene:aatrox:beat:aatrox-1": HORN_PEAK_ID,
  "cscene:aatrox:beat:aatrox-2": LEFT_WING_ID,
  "cscene:aatrox:beat:aatrox-3": "chest-core",
  "cscene:aatrox:beat:aatrox-4": nearestStarId(0.72, 0.38),
  "cscene:aatrox:beat:aatrox-5": "blade-core",
  "cscene:aatrox:beat:aatrox-6": nearestStarId(0.58, 0.22),
  "cscene:aatrox:beat:aatrox-7": BLADE_TIP_ID,
};

export const AATROX_MASK_ASSET = SILHOUETTE.provenance.maskAssetPath;
export const AATROX_SILHOUETTE_PROVENANCE = SILHOUETTE.provenance;
