/**
 * Claim source exactness validation.
 */
import { claims } from "../data/knowledge/claims";
import { sourceById } from "../data/sources";
import { isWikiOnlyClaim, claimSourceAuthority } from "../lib/knowledge/claim-trust";

const errors: string[] = [];
const warnings: string[] = [];

const EXTENSION_IDS = new Set([
  "claim:varus-was-ascended",
  "claim:varus-became-darkin",
  "claim:varus-sealed-in-bow",
  "claim:varus-possesses-valmar-kai",
  "claim:nasus-was-ascended",
  "claim:nasus-scholar-archivist",
  "claim:pantheon-hosted-aspect-of-war",
  "claim:pantheon-aspect-destroyed",
  "claim:aspect-of-war-sealed-darkin",
  "claim:shurima-sun-disc-ascension",
  "claim:rite-elevates-ascended",
  "claim:shurima-rite-of-ascension",
  "claim:aatrox-sealed-in-blade",
  "claim:aatrox-possesses-host",
]);

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
