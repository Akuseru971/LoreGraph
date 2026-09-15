/**
 * Truth Layer validation. Run with `npm run validate:lore`.
 */
import { characters, events, loreEntities, relationships, sourceById } from "../data";
import { buildLoreGraph, resetLoreGraphCache } from "../lib/graph";
import { ddragonChampionKey } from "../lib/assets/champion-assets";
import { needsReview } from "../lib/truth/layer";
import type { ConnectionCategory } from "../types";

const problems: string[] = [];
const warn = (message: string) => problems.push(message);

resetLoreGraphCache();
const graph = buildLoreGraph();

const categoryCounts: Record<ConnectionCategory, number> = {
  DIRECT_CANON: 0,
  SHARED_EVENT: 0,
  SHARED_FACTION: 0,
  SHARED_REGION: 0,
  STRUCTURAL_LORE: 0,
  THEMATIC_PARALLEL: 0,
  AMBIGUOUS: 0,
  LEGACY_LORE: 0,
};

let needsReviewCount = 0;

function characterById(id: string) {
  return characters.find((c) => c.id === id);
}

for (const rel of relationships) {
  categoryCounts[rel.connectionType]++;

  if (!characterById(rel.sourceCharacterId)) {
    warn(`Relationship ${rel.id} has unknown source`);
  }
  if (!characterById(rel.targetCharacterId)) {
    warn(`Relationship ${rel.id} has unknown target`);
  }
  if (rel.connectionType === "DIRECT_CANON" && !rel.verified) {
    warn(`DIRECT_CANON but unverified: ${rel.id}`);
  }
  if (!rel.shortExplanation) {
    warn(`Missing summary: ${rel.id}`);
  }
  for (const sid of rel.sourceIds) {
    if (!sourceById.has(sid)) warn(`${rel.id} references unknown source ${sid}`);
  }
  for (const eid of rel.eventIds) {
    if (!events.some((e) => e.id === eid)) warn(`${rel.id} references unknown event ${eid}`);
  }
  if (needsReview(rel)) needsReviewCount++;
}

const edgeKeys = new Set<string>();
for (const edge of graph.edges) {
  const key = [edge.source, edge.target].sort().join("::");
  if (edgeKeys.has(key) && edge.connectionKind === "direct") {
    warn(`Possible duplicate edge: ${edge.id}`);
  }
  edgeKeys.add(key);
  if (!edge.connectionCategory) warn(`Edge ${edge.id} missing connectionCategory`);
}

for (const character of characters) {
  try {
    ddragonChampionKey(character.slug);
  } catch {
    warn(`Asset mapping failed for ${character.slug}`);
  }
}

console.log("\nLore validation report");
console.log("----------------------");
console.log(`Champions: ${characters.length}`);
console.log(`Lore entities: ${loreEntities.length}`);
console.log(`Graph nodes: ${graph.nodes.size}`);
console.log(`Graph edges: ${graph.edges.length}`);
console.log(`Direct canon (data): ${categoryCounts.DIRECT_CANON}`);
console.log(`Structural lore: ${categoryCounts.STRUCTURAL_LORE}`);
console.log(`Shared events (derived): ${graph.edges.filter((e) => e.connectionCategory === "SHARED_EVENT").length}`);
console.log(`Shared factions (derived): ${graph.edges.filter((e) => e.connectionCategory === "SHARED_FACTION").length}`);
console.log(`Thematic parallel: ${categoryCounts.THEMATIC_PARALLEL}`);
console.log(`Ambiguous: ${categoryCounts.AMBIGUOUS}`);
console.log(`Legacy lore: ${categoryCounts.LEGACY_LORE}`);
console.log(`Needs review: ${needsReviewCount}`);
console.log(`Invalid issues: ${problems.length}`);

if (problems.length > 0) {
  console.log("\nIssues:");
  for (const p of problems.slice(0, 30)) console.log(` - ${p}`);
  if (problems.length > 30) console.log(` ... and ${problems.length - 30} more`);
  process.exit(1);
}

console.log("\nLore validation complete ✓\n");
process.exit(0);
