import type { Character } from "@/types";

const CONSERVATIVE_DISCLAIMER =
  /LoreGraph keeps this profile conservative until additional official sources are reviewed/i;
const TRUNCATED_END = /\.{3}|…\s*$/;

export function hasQualityBio(character: Character): boolean {
  if (CONSERVATIVE_DISCLAIMER.test(character.longDescription.join(" "))) return false;
  if (TRUNCATED_END.test(character.shortDescription)) return false;
  if (character.longDescription.length < 2) return false;
  if (character.shortDescription.length < 40) return false;
  return true;
}

const PLACEHOLDER_TIMELINE_TITLE = /^current era$/i;

export function isPlaceholderTimelineTitle(title: string): boolean {
  return PLACEHOLDER_TIMELINE_TITLE.test(title.trim());
}

export function hasMeaningfulTimeline(character: Character): boolean {
  if (character.timeline.length < 2) return false;
  const genericOnly = character.timeline.every(
    (b) =>
      (b.era === "Modern Runeterra" && b.title === character.name) ||
      isPlaceholderTimelineTitle(b.title),
  );
  return !genericOnly;
}

export function hasGameplayPollution(character: Character): boolean {
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
