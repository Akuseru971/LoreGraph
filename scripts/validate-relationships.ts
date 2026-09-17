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

console.log(`Relationships: ${relationships.length}`);
console.log(`Duplicate groups: ${dupes.length}`);

for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:relationships FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:relationships PASSED");
