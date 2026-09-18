import { events } from "@/data/events";
import { relationships } from "@/data/relationships";
import type { Character, TimelineBeat } from "@/types";
import { claims } from "@/data/knowledge/claims";
import { canonConfidenceFromClaims } from "./claim-metrics";
import {
  hasGameplayPollution,
  hasMeaningfulTimeline,
  hasQualityBio,
} from "./completeness-helpers";
import { isTrustedTimelineBeat, provisionalTimelineBeats } from "@/lib/timeline/trust";

export const TIER_A_THRESHOLDS = {
  contentCompleteness: 85,
  sourceCoverage: 80,
  canonConfidence: 85,
  reviewCoverage: 90,
  trustedTimelineCoverage: 70,
  directRelationshipReviewCoverage: 80,
} as const;

const PLACEHOLDER_TIMELINE_TITLE = /^current era$/i;
const TRUNCATED_END = /\.{3}|…\s*$/;

export function isPlaceholderTimelineBeat(beat: TimelineBeat): boolean {
  return PLACEHOLDER_TIMELINE_TITLE.test(beat.title.trim());
}

export function isCoreTimelineBeat(beat: TimelineBeat): boolean {
  if (isPlaceholderTimelineBeat(beat)) return true;
  if (beat.eventId) return true;
  if (beat.claimIds?.length) return true;
  if (beat.sourceIds?.length) return true;
  return beat.evidenceClass !== "TRANSITION" && beat.evidenceClass !== "EDITORIAL_FRAMING";
}

export function trustedTimelineCoveragePercent(character: Character): number {
  if (character.timeline.length === 0) return 0;
  const trusted = character.timeline.filter(isTrustedTimelineBeat).length;
  return Math.round((trusted / character.timeline.length) * 100);
}

export function hasProvisionalCoreTimelineBeat(character: Character): boolean {
  return character.timeline.some(
    (beat) => isCoreTimelineBeat(beat) && !isTrustedTimelineBeat(beat),
  );
}

export function directRelationshipReviewCoverage(character: Character): {
  applicable: boolean;
  coverage: number;
  unresolved: number;
} {
  const charRels = relationships.filter(
    (r) => r.sourceCharacterId === character.id || r.targetCharacterId === character.id,
  );
  const directRels = charRels.filter((r) => r.connectionType === "DIRECT_CANON");

  if (directRels.length === 0) {
    return { applicable: false, coverage: 100, unresolved: 0 };
  }

  const reviewed = directRels.filter(
    (r) =>
      r.reviewed &&
      r.reviewStatus !== "PENDING" &&
      !r.needsReview &&
      r.verified,
  );

  return {
    applicable: true,
    coverage: Math.round((reviewed.length / directRels.length) * 100),
    unresolved: directRels.length - reviewed.length,
  };
}

export function unsupportedParticipantEventLinks(character: Character): string[] {
  const issues: string[] = [];

  for (const event of events) {
    for (const link of event.characterLinks ?? []) {
      if (link.characterId !== character.id) continue;
      if (link.role !== "PARTICIPANT") continue;
      if (!link.sourceIds?.length && !link.claimIds?.length) {
        issues.push(`${event.slug}: PARTICIPANT without source/claim evidence`);
      }
    }
  }

  return issues;
}

export interface TierAGateResult {
  eligible: boolean;
  blockers: string[];
}

export function evaluateTierAGate(
  character: Character,
  dimensions: {
    contentCompleteness: number;
    sourceCoverage: number;
    reviewCoverage: number;
    criticalMissing: string[];
  },
): TierAGateResult {
  const blockers: string[] = [];
  const charClaims = claims.filter((c) => c.subjectId === character.id);
  const canonConfidence = canonConfidenceFromClaims(charClaims);
  const trustedTimeline = trustedTimelineCoveragePercent(character);
  const directRel = directRelationshipReviewCoverage(character);
  const participantIssues = unsupportedParticipantEventLinks(character);

  if (dimensions.contentCompleteness < TIER_A_THRESHOLDS.contentCompleteness) {
    blockers.push(
      `contentCompleteness ${dimensions.contentCompleteness} < ${TIER_A_THRESHOLDS.contentCompleteness}`,
    );
  }
  if (dimensions.sourceCoverage < TIER_A_THRESHOLDS.sourceCoverage) {
    blockers.push(
      `sourceCoverage ${dimensions.sourceCoverage} < ${TIER_A_THRESHOLDS.sourceCoverage}`,
    );
  }
  if (canonConfidence < TIER_A_THRESHOLDS.canonConfidence) {
    blockers.push(
      `canonConfidence ${canonConfidence} < ${TIER_A_THRESHOLDS.canonConfidence}`,
    );
  }
  if (dimensions.reviewCoverage < TIER_A_THRESHOLDS.reviewCoverage) {
    blockers.push(
      `reviewCoverage ${dimensions.reviewCoverage} < ${TIER_A_THRESHOLDS.reviewCoverage}`,
    );
  }
  if (trustedTimeline < TIER_A_THRESHOLDS.trustedTimelineCoverage) {
    blockers.push(
      `trustedTimelineCoverage ${trustedTimeline} < ${TIER_A_THRESHOLDS.trustedTimelineCoverage}`,
    );
  }
  if (!character.continuity) {
    blockers.push("continuity not classified");
  }
  if (!hasQualityBio(character)) {
    blockers.push("biography fails quality gate");
  }
  if (!hasMeaningfulTimeline(character)) {
    blockers.push("timeline is not meaningful");
  }
  if (character.timeline.some(isPlaceholderTimelineBeat)) {
    blockers.push("placeholder Current era timeline beat");
  }
  if (TRUNCATED_END.test(character.shortDescription)) {
    blockers.push("truncated biography");
  }
  if (character.species === "Unknown") {
    blockers.push("species Unknown");
  }
  if (!character.verified) {
    blockers.push("champion not verified");
  }
  if (hasProvisionalCoreTimelineBeat(character)) {
    const provisional = provisionalTimelineBeats(character.timeline).filter(isCoreTimelineBeat);
    blockers.push(
      `provisional core timeline beat(s): ${provisional.map((b) => b.title).join(", ")}`,
    );
  }
  if (directRel.applicable && directRel.coverage < TIER_A_THRESHOLDS.directRelationshipReviewCoverage) {
    blockers.push(
      `directRelationshipReviewCoverage ${directRel.coverage} < ${TIER_A_THRESHOLDS.directRelationshipReviewCoverage}`,
    );
  }
  if (participantIssues.length) {
    blockers.push(...participantIssues.map((i) => `unsupported event: ${i}`));
  }

  for (const missing of dimensions.criticalMissing) {
    if (
      [
        "unresolved_core_relationship",
        "conservative_bio",
        "truncated_bio",
        "biography",
        "timeline",
        "continuity",
      ].includes(missing)
    ) {
      blockers.push(missing);
    }
  }

  if (character.roles.length > 0 && hasGameplayPollution(character)) {
    blockers.push("gameplay role pollution in narrative roles");
  }

  return { eligible: blockers.length === 0, blockers };
}
