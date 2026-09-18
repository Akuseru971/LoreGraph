import {
  FLAGSHIP_JOURNEY_IDS,
  FLAGSHIP_SCENE_ASSETS,
  flagshipAssetBySceneId,
} from "@/data/cinematic/flagship-assets";
import { constellationByCharacterId } from "@/data/cinematic/constellation-anchors";
import {
  AATROX_RECORD_INTRO_TIMING,
  AATROX_RECORD_OUTRO_TIMING,
} from "./aatrox-cinematic-direction";
import { compositionForScene } from "./composition";
import { DEFAULT_INTRO_TIMING } from "./intro-outro";
import { DEFAULT_RECORD_TIMING, recordTimingForScene, totalSceneRecordMs } from "./record-mode";
import type { CinematicJourney } from "@/types";
import type { CinematicValidationIssue } from "./validate-cinematic";
import { totalIntroMs } from "./intro-outro";

const MAX_RECORD_INTRO_MS = 7000;
const MAX_SCENE_RECORD_MS = 6500;
const MIN_AATROX_SILHOUETTE_ANCHORS = 350;

export function validateFlagshipCoverage(journey: CinematicJourney): CinematicValidationIssue[] {
  const issues: CinematicValidationIssue[] = [];
  if (!FLAGSHIP_JOURNEY_IDS.includes(journey.id as (typeof FLAGSHIP_JOURNEY_IDS)[number])) {
    return issues;
  }

  for (const scene of journey.scenes) {
    const manifest = flagshipAssetBySceneId.get(scene.id);
    const composition = scene.composition ?? compositionForScene(scene, scene.image);

    if (composition === "NO_IMAGE" && !manifest?.noImageJustification) {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "flagship_no_image",
        message: "Flagship scene has NO_IMAGE without explicit justification",
      });
    }

    if (!scene.image?.url && scene.type !== "ENDING") {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "flagship_missing_background",
        message: "Flagship scene missing official background visual",
      });
    }

    if (scene.image?.confidence === "LOW" && manifest?.officialAsset) {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "low_confidence_when_curated_exists",
        message: "Scene uses LOW-confidence asset but curated official asset is defined",
      });
    }

    const sceneMs = totalSceneRecordMs(scene);
    if (sceneMs > MAX_SCENE_RECORD_MS && scene.importance === "CORE") {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "scene_timing_too_slow",
        message: `Record scene ${sceneMs}ms exceeds ${MAX_SCENE_RECORD_MS}ms target`,
      });
    }
  }

  if (journey.introSequence?.recordTiming) {
    const introMs = totalIntroMs(journey.introSequence.recordTiming);
    if (introMs > MAX_RECORD_INTRO_MS) {
      issues.push({
        level: "WARNING",
        kind: "intro_timing_too_slow",
        message: `Record intro ${introMs}ms exceeds ${MAX_RECORD_INTRO_MS}ms target`,
      });
    }
  }

  if (journey.id === "cinematic:character:aatrox") {
    const constellation = constellationByCharacterId.get("char:aatrox");
    if (constellation && constellation.anchors.length < MIN_AATROX_SILHOUETTE_ANCHORS) {
      issues.push({
        level: "WARNING",
        kind: "low_constellation_density",
        message: `Aatrox has ${constellation.anchors.length} anchors — need ≥${MIN_AATROX_SILHOUETTE_ANCHORS} for recognition`,
      });
    }
  }

  const manifestScenes = FLAGSHIP_SCENE_ASSETS.filter((e) => e.journeyId === journey.id);
  for (const entry of manifestScenes) {
    if (!entry.officialAsset && !entry.noImageJustification) {
      issues.push({
        level: "WARNING",
        sceneId: entry.sceneId,
        kind: "manifest_missing_asset",
        message: "Flagship manifest entry lacks officialAsset",
      });
    }
  }

  return issues;
}

export function flagshipTimingSummary() {
  return {
    defaultIntroMs: totalIntroMs(DEFAULT_INTRO_TIMING),
    aatroxRecordIntroMs: totalIntroMs(AATROX_RECORD_INTRO_TIMING),
    aatroxRecordOutroMs:
      AATROX_RECORD_OUTRO_TIMING.pullbackMs +
      AATROX_RECORD_OUTRO_TIMING.pathRevealMs +
      AATROX_RECORD_OUTRO_TIMING.nodesConnectMs +
      AATROX_RECORD_OUTRO_TIMING.constellationReformMs +
      AATROX_RECORD_OUTRO_TIMING.splashEchoMs +
      AATROX_RECORD_OUTRO_TIMING.holdMs,
    defaultSceneMs:
      DEFAULT_RECORD_TIMING.travelMs +
      DEFAULT_RECORD_TIMING.arrivalSettleMs +
      DEFAULT_RECORD_TIMING.eyebrowRevealMs +
      DEFAULT_RECORD_TIMING.titleRevealMs +
      DEFAULT_RECORD_TIMING.narrativeRevealMs +
      DEFAULT_RECORD_TIMING.readingHoldMs +
      DEFAULT_RECORD_TIMING.departurePrepMs,
  };
}
