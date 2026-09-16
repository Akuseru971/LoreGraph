import { claims } from "@/data/knowledge/claims";
import { relationships } from "@/data/relationships";
import type {
  CanonStatus,
  ChampionQualityDimensions,
  Character,
  CompletenessTier,
  ReviewStatus,
} from "@/types";
import {
  hasGameplayPollution,
  hasMeaningfulTimeline,
  hasQualityBio,
} from "./completeness-helpers";

export interface QualityResult {
  tier: CompletenessTier;
  score: number;
  dimensions: ChampionQualityDimensions;
  missingFields: string[];
  needsResearch: boolean;
  tierReasons: string[];
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

function claimWeight(canonStatus: CanonStatus): number {
  switch (canonStatus) {
    case "CURRENT_CANON":
      return 1;
    case "AMBIGUOUS":
      return 0.5;
    case "RECONCILIATION_PENDING":
      return 0.3;
    default:
      return 0;
  }
}

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
  if (character.roles.length > 0 && !hasGameplayPollution(character)) contentScore += 5;
  if (character.timeline.length >= 4) contentScore += 10;

  const charClaims = claims.filter((c) => c.subjectId === character.id);
  const reviewedClaims = charClaims.filter((c) => c.reviewed && !c.needsReview);
  const sourcedClaims = reviewedClaims.filter((c) => c.sourceIds.length > 0);

  const sourceCoverage =
    charClaims.length === 0
      ? character.sourceIds.length > 0
        ? 40
        : 0
      : Math.round((sourcedClaims.length / charClaims.length) * 100);

  const canonConfidence =
    charClaims.length === 0
      ? character.verified
        ? 50
        : 20
      : Math.round(
          (reviewedClaims.reduce((sum, c) => sum + claimWeight(c.canonStatus), 0) /
            charClaims.length) *
            100,
        );

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
  if (character.releaseYear === 2010 && character.slug !== "singed") {
    criticalMissing.push("releaseYear");
  }

  const coreRels = charRels.filter((r) => r.connectionType === "DIRECT_CANON");
  const unresolvedCore = coreRels.filter(
    (r) => r.needsReview || r.reviewStatus === "PENDING" || !r.verified,
  );
  if (unresolvedCore.length > 0) criticalMissing.push("unresolved_core_relationship");

  return {
    contentCompleteness: Math.min(100, contentScore),
    sourceCoverage,
    canonConfidence,
    reviewCoverage,
    timelineCoverage,
    relationshipCoverage,
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
  const tierReasons: string[] = [];
  const missingFields = [...dimensions.criticalMissing];

  const meetsTierA =
    dimensions.contentCompleteness >= 80 &&
    dimensions.sourceCoverage >= 70 &&
    dimensions.canonConfidence >= 75 &&
    dimensions.reviewCoverage >= 80 &&
    dimensions.continuityClassified &&
    hasQualityBio(character) &&
    hasMeaningfulTimeline(character) &&
    !dimensions.criticalMissing.includes("unresolved_core_relationship") &&
    !dimensions.criticalMissing.includes("conservative_bio") &&
    !dimensions.criticalMissing.includes("truncated_bio") &&
    character.verified;

  let tier: CompletenessTier;

  if (explicitTier === "A" && !meetsTierA) {
    tier = "B";
    tierReasons.push("Manual Tier A override blocked — integrity thresholds not met");
    if (dimensions.reviewCoverage < 80) tierReasons.push("Review coverage below 80%");
    if (dimensions.canonConfidence < 75) tierReasons.push("Canon confidence below 75%");
    if (dimensions.criticalMissing.includes("unresolved_core_relationship")) {
      tierReasons.push("Unresolved core DIRECT_CANON relationship");
    }
  } else if (meetsTierA) {
    tier = "A";
  } else if (dimensions.contentCompleteness >= 50 && dimensions.sourceCoverage >= 40) {
    tier = "B";
    if (dimensions.reviewCoverage < 80) tierReasons.push("Review coverage insufficient for Tier A");
    if (dimensions.canonConfidence < 75) tierReasons.push("Canon confidence insufficient for Tier A");
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
    CONSERVATIVE_DISCLAIMER.test(character.longDescription.join(" "));

  const score = Math.round(
    (dimensions.contentCompleteness +
      dimensions.sourceCoverage +
      dimensions.canonConfidence +
      dimensions.reviewCoverage) /
      4,
  );

  return {
    tier,
    score,
    dimensions,
    missingFields,
    needsResearch,
    tierReasons,
  };
}

export function isPriorityChampion(slug: string): boolean {
  return PRIORITY_SLUGS.has(slug);
}
