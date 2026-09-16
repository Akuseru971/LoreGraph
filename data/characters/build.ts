import { computeCompleteness } from "@/lib/knowledge/completeness";
import {
  normalizeCanonStatus,
  resolveCharacterCanonStatus,
} from "@/lib/canon/model";
import type {
  Character,
  CharacterStatus,
  Continuity,
  LoreComplexity,
  RegionSlug,
  TimelineBeat,
} from "@/types";
import { regionBySlug } from "../regions";
import { bioSourceId } from "../sources";
import { RUNETERRA_ID } from "../universes";

export interface TimelineSeed {
  era: string;
  title: string;
  description: string;
  /** Slugs of other champions present in this beat. */
  with?: string[];
  /** Slug of a shared world event, if this beat maps onto one. */
  event?: string;
}

export interface CharacterSeed {
  slug: string;
  name: string;
  title: string;
  region: RegionSlug;
  factions: string[];
  /** Narrative / occupational roles from lore — not gameplay classes. */
  roles: string[];
  /** Gameplay metadata from Data Dragon — kept separate from lore roles. */
  gameplayRoles?: string[];
  status: CharacterStatus;
  species: string;
  aliases?: string[];
  accentColor?: string;
  releaseYear: number | null;
  releaseDate?: string | null;
  complexity: LoreComplexity;
  difficulty?: LoreComplexity;
  featured?: boolean;
  importance: number;
  popularity: number;
  short: string;
  long: string[];
  tags: string[];
  events?: string[];
  timeline?: TimelineSeed[];
  sources?: string[];
  canonStatus?: string;
  continuity?: Continuity;
  verified?: boolean;
  completenessTier?: "A" | "B" | "C";
  needsResearch?: boolean;
}

export const charIdOf = (slug: string) => `char:${slug}`;

export function buildCharacter(seed: CharacterSeed): Character {
  const region = regionBySlug.get(seed.region);
  const timeline: TimelineBeat[] = (seed.timeline ?? []).map((beat, index) => ({
    id: `beat:${seed.slug}-${index + 1}`,
    era: beat.era,
    title: beat.title,
    description: beat.description,
    order: index + 1,
    characterIds: [charIdOf(seed.slug), ...(beat.with ?? []).map(charIdOf)],
    eventId: beat.event ? `event:${beat.event}` : undefined,
    sourceIds: seed.sources,
    canonStatus: normalizeCanonStatus(seed.canonStatus),
    continuity: seed.continuity,
  }));

  const gameplayData =
    seed.gameplayRoles && seed.gameplayRoles.length > 0
      ? {
          classes: seed.gameplayRoles,
          roles: seed.gameplayRoles,
          difficulty: seed.difficulty ?? seed.complexity,
          releaseDate: seed.releaseDate ?? null,
        }
      : undefined;

  const built: Character = {
    id: charIdOf(seed.slug),
    universeId: RUNETERRA_ID,
    type: "character",
    slug: seed.slug,
    name: seed.name,
    title: seed.title,
    importance: seed.importance,
    verified: seed.verified ?? false,
    shortDescription: seed.short,
    longDescription: seed.long,
    region: seed.region,
    factions: seed.factions.map((s) => `faction:${s}`),
    roles: seed.roles,
    gameplayData,
    status: seed.status,
    species: seed.species,
    aliases: seed.aliases ?? [],
    accentColor: seed.accentColor ?? region?.accentColor ?? "#C9A96E",
    releaseYear: seed.releaseYear,
    difficulty: seed.difficulty ?? seed.complexity,
    loreComplexity: seed.complexity,
    featured: seed.featured ?? false,
    canonStatus: resolveCharacterCanonStatus(seed.canonStatus, seed.verified),
    continuity: seed.continuity,
    needsResearch: seed.needsResearch,
    relatedCharacterIds: [],
    eventIds: (seed.events ?? []).map((s) => `event:${s}`),
    sourceIds: [bioSourceId(seed.slug), ...(seed.sources ?? [])],
    timeline,
    tags: seed.tags,
    assetKey: seed.slug,
    popularity: seed.popularity,
  };

  const completeness = computeCompleteness(built, seed.completenessTier);
  return {
    ...built,
    completenessTier: completeness.tier,
    completenessScore: completeness.score,
    missingFields: completeness.missingFields,
    needsResearch: seed.needsResearch ?? completeness.needsResearch,
  };
}
