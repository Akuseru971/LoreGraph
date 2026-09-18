import { claims } from "@/data/knowledge/claims";
import { sourceById } from "@/data/sources";
import type { Claim, SourceEvidence } from "@/types";
import { validateClaimEvidenceChain } from "./claim-circular";
import { resolveClaimEvidenceRefs } from "./evidence-registry";
import {
  claimSupportsPropositionStrict,
  CLAIM_PROPOSITION_PATTERNS,
} from "./claim-propositions";
import type { ClaimSourceAuthority } from "./claim-trust";

const WIKI_SOURCE_PATTERN = /^source:wiki-/;

function sourceAuthorityTier(sourceId: string): ClaimSourceAuthority {
  const source = sourceById.get(sourceId);
  if (!source) return "DERIVED";
  if (WIKI_SOURCE_PATTERN.test(sourceId)) return "OFFICIAL_REFERENCE";
  if (source.authorityTier === "PRIMARY_OFFICIAL") return "PRIMARY_EXPLICIT";
  if (source.authorityTier === "OFFICIAL_PUBLISHED") return "PRIMARY_COMBINED";
  if (source.authorityTier === "OFFICIAL_COMMUNITY_REFERENCE") {
    return "OFFICIAL_REFERENCE";
  }
  return "DERIVED";
}

function claimSourceAuthority(claim: Claim): ClaimSourceAuthority {
  const evidence = resolveClaimEvidenceRefs(claim);
  const sourceIds =
    evidence.length > 0
      ? evidence.map((e) => e.sourceId)
      : claim.sourceIds;

  if (!sourceIds.length) return "DERIVED";
  const tiers = sourceIds.map(sourceAuthorityTier);
  const rank: ClaimSourceAuthority[] = [
    "PRIMARY_EXPLICIT",
    "PRIMARY_COMBINED",
    "OFFICIAL_REFERENCE",
    "DERIVED",
    "EDITORIAL",
  ];
  const combined = tiers.reduce((worst, a) => {
    return rank.indexOf(a) > rank.indexOf(worst) ? a : worst;
  }, tiers[0]);
  if (combined === "PRIMARY_EXPLICIT" && sourceIds.length > 1) {
    const hasWiki = sourceIds.some((s) => WIKI_SOURCE_PATTERN.test(s));
    if (hasWiki) return "PRIMARY_COMBINED";
  }
  return combined;
}

/** Predicates that require proposition-specific primary source support. */
export const STRONG_PREDICATES = new Set([
  "PARTICIPATED_IN",
  "FOUGHT",
  "KILLED",
  "DESTROYED",
  "CREATED",
  "CAUSED",
  "BETRAYED",
  "BETRAYED_BY",
  "HOSTED",
  "POSSESSES",
  "IMPRISONED_IN",
  "IMPRISONED_WITH",
  "WIELDS",
  "DAUGHTER_OF",
  "SON_OF",
  "SIBLING_OF",
  "PARENT_OF",
  "CONFRONTED",
  "ALTERED_BY",
  "FUSED_WITH",
  "HUNTS",
  "PROPHESIED_FOR",
  "BOUND_BY",
  "BECAME",
  "OPPOSED",
  "SERVED",
  "RULED",
  "CLIMBED",
  "ELEVATED",
  "INSTITUTED",
  "INTERACTED_WITH",
  "KNEW",
  "LOST_HOST",
  "GUARDS",
  "BONDED_WITH",
  "SURVIVED",
  "FOUNDED",
]);

export type SourceSupportResult =
  | { status: "SOURCE_EXISTS"; supported: false; reason: string }
  | { status: "SOURCE_SUPPORTS_CLAIM"; supported: true }
  | { status: "SOURCE_SUPPORTS_CLAIM"; supported: false; reason: string };

export function buildClaimPropositionText(claim: Claim): string {
  const parts: string[] = [];
  if (claim.value) parts.push(claim.value);

  const objectSlug = claim.objectId?.replace(/^(char|event|concept|artifact):/, "") ?? "";
  if (claim.predicate === "PARTICIPATED_IN" && objectSlug) {
    parts.push(`participated in ${objectSlug.replace(/-/g, " ")}`);
  }
  if (claim.predicate === "BECAME" && objectSlug) {
    parts.push(`became ${objectSlug.replace(/-/g, " ")}`);
  }
  if (claim.predicate === "WAS" && objectSlug === "ascended") {
    parts.push("was ascended", "ascended god-warrior");
  }

  return parts.join(" ");
}

/** Text candidates from source evidence — NOT from editorial evidenceNote. */
export function evidencePropositionCandidates(evidence: SourceEvidence): string[] {
  const candidates = new Set<string>();
  candidates.add(evidence.normalizedFact);
  if (evidence.shortExcerpt) candidates.add(evidence.shortExcerpt);
  return [...candidates].filter(Boolean);
}

export function evidenceSupportsClaimProposition(
  claim: Claim,
  evidence: SourceEvidence,
): boolean {
  const patterns = CLAIM_PROPOSITION_PATTERNS[claim.id];
  if (!patterns?.length) {
    // Weak predicates: evidence normalized fact must mention subject context
    if (!STRONG_PREDICATES.has(claim.predicate)) {
      return evidencePropositionCandidates(evidence).some((text) => text.length > 10);
    }
    return false;
  }

  return evidencePropositionCandidates(evidence).some((text) =>
    patterns.some((pattern) => pattern.test(text)),
  );
}

function evidenceAuthoritySufficient(
  claim: Claim,
  evidence: SourceEvidence,
): boolean {
  if (!STRONG_PREDICATES.has(claim.predicate)) return true;
  const tier = sourceAuthorityTier(evidence.sourceId);
  if (evidence.evidenceType === "CONTEXT_ONLY") return false;
  if (evidence.evidenceType === "OFFICIAL_REFERENCE") return false;
  return tier === "PRIMARY_EXPLICIT" || tier === "PRIMARY_COMBINED";
}

/** Distinguish registry presence from semantic support via source evidence records. */
export function evaluateSourceSupport(claim: Claim): SourceSupportResult {
  const evidenceRecords = resolveClaimEvidenceRefs(claim);

  if (!evidenceRecords.length) {
    return {
      status: "SOURCE_EXISTS",
      supported: false,
      reason: "claim lacks evidenceRefs with source evidence records",
    };
  }

  for (const evidence of evidenceRecords) {
    if (!sourceExists(evidence.sourceId)) {
      return {
        status: "SOURCE_EXISTS",
        supported: false,
        reason: `unknown source ${evidence.sourceId} on evidence ${evidence.id}`,
      };
    }
    if (!claim.sourceIds.includes(evidence.sourceId)) {
      return {
        status: "SOURCE_EXISTS",
        supported: false,
        reason: `evidence ${evidence.id} source ${evidence.sourceId} not in claim sourceIds`,
      };
    }
    if (
      claim.continuity &&
      evidence.continuity &&
      evidence.continuity !== claim.continuity
    ) {
      return {
        status: "SOURCE_SUPPORTS_CLAIM",
        supported: false,
        reason: `evidence continuity ${evidence.continuity} mismatches claim ${claim.continuity}`,
      };
    }
  }

  const supporting = evidenceRecords.filter(
    (e) =>
      evidenceSupportsClaimProposition(claim, e) &&
      evidenceAuthoritySufficient(claim, e),
  );

  if (!supporting.length) {
    const patterns = CLAIM_PROPOSITION_PATTERNS[claim.id];
    if (!patterns?.length && !STRONG_PREDICATES.has(claim.predicate)) {
      const weakSupport = evidenceRecords.filter(
        (e) =>
          e.evidenceType === "CONTEXT_ONLY" || e.evidenceType === "OFFICIAL_REFERENCE",
      );
      if (weakSupport.length) {
        return { status: "SOURCE_SUPPORTS_CLAIM", supported: true };
      }
    }
    return {
      status: "SOURCE_SUPPORTS_CLAIM",
      supported: false,
      reason: "no source evidence record semantically supports this proposition",
    };
  }

  return { status: "SOURCE_SUPPORTS_CLAIM", supported: true };
}

export function sourceExists(sourceId: string): boolean {
  return sourceById.has(sourceId);
}

export function sourceSupportsClaim(claim: Claim): boolean {
  return evaluateSourceSupport(claim).supported;
}

/**
 * Trusted claim — derived from validated evidence, not self-declared booleans.
 * Requires evidenceRefs pointing to source facts, not evidenceNote alone.
 */
export function isClaimEvidenceTrusted(claim: Claim): boolean {
  if (!claim.reviewed || claim.needsReview) return false;
  if (
    claim.canonStatus === "UNKNOWN" ||
    claim.canonStatus === "THEMATIC_ONLY" ||
    claim.canonStatus === "LEGACY_LORE"
  ) {
    return false;
  }

  if (validateClaimEvidenceChain(claim).length > 0) return false;
  if (!sourceSupportsClaim(claim)) return false;

  return true;
}

export function isTrustedClaim(claim: Claim): boolean {
  return isClaimEvidenceTrusted(claim);
}

export function trustedParticipationClaims(
  characterId: string,
  eventId: string,
): Claim[] {
  return claims.filter(
    (c) =>
      c.subjectId === characterId &&
      c.objectId === eventId &&
      c.predicate === "PARTICIPATED_IN" &&
      isTrustedClaim(c) &&
      c.canonStatus === "CURRENT_CANON",
  );
}

/** @deprecated Use evidencePropositionCandidates — claim text is not proof. */
export function claimPropositionCandidates(claim: Claim): string[] {
  const evidence = resolveClaimEvidenceRefs(claim);
  if (evidence.length) {
    return evidence.flatMap(evidencePropositionCandidates);
  }
  const candidates = new Set<string>();
  if (claim.value) candidates.add(claim.value);
  candidates.add(buildClaimPropositionText(claim));
  return [...candidates].filter(Boolean);
}
