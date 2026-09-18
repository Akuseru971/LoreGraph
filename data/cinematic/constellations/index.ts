import { AATROX_CONSTELLATION, AATROX_PATH_TO_ANCHOR } from "./aatrox";
import { YASUO_CONSTELLATION } from "./yasuo";
import { YONE_CONSTELLATION } from "./yone";
import { VIEGO_CONSTELLATION } from "./viego";
import { SKARNER_CONSTELLATION } from "./skarner";
import type { ChampionConstellation } from "@/types";

export { AATROX_CONSTELLATION, AATROX_PATH_TO_ANCHOR } from "./aatrox";
export { YASUO_CONSTELLATION } from "./yasuo";
export { YONE_CONSTELLATION } from "./yone";
export { VIEGO_CONSTELLATION } from "./viego";
export { SKARNER_CONSTELLATION } from "./skarner";

export const FLAGSHIP_CONSTELLATIONS: ChampionConstellation[] = [
  AATROX_CONSTELLATION,
  YASUO_CONSTELLATION,
  YONE_CONSTELLATION,
  VIEGO_CONSTELLATION,
  SKARNER_CONSTELLATION,
];

export const constellationById = new Map(
  FLAGSHIP_CONSTELLATIONS.map((c) => [c.id, c]),
);

export const constellationByCharacterId = new Map(
  FLAGSHIP_CONSTELLATIONS.map((c) => [c.characterId, c]),
);
