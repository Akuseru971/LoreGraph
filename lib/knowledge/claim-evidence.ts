import { claims } from "@/data/knowledge/claims";
import { sourceById } from "@/data/sources";
import type { Claim } from "@/types";
import { validateClaimEvidenceChain } from "./claim-circular";
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
  if (!claim.sourceIds.length) return "DERIVED";
  const tiers = claim.sourceIds.map(sourceAuthorityTier);
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
  if (combined === "PRIMARY_EXPLICIT" && claim.sourceIds.length > 1) {
    const hasWiki = claim.sourceIds.some((s) => WIKI_SOURCE_PATTERN.test(s));
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
]);

export type SourceSupportResult =
  | { status: "SOURCE_EXISTS"; supported: false; reason: string }
  | { status: "SOURCE_SUPPORTS_CLAIM"; supported: true }
  | { status: "SOURCE_SUPPORTS_CLAIM"; supported: false; reason: string };

export function buildClaimPropositionText(claim: Claim): string {
  const parts: string[] = [];
  if (claim.evidenceNote) parts.push(claim.evidenceNote);
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

export function claimPropositionCandidates(claim: Claim): string[] {
  const candidates = new Set<string>();
  if (claim.evidenceNote) candidates.add(claim.evidenceNote);
  if (claim.value) candidates.add(claim.value);
  candidates.add(buildClaimPropositionText(claim));
  return [...candidates].filter(Boolean);
}

export function sourceExists(sourceId: string): boolean {
  return sourceById.has(sourceId);
}

/** Distinguish registry presence from semantic support for the claim proposition. */
export function evaluateSourceSupport(claim: Claim): SourceSupportResult {
  if (!claim.sourceIds.length) {
    return {
      status: "SOURCE_EXISTS",
      supported: false,
      reason: "claim has no sourceIds",
    };
  }

  for (const sid of claim.sourceIds) {
    if (!sourceExists(sid)) {
      return {
        status: "SOURCE_EXISTS",
        supported: false,
        reason: `unknown source ${sid}`,
      };
    }
  }

  const patterns = CLAIM_PROPOSITION_PATTERNS[claim.id];

  if (!patterns?.length) {
    if (!STRONG_PREDICATES.has(claim.predicate)) {
      const authority = claimSourceAuthority(claim);
      if (authority === "PRIMARY_EXPLICIT" || authority === "PRIMARY_COMBINED") {
        return { status: "SOURCE_SUPPORTS_CLAIM", supported: true };
      }
      return {
        status: "SOURCE_SUPPORTS_CLAIM",
        supported: false,
        reason: "no proposition patterns and insufficient source authority",
      };
    }
    return {
      status: "SOURCE_SUPPORTS_CLAIM",
      supported: false,
      reason: "strong predicate without registered proposition patterns",
    };
  }

  const supported = claimPropositionCandidates(claim).some((text) =>
    patterns.some((pattern) => pattern.test(text)),
  );
  if (!supported) {
    return {
      status: "SOURCE_SUPPORTS_CLAIM",
      supported: false,
      reason: "registered sources do not semantically support this proposition",
    };
  }

  const authority = claimSourceAuthority(claim);
  if (
    STRONG_PREDICATES.has(claim.predicate) &&
    authority !== "PRIMARY_EXPLICIT" &&
    authority !== "PRIMARY_COMBINED"
  ) {
    return {
      status: "SOURCE_SUPPORTS_CLAIM",
      supported: false,
      reason: "strong predicate requires primary official source support",
    };
  }

  return { status: "SOURCE_SUPPORTS_CLAIM", supported: true };
}

export function sourceSupportsClaim(claim: Claim): boolean {
  return evaluateSourceSupport(claim).supported;
}

/**
 * Trusted claim — derived from validated evidence, not self-declared booleans.
 * A source existing in the registry is insufficient; it must support the proposition.
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
