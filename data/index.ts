/**
 * Single entry point for the Runeterra seed. Everything downstream
 * (graph engine, repositories, Supabase seed script) reads from here.
 */
export { achievements, achievementById, levels, knowledgeTiers, XP_REWARDS } from "./achievements";
export { characters, characterById, characterBySlug, characterSeeds } from "./characters";
export { events, eventById, eventBySlug, eras } from "./events";
export { factions, factionById, factionBySlug } from "./factions";
export { quizQuestions, quizQuestionById } from "./quiz-questions";
export { regions, regionBySlug, featuredRegionSlugs } from "./regions";
export { relationships, relationshipById } from "./relationships";
export { loreEntities, loreEntityById, loreEntityBySlug } from "./lore-entities";
export { sources, sourceById, championSlugs, bioSourceId } from "./sources";
export {
  storyPaths,
  storyPathBySlug,
  storyPathsForCharacter,
} from "./story-paths";
export { universes, activeUniverse, RUNETERRA_ID } from "./universes";

/** Champions surfaced in the Discover "Trending" rail, in order. */
export const trendingCharacterSlugs = [
  "aatrox",
  "jinx",
  "mordekaiser",
  "pantheon",
  "swain",
  "yasuo",
] as const;

/** Nodes used by the hero constellation on Discover. */
export const heroConstellationSlugs = [
  "aatrox",
  "pantheon",
  "swain",
  "leblanc",
  "jinx",
  "vi",
  "yasuo",
  "yone",
  "viego",
  "thresh",
] as const;
