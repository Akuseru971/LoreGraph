import {
  characterById,
  characterBySlug,
  characters,
  eventBySlug,
  events,
  factionBySlug,
  factions,
  quizQuestions,
  regionBySlug,
  regions,
  relationships,
  sourceById,
  storyPathBySlug,
  storyPaths,
} from "@/data";
import type {
  Character,
  Faction,
  LoreEvent,
  QuizQuestion,
  Region,
  Relationship,
  SearchResult,
  Source,
  StoryPath,
} from "@/types";
import { hashString, seededShuffle, todayKey } from "@/lib/utils";

/**
 * Read access to lore content.
 *
 * The seed files in /data are the source of truth for published lore; the
 * Supabase schema mirrors them so the same content is queryable server-side
 * (and editable by a future editorial tool). Components only ever talk to this
 * module, so swapping the backing store does not touch the UI.
 */
export interface LoreRepository {
  listCharacters(): Character[];
  getCharacter(slug: string): Character | null;
  getCharacterById(id: string): Character | null;
  listRegions(): Region[];
  getRegion(slug: string): Region | null;
  listFactions(): Faction[];
  getFaction(slug: string): Faction | null;
  listEvents(): LoreEvent[];
  getEvent(slug: string): LoreEvent | null;
  listRelationships(): Relationship[];
  listStoryPaths(): StoryPath[];
  getStoryPath(slug: string): StoryPath | null;
  getSource(id: string): Source | null;
  listQuizQuestions(): QuizQuestion[];
  dailyQuestions(date?: string, count?: number): QuizQuestion[];
  search(query: string, limit?: number): SearchResult[];
}

export const loreRepository: LoreRepository = {
  listCharacters: () => characters,
  getCharacter: (slug) => characterBySlug.get(slug) ?? null,
  getCharacterById: (id) => characterById.get(id) ?? null,
  listRegions: () => regions,
  getRegion: (slug) => regionBySlug.get(slug as Region["slug"]) ?? null,
  listFactions: () => factions,
  getFaction: (slug) => factionBySlug.get(slug) ?? null,
  listEvents: () => events,
  getEvent: (slug) => eventBySlug.get(slug) ?? null,
  listRelationships: () => relationships,
  listStoryPaths: () => storyPaths,
  getStoryPath: (slug) => storyPathBySlug.get(slug) ?? null,
  getSource: (id) => sourceById.get(id) ?? null,
  listQuizQuestions: () => quizQuestions,

  /**
   * Deterministic per-day selection so every visitor gets the same Daily Lore
   * and the answer cannot be rerolled by refreshing.
   */
  dailyQuestions: (date = todayKey(), count = 5) => {
    const eligible = quizQuestions.filter((q) => {
      if (!q.verified) return false;
      const canon = q.canonStatus ?? "CURRENT_CANON";
      if (canon === "CURRENT_CANON") return true;
      if (
        q.kind === "CANON_OR_NOT" &&
        (canon === "LEGACY_LORE" ||
          canon === "AMBIGUOUS" ||
          canon === "RECONCILIATION_PENDING")
      ) {
        return true;
      }
      return false;
    });
    const shuffled = seededShuffle(eligible, `daily:${date}`);
    const picked: QuizQuestion[] = [];
    const usedKinds = new Set<string>();
    for (const question of shuffled) {
      if (picked.length >= count) break;
      // Prefer kind variety, then fall back to filling the set.
      if (usedKinds.has(question.kind) && picked.length < count - 1) continue;
      usedKinds.add(question.kind);
      picked.push(question);
    }
    for (const question of shuffled) {
      if (picked.length >= count) break;
      if (!picked.includes(question)) picked.push(question);
    }
    return picked;
  },

  search: (query, limit = 12) => searchLore(query, limit),
};

function scoreMatch(haystack: string, needle: string): number {
  const target = haystack.toLowerCase();
  if (target === needle) return 100;
  if (target.startsWith(needle)) return 80;
  if (target.includes(needle)) return 55;
  const words = needle.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => target.includes(w))) return 48;
  return 0;
}

export function searchLore(query: string, limit = 12): SearchResult[] {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) return [];

  const results: SearchResult[] = [];

  for (const character of characters) {
    const factionNames = character.factions
      .map((id) => factionBySlug.get(id.replace("faction:", ""))?.name ?? "")
      .filter(Boolean);
    const score = Math.max(
      scoreMatch(character.name, needle),
      scoreMatch(character.title, needle) * 0.7,
      scoreMatch(character.shortDescription, needle) * 0.35,
      ...character.aliases.map((a) => scoreMatch(a, needle) * 0.8),
      ...character.tags.map((t) => scoreMatch(t, needle) * 0.55),
      ...factionNames.map((f) => scoreMatch(f, needle) * 0.5),
      scoreMatch(regionBySlug.get(character.region)?.name ?? "", needle) * 0.45,
    );
    if (score > 0) {
      results.push({
        id: character.id,
        type: "character",
        name: character.name,
        slug: character.slug,
        subtitle: character.title,
        accentColor: character.accentColor,
        href: `/champion/${character.slug}`,
        assetKey: character.assetKey,
        score: score + character.popularity / 50,
      });
    }
  }

  for (const region of regions) {
    const score = scoreMatch(region.name, needle);
    if (score > 0) {
      results.push({
        id: region.id,
        type: "region",
        name: region.name,
        slug: region.slug,
        subtitle: "Region",
        accentColor: region.accentColor,
        href: `/?region=${region.slug}`,
        score: score + region.importance / 60,
      });
    }
  }

  for (const path of storyPaths) {
    const score = Math.max(
      scoreMatch(path.title, needle),
      scoreMatch(path.subtitle, needle) * 0.7,
      scoreMatch(path.description, needle) * 0.5,
    );
    if (score > 0) {
      results.push({
        id: path.id,
        type: "concept",
        name: path.title,
        slug: path.slug,
        subtitle: "Story path",
        accentColor: path.accentColor,
        href: `/`,
        score: score + (path.featured ? 8 : 0),
      });
    }
  }

  for (const faction of factions) {
    const score = Math.max(
      scoreMatch(faction.name, needle),
      scoreMatch(faction.shortDescription, needle) * 0.45,
    );
    if (score > 0) {
      results.push({
        id: faction.id,
        type: "faction",
        name: faction.name,
        slug: faction.slug,
        subtitle: "Faction",
        accentColor: faction.accentColor,
        href: `/?faction=${faction.slug}`,
        score: score + faction.importance / 60,
      });
    }
  }

  for (const event of events) {
    const score = Math.max(
      scoreMatch(event.title, needle),
      scoreMatch(event.era, needle) * 0.6,
    );
    if (score > 0) {
      results.push({
        id: event.id,
        type: "event",
        name: event.title,
        slug: event.slug,
        subtitle: event.era,
        accentColor: "#C9A96E",
        href: `/?event=${event.slug}`,
        score: score + event.importance / 80,
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score || hashString(a.id) - hashString(b.id))
    .slice(0, limit);
}
