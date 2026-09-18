import type { Character, CinematicJourney } from "@/types";
import { isCoreTimelineBeat } from "@/lib/timeline/importance";
import { isTrustedTimelineBeat } from "@/lib/timeline/trust";

export const MIN_CINEMATIC_SCENES = 3;
export const MIN_CINEMATIC_CORE_BEATS = 2;

export interface CinematicReadiness {
  ready: boolean;
  trustedBeatCount: number;
  coreBeatCount: number;
  blockers: string[];
}

export function evaluateCinematicReadiness(character: Character): CinematicReadiness {
  const trusted = character.timeline.filter(isTrustedTimelineBeat);
  const core = trusted.filter(isCoreTimelineBeat);
  const blockers: string[] = [];

  if (trusted.length < MIN_CINEMATIC_SCENES) {
    blockers.push(
      `trusted beats ${trusted.length} < ${MIN_CINEMATIC_SCENES}`,
    );
  }
  if (core.length < MIN_CINEMATIC_CORE_BEATS) {
    blockers.push(`CORE beats ${core.length} < ${MIN_CINEMATIC_CORE_BEATS}`);
  }
  if (!character.continuity) {
    blockers.push("continuity unresolved");
  }

  return {
    ready: blockers.length === 0,
    trustedBeatCount: trusted.length,
    coreBeatCount: core.length,
    blockers,
  };
}

export function isCinematicReady(character: Character): boolean {
  return evaluateCinematicReadiness(character).ready;
}

export function isJourneyCinematicReady(journey: CinematicJourney): boolean {
  return journey.cinematicReady && journey.scenes.length >= MIN_CINEMATIC_SCENES;
}

/** Showcase champions validated for V3 demo. */
export const SHOWCASE_CHAMPION_SLUGS = [
  "aatrox",
  "yasuo",
  "yone",
  "viego",
  "skarner",
] as const;

export const SHOWCASE_CONNECTION_PAIRS: [string, string][] = [
  ["yasuo", "yone"],
  ["aatrox", "pantheon"],
];
