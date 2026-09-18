/**
 * Story Path truth granularity validation.
 * Run with `npm run validate:story-paths`.
 */
import { validateStoryPaths } from "../lib/story-path/validate";

const result = validateStoryPaths();

console.log("Story Path block counts:");
for (const [cls, count] of Object.entries(result.blockCounts)) {
  console.log(`  ${cls}: ${count}`);
}
console.log(`FACT blocks lacking primary evidence: ${result.factsWithoutEvidence}`);
console.log("FACT evidence authority:");
for (const [tier, count] of Object.entries(result.factEvidence)) {
  console.log(`  ${tier}: ${count}`);
}

for (const w of result.warnings) console.warn(`WARN: ${w}`);
for (const e of result.errors) console.error(`ERROR: ${e}`);

if (result.errors.length) {
  console.error(`\nvalidate:story-paths FAILED (${result.errors.length} errors)`);
  process.exit(1);
}

console.log("\nvalidate:story-paths PASSED");
