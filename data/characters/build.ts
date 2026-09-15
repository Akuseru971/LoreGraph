import type {
  CanonStatus,
  Character,
  CharacterStatus,
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
  roles: string[];
  status: CharacterStatus;
  species: string;
  aliases?: string[];
  accentColor?: string;
  releaseYear: number;
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
  canonStatus?: CanonStatus;
  verified?: boolean;
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
  }));

  return {
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
    status: seed.status,
    species: seed.species,
    aliases: seed.aliases ?? [],
    accentColor: seed.accentColor ?? region?.accentColor ?? "#C9A96E",
    releaseYear: seed.releaseYear,
    difficulty: seed.difficulty ?? seed.complexity,
    loreComplexity: seed.complexity,
    featured: seed.featured ?? false,
    canonStatus: seed.canonStatus ?? "CANON",
    relatedCharacterIds: [],
    eventIds: (seed.events ?? []).map((s) => `event:${s}`),
    sourceIds: [bioSourceId(seed.slug), ...(seed.sources ?? [])],
    timeline,
    tags: seed.tags,
    assetKey: seed.slug,
    popularity: seed.popularity,
  };
}
