import { buildNameConstellation } from "@/lib/cinematic-v3/name-constellation";
import type { ChampionConstellation } from "@/types";

/** Stroke paths per letter in local 0–1 cell coordinates. */
export const LETTER_STROKES: Record<string, Array<Array<{ x: number; y: number }>>> = {
  A: [
    [{ x: 0.12, y: 1 }, { x: 0.5, y: 0 }, { x: 0.88, y: 1 }],
    [{ x: 0.26, y: 0.58 }, { x: 0.74, y: 0.58 }],
  ],
  B: [
    [{ x: 0.2, y: 0 }, { x: 0.2, y: 1 }],
    [{ x: 0.2, y: 0 }, { x: 0.65, y: 0.08 }, { x: 0.72, y: 0.28 }, { x: 0.65, y: 0.48 }, { x: 0.2, y: 0.5 }],
    [{ x: 0.2, y: 0.5 }, { x: 0.7, y: 0.55 }, { x: 0.78, y: 0.75 }, { x: 0.65, y: 1 }, { x: 0.2, y: 1 }],
  ],
  C: [
    [{ x: 0.85, y: 0.08 }, { x: 0.45, y: 0 }, { x: 0.15, y: 0.35 }, { x: 0.15, y: 0.65 }, { x: 0.45, y: 1 }, { x: 0.85, y: 0.92 }],
  ],
  D: [
    [{ x: 0.18, y: 0 }, { x: 0.18, y: 1 }],
    [{ x: 0.18, y: 0 }, { x: 0.55, y: 0.05 }, { x: 0.82, y: 0.35 }, { x: 0.82, y: 0.65 }, { x: 0.55, y: 0.95 }, { x: 0.18, y: 1 }],
  ],
  E: [
    [{ x: 0.78, y: 0 }, { x: 0.2, y: 0 }, { x: 0.2, y: 1 }, { x: 0.78, y: 1 }],
    [{ x: 0.2, y: 0.5 }, { x: 0.65, y: 0.5 }],
  ],
  G: [
    [{ x: 0.82, y: 0.15 }, { x: 0.5, y: 0 }, { x: 0.18, y: 0.3 }, { x: 0.18, y: 0.7 }, { x: 0.5, y: 1 }, { x: 0.82, y: 0.85 }],
    [{ x: 0.82, y: 0.85 }, { x: 0.82, y: 0.52 }, { x: 0.55, y: 0.52 }],
  ],
  I: [
    [{ x: 0.5, y: 0 }, { x: 0.5, y: 1 }],
    [{ x: 0.2, y: 0 }, { x: 0.8, y: 0 }],
    [{ x: 0.2, y: 1 }, { x: 0.8, y: 1 }],
  ],
  K: [
    [{ x: 0.2, y: 0 }, { x: 0.2, y: 1 }],
    [{ x: 0.2, y: 0.52 }, { x: 0.85, y: 0 }, { x: 0.85, y: 0.02 }],
    [{ x: 0.2, y: 0.52 }, { x: 0.85, y: 1 }],
  ],
  N: [
    [{ x: 0.18, y: 1 }, { x: 0.18, y: 0 }, { x: 0.82, y: 1 }, { x: 0.82, y: 0 }],
  ],
  O: [
    [{ x: 0.5, y: 0 }, { x: 0.15, y: 0.2 }, { x: 0.15, y: 0.8 }, { x: 0.5, y: 1 }, { x: 0.85, y: 0.8 }, { x: 0.85, y: 0.2 }, { x: 0.5, y: 0 }],
  ],
  R: [
    [{ x: 0.2, y: 0 }, { x: 0.2, y: 1 }],
    [{ x: 0.2, y: 0 }, { x: 0.62, y: 0.05 }, { x: 0.72, y: 0.28 }, { x: 0.55, y: 0.48 }, { x: 0.2, y: 0.5 }],
    [{ x: 0.45, y: 0.5 }, { x: 0.85, y: 1 }],
  ],
  S: [
    [{ x: 0.78, y: 0.1 }, { x: 0.45, y: 0 }, { x: 0.18, y: 0.22 }, { x: 0.45, y: 0.48 }, { x: 0.72, y: 0.52 }, { x: 0.82, y: 0.75 }, { x: 0.5, y: 1 }, { x: 0.18, y: 0.9 }],
  ],
  T: [
    [{ x: 0.5, y: 0 }, { x: 0.5, y: 1 }],
    [{ x: 0.12, y: 0 }, { x: 0.88, y: 0 }],
  ],
  V: [
    [{ x: 0.08, y: 0 }, { x: 0.5, y: 1 }, { x: 0.92, y: 0 }],
  ],
  X: [
    [{ x: 0.1, y: 0 }, { x: 0.9, y: 1 }],
    [{ x: 0.9, y: 0 }, { x: 0.1, y: 1 }],
  ],
  Y: [
    [{ x: 0.1, y: 0 }, { x: 0.5, y: 0.48 }, { x: 0.9, y: 0 }],
    [{ x: 0.5, y: 0.48 }, { x: 0.5, y: 1 }],
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
  { id: "name:skarner", characterId: "char:skarner", displayName: "SKARNER", heroStarId: "name-hero" },
];

export const NAME_CONSTELLATIONS: ChampionConstellation[] = NAME_CONSTELLATION_SPECS.map((spec) =>
  buildNameConstellation(spec),
);

export const nameConstellationById = new Map(NAME_CONSTELLATIONS.map((c) => [c.id, c]));
export const nameConstellationByCharacterId = new Map(
  NAME_CONSTELLATIONS.map((c) => [c.characterId, c]),
);
