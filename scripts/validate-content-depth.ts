/**
 * Thin-content validator — flags skeletal major pages when canon material exists.
 */
import { runContentDepthAudit } from "../lib/knowledge/content-depth";

const errors: string[] = [];
const warnings: string[] = [];

for (const issue of runContentDepthAudit()) {
  const line = `${issue.entityLabel} (${issue.entityId}): ${issue.detail}`;
  if (
    issue.kind.startsWith("major_event") ||
    issue.kind === "tier_a_thin_bio" ||
    issue.kind === "tier_a_few_claims"
  ) {
    errors.push(`${issue.kind}: ${line}`);
  } else {
    warnings.push(`${issue.kind}: ${line}`);
  }
}

console.log(`Content depth issues: ${errors.length} errors, ${warnings.length} warnings`);
for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:content-depth FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:content-depth PASSED");
