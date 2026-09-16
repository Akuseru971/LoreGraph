import { claims } from "@/data/knowledge/claims";
import type {
  EventCharacterLink,
  EventRelationRole,
  LoreEvent,
  ReviewStatus,
} from "@/types";
import { inferEventRole } from "./roles";

export function isEraNode(event: Pick<LoreEvent, "slug" | "title" | "isEra">): boolean {
  if (event.isEra) return true;
  return (
    event.slug.startsWith("era-") ||
    /^era of /i.test(event.title) ||
    event.slug.includes("-era")
  );
}

function findParticipationClaim(
  characterId: string,
  eventId: string,
): { claimIds: string[]; sourceIds: string[]; reviewStatus: ReviewStatus } | null {
  const matching = claims.filter(
    (c) =>
      c.subjectId === characterId &&
      c.objectId === eventId &&
      (c.claimType === "PARTICIPATION" || c.predicate.includes("PARTICIPATED")),
  );

  if (!matching.length) return null;

  const reviewed = matching.filter((c) => c.reviewed && !c.needsReview);
  const claimIds = reviewed.map((c) => c.id);
  const sourceIds = [...new Set(reviewed.flatMap((c) => c.sourceIds))];

  return {
    claimIds,
    sourceIds,
    reviewStatus: reviewed.length ? "VERIFIED_CANON" : "PENDING",
  };
}

export function buildEventCharacterLinks(
  event: Pick<LoreEvent, "id" | "slug" | "title" | "isEra" | "canonStatus" | "verified">,
  characterIds: string[],
): EventCharacterLink[] {
  const era = isEraNode(event);

  return characterIds.map((characterId) => {
    const slug = characterId.replace(/^char:/, "");
    let role = inferEventRole(event.slug, slug, era);

    const claimEvidence = findParticipationClaim(characterId, event.id);

    if (claimEvidence) {
      const predicateRole = roleFromClaim(claimEvidence, era);
      if (predicateRole) role = predicateRole;
    }

    if (era && role === "PARTICIPANT") {
      role = "ACTIVE_DURING";
    }

    const link: EventCharacterLink = {
      characterId,
      role,
      canonStatus: event.canonStatus,
      needsReview: !event.verified || role === "ASSOCIATED_WITH",
    };

    if (claimEvidence) {
      if (claimEvidence.claimIds.length) link.claimIds = claimEvidence.claimIds;
      if (claimEvidence.sourceIds.length) link.sourceIds = claimEvidence.sourceIds;
      link.reviewStatus = claimEvidence.reviewStatus;
      link.needsReview = claimEvidence.reviewStatus === "PENDING";
    } else if (!event.verified) {
      link.reviewStatus = "PENDING";
    }

    return link;
  });
}

function roleFromClaim(
  evidence: { reviewStatus: ReviewStatus },
  isEra: boolean,
): EventRelationRole | null {
  if (evidence.reviewStatus === "PENDING") return null;
  if (isEra) return "ACTIVE_DURING";
  return "PARTICIPANT";
}

export function characterIdsFromLinks(links: EventCharacterLink[]): string[] {
  return [...new Set(links.map((l) => l.characterId))];
}
