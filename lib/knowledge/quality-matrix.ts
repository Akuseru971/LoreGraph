import { claims } from "@/data/knowledge/claims";
import { relationships } from "@/data/relationships";
import type {
  CanonStatus,
  ChampionQualityDimensions,
  Character,
  CompletenessTier,
  ReviewStatus,
} from "@/types";
import { isTrustedClaim } from "@/lib/knowledge/claim-evidence";
import { isCoreTimelineBeat } from "@/lib/timeline/importance";
import { isTrustedTimelineBeat } from "@/lib/timeline/trust";
import { canonConfidenceFromClaims } from "./claim-metrics";
import {
  directRelationshipReviewCoverage,
  evaluateTierAGate,
  trustedTimelineCoveragePercent,
} from "./tier-a-gate";
import {
  hasGameplayPollution,
  hasMeaningfulTimeline,
  hasQualityBio,
  isPlaceholderTimelineTitle,
} from "./completeness-helpers";

export interface QualityResult {
  tier: CompletenessTier;
  score: number;
  dimensions: ChampionQualityDimensions;
  missingFields: string[];
  needsResearch: boolean;
  tierReasons: string[];
  tierAEligible: boolean;
  tierABlockers: string[];
}

const CONSERVATIVE_DISCLAIMER =
  /LoreGraph keeps this profile conservative until additional official sources are reviewed/i;
const TRUNCATED_END = /\.{3}|…\s*$/;

const PRIORITY_SLUGS = new Set([
  "aatrox",
  "pantheon",
  "varus",
  "nasus",
  "azir",
  "yunara",
  "ambessa",
  "mel",
  "viktor",
  "zaahen",
  "locke",
  "jinx",
  "vi",
  "swain",
  "leblanc",
  "lux",
  "sylas",
  "yasuo",
  "yone",
  "viego",
  "thresh",
]);

function reviewWeight(status: ReviewStatus | undefined, reviewed: boolean): number {
  if (status === "VERIFIED_CANON" || (reviewed && status !== "PENDING")) return 1;
  if (status === "APPROVED_EDITORIAL") return 0.7;
  if (status === "PENDING") return 0;
  return reviewed ? 0.5 : 0;
}

export function computeQualityDimensions(character: Character): ChampionQualityDimensions {
  const criticalMissing: string[] = [];

  let contentScore = 0;
  if (hasQualityBio(character)) contentScore += 30;
  else criticalMissing.push("biography");
  if (hasMeaningfulTimeline(character)) contentScore += 20;
  else criticalMissing.push("timeline");
  if (character.eventIds.length >= 1) contentScore += 10;
  if (character.factions.length > 0) contentScore += 10;
  if (character.sourceIds.length > 0) contentScore += 10;
  if (character.species !== "Unknown") contentScore += 5;
  else criticalMissing.push("species_unknown");
  if (character.roles.length > 0 && !hasGameplayPollution(character)) contentScore += 5;
  if (character.timeline.length >= 4) contentScore += 10;

  const charClaims = claims.filter((c) => c.subjectId === character.id);
  const reviewedClaims = charClaims.filter((c) => c.reviewed && !c.needsReview);
  const trustedSourcedClaims = reviewedClaims.filter(
    (c) => c.sourceIds.length > 0 && isTrustedClaim(c),
  );

  const sourceCoverage =
    charClaims.length === 0
      ? character.sourceIds.length > 0
        ? 40
        : 0
      : reviewedClaims.length === 0
        ? 0
        : Math.round((trustedSourcedClaims.length / reviewedClaims.length) * 100);

  const canonConfidence = canonConfidenceFromClaims(charClaims);

  const reviewCoverage =
    charClaims.length === 0
      ? character.verified
        ? 60
        : 0
      : Math.round((reviewedClaims.length / charClaims.length) * 100);

  const timelineCoverage =
    character.timeline.length === 0
      ? 0
      : Math.round(
          (character.timeline.filter((b) => b.sourceIds?.length).length /
            character.timeline.length) *
            100,
        );

  const trustedTimelineCoverage = trustedTimelineCoveragePercent(character);

  const charRels = relationships.filter(
    (r) => r.sourceCharacterId === character.id || r.targetCharacterId === character.id,
  );
  const reviewedRels = charRels.filter(
    (r) => r.reviewed && r.reviewStatus !== "PENDING" && !r.needsReview,
  );
  const relationshipCoverage =
    charRels.length === 0
      ? 0
      : Math.round((reviewedRels.length / charRels.length) * 100);

  const directRel = directRelationshipReviewCoverage(character);

  const eventCoverage =
    character.eventIds.length === 0
      ? 0
      : Math.min(100, character.eventIds.length * 25);

  const continuityClassified = Boolean(character.continuity);

  if (!continuityClassified) criticalMissing.push("continuity");
  if (CONSERVATIVE_DISCLAIMER.test(character.longDescription.join(" "))) {
    criticalMissing.push("conservative_bio");
  }
  if (TRUNCATED_END.test(character.shortDescription)) criticalMissing.push("truncated_bio");
  if (character.timeline.some((b) => isPlaceholderTimelineTitle(b.title))) {
    criticalMissing.push("placeholder_timeline");
  }
  if (character.releaseYear === 2010 && character.slug !== "singed") {
    criticalMissing.push("releaseYear");
  }

  const coreRels = charRels.filter((r) => r.connectionType === "DIRECT_CANON");
  const unresolvedCore = coreRels.filter(
    (r) => r.needsReview || r.reviewStatus === "PENDING" || !r.verified,
  );
  if (unresolvedCore.length > 0) criticalMissing.push("unresolved_core_relationship");

  const provisionalCore = character.timeline.filter(
    (b) => isCoreTimelineBeat(b) && !isTrustedTimelineBeat(b),
  );
  if (provisionalCore.length > 0) criticalMissing.push("provisional_core_timeline");

  return {
    contentCompleteness: Math.min(100, contentScore),
    sourceCoverage,
    canonConfidence,
    reviewCoverage,
    timelineCoverage,
    trustedTimelineCoverage,
    relationshipCoverage,
    directRelationshipReviewCoverage: directRel.coverage,
    eventCoverage,
    continuityClassified,
    criticalMissing,
  };
}

export function computeQuality(
  character: Character,
  explicitTier?: CompletenessTier,
): QualityResult {
  const dimensions = computeQualityDimensions(character);
  const tierGate = evaluateTierAGate(character, dimensions);
  const tierReasons: string[] = [...tierGate.blockers];
  const missingFields = [...dimensions.criticalMissing];

  const meetsTierA = tierGate.eligible;

  let tier: CompletenessTier;

  if (explicitTier === "A" && !meetsTierA) {
    tier = "B";
    tierReasons.unshift("Manual Tier A override blocked — integrity thresholds not met");
  } else if (meetsTierA) {
    tier = "A";
  } else if (dimensions.contentCompleteness >= 50 && dimensions.sourceCoverage >= 40) {
    tier = "B";
  } else {
    tier = "C";
  }

  if (!character.verified && tier === "A") {
    tier = "B";
    tierReasons.push("Unverified champion cannot be Tier A");
  }

  const needsResearch =
    missingFields.length >= 2 ||
    dimensions.reviewCoverage < 50 ||
    dimensions.trustedTimelineCoverage < 50 ||
    CONSERVATIVE_DISCLAIMER.test(character.longDescription.join(" "));

  const score = Math.round(
    (dimensions.contentCompleteness +
      dimensions.sourceCoverage +
      dimensions.canonConfidence +
      dimensions.reviewCoverage +
      dimensions.trustedTimelineCoverage) /
      5,
  );

  return {
    tier,
    score,
    dimensions,
    missingFields,
    needsResearch,
    tierReasons,
    tierAEligible: meetsTierA,
    tierABlockers: tierGate.blockers,
  };
}

export function isPriorityChampion(slug: string): boolean {
  return PRIORITY_SLUGS.has(slug);
}
