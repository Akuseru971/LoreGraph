import type { Character, CompletenessTier } from "@/types";

const CONSERVATIVE_DISCLAIMER =
  /LoreGraph keeps this profile conservative until additional official sources are reviewed/i;
const TRUNCATED_END = /\.{3}|…\s*$/;

export interface CompletenessResult {
  tier: CompletenessTier;
  score: number;
  missingFields: string[];
  needsResearch: boolean;
}

function hasQualityBio(character: Character): boolean {
  if (CONSERVATIVE_DISCLAIMER.test(character.longDescription.join(" "))) return false;
  if (TRUNCATED_END.test(character.shortDescription)) return false;
  if (character.longDescription.length < 2) return false;
  if (character.shortDescription.length < 40) return false;
  return true;
}

function hasMeaningfulTimeline(character: Character): boolean {
  if (character.timeline.length < 2) return false;
  const genericOnly = character.timeline.every(
    (b) => b.era === "Modern Runeterra" && b.title === character.name,
  );
  return !genericOnly;
}

function hasGameplayPollution(character: Character): boolean {
  const gameplayTags = new Set([
    "fighter",
    "assassin",
    "marksman",
    "mage",
    "support",
    "tank",
    "juggernaut",
    "diver",
    "skirmisher",
    "burst",
    "controller",
  ]);
  return character.roles.some((r) => gameplayTags.has(r.toLowerCase()));
}

/**
 * Derives profile completeness from structured fields.
 * Explicit seed tier overrides auto-detection when provided.
 */
export function computeCompleteness(
  character: Character,
  explicitTier?: CompletenessTier,
): CompletenessResult {
  const missingFields: string[] = [];

  if (!character.sourceIds.length) missingFields.push("sources");
  if (character.species === "Unknown") missingFields.push("species");
  if (!hasQualityBio(character)) missingFields.push("biography");
  if (!hasMeaningfulTimeline(character)) missingFields.push("timeline");
  if (character.eventIds.length === 0) missingFields.push("events");
  if (character.factions.length === 0) missingFields.push("factions");
  if (hasGameplayPollution(character)) missingFields.push("narrativeRoles");
  if (character.releaseYear === 2010 && character.slug !== "singed") {
    missingFields.push("releaseYear");
  }

  let score = 0;
  if (character.verified) score += 20;
  if (hasQualityBio(character)) score += 25;
  if (hasMeaningfulTimeline(character)) score += 20;
  if (character.eventIds.length >= 2) score += 10;
  if (character.timeline.length >= 4) score += 10;
  if (character.sourceIds.length >= 2) score += 5;
  if (character.species !== "Unknown") score += 5;
  if (character.roles.length > 0 && !hasGameplayPollution(character)) score += 5;

  let tier: CompletenessTier;
  if (explicitTier) {
    tier = explicitTier;
  } else if (
    character.verified &&
    hasQualityBio(character) &&
    hasMeaningfulTimeline(character) &&
    missingFields.length <= 1
  ) {
    tier = "A";
  } else if (hasQualityBio(character) && character.sourceIds.length > 0) {
    tier = "B";
  } else {
    tier = "C";
  }

  const needsResearch =
    missingFields.length >= 3 ||
    CONSERVATIVE_DISCLAIMER.test(character.longDescription.join(" ")) ||
    TRUNCATED_END.test(character.shortDescription);

  return {
    tier,
    score: Math.min(100, score),
    missingFields,
    needsResearch,
  };
}
