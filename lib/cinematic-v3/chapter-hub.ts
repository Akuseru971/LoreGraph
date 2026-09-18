import { evaluateHubMotion, type HubMotionChannels } from "./motion-curve";
import { getDestinationStarForScene } from "./name-constellation";
import type { ChampionConstellation } from "@/types";

export type NameConstellationMode = "intro" | "inter-chapter" | "outro";

/** @deprecated Use debugRegion on HubMotionChannels — phases are not hard boundaries. */
export type ChapterHubPhase = HubMotionChannels["debugRegion"];

export interface ChapterHubState extends HubMotionChannels {
  destinationStarId: string;
  /** Alias for starIntensity — hero star boost. */
  heroIntensity: number;
  /** Alias for zoomProgress. */
  zoomProgress: number;
  /** Alias for nextBackground. */
  nextSceneEmergence: number;
  /** Alias for cameraPullback — pullback depth. */
  dezoomStrength: number;
  phase: ChapterHubPhase;
  phaseProgress: number;
}

/**
 * Compute inter-chapter hub state from one continuous master progress curve.
 */
export function computeChapterHubState(
  travelProgress: number,
  constellation: ChampionConstellation,
  targetSceneIndex: number,
  totalScenes: number,
): ChapterHubState {
  const motion = evaluateHubMotion(travelProgress);
  const destinationStarId = getDestinationStarForScene(
    constellation,
    targetSceneIndex,
    totalScenes,
  );

  return {
    ...motion,
    destinationStarId,
    heroIntensity: motion.starIntensity,
    zoomProgress: motion.zoomProgress,
    nextSceneEmergence: motion.nextBackground,
    dezoomStrength: motion.cameraPullback,
    phase: motion.debugRegion,
    phaseProgress: motion.t,
  };
}

export const CHAPTER_HUB_TIMING = {
  nameReadableMs: { min: 450, max: 750 },
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
    nameReadableMs: Math.round(travelMs * 0.22),
    starSelectMs: Math.round(travelMs * 0.14),
    plungeMs: Math.round(travelMs * 0.37),
    arrivalMs: Math.round(travelMs * 0.14),
  };
}
