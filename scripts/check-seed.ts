/**
 * Data integrity check for the seed. Run with `npm run check:seed`.
 *
 * Verifies referential integrity (relationships, events, sources, story paths
 * and quiz questions all point at things that exist) and that the graph
 * algorithms produce sensible paths for a few known pairs.
 */
import {
  achievements,
  characterById,
  characters,
  eventById,
  events,
  factionById,
  quizQuestions,
  regionBySlug,
  relationships,
  sourceById,
  storyPaths,
} from "../data";
import { buildLoreGraph, findPaths } from "../lib/graph";

const problems: string[] = [];
const warn = (message: string) => problems.push(message);

/* ------------------------------------------------------------- characters */
if (characters.length !== 50) {
  warn(`Expected 50 characters, found ${characters.length}`);
}

const slugs = new Set<string>();
for (const character of characters) {
  if (slugs.has(character.slug)) warn(`Duplicate character slug: ${character.slug}`);
  slugs.add(character.slug);
  if (!regionBySlug.has(character.region)) {
    warn(`${character.slug} has unknown region ${character.region}`);
  }
  for (const factionId of character.factions) {
    if (!factionById.has(factionId)) {
      warn(`${character.slug} references unknown faction ${factionId}`);
    }
  }
  for (const sourceId of character.sourceIds) {
    if (!sourceById.has(sourceId)) {
      warn(`${character.slug} references unknown source ${sourceId}`);
    }
  }
  for (const eventId of character.eventIds) {
    if (!eventById.has(eventId)) {
      warn(`${character.slug} references unknown event ${eventId}`);
    }
  }
}

/* ---------------------------------------------------------- relationships */
if (relationships.length < 150) {
  warn(`Expected at least 150 relationships, found ${relationships.length}`);
}
for (const rel of relationships) {
  if (!characterById.has(rel.sourceCharacterId)) {
    warn(`${rel.id} has unknown source ${rel.sourceCharacterId}`);
  }
  if (!characterById.has(rel.targetCharacterId)) {
    warn(`${rel.id} has unknown target ${rel.targetCharacterId}`);
  }
  for (const sourceId of rel.sourceIds) {
    if (!sourceById.has(sourceId)) {
      warn(`${rel.id} references unknown source ${sourceId}`);
    }
  }
  for (const eventId of rel.eventIds) {
    if (!eventById.has(eventId)) warn(`${rel.id} references unknown event ${eventId}`);
  }
}

/* ------------------------------------------------------------ story paths */
if (storyPaths.length < 10) {
  warn(`Expected at least 10 story paths, found ${storyPaths.length}`);
}
for (const path of storyPaths) {
  for (const characterId of path.characterIds) {
    if (!characterById.has(characterId)) {
      warn(`${path.slug} references unknown character ${characterId}`);
    }
  }
  for (const chapter of path.chapters) {
    for (const eventId of chapter.eventIds) {
      if (!eventById.has(eventId)) {
        warn(`${path.slug}/${chapter.order} references unknown event ${eventId}`);
      }
    }
  }
}

/* --------------------------------------------------------- quiz questions */
if (quizQuestions.length < 50) {
  warn(`Expected at least 50 quiz questions, found ${quizQuestions.length}`);
}
for (const question of quizQuestions) {
  if (question.options.length < 2) warn(`${question.id} has too few options`);
  if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
    warn(`${question.id} has an out-of-range correctIndex`);
  }
  for (const characterId of question.characterIds) {
    if (!characterById.has(characterId)) {
      warn(`${question.id} references unknown character ${characterId}`);
    }
  }
}

/* ------------------------------------------------------------------ graph */
const graph = buildLoreGraph();
const orphans = characters.filter(
  (c) => (graph.adjacency.get(c.id) ?? []).length === 0,
);
if (orphans.length > 0) {
  warn(`Characters with no edges: ${orphans.map((c) => c.slug).join(", ")}`);
}

const pairs: [string, string][] = [
  ["char:aatrox", "char:pantheon"],
  ["char:lux", "char:aatrox"],
  ["char:yasuo", "char:swain"],
  ["char:jinx", "char:viego"],
  ["char:mel", "char:aurelion-sol"],
  ["char:kindred", "char:draven"],
];

console.log("\nGraph sanity checks");
console.log("-------------------");
for (const [a, b] of pairs) {
  const paths = findPaths(a, b, graph);
  if (paths.length === 0) {
    warn(`No path between ${a} and ${b}`);
    continue;
  }
  for (const path of paths) {
    console.log(
      `${path.strategy.padEnd(11)} ${path.length} hops  score ${String(path.score).padStart(3)}  ` +
        path.nodes.map((n) => n.name).join(" → "),
    );
  }
  console.log("");
}

/* ----------------------------------------------------------- achievements */
for (const achievement of achievements) {
  if (achievement.rule.kind === "charactersExplored") {
    for (const characterId of achievement.rule.characterIds) {
      if (!characterById.has(characterId)) {
        warn(`${achievement.slug} references unknown character ${characterId}`);
      }
    }
  }
  if (achievement.rule.kind === "characterMastered") {
    if (!characterById.has(achievement.rule.characterId)) {
      warn(`${achievement.slug} references unknown character`);
    }
  }
  if (achievement.rule.kind === "storyCompleted") {
    const storySlug = achievement.rule.storySlug;
    if (!storyPaths.some((p) => p.slug === storySlug)) {
      warn(`${achievement.slug} references unknown story path ${storySlug}`);
    }
  }
}

console.log("Seed summary");
console.log("------------");
console.log(`characters      ${characters.length}`);
console.log(`relationships   ${relationships.length}`);
console.log(`events          ${events.length}`);
console.log(`story paths     ${storyPaths.length}`);
console.log(`chapters        ${storyPaths.reduce((n, p) => n + p.chapters.length, 0)}`);
console.log(`quiz questions  ${quizQuestions.length}`);
console.log(`graph nodes     ${graph.nodes.size}`);
console.log(`graph edges     ${graph.edges.length}`);
console.log(`achievements    ${achievements.length}`);

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s) found:`);
  for (const problem of problems) console.error(` - ${problem}`);
  process.exit(1);
}

console.log("\nSeed OK\n");
