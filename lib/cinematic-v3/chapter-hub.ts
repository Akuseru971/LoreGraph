import { getDestinationStarForScene } from "./name-constellation";
import type { ChampionConstellation } from "@/types";

export type NameConstellationMode = "intro" | "inter-chapter" | "outro";

export type ChapterHubPhase = "dezoom" | "name_return" | "star_select" | "plunge" | "arrival";

export interface ChapterHubState {
  phase: ChapterHubPhase;
  phaseProgress: number;
  /** Global name opacity — full word visible when near 1. */
  nameOpacity: number;
  /** Pullback / dezoom strength for camera choreography. */
  dezoomStrength: number;
  destinationStarId: string;
  heroIntensity: number;
  softenNonHero: number;
  zoomProgress: number;
  /** Previous scene dissolve amount. */
  sceneDissolve: number;
  /** Next scene emergence during plunge. */
  nextSceneEmergence: number;
  /** Whether the name constellation overlay should be visible. */
  showName: boolean;
}

const DEZOOM_END = 0.36;
const NAME_FADE_START = 0.12;
const NAME_FADE_END = 0.44;
const STAR_SELECT_START = 0.44;
const STAR_SELECT_END = 0.58;
const PLUNGE_START = 0.52;
const ARRIVAL_START = 0.88;

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 4);
}

function easeInQuart(t: number): number {
  return Math.pow(Math.max(0, Math.min(1, t)), 4);
}

function phaseAt(t: number): { phase: ChapterHubPhase; progress: number } {
  if (t < DEZOOM_END) {
    return { phase: "dezoom", progress: t / DEZOOM_END };
  }
  if (t < STAR_SELECT_START) {
    return {
      phase: "name_return",
      progress: (t - DEZOOM_END) / (STAR_SELECT_START - DEZOOM_END),
    };
  }
  if (t < STAR_SELECT_END) {
    return {
      phase: "star_select",
      progress: (t - STAR_SELECT_START) / (STAR_SELECT_END - STAR_SELECT_START),
    };
  }
  if (t < ARRIVAL_START) {
    return {
      phase: "plunge",
      progress: (t - PLUNGE_START) / (ARRIVAL_START - PLUNGE_START),
    };
  }
  return {
    phase: "arrival",
    progress: (t - ARRIVAL_START) / (1 - ARRIVAL_START),
  };
}

/**
 * Compute inter-chapter hub state from normalized travel progress (0–1).
 * Used during scene-to-scene freefall to re-show the champion name.
 */
export function computeChapterHubState(
  travelProgress: number,
  constellation: ChampionConstellation,
  targetSceneIndex: number,
  totalScenes: number,
): ChapterHubState {
  const t = Math.max(0, Math.min(1, travelProgress));
  const { phase, progress } = phaseAt(t);
  const destinationStarId = getDestinationStarForScene(
    constellation,
    targetSceneIndex,
    totalScenes,
  );

  const dezoomStrength = easeOutQuart(Math.min(1, t / DEZOOM_END));
  const nameFadeT = Math.max(
    0,
    Math.min(1, (t - NAME_FADE_START) / (NAME_FADE_END - NAME_FADE_START)),
  );
  const nameOpacity = easeOutQuart(nameFadeT);

  let heroIntensity = 1;
  let softenNonHero = 0;
  let zoomProgress = 0;

  if (phase === "star_select" || phase === "plunge" || phase === "arrival") {
    const selectT = phase === "star_select"
      ? progress
      : phase === "plunge"
        ? 1
        : 1;
    heroIntensity = 1 + easeOutQuart(selectT) * 1.6;
    softenNonHero = easeOutQuart(selectT) * 0.72;
  }

  if (phase === "plunge" || phase === "arrival") {
    const plungeT = phase === "plunge" ? progress : 1;
    zoomProgress = easeInQuart(plungeT) * 0.85;
  }

  const sceneDissolve = easeOutQuart(Math.min(1, t / 0.5));
  const nextSceneEmergence =
    t < PLUNGE_START ? 0 : easeOutQuart((t - PLUNGE_START) / (1 - PLUNGE_START));

  const showName = nameOpacity > 0.04 && t < 0.92;

  return {
    phase,
    phaseProgress: progress,
    nameOpacity,
    dezoomStrength,
    destinationStarId,
    heroIntensity,
    softenNonHero,
    zoomProgress,
    sceneDissolve,
    nextSceneEmergence,
    showName,
  };
}

/** Timing targets for validation (ms). */
export const CHAPTER_HUB_TIMING = {
  nameReadableMs: { min: 600, max: 1000 },
  starSelectMs: { min: 250, max: 450 },
  plungeMs: { min: 900, max: 1600 },
  arrivalMs: { min: 250, max: 450 },
};

export function chapterHubTimingMs(travelMs: number): {
  nameReadableMs: number;
  starSelectMs: number;
  plungeMs: number;
  arrivalMs: number;
} {
  return {
    nameReadableMs: Math.round(travelMs * (NAME_FADE_END - NAME_FADE_START)),
    starSelectMs: Math.round(travelMs * (STAR_SELECT_END - STAR_SELECT_START)),
    plungeMs: Math.round(travelMs * (ARRIVAL_START - PLUNGE_START)),
    arrivalMs: Math.round(travelMs * (1 - ARRIVAL_START)),
  };
}
