/**
 * Event role validation.
 * Run with `npm run validate:events`.
 */
import { validateEvents } from "../lib/events/validate";

const result = validateEvents();

console.log(`Event-character links: ${result.linkCount}`);
console.log("Role breakdown:");
for (const [role, count] of Object.entries(result.roleCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${role}: ${count}`);
}
console.log(`ERA PARTICIPANT violations: ${result.eraParticipantViolations}`);
console.log(`ASSOCIATED_WITH (downgraded/default): ${result.downgradedFromParticipant}`);

for (const w of result.warnings) console.warn(`WARN: ${w}`);
for (const e of result.errors) console.error(`ERROR: ${e}`);

if (result.errors.length) {
  console.error(`\nvalidate:events FAILED (${result.errors.length} errors)`);
  process.exit(1);
}

console.log("\nvalidate:events PASSED");
