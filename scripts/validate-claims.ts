/**
 * Claim source exactness validation.
 */
import { claimExtensions } from "../data/knowledge/claim-extensions";
import { claims } from "../data/knowledge/claims";
import { sourceById } from "../data/sources";
import { isWikiOnlyClaim } from "../lib/knowledge/claim-trust";

const errors: string[] = [];
const warnings: string[] = [];

const EXTENSION_IDS = new Set(claimExtensions.map((c) => c.id));

for (const claim of claims.filter((c) => EXTENSION_IDS.has(c.id))) {
  if (!claim.sourceIds.length) {
    errors.push(`${claim.id}: no sources`);
  }
  for (const sid of claim.sourceIds) {
    if (!sourceById.has(sid)) {
      errors.push(`${claim.id}: unknown source ${sid}`);
    }
  }

  if (claim.id === "claim:varus-was-ascended") {
    if (!claim.sourceIds.includes("source:twilight-of-the-gods")) {
      warnings.push(`${claim.id}: expected twilight-of-the-gods as primary historical source`);
    }
    if (claim.sourceIds.includes("source:bio-varus") && claim.certainty === "DOCUMENTED") {
      warnings.push(`${claim.id}: bio alone may not establish Ascended status explicitly`);
    }
  }

  if (
    claim.subjectId.startsWith("concept:") &&
    claim.sourceIds.length === 1 &&
    claim.sourceIds[0].startsWith("source:bio-")
  ) {
    warnings.push(
      `${claim.id}: civilization claim supported only by single champion bio (${claim.sourceIds[0]})`,
    );
  }

  if (isWikiOnlyClaim(claim) && claim.certainty === "DOCUMENTED") {
    warnings.push(`${claim.id}: wiki-only claim marked DOCUMENTED`);
  }
}

console.log(`Extension claims audited: ${EXTENSION_IDS.size}`);
for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:claims FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:claims PASSED");
