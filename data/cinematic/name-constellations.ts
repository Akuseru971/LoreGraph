import { buildNameConstellation } from "@/lib/cinematic-v3/name-constellation";
import type { ChampionConstellation } from "@/types";

/**
 * Premium display stroke paths — wide monumental letterforms with strong terminals.
 * Local 0–1 cell coordinates; designed for celestial title-card readability.
 */
export const LETTER_STROKES: Record<string, Array<Array<{ x: number; y: number }>>> = {
  A: [
    [{ x: 0.06, y: 1 }, { x: 0.5, y: 0.02 }, { x: 0.94, y: 1 }],
    [{ x: 0.22, y: 0.62 }, { x: 0.78, y: 0.62 }],
    [{ x: 0.38, y: 0.38 }, { x: 0.5, y: 0.12 }, { x: 0.62, y: 0.38 }],
  ],
  B: [
    [{ x: 0.14, y: 0 }, { x: 0.14, y: 1 }],
    [{ x: 0.14, y: 0 }, { x: 0.58, y: 0.04 }, { x: 0.74, y: 0.22 }, { x: 0.68, y: 0.44 }, { x: 0.14, y: 0.48 }],
    [{ x: 0.14, y: 0.48 }, { x: 0.72, y: 0.52 }, { x: 0.82, y: 0.72 }, { x: 0.66, y: 0.98 }, { x: 0.14, y: 1 }],
    [{ x: 0.14, y: 0 }, { x: 0.08, y: 0.06 }],
    [{ x: 0.14, y: 1 }, { x: 0.08, y: 0.94 }],
  ],
  C: [
    [{ x: 0.88, y: 0.06 }, { x: 0.52, y: 0 }, { x: 0.18, y: 0.28 }, { x: 0.12, y: 0.5 }, { x: 0.18, y: 0.72 }, { x: 0.52, y: 1 }, { x: 0.88, y: 0.94 }],
    [{ x: 0.88, y: 0.06 }, { x: 0.92, y: 0.02 }],
    [{ x: 0.88, y: 0.94 }, { x: 0.92, y: 0.98 }],
  ],
  D: [
    [{ x: 0.14, y: 0 }, { x: 0.14, y: 1 }],
    [{ x: 0.14, y: 0 }, { x: 0.52, y: 0.02 }, { x: 0.78, y: 0.28 }, { x: 0.84, y: 0.5 }, { x: 0.78, y: 0.72 }, { x: 0.52, y: 0.98 }, { x: 0.14, y: 1 }],
    [{ x: 0.14, y: 0 }, { x: 0.08, y: 0.04 }],
    [{ x: 0.14, y: 1 }, { x: 0.08, y: 0.96 }],
  ],
  E: [
    [{ x: 0.82, y: 0 }, { x: 0.16, y: 0 }, { x: 0.16, y: 1 }, { x: 0.82, y: 1 }],
    [{ x: 0.16, y: 0.5 }, { x: 0.68, y: 0.5 }],
    [{ x: 0.16, y: 0 }, { x: 0.1, y: 0.04 }],
    [{ x: 0.82, y: 1 }, { x: 0.88, y: 0.96 }],
  ],
  G: [
    [{ x: 0.86, y: 0.12 }, { x: 0.52, y: 0 }, { x: 0.16, y: 0.28 }, { x: 0.12, y: 0.5 }, { x: 0.16, y: 0.72 }, { x: 0.52, y: 1 }, { x: 0.86, y: 0.88 }],
    [{ x: 0.86, y: 0.88 }, { x: 0.86, y: 0.54 }, { x: 0.58, y: 0.54 }],
    [{ x: 0.58, y: 0.54 }, { x: 0.72, y: 0.54 }],
  ],
  I: [
    [{ x: 0.5, y: 0.04 }, { x: 0.5, y: 0.96 }],
    [{ x: 0.14, y: 0 }, { x: 0.86, y: 0 }],
    [{ x: 0.14, y: 1 }, { x: 0.86, y: 1 }],
    [{ x: 0.14, y: 0 }, { x: 0.1, y: 0.04 }],
    [{ x: 0.86, y: 1 }, { x: 0.9, y: 0.96 }],
  ],
  K: [
    [{ x: 0.16, y: 0 }, { x: 0.16, y: 1 }],
    [{ x: 0.16, y: 0.5 }, { x: 0.88, y: 0.02 }],
    [{ x: 0.16, y: 0.5 }, { x: 0.88, y: 0.98 }],
    [{ x: 0.16, y: 0 }, { x: 0.1, y: 0.04 }],
    [{ x: 0.88, y: 0.02 }, { x: 0.94, y: 0 }],
  ],
  N: [
    [{ x: 0.14, y: 1 }, { x: 0.14, y: 0 }, { x: 0.86, y: 1 }, { x: 0.86, y: 0 }],
    [{ x: 0.14, y: 0 }, { x: 0.1, y: 0.04 }],
    [{ x: 0.86, y: 0 }, { x: 0.9, y: 0.04 }],
  ],
  O: [
    [{ x: 0.5, y: 0 }, { x: 0.14, y: 0.18 }, { x: 0.1, y: 0.5 }, { x: 0.14, y: 0.82 }, { x: 0.5, y: 1 }, { x: 0.86, y: 0.82 }, { x: 0.9, y: 0.5 }, { x: 0.86, y: 0.18 }, { x: 0.5, y: 0 }],
  ],
  R: [
    [{ x: 0.16, y: 0 }, { x: 0.16, y: 1 }],
    [{ x: 0.16, y: 0 }, { x: 0.58, y: 0.04 }, { x: 0.74, y: 0.24 }, { x: 0.62, y: 0.46 }, { x: 0.16, y: 0.5 }],
    [{ x: 0.42, y: 0.5 }, { x: 0.88, y: 1 }],
    [{ x: 0.16, y: 0 }, { x: 0.1, y: 0.04 }],
  ],
  S: [
    [{ x: 0.78, y: 0.1 }, { x: 0.48, y: 0 }, { x: 0.16, y: 0.2 }, { x: 0.42, y: 0.46 }, { x: 0.74, y: 0.52 }, { x: 0.86, y: 0.74 }, { x: 0.52, y: 1 }, { x: 0.16, y: 0.9 }],
  ],
  T: [
    [{ x: 0.5, y: 0 }, { x: 0.5, y: 1 }],
    [{ x: 0.08, y: 0 }, { x: 0.92, y: 0 }],
    [{ x: 0.08, y: 0 }, { x: 0.04, y: 0.04 }],
    [{ x: 0.92, y: 0 }, { x: 0.96, y: 0.04 }],
  ],
  V: [
    [{ x: 0.04, y: 0 }, { x: 0.5, y: 1 }, { x: 0.96, y: 0 }],
    [{ x: 0.04, y: 0 }, { x: 0.08, y: 0.04 }],
    [{ x: 0.96, y: 0 }, { x: 0.92, y: 0.04 }],
  ],
  X: [
    [{ x: 0.06, y: 0 }, { x: 0.94, y: 1 }],
    [{ x: 0.94, y: 0 }, { x: 0.06, y: 1 }],
    [{ x: 0.5, y: 0.44 }, { x: 0.5, y: 0.56 }],
  ],
  Y: [
    [{ x: 0.06, y: 0 }, { x: 0.5, y: 0.46 }, { x: 0.94, y: 0 }],
    [{ x: 0.5, y: 0.46 }, { x: 0.5, y: 1 }],
    [{ x: 0.06, y: 0 }, { x: 0.1, y: 0.04 }],
    [{ x: 0.94, y: 0 }, { x: 0.9, y: 0.04 }],
  ],
};

export interface NameConstellationSpec {
  id: string;
  characterId: string;
  displayName: string;
  heroStarId: string;
  letterSpacing?: number;
}

export const NAME_CONSTELLATION_SPECS: NameConstellationSpec[] = [
  { id: "name:aatrox", characterId: "char:aatrox", displayName: "AATROX", heroStarId: "name-hero" },
  { id: "name:yasuo", characterId: "char:yasuo", displayName: "YASUO", heroStarId: "name-hero" },
  { id: "name:yone", characterId: "char:yone", displayName: "YONE", heroStarId: "name-hero" },
  { id: "name:viego", characterId: "char:viego", displayName: "VIEGO", heroStarId: "name-hero" },
  { id: "name:skarner", characterId: "char:skarner", displayName: "SKARNER", heroStarId: "name-hero", letterSpacing: 0.008 },
];

export const NAME_CONSTELLATIONS: ChampionConstellation[] = NAME_CONSTELLATION_SPECS.map((spec) =>
  buildNameConstellation(spec),
);

export const nameConstellationById = new Map(NAME_CONSTELLATIONS.map((c) => [c.id, c]));
export const nameConstellationByCharacterId = new Map(
  NAME_CONSTELLATIONS.map((c) => [c.characterId, c]),
);
