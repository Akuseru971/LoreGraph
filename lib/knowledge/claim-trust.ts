import { claimById } from "@/data/knowledge/claims";
import { sourceById } from "@/data/sources";
import type { Claim, CanonStatus, Continuity, ReviewStatus } from "@/types";

/** How directly a claim's sources establish the proposition. */
export type ClaimSourceAuthority =
  | "PRIMARY_EXPLICIT"
  | "PRIMARY_COMBINED"
  | "OFFICIAL_REFERENCE"
  | "DERIVED"
  | "EDITORIAL";

export interface ClaimTrustResult {
  trusted: boolean;
  authority: ClaimSourceAuthority;
  reviewStatus: ReviewStatus;
}

export interface PropositionTrustResult {
  reviewStatus: ReviewStatus;
  authority: ClaimSourceAuthority;
  canBeFact: boolean;
  issues: string[];
}

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

function combineAuthorities(authorities: ClaimSourceAuthority[]): ClaimSourceAuthority {
  if (!authorities.length) return "DERIVED";
  const rank: ClaimSourceAuthority[] = [
    "PRIMARY_EXPLICIT",
    "PRIMARY_COMBINED",
    "OFFICIAL_REFERENCE",
    "DERIVED",
    "EDITORIAL",
  ];
  return authorities.reduce((worst, a) => {
    return rank.indexOf(a) > rank.indexOf(worst) ? a : worst;
  }, authorities[0]);
}

export function isClaimTrusted(claim: Claim): boolean {
  if (!claim.reviewed || claim.needsReview) return false;
  if (
    claim.canonStatus === "UNKNOWN" ||
    claim.canonStatus === "THEMATIC_ONLY" ||
    claim.canonStatus === "LEGACY_LORE"
  ) {
    return false;
  }
  if (!claim.sourceIds.length) return false;
  return claim.sourceIds.every((sid) => sourceById.has(sid));
}

export function claimSourceAuthority(claim: Claim): ClaimSourceAuthority {
  if (!claim.sourceIds.length) return "DERIVED";
  const tiers = claim.sourceIds.map(sourceAuthorityTier);
  const combined = combineAuthorities(tiers);
  if (combined === "PRIMARY_EXPLICIT" && claim.sourceIds.length > 1) {
    const hasWiki = claim.sourceIds.some((s) => WIKI_SOURCE_PATTERN.test(s));
    if (hasWiki) return "PRIMARY_COMBINED";
  }
  return combined;
}

export function evaluateClaimTrust(claimId: string): ClaimTrustResult {
  const claim = claimById.get(claimId);
  if (!claim) {
    return { trusted: false, authority: "DERIVED", reviewStatus: "PENDING" };
  }
  const authority = claimSourceAuthority(claim);
  if (!isClaimTrusted(claim)) {
    return { trusted: false, authority, reviewStatus: "PENDING" };
  }
  if (authority === "OFFICIAL_REFERENCE" || authority === "DERIVED") {
    return { trusted: true, authority, reviewStatus: "REVIEWED" };
  }
  return { trusted: true, authority, reviewStatus: "VERIFIED_CANON" };
}

export function evaluateClaimsTrust(claimIds: string[]): PropositionTrustResult {
  const issues: string[] = [];
  if (!claimIds.length) {
    return {
      reviewStatus: "PENDING",
      authority: "DERIVED",
      canBeFact: false,
      issues: ["no claims attached"],
    };
  }

  const results = claimIds.map((id) => evaluateClaimTrust(id));
  const authorities = results.map((r) => r.authority);
  const authority = combineAuthorities(authorities);

  if (results.some((r) => !r.trusted)) {
    issues.push("one or more claims are not trusted");
    return {
      reviewStatus: "PENDING",
      authority,
      canBeFact: false,
      issues,
    };
  }

  if (results.every((r) => r.reviewStatus === "VERIFIED_CANON")) {
    return { reviewStatus: "VERIFIED_CANON", authority, canBeFact: true, issues };
  }

  return { reviewStatus: "REVIEWED", authority, canBeFact: true, issues };
}

export function canPromoteToVerifiedCanon(input: {
  text: string;
  claimIds: string[];
  sourceIds?: string[];
  continuity?: Continuity;
  propositionSupported: boolean;
}): boolean {
  if (!input.propositionSupported) return false;
  if (!input.claimIds.length) return false;

  const claimTrust = evaluateClaimsTrust(input.claimIds);
  if (!claimTrust.canBeFact || claimTrust.reviewStatus !== "VERIFIED_CANON") {
    return false;
  }

  const claims = input.claimIds
    .map((id) => claimById.get(id))
    .filter((c): c is Claim => Boolean(c));

  if (claims.some((c) => c.continuity && input.continuity && c.continuity !== input.continuity)) {
    return false;
  }

  const claimSources = new Set(claims.flatMap((c) => c.sourceIds));
  if (input.sourceIds?.length) {
    const beatSourcesValid = input.sourceIds.every((sid) => sourceById.has(sid));
    if (!beatSourcesValid) return false;
    const beatSupportsClaims = input.sourceIds.some((sid) => claimSources.has(sid));
    if (!beatSupportsClaims) return false;
  }

  return true;
}

export function resolveReviewStatusFromClaims(
  claimIds: string[],
  opts: {
    text: string;
    propositionSupported: boolean;
    continuity?: Continuity;
    sourceIds?: string[];
    explicit?: ReviewStatus;
  },
): ReviewStatus {
  if (opts.explicit === "APPROVED_EDITORIAL") return "APPROVED_EDITORIAL";
  if (!opts.propositionSupported || !claimIds.length) return "PENDING";

  if (
    canPromoteToVerifiedCanon({
      text: opts.text,
      claimIds,
      sourceIds: opts.sourceIds,
      continuity: opts.continuity,
      propositionSupported: opts.propositionSupported,
    })
  ) {
    return "VERIFIED_CANON";
  }

  const trust = evaluateClaimsTrust(claimIds);
  if (trust.canBeFact) return trust.reviewStatus;
  return "PENDING";
}

export function isWikiOnlyClaim(claim: Claim): boolean {
  return (
    claim.sourceIds.length > 0 &&
    claim.sourceIds.every((s) => WIKI_SOURCE_PATTERN.test(s))
  );
}

export function factBlockEvidenceAuthority(
  claimIds: string[],
): ClaimSourceAuthority {
  const claims = claimIds
    .map((id) => claimById.get(id))
    .filter((c): c is Claim => Boolean(c));
  if (!claims.length) return "DERIVED";
  return combineAuthorities(claims.map(claimSourceAuthority));
}
