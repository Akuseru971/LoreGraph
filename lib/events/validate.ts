import { events } from "@/data/events";
import { DAILY_INELIGIBLE_EVENT_ROLES } from "./roles";
import { isEraNode } from "./links";

export interface EventValidationResult {
  errors: string[];
  warnings: string[];
  linkCount: number;
  roleCounts: Record<string, number>;
  eraParticipantViolations: number;
  downgradedFromParticipant: number;
}

export function validateEvents(): EventValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const roleCounts: Record<string, number> = {};
  let linkCount = 0;
  let eraParticipantViolations = 0;
  let downgradedFromParticipant = 0;

  for (const event of events) {
    const links = event.characterLinks ?? [];
    const era = isEraNode(event);

    if (!links.length && event.characterIds.length) {
      errors.push(`Event ${event.slug} has characterIds but no characterLinks`);
    }

    for (const link of links) {
      linkCount++;
      roleCounts[link.role] = (roleCounts[link.role] ?? 0) + 1;

      if (!link.role) {
        errors.push(`Event link missing role: ${event.slug}/${link.characterId}`);
      }

      if (era && link.role === "PARTICIPANT") {
        eraParticipantViolations++;
        errors.push(`ERA ${event.slug} has PARTICIPANT edge for ${link.characterId}`);
      }

      if (link.role === "PARTICIPANT" && !link.sourceIds?.length && !link.claimIds?.length) {
        warnings.push(`PARTICIPANT without evidence: ${event.slug}/${link.characterId}`);
      }

      if (link.role === "ASSOCIATED_WITH") {
        downgradedFromParticipant++;
      }
    }

    if (!event.verified) {
      const strongLinks = links.filter(
        (l) => l.role === "PARTICIPANT" && !l.needsReview,
      );
      if (strongLinks.length && event.connectEligible) {
        warnings.push(`Unverified event ${event.slug} has strong participant links`);
      }
    }
  }

  return {
    errors,
    warnings,
    linkCount,
    roleCounts,
    eraParticipantViolations,
    downgradedFromParticipant,
  };
}

export function isDailyEligibleEventRole(role: string): boolean {
  return !DAILY_INELIGIBLE_EVENT_ROLES.has(role as never);
}
