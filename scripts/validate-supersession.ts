/**
 * Claim supersession validation — SUPERSEDED claims must not affect metrics/graph/story paths.
 */
import { characters, relationships } from "../data";
import { claims } from "../data/knowledge/claims";
import { storyPaths } from "../data/story-paths";
import { buildLoreGraph, resetLoreGraphCache } from "../lib/graph";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import { isSupersededClaim } from "../lib/knowledge/claim-supersession";
import { isTrustedClaim } from "../lib/knowledge/claim-evidence";

const errors: string[] = [];
const warnings: string[] = [];

const superseded = claims.filter(isSupersededClaim);
const supersededIds = new Set(superseded.map((c) => c.id));

for (const claim of superseded) {
  if (claim.supersededBy && !claims.find((c) => c.id === claim.supersededBy)) {
    errors.push(`${claim.id}: supersededBy points to missing claim ${claim.supersededBy}`);
  }
}

// supersession loops
for (const claim of superseded) {
  if (!claim.supersededBy) continue;
  const visited = new Set<string>([claim.id]);
  let cursor = claim.supersededBy;
  while (cursor) {
    if (visited.has(cursor)) {
      errors.push(`${claim.id}: supersession loop detected at ${cursor}`);
      break;
    }
    visited.add(cursor);
    const next = claims.find((c) => c.id === cursor);
    cursor = next?.supersededBy ?? "";
  }
}

// SUPERSEDED claims must not be trusted
for (const claim of superseded) {
  if (isTrustedClaim(claim)) {
    errors.push(`${claim.id}: SUPERSEDED claim is still evidence-trusted`);
  }
}

// Metrics must exclude superseded claims
for (const character of characters) {
  const charClaims = claims.filter((c) => c.subjectId === character.id);
  const activeReviewed = charClaims.filter(
    (c) => c.reviewed && !c.needsReview && !isSupersededClaim(c),
  );
  const allReviewed = charClaims.filter((c) => c.reviewed && !c.needsReview);
  if (activeReviewed.length !== allReviewed.length) {
    const q = computeQuality(character);
    const supersededInMetrics = charClaims.filter(
      (c) => isSupersededClaim(c) && c.reviewed && !c.needsReview,
    );
    if (supersededInMetrics.length) {
      // computeQuality uses activeClaims — verify no superseded counted
      const trustedSuperseded = supersededInMetrics.filter(isTrustedClaim);
      if (trustedSuperseded.length) {
        errors.push(
          `${character.slug}: superseded claims counted as trusted in metrics`,
        );
      }
    }
  }
}

// Story paths must not reference superseded claims
for (const path of storyPaths) {
  for (const chapter of path.chapters) {
    for (const block of chapter.blocks) {
      for (const cid of block.claimIds ?? []) {
        if (supersededIds.has(cid)) {
          errors.push(
            `${path.id} chapter ${chapter.id}: SUPERSEDED claim ${cid} in story path`,
          );
        }
      }
    }
  }
}

// Timeline beats must not reference superseded claims as sole support
for (const character of characters) {
  for (const beat of character.timeline) {
    const beatClaims = (beat.claimIds ?? []).filter((id) => supersededIds.has(id));
    if (beatClaims.length && beat.reviewStatus === "VERIFIED_CANON") {
      errors.push(
        `${character.slug} VERIFIED timeline beat "${beat.title}" references SUPERSEDED claim(s): ${beatClaims.join(", ")}`,
      );
    }
  }
}

// Graph should not include edges derived from superseded pack identity
resetLoreGraphCache();
const graph = buildLoreGraph();
if (graph.nodes.has("char:superseded-pack")) {
  errors.push("char:superseded-pack still present in graph");
}

// char:superseded-pack must not exist in claims
if (claims.some((c) => c.subjectId === "char:superseded-pack")) {
  errors.push("char:superseded-pack subjectId still present in claims");
}

console.log(`Superseded claims: ${superseded.length}`);
for (const w of warnings) console.warn(`WARN: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);

if (errors.length) {
  console.error(`\nvalidate:supersession FAILED (${errors.length})`);
  process.exit(1);
}

console.log("\nvalidate:supersession PASSED");
