import type { Character } from "@/types";
import { buildCharacter, type CharacterSeed } from "./build";
import { frostIslesSeeds } from "./frost-isles";
import { ioniaSeeds } from "./ionia";
import { noxusDemaciaSeeds } from "./noxus-demacia";
import { piltoverZaunSeeds } from "./piltover-zaun";
import { knowledgePackEnrichedSeeds } from "./knowledge-pack-enriched";
import { phase1CuratedSeeds } from "./phase1-curated";
import { remediatedSeeds } from "./remediated";
import { rosterExpansionSeeds } from "./roster-expansion";
import { shurimaTargonSeeds } from "./shurima-targon";

const curatedSeeds: CharacterSeed[] = [
  ...phase1CuratedSeeds,
  ...shurimaTargonSeeds,
  ...ioniaSeeds,
  ...noxusDemaciaSeeds,
  ...piltoverZaunSeeds,
  ...frostIslesSeeds,
  ...knowledgePackEnrichedSeeds,
  ...remediatedSeeds,
];

const curatedSlugs = new Set(curatedSeeds.map((s) => s.slug));

export const characterSeeds: CharacterSeed[] = [
  ...curatedSeeds,
  ...rosterExpansionSeeds.filter((s) => !curatedSlugs.has(s.slug)),
];

export const characters: Character[] = characterSeeds
  .map(buildCharacter)
  .sort((a, b) => a.name.localeCompare(b.name));

export const characterById = new Map(characters.map((c) => [c.id, c]));
export const characterBySlug = new Map(characters.map((c) => [c.slug, c]));

export { buildCharacter };
export type { CharacterSeed };
