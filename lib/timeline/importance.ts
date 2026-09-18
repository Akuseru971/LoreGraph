import type { TimelineBeat, TimelineBeatImportance } from "@/types";

const PLACEHOLDER_TIMELINE_TITLE = /^current era$/i;

function isPlaceholderTimelineBeat(beat: TimelineBeat): boolean {
  return PLACEHOLDER_TIMELINE_TITLE.test(beat.title.trim());
}

export function beatImportance(beat: TimelineBeat): TimelineBeatImportance {
  if (beat.importance) return beat.importance;
  if (isPlaceholderTimelineBeat(beat)) return "CORE";
  if (beat.eventId || beat.claimIds?.length || beat.sourceIds?.length) {
    return "SUPPORTING";
  }
  return "CONTEXTUAL";
}

export function isCoreTimelineBeat(beat: TimelineBeat): boolean {
  return beatImportance(beat) === "CORE";
}

export function isSupportingTimelineBeat(beat: TimelineBeat): boolean {
  return beatImportance(beat) === "SUPPORTING";
}

export function isContextualTimelineBeat(beat: TimelineBeat): boolean {
  return beatImportance(beat) === "CONTEXTUAL";
}
