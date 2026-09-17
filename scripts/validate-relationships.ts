/**
 * Relationship duplicate and semantic facet validation.
 */
import { relationships } from "../data/relationships";
import { findDuplicateRelationships } from "../lib/relationships/dedupe";

const errors: string[] = [];
const dupes = findDuplicateRelationships(relationships);

for (const d of dupes) {
  errors.push(`Duplicate semantic relationship: ${d.label} (${d.ids.join(", ")})`);
}

const varusPantheon = relationships.find(
  (r) =>
    (r.sourceCharacterId === "char:varus" && r.targetCharacterId === "char:pantheon") ||
    (r.sourceCharacterId === "char:pantheon" && r.targetCharacterId === "char:varus"),
);
if (varusPantheon) {
  errors.push(
    `Synthetic Varus↔Pantheon direct edge remains (${varusPantheon.id}) — route through Aspect of War / Darkin War instead`,
  );
}

for (const rel of relationships) {
  if (
    rel.eventIds.includes("event:targon-aurelion-loose") &&
    rel.sourceCharacterId !== "char:aurelion-sol" &&
    rel.targetCharacterId !== "char:aurelion-sol"
  ) {
    errors.push(
      `Relationship ${rel.id} cites synthetic shared event targon-aurelion-loose without Aurelion Sol`,
    );
  }
}

console.log(`Relationships: ${relationships.length}`);
console.log(`Duplicate groups: ${dupes.length}`);

for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:relationships FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:relationships PASSED");
