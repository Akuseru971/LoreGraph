import type { Claim } from "@/types";

const CLAIM_REFERENCE_PATTERN =
  /\b(?:confirmed by|duplicate of|supported by|see|per)\s+claim:([a-z0-9:-]+)/gi;

export interface CircularClaimIssue {
  claimId: string;
  kind: "missing_sources" | "claim_only_evidence" | "circular_chain";
  detail: string;
  referencedClaimIds?: string[];
}

export function extractReferencedClaimIds(evidenceNote?: string): string[] {
  if (!evidenceNote) return [];
  const ids: string[] = [];
  for (const match of evidenceNote.matchAll(CLAIM_REFERENCE_PATTERN)) {
    ids.push(`claim:${match[1]}`);
  }
  return ids;
}

/** A reviewed claim must resolve to registry sources — not another claim alone. */
export function validateClaimEvidenceChain(claim: Claim): CircularClaimIssue[] {
  const issues: CircularClaimIssue[] = [];

  if (!claim.reviewed || claim.needsReview) return issues;

  if (!claim.sourceIds.length) {
    issues.push({
      claimId: claim.id,
      kind: "missing_sources",
      detail: "Reviewed claim has no sourceIds",
    });
    return issues;
  }

  const referenced = extractReferencedClaimIds(claim.evidenceNote);
  const claimOnlyNote =
    referenced.length > 0 &&
    /^(?:confirmed by|duplicate of|supported by)\s+claim:/i.test(
      claim.evidenceNote?.trim() ?? "",
    );

  if (claimOnlyNote && claim.sourceIds.length === 0) {
    issues.push({
      claimId: claim.id,
      kind: "claim_only_evidence",
      detail: "evidenceNote references another claim as sole proof",
      referencedClaimIds: referenced,
    });
  }

  return issues;
}

export function detectCircularClaimChains(
  claims: Claim[],
  maxDepth = 6,
): CircularClaimIssue[] {
  const byId = new Map(claims.map((c) => [c.id, c]));
  const issues: CircularClaimIssue[] = [];

  for (const claim of claims) {
    const visited = new Set<string>();
    const stack = [claim.id];
    let depth = 0;

    while (stack.length && depth < maxDepth) {
      const currentId = stack.pop()!;
      if (visited.has(currentId)) {
        issues.push({
          claimId: claim.id,
          kind: "circular_chain",
          detail: `Circular claim reference chain detected at ${currentId}`,
        });
        break;
      }
      visited.add(currentId);
      const current = byId.get(currentId);
      if (!current) break;

      const refs = extractReferencedClaimIds(current.evidenceNote);
      for (const ref of refs) {
        if (ref === claim.id) {
          issues.push({
            claimId: claim.id,
            kind: "circular_chain",
            detail: `Claim references itself via ${currentId}`,
            referencedClaimIds: refs,
          });
          break;
        }
        stack.push(ref);
      }
      depth++;
    }
  }

  return issues;
}
