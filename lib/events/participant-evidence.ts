import { claims } from "@/data/knowledge/claims";
import { evaluateClaimTrust } from "@/lib/knowledge/claim-trust";
import { isTrustedClaim, trustedParticipationClaims } from "@/lib/knowledge/claim-evidence";
import type { EventCharacterLink } from "@/types";

/** Whether a PARTICIPANT link is backed by trusted PARTICIPATED_IN claim evidence. */
export function isTrustedParticipantLink(
  link: EventCharacterLink,
  eventId: string,
): boolean {
  if (link.role !== "PARTICIPANT") return true;

  const trusted = trustedParticipationClaims(link.characterId, eventId);
  if (!trusted.length) return false;

  return trusted.some((claim) => {
    if (!isTrustedClaim(claim)) return false;
    const trust = evaluateClaimTrust(claim.id);
    return trust.reviewStatus === "VERIFIED_CANON";
  });
}

export function findParticipationClaimsForEvent(
  characterId: string,
  eventId: string,
): ReturnType<typeof trustedParticipationClaims> {
  return claims.filter(
    (c) =>
      c.subjectId === characterId &&
      c.objectId === eventId &&
      c.predicate === "PARTICIPATED_IN",
  );
}
