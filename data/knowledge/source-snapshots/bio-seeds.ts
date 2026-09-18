import type { CharacterSeed } from "@/data/characters/build";
import { frostIslesSeeds } from "@/data/characters/frost-isles";
import { ioniaSeeds } from "@/data/characters/ionia";
import { knowledgePackEnrichedSeeds } from "@/data/characters/knowledge-pack-enriched";
import { noxusDemaciaSeeds } from "@/data/characters/noxus-demacia";
import { phase1CuratedSeeds } from "@/data/characters/phase1-curated";
import { piltoverZaunSeeds } from "@/data/characters/piltover-zaun";
import { remediatedSeeds } from "@/data/characters/remediated";
import { rosterExpansionSeeds } from "@/data/characters/roster-expansion";
import { shurimaTargonSeeds } from "@/data/characters/shurima-targon";

/** Seed-only aggregation — avoids characters → completeness → claims import cycle. */
export function allCharacterSeeds(): CharacterSeed[] {
  const remediatedBySlug = new Map(remediatedSeeds.map((s) => [s.slug, s]));
  const remSlugs = new Set(remediatedBySlug.keys());
  const curated: CharacterSeed[] = [
    ...phase1CuratedSeeds,
    ...shurimaTargonSeeds,
    ...ioniaSeeds,
    ...noxusDemaciaSeeds,
    ...piltoverZaunSeeds,
    ...frostIslesSeeds,
    ...knowledgePackEnrichedSeeds,
  ].filter((s) => !remSlugs.has(s.slug));
  const curatedSlugs = new Set([...curated, ...remediatedSeeds].map((s) => s.slug));
  return [
    ...curated,
    ...remediatedSeeds,
    ...rosterExpansionSeeds.filter((s) => !curatedSlugs.has(s.slug)),
  ];
}
