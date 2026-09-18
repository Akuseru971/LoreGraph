import { flagshipAssetBySceneId } from "@/data/cinematic/flagship-assets";
import { isStoryPanelJourney } from "./story-panel-mode";
import type { CinematicJourney, CinematicJourneyReadiness, CinematicScene } from "@/types";

const FLAGSHIP_IDS = new Set([
  "cinematic:character:aatrox",
  "cinematic:character:yasuo",
  "cinematic:character:yone",
  "cinematic:connection:yasuo:yone",
  "cinematic:character:viego",
  "cinematic:character:skarner",
]);

function sceneVisualBlockers(scene: CinematicScene, journeyId: string): string[] {
  const blockers: string[] = [];
  const manifest = flagshipAssetBySceneId.get(scene.id);
  const isFlagship = FLAGSHIP_IDS.has(journeyId);

  if (!scene.visualSubject && isFlagship && scene.type !== "ENDING") {
    blockers.push(`${scene.id}: missing visualSubject`);
  }

  if (!scene.shotType && scene.importance === "CORE") {
    blockers.push(`${scene.id}: missing shotType`);
  }

  if (
    manifest?.qualityStatus === "MISSING" &&
    manifest.composition !== "NO_IMAGE"
  ) {
    blockers.push(`${scene.id}: MISSING asset for required visual`);
  }

  if (
    scene.image?.confidence === "LOW" &&
    scene.image.qualityStatus !== "ABSTRACT_REQUIRED"
  ) {
    blockers.push(`${scene.id}: LOW-confidence image in premium mode`);
  }

  if (
    scene.image?.relevance === "CHARACTER_CONTEXT" &&
    (scene.type === "EVENT" || scene.type === "CONFLICT") &&
    scene.importance === "CORE"
  ) {
    blockers.push(`${scene.id}: champion fallback on CORE event`);
  }

  if (
    (scene.worldScale ?? 1) >= 2 &&
    !scene.worldNodeArchetype &&
    (scene.type === "EVENT" || scene.type === "CONFLICT")
  ) {
    blockers.push(`${scene.id}: major event missing WorldNode archetype`);
  }

  if (!scene.environmentalMotifs?.length && scene.type !== "ENDING") {
    blockers.push(`${scene.id}: missing environmental motifs`);
  }

  return blockers;
}

export function evaluateJourneyReadiness(
  journey: CinematicJourney,
): CinematicJourneyReadiness {
  const blockers: string[] = [];
  const isFlagship = FLAGSHIP_IDS.has(journey.id);

  if (!journey.cinematicReady) {
    blockers.push("lore not ready");
  }

  for (const scene of journey.scenes) {
    blockers.push(...sceneVisualBlockers(scene, journey.id));
  }

  if (isFlagship) {
    const manifestScenes = journey.scenes.filter((s) =>
      flagshipAssetBySceneId.has(s.id),
    );
    const missingCurated = manifestScenes.filter(
      (s) => flagshipAssetBySceneId.get(s.id)?.qualityStatus === "MISSING",
    );
    if (missingCurated.length) {
      blockers.push(`${missingCurated.length} flagship scenes MISSING assets`);
    }
    if (!isStoryPanelJourney(journey)) {
      if (journey.kind === "CHARACTER" && !journey.introSequence) {
        blockers.push("flagship CHARACTER journey missing introSequence");
      }
      if (journey.kind === "CHARACTER" && !journey.outroSequence) {
        blockers.push("flagship CHARACTER journey missing outroSequence");
      }
    }
  }

  const visualReady =
    journey.cinematicReady && (isFlagship ? blockers.length === 0 : true);

  const recordBlockers = [...blockers];
  for (const scene of journey.scenes) {
    if (scene.image?.confidence === "LOW") {
      recordBlockers.push(`${scene.id}: record mode cannot use LOW-confidence image`);
    }
  }

  const recordReady =
    isFlagship &&
    journey.cinematicReady &&
    recordBlockers.length === 0;

  return {
    loreReady: journey.cinematicReady,
    visualReady: isFlagship ? visualReady : journey.cinematicReady,
    recordReady: isFlagship ? recordReady : false,
    blockers: recordBlockers,
  };
}
