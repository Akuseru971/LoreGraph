/**
 * Source evidence layer validation — snapshots, excerpts, and trust chain.
 */
import { claims } from "../data/knowledge/claims";
import {
  claimEvidenceBindings,
  sourceEvidence,
  sourceEvidenceById,
} from "../data/knowledge/evidence";
import { sourceSnapshots, sourceSnapshotById } from "../data/knowledge/source-snapshots";
import {
  evaluateSourceSupport,
  isTrustedClaim,
  STRONG_PREDICATES,
} from "../lib/knowledge/claim-evidence";
import { isActiveClaim } from "../lib/knowledge/claim-supersession";
import { resolveClaimEvidenceRefs } from "../lib/knowledge/evidence-registry";
import {
  excerptFoundInSnapshot,
  verifyEvidenceAgainstSnapshot,
} from "../lib/knowledge/source-snapshot";
import { sourceById } from "../data/sources";

const errors: string[] = [];
const warnings: string[] = [];
const seenEvidenceIds = new Set<string>();

let verifiedEvidence = 0;
let pendingEvidence = 0;
let rejectedEvidence = 0;
let reviewRequiredEvidence = 0;
let verifiedExcerpts = 0;
let withoutSnapshots = 0;

for (const record of sourceEvidence) {
  if (seenEvidenceIds.has(record.id)) {
    errors.push(`duplicate evidence id ${record.id}`);
  }
  seenEvidenceIds.add(record.id);

  if (!sourceById.has(record.sourceId)) {
    errors.push(`${record.id}: unknown source ${record.sourceId}`);
  }
  if (!record.normalizedFact?.trim()) {
    errors.push(`${record.id}: missing normalizedFact`);
  }

  const snapshot = sourceSnapshotById.get(record.sourceId);
  if (!snapshot) {
    withoutSnapshots++;
    errors.push(`${record.id}: no source snapshot for ${record.sourceId}`);
  }

  const verification = verifyEvidenceAgainstSnapshot(record, snapshot);
  switch (verification.reviewStatus) {
    case "VERIFIED":
      verifiedEvidence++;
      if (record.shortExcerpt && verification.excerptVerified) verifiedExcerpts++;
      break;
    case "PENDING":
      pendingEvidence++;
      break;
    case "REJECTED":
      rejectedEvidence++;
      errors.push(
        `${record.id}: ${verification.reason ?? "excerpt verification failed"}`,
      );
      break;
    case "REVIEW_REQUIRED":
      reviewRequiredEvidence++;
      warnings.push(`${record.id}: ${verification.reason ?? "review required"}`);
      break;
    default:
      break;
  }

  if (
    record.shortExcerpt &&
    snapshot &&
    !excerptFoundInSnapshot(snapshot, record.shortExcerpt)
  ) {
    errors.push(`${record.id}: shortExcerpt not found in source snapshot`);
  }

  if (
    record.sourceSnapshotHash &&
    snapshot &&
    record.sourceSnapshotHash !== snapshot.contentHash
  ) {
    errors.push(`${record.id}: snapshot hash mismatch`);
  }
}

const referencedEvidence = new Set(Object.values(claimEvidenceBindings).flat());
for (const record of sourceEvidence) {
  if (!referencedEvidence.has(record.id)) {
    warnings.push(`${record.id}: orphan evidence (no claim binding)`);
  }
}

for (const claim of claims.filter((c) => c.reviewed && !c.needsReview && isActiveClaim(c))) {
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

  if (STRONG_PREDICATES.has(claim.predicate)) {
    const hasVerified = evidence.some((e) => e.reviewStatus === "VERIFIED");
    if (!hasVerified) {
      errors.push(`${claim.id}: strong predicate lacks VERIFIED evidence`);
    }
    const contextOnly = evidence.every((e) => e.evidenceType === "CONTEXT_ONLY");
    if (contextOnly) {
      errors.push(`${claim.id}: strong claim supported only by CONTEXT_ONLY evidence`);
    }
    const officialOnly = evidence.every(
      (e) => e.evidenceType === "OFFICIAL_REFERENCE",
    );
    if (officialOnly) {
      errors.push(
        `${claim.id}: strong claim supported only by OFFICIAL_REFERENCE evidence`,
      );
    }
  }

  if (!isTrustedClaim(claim)) {
    warnings.push(`${claim.id}: reviewed but not evidence-trusted`);
  }
}

for (const claim of claims.filter((c) => c.claimStatus === "SUPERSEDED")) {
  if (claim.reviewed && !claim.needsReview) {
    warnings.push(`${claim.id}: SUPERSEDED claim still marked reviewed`);
  }
}

const evidenceSourceIds = new Set(sourceEvidence.map((e) => e.sourceId));
for (const snapshot of sourceSnapshots) {
  if (!evidenceSourceIds.has(snapshot.sourceId)) {
    warnings.push(`${snapshot.sourceId}: orphan snapshot (no evidence references)`);
  }
}

console.log(`Source evidence records: ${sourceEvidence.length}`);
console.log(`Source snapshots: ${sourceSnapshots.length}`);
console.log(`Verified evidence: ${verifiedEvidence}`);
console.log(`Pending evidence: ${pendingEvidence}`);
console.log(`Rejected evidence: ${rejectedEvidence}`);
console.log(`Review required: ${reviewRequiredEvidence}`);
console.log(`Verified excerpts: ${verifiedExcerpts}`);
console.log(`Evidence without snapshots: ${withoutSnapshots}`);
console.log(
  `Reviewed claims: ${claims.filter((c) => c.reviewed && !c.needsReview && isActiveClaim(c)).length}`,
);

for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:evidence FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:evidence PASSED");
