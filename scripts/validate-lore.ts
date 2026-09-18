/**
 * Canon Model V3 validation. Run with `npm run validate:lore`.
 */
import {
  characters,
  events,
  loreEntities,
  quizQuestions,
  relationships,
  rosterBySlug,
  sourceById,
  storyPaths,
} from "../data";
import { isDailyEligiblePath } from "../lib/canon/model";
import { dailyConnection } from "../lib/data/daily";
import { findNarrativePath } from "../lib/graph/algorithms";
import { buildLoreGraph, resetLoreGraphCache } from "../lib/graph";
import { countConnections } from "../lib/graph/queries";
import { ddragonChampionKey } from "../lib/assets/champion-assets";
import { edgeCategory } from "../lib/truth/layer";
import { scanTextForRedFlags } from "../lib/canon/red-flags";
import { deriveNeedsReview } from "../lib/truth/review";
import type { ConnectionCategory } from "../types";

const errors: string[] = [];
const warnings: string[] = [];

const fail = (message: string) => errors.push(message);
const warn = (message: string) => warnings.push(message);

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
  LEGACY_CONNECTION: 0,
};

let needsReviewCount = 0;

function characterById(id: string) {
  return characters.find((c) => c.id === id);
}

for (const rel of relationships) {
  categoryCounts[rel.connectionType]++;

  if (!characterById(rel.sourceCharacterId)) {
    fail(`Relationship ${rel.id} has unknown source`);
  }
  if (!characterById(rel.targetCharacterId)) {
    fail(`Relationship ${rel.id} has unknown target`);
  }
  if (rel.sourceCharacterId === rel.targetCharacterId) {
    fail(`Self relationship: ${rel.id}`);
  }
  if (rel.connectionType === "DIRECT_CANON" && !rel.verified) {
    fail(`DIRECT_CANON but unverified: ${rel.id}`);
  }
  if (
    rel.connectionType === "DIRECT_CANON" &&
    rel.confidence === "UNCERTAIN"
  ) {
    fail(`DIRECT_CANON with UNCERTAIN confidence: ${rel.id}`);
  }
  if (rel.connectionType === "DIRECT_CANON" && rel.sourceIds.length === 0) {
    fail(`DIRECT_CANON without sources: ${rel.id}`);
  }
  if (!rel.shortExplanation) {
    fail(`Missing summary: ${rel.id}`);
  }
  for (const sid of rel.sourceIds) {
    if (!sourceById.has(sid)) fail(`${rel.id} references unknown source ${sid}`);
  }
  for (const eid of rel.eventIds) {
    if (!events.some((e) => e.id === eid)) fail(`${rel.id} references unknown event ${eid}`);
  }

  const derived = deriveNeedsReview(rel);
  if (derived) needsReviewCount++;
  if (rel.reviewStatus === "PENDING" && !derived) {
    fail(`PENDING relationship must have needsReview: ${rel.id}`);
  }
  if (
    !rel.verified &&
    !rel.reviewed &&
    rel.reviewStatus === "PENDING" &&
    !derived
  ) {
    fail(`Unverified relationship missing review flag: ${rel.id}`);
  }
}

const ids = new Set<string>();
for (const rel of relationships) {
  if (ids.has(rel.id)) fail(`Duplicate relationship id: ${rel.id}`);
  ids.add(rel.id);
}

for (const event of events) {
  if (event.connectEligible && !event.verified) {
    fail(`Connect-eligible event is not verified: ${event.slug}`);
  }
}

const ANCIENT_EVENT_SLUGS = new Set([
  "void-incursion",
  "darkin-war",
  "darkin-corruption",
  "ascension-ritual",
]);
for (const event of events) {
  if (!ANCIENT_EVENT_SLUGS.has(event.slug)) continue;
  if (event.characterIds.includes("char:pantheon")) {
    fail(`Modern Pantheon (Atreus) listed as participant in ancient event: ${event.slug}`);
  }
}

const CONSERVATIVE_DISCLAIMER =
  /LoreGraph keeps this profile conservative until additional official sources are reviewed/i;

for (const character of characters) {
  try {
    ddragonChampionKey(character.slug);
  } catch {
    fail(`Asset mapping failed for ${character.slug}`);
  }

  if (character.title.toLowerCase().includes("machine herald") && character.slug === "viktor") {
    fail("Viktor still uses outdated Machine Herald title");
  }

  if (CONSERVATIVE_DISCLAIMER.test(character.longDescription.join(" "))) {
    fail(`${character.slug} biography contains developer disclaimer in public copy`);
  }

  const bioText = [character.shortDescription, ...character.longDescription].join(" ");
  for (const hit of scanTextForRedFlags(bioText, `character:${character.slug}`)) {
    if (hit.severity === "error") fail(`${hit.context}: ${hit.message}`);
    else warn(`${hit.context}: ${hit.message}`);
  }

  for (const beat of character.timeline) {
    for (const hit of scanTextForRedFlags(beat.description, `timeline:${character.slug}`)) {
      if (hit.severity === "error") fail(`${hit.context}: ${hit.message}`);
    }
    if (
      /ancient|before reckoning|fall of shurima|darkin/i.test(beat.era) &&
      beat.characterIds.includes("char:pantheon") &&
      beat.eventId !== "event:aatrox-pantheon-duel"
    ) {
      fail(`Ancient timeline beat includes char:pantheon: ${character.slug}/${beat.id}`);
    }
  }

  if (character.releaseYear === 2010 && !["singed", "sion", "sivir"].includes(character.slug)) {
    const rosterYear = rosterBySlug.get(character.slug)?.releaseYear;
    if (rosterYear && rosterYear !== 2010) {
      fail(`${character.slug} has stale releaseYear 2010 (roster says ${rosterYear})`);
    }
  }

  const displayed = countConnections(character.id, graph);
  const neighbors = graph.adjacency.get(character.id)?.length ?? 0;
  if (displayed === 0 && neighbors > 0) {
    fail(`${character.slug} shows 0 connections but graph has ${neighbors} edges`);
  }
}

for (const question of quizQuestions) {
  if (!question.verified) continue;
  const canon = question.canonStatus ?? "CURRENT_CANON";
  if (canon !== "CURRENT_CANON" && question.kind !== "CANON_OR_NOT") {
    fail(`Daily quiz ${question.id} is verified but not CURRENT_CANON`);
  }
  const qText = [question.prompt, question.explanation, ...(question.clues ?? [])].join(" ");
  for (const hit of scanTextForRedFlags(qText, `quiz:${question.id}`)) {
    if (hit.severity === "error") fail(`${hit.context}: ${hit.message}`);
  }
}

for (const path of storyPaths) {
  for (const chapter of path.chapters) {
    for (const charId of chapter.characterIds) {
      if (!characterById(charId)) {
        fail(`Story path ${path.slug} references unknown champion ${charId}`);
      }
    }
    for (const eventId of chapter.eventIds) {
      if (!events.some((e) => e.id === eventId)) {
        fail(`Story path ${path.slug} references unknown event ${eventId}`);
      }
    }
  }
  if (
    path.slug === "arcane-what-happened-next" &&
    /two continuities|main timeline/i.test(path.description)
  ) {
    fail("Arcane story path still uses outdated continuity framing");
  }
}

const daily = dailyConnection();
if (daily.path) {
  const endpoints = {
    start: `char:${daily.aSlug}`,
    end: `char:${daily.bSlug}`,
  };
  if (!isDailyEligiblePath(daily.path.steps, graph, endpoints)) {
    fail("Daily Connection path contains ineligible edges or nodes");
  }
} else {
  warn("Daily Connection could not find an eligible path for today");
}

const aatroxKaisa = findNarrativePath("char:aatrox", "char:kaisa", graph);
if (aatroxKaisa) {
  const badEventHop = aatroxKaisa.steps.some(
    (s) =>
      s.to.slug === "void-incursion" ||
      (s.to.slug === "kaisa" &&
        s.from.slug === "void-incursion" &&
        edgeCategory(s.edge) === "SHARED_EVENT"),
  );
  if (badEventHop) {
    fail("Aatrox → Kai'Sa path incorrectly routes through ancient Void incursion event");
  }
}

const morganaSol = findNarrativePath("char:morgana", "char:aurelion-sol", graph);
if (morganaSol) {
  const usesCelestialAge = morganaSol.steps.some(
    (s) => s.to.slug === "celestial-age" || s.from.slug === "celestial-age",
  );
  if (usesCelestialAge) {
    fail("Morgana → Aurelion Sol shortcuts through non-connectEligible Celestial Age");
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
console.log(`Thematic parallel: ${categoryCounts.THEMATIC_PARALLEL}`);
console.log(`Ambiguous: ${categoryCounts.AMBIGUOUS}`);
console.log(`Legacy connection: ${categoryCounts.LEGACY_CONNECTION}`);
console.log(`Needs review: ${needsReviewCount}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Errors: ${errors.length}`);

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const w of warnings.slice(0, 20)) console.log(` ⚠ ${w}`);
}

if (errors.length > 0) {
  console.log("\nErrors:");
  for (const e of errors.slice(0, 30)) console.log(` ✗ ${e}`);
  if (errors.length > 30) console.log(` ... and ${errors.length - 30} more`);
  process.exit(1);
}

console.log("\nLore validation complete ✓\n");
process.exit(0);
