/**
 * Full roster + lore data validation. Run with `npm run validate:data`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { characters, relationships, rosterBySlug, rosterSlugs } from "../data";
import { buildLoreGraph, resetLoreGraphCache } from "../lib/graph";
import { ddragonChampionKey, getChampionAssetUrl } from "../lib/assets/champion-assets";
import { findPotentialDuplicateRelationships } from "../lib/roster/audit";
import { deriveNeedsReview } from "../lib/truth/review";
import { EXPECTED_ROSTER_COUNT } from "../data/roster";

const errors: string[] = [];
const warnings: string[] = [];
const fail = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const charSlugs = new Set(characters.map((c) => c.slug));
const charIds = new Set(characters.map((c) => c.id));

/* ------------------------------- Roster ---------------------------------- */
if (characters.length !== EXPECTED_ROSTER_COUNT) {
  fail(`Roster mismatch: ${characters.length} characters vs ${EXPECTED_ROSTER_COUNT} expected`);
}

for (const slug of rosterSlugs) {
  if (!charSlugs.has(slug)) fail(`MISSING_CHAMPION: ${slug}`);
}

for (const c of characters) {
  if (!rosterBySlug.has(c.slug)) warn(`UNKNOWN_CHAMPION in dataset: ${c.slug}`);
  if (!c.name) fail(`Missing name: ${c.slug}`);
  if (!c.shortDescription) fail(`MISSING_DESCRIPTION: ${c.slug}`);
  if (!c.region) fail(`MISSING_REGION: ${c.slug}`);
  if (!c.assetKey) fail(`INVALID_ASSET_KEY: ${c.slug}`);
  if (!c.sourceIds.length) warn(`MISSING_SOURCE: ${c.slug}`);
  try {
    ddragonChampionKey(c.slug);
    getChampionAssetUrl(c.slug);
  } catch {
    fail(`INVALID_ASSET_KEY mapping: ${c.slug}`);
  }
}

const slugCounts = new Map<string, number>();
for (const c of characters) {
  slugCounts.set(c.slug, (slugCounts.get(c.slug) ?? 0) + 1);
}
for (const [slug, n] of slugCounts) {
  if (n > 1) fail(`DUPLICATE_SLUG: ${slug}`);
}

const idCounts = new Map<string, number>();
for (const c of characters) {
  idCounts.set(c.id, (idCounts.get(c.id) ?? 0) + 1);
}
for (const [id, n] of idCounts) {
  if (n > 1) fail(`DUPLICATE_ID: ${id}`);
}

/* --------------------------- Relationships ------------------------------- */
resetLoreGraphCache();
const graph = buildLoreGraph();

let directCanon = 0;
let structural = 0;
let editorial = 0;
let pendingReview = 0;

for (const rel of relationships) {
  if (!charIds.has(rel.sourceCharacterId)) {
    fail(`BROKEN_RELATIONSHIP_REFERENCE: ${rel.id} source`);
  }
  if (!charIds.has(rel.targetCharacterId)) {
    fail(`BROKEN_RELATIONSHIP_REFERENCE: ${rel.id} target`);
  }
  if (rel.connectionType === "DIRECT_CANON") directCanon++;
  if (
    rel.connectionType === "STRUCTURAL_LORE" ||
    rel.connectionType === "SHARED_EVENT" ||
    rel.connectionType === "SHARED_FACTION" ||
    rel.connectionType === "SHARED_REGION"
  ) {
    structural++;
  }
  if (
    rel.connectionType === "THEMATIC_PARALLEL" ||
    rel.connectionType === "AMBIGUOUS"
  ) {
    editorial++;
  }
  if (deriveNeedsReview(rel)) pendingReview++;
  if (
    !rel.verified &&
    !rel.reviewed &&
    rel.reviewStatus === "PENDING" &&
    !deriveNeedsReview(rel)
  ) {
    fail(`UNREVIEWED_RELATIONSHIP: ${rel.id}`);
  }
}

const duplicates = findPotentialDuplicateRelationships(relationships);

/* ------------------------------ Champions -------------------------------- */
const sparse: string[] = [];
const noDirectCanon: string[] = [];

for (const c of characters) {
  const neighbors = graph.adjacency.get(c.id)?.length ?? 0;
  if (neighbors < 2) sparse.push(c.slug);
  const direct = relationships.filter(
    (r) =>
      (r.sourceCharacterId === c.id || r.targetCharacterId === c.id) &&
      r.connectionType === "DIRECT_CANON" &&
      r.verified,
  );
  if (direct.length === 0) noDirectCanon.push(c.slug);
}

/* ------------------------------- Report ---------------------------------- */
const report = {
  generatedAt: new Date().toISOString(),
  championsTotal: characters.length,
  championsExpected: EXPECTED_ROSTER_COUNT,
  relationshipsTotal: relationships.length,
  directCanonRelationships: directCanon,
  structuralRelationships: structural,
  editorialRelationships: editorial,
  pendingReviewRelationships: pendingReview,
  potentialDuplicateRelationships: duplicates.length,
  potentialDuplicates: duplicates,
  championsWithSparseConnectivity: sparse,
  championsWithNoDirectCanonRelationship: noDirectCanon,
  errors,
  warnings: [
    ...warnings,
    ...duplicates.map(
      (d) =>
        `POTENTIAL_DUPLICATE_RELATIONSHIP: ${d.pair} (${d.connectionType}) — ${d.ids.join(", ")}`,
    ),
    ...sparse.map((s) => `SPARSE_CONNECTIVITY: ${s}`),
  ],
};

const reportsDir = join(process.cwd(), "reports");
mkdirSync(reportsDir, { recursive: true });
writeFileSync(
  join(reportsDir, "lore-data-audit.json"),
  JSON.stringify(report, null, 2),
);

const md = [
  "# LoreGraph Data Audit",
  "",
  `Generated: ${report.generatedAt}`,
  "",
  "## Roster",
  `${report.championsTotal} / ${report.championsExpected} champions`,
  "",
  "## Summary",
  `- Direct canon: ${directCanon}`,
  `- Structural: ${structural}`,
  `- Editorial: ${editorial}`,
  `- Pending review: ${pendingReview}`,
  `- Potential duplicates: ${duplicates.length}`,
  `- Sparse connectivity (<2 edges): ${sparse.length}`,
  "",
  "## Errors",
  errors.length ? errors.map((e) => `- ${e}`).join("\n") : "- 0 blocking errors",
  "",
  "## Warnings",
  report.warnings.length
    ? report.warnings.slice(0, 50).map((w) => `- ${w}`).join("\n")
    : "- none",
].join("\n");

writeFileSync(join(reportsDir, "lore-data-audit.md"), md);

console.log("\nLoreGraph data validation");
console.log("-----------------------");
console.log(`ROSTER: ${characters.length} / ${EXPECTED_ROSTER_COUNT} champions`);
console.log(`ERRORS: ${errors.length} blocking errors`);
console.log(`WARNINGS: ${report.warnings.length}`);
console.log(`DIRECT CANON: ${directCanon}`);
console.log(`STRUCTURAL: ${structural}`);
console.log(`EDITORIAL: ${editorial}`);
console.log(`REVIEW PENDING: ${pendingReview}`);
console.log(`DUPLICATE CANDIDATES: ${duplicates.length}`);
console.log(`SPARSE CHAMPIONS: ${sparse.length}`);

if (errors.length) {
  console.log("\nBlocking errors:");
  for (const e of errors) console.log(` ✗ ${e}`);
  process.exit(1);
}

console.log("\nData validation complete ✓\n");
