import { FLAGSHIP_JOURNEY_IDS } from "@/data/cinematic/flagship-assets";
import type { CinematicJourney } from "@/types";

/** Flagship journeys use image-led story panels (no constellation intro/hub). */
export function isStoryPanelJourney(journey: CinematicJourney): boolean {
  return FLAGSHIP_JOURNEY_IDS.includes(
    journey.id as (typeof FLAGSHIP_JOURNEY_IDS)[number],
  );
}

export function stripConstellationSequences(journey: CinematicJourney): CinematicJourney {
  return {
    ...journey,
    introSequence: undefined,
    outroSequence: undefined,
  };
}
