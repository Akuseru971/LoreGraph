import type { Claim } from "@/types";
import { isTrustedClaim } from "./claim-evidence";
import {
  claimSourceAuthority,
  evaluateClaimTrust,
  type ClaimSourceAuthority,
} from "./claim-trust";

export interface ClaimMetricBreakdown {
  total: number;
  reviewedClaims: number;
  trustedClaims: number;
  verifiedCanonClaims: number;
  primaryExplicitClaims: number;
  primaryCombinedClaims: number;
  officialReferenceClaims: number;
  pendingClaims: number;
  editorialClaims: number;
  derivedClaims: number;
}

export function trustedClaimsFromList(charClaims: Claim[]): number {
  return charClaims.filter(isTrustedClaim).length;
}

function isEditorialClaim(claim: Claim): boolean {
  return (
    claim.certainty === "INTERPRETIVE" ||
    claim.canonStatus === "THEMATIC_ONLY" ||
    claim.canonStatus === "LEGACY_LORE"
  );
}

export function breakdownClaims(charClaims: Claim[]): ClaimMetricBreakdown {
  const breakdown: ClaimMetricBreakdown = {
    total: charClaims.length,
    reviewedClaims: 0,
    trustedClaims: 0,
    verifiedCanonClaims: 0,
    primaryExplicitClaims: 0,
    primaryCombinedClaims: 0,
    officialReferenceClaims: 0,
    pendingClaims: 0,
    editorialClaims: 0,
    derivedClaims: 0,
  };

  for (const claim of charClaims) {
    if (claim.needsReview || !claim.reviewed) {
      breakdown.pendingClaims++;
      continue;
    }

    breakdown.reviewedClaims++;

    if (isTrustedClaim(claim)) {
      breakdown.trustedClaims++;
    }

    if (isEditorialClaim(claim)) {
      breakdown.editorialClaims++;
      continue;
    }

    const trust = evaluateClaimTrust(claim.id);
    if (trust.reviewStatus === "VERIFIED_CANON") {
      breakdown.verifiedCanonClaims++;
    }

    const authority = claimSourceAuthority(claim);
    switch (authority) {
      case "PRIMARY_EXPLICIT":
        breakdown.primaryExplicitClaims++;
        break;
      case "PRIMARY_COMBINED":
        breakdown.primaryCombinedClaims++;
        break;
      case "OFFICIAL_REFERENCE":
        breakdown.officialReferenceClaims++;
        break;
      case "DERIVED":
        breakdown.derivedClaims++;
        break;
      case "EDITORIAL":
        breakdown.editorialClaims++;
        break;
    }
  }

  return breakdown;
}

export function canonConfidenceFromClaims(charClaims: Claim[]): number {
  if (charClaims.length === 0) return 0;
  const { trustedClaims } = breakdownClaims(charClaims);
  return Math.round((trustedClaims / charClaims.length) * 100);
}

export function aggregateClaimAuthority(
  charClaims: Claim[],
): Record<ClaimSourceAuthority, number> {
  const counts: Record<ClaimSourceAuthority, number> = {
    PRIMARY_EXPLICIT: 0,
    PRIMARY_COMBINED: 0,
    OFFICIAL_REFERENCE: 0,
    DERIVED: 0,
    EDITORIAL: 0,
  };

  for (const claim of charClaims.filter((c) => c.reviewed && !c.needsReview)) {
    counts[claimSourceAuthority(claim)]++;
  }

  return counts;
}
