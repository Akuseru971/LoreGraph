/**
 * Source evidence layer validation — every reviewed claim must have evidenceRefs
 * backed by SourceEvidence records that semantically support the proposition.
 */
import { claims } from "../data/knowledge/claims";
import { sourceEvidence, sourceEvidenceById } from "../data/knowledge/evidence";
import {
  evaluateSourceSupport,
  evidenceSupportsClaimProposition,
  isTrustedClaim,
} from "../lib/knowledge/claim-evidence";
import { resolveClaimEvidenceRefs } from "../lib/knowledge/evidence-registry";
import { sourceById } from "../data/sources";

const errors: string[] = [];
const warnings: string[] = [];

for (const record of sourceEvidence) {
  if (!sourceById.has(record.sourceId)) {
    errors.push(`${record.id}: unknown source ${record.sourceId}`);
  }
  if (!record.normalizedFact?.trim()) {
    errors.push(`${record.id}: missing normalizedFact`);
  }
}

for (const claim of claims.filter((c) => c.reviewed && !c.needsReview)) {
  const evidence = resolveClaimEvidenceRefs(claim);
  if (!evidence.length) {
    errors.push(`${claim.id}: reviewed claim has no evidenceRefs`);
    continue;
  }

  for (const ev of evidence) {
    if (!sourceEvidenceById.has(ev.id)) {
      errors.push(`${claim.id}: unknown evidenceRef ${ev.id}`);
    }
  }

  const support = evaluateSourceSupport(claim);
  if (!support.supported) {
    errors.push(`${claim.id}: ${"reason" in support ? support.reason : "unsupported"}`);
  }

  if (!isTrustedClaim(claim)) {
    warnings.push(`${claim.id}: reviewed but not evidence-trusted`);
  }
}

console.log(`Source evidence records: ${sourceEvidence.length}`);
console.log(`Reviewed claims: ${claims.filter((c) => c.reviewed && !c.needsReview).length}`);

for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:evidence FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:evidence PASSED");
