import type { Claim } from "@/types";

export function isActiveClaim(claim: Claim): boolean {
  return claim.claimStatus !== "SUPERSEDED" && claim.claimStatus !== "REJECTED";
}

export function isSupersededClaim(claim: Claim): boolean {
  return claim.claimStatus === "SUPERSEDED";
}

export function activeClaims(claims: Claim[]): Claim[] {
  return claims.filter(isActiveClaim);
}

export function claimsForSubject(claims: Claim[], subjectId: string): Claim[] {
  return activeClaims(claims.filter((c) => c.subjectId === subjectId));
}
