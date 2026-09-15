import type { Character } from "@/types";
import { buildCharacter, type CharacterSeed } from "./build";
import { frostIslesSeeds } from "./frost-isles";
import { ioniaSeeds } from "./ionia";
import { noxusDemaciaSeeds } from "./noxus-demacia";
import { piltoverZaunSeeds } from "./piltover-zaun";
import { shurimaTargonSeeds } from "./shurima-targon";

export const characterSeeds: CharacterSeed[] = [
  ...shurimaTargonSeeds,
  ...ioniaSeeds,
  ...noxusDemaciaSeeds,
  ...piltoverZaunSeeds,
  ...frostIslesSeeds,
];

export const characters: Character[] = characterSeeds
  .map(buildCharacter)
  .sort((a, b) => a.name.localeCompare(b.name));

export const characterById = new Map(characters.map((c) => [c.id, c]));
export const characterBySlug = new Map(characters.map((c) => [c.slug, c]));

export { buildCharacter };
export type { CharacterSeed };
