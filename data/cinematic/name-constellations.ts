import { buildNameConstellation } from "@/lib/cinematic-v3/name-constellation";
import type { ChampionConstellation } from "@/types";

/**
 * Name constellation specs — geometry is derived from Instrument Serif via
 * `scripts/cinematic/generate-name-glyphs.ts` (see name-glyphs.generated.ts).
 *
 * @deprecated LETTER_STROKES removed — do not reintroduce handmade stroke alphabets.
 */

export interface NameConstellationSpec {
  id: string;
  characterId: string;
  displayName: string;
  heroStarId: string;
  letterSpacing?: number;
  targetWidth?: number;
}

export const NAME_CONSTELLATION_SPECS: NameConstellationSpec[] = [
  { id: "name:aatrox", characterId: "char:aatrox", displayName: "AATROX", heroStarId: "name-hero", targetWidth: 0.74 },
  { id: "name:yasuo", characterId: "char:yasuo", displayName: "YASUO", heroStarId: "name-hero", targetWidth: 0.7 },
  { id: "name:yone", characterId: "char:yone", displayName: "YONE", heroStarId: "name-hero", targetWidth: 0.68 },
  { id: "name:viego", characterId: "char:viego", displayName: "VIEGO", heroStarId: "name-hero", targetWidth: 0.7 },
  { id: "name:skarner", characterId: "char:skarner", displayName: "SKARNER", heroStarId: "name-hero", targetWidth: 0.76 },
];

export const NAME_CONSTELLATIONS: ChampionConstellation[] = NAME_CONSTELLATION_SPECS.map((spec) =>
  buildNameConstellation(spec),
);

export const nameConstellationById = new Map(NAME_CONSTELLATIONS.map((c) => [c.id, c]));
export const nameConstellationByCharacterId = new Map(
  NAME_CONSTELLATIONS.map((c) => [c.characterId, c]),
);
