import {
  FLAGSHIP_SCENE_ASSETS,
  flagshipAssetBySceneId,
} from "@/data/cinematic/flagship-assets";
import type {
  CinematicJourney,
  CinematicScene,
  CinematicSceneAsset,
  CinematicSceneOverride,
} from "@/types";
import { defaultMotifsForAtmosphere } from "./environmental-motifs";
import { inferShotType } from "./shot-types";
import { inferWorldNodeArchetype } from "./world-node-archetypes";
import { attachIntroOutroSequences } from "./intro-outro";
import { evaluateJourneyReadiness } from "./visual-readiness";

/** Curated staging overrides — flagship journeys only. */
const SCENE_OVERRIDES: Record<string, CinematicSceneOverride> = {
  "cscene:yasuo-yone:parallel": {
    coordinates: { x: 0, y: 0.2, z: 0 },
    shotType: "DUAL_CHARACTER",
    cameraPreset: "CURVE_RIGHT",
    curated: true,
  },
  "cscene:yasuo-yone:invasion": {
    coordinates: { x: 0, y: 0, z: 12 },
    shotType: "WIDE_EVENT",
    worldScale: 2.8,
    worldNodeArchetype: "INVASION",
    cameraPreset: "FAST_APPROACH",
    curated: true,
  },
  "cscene:yasuo-yone:accusation": {
    coordinates: { x: -1.2, y: 0.1, z: 22 },
    shotType: "AFTERMATH",
    cameraPreset: "SLOW_APPROACH",
    curated: true,
  },
  "cscene:yasuo-yone:duel": {
    coordinates: { x: 0, y: 0.3, z: 32 },
    shotType: "IMPACT",
    cameraPreset: "FAST_APPROACH",
    curated: true,
  },
  "cscene:yasuo-yone:fade": {
    coordinates: { x: 0.5, y: -0.2, z: 40 },
    shotType: "AFTERMATH",
    cameraPreset: "HOLD",
    curated: true,
  },
  "cscene:yasuo-yone:return": {
    coordinates: { x: 2.8, y: 0.5, z: 50 },
    shotType: "TRANSFORMATION",
    cameraPreset: "ORBIT",
    curated: true,
  },
  "cscene:yasuo-yone:ending": {
    coordinates: { x: 0, y: 1, z: 62 },
    shotType: "PULLBACK",
    cameraPreset: "PULL_BACK",
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-1": {
    coordinates: { x: 0, y: 0.5, z: 10 },
    shotType: "REVEAL",
    worldNodeArchetype: "ASCENSION",
    worldScale: 2.6,
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-2": {
    coordinates: { x: 0, y: 0, z: 20 },
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "CATASTROPHE",
    worldScale: 3,
    atmosphere: "VOID",
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-4": {
    coordinates: { x: 0, y: -0.2, z: 38 },
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "WAR",
    worldScale: 2.8,
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-5": {
    coordinates: { x: 0, y: 0, z: 48 },
    shotType: "AFTERMATH",
    worldNodeArchetype: "IMPRISONMENT",
    worldScale: 1.6,
    curated: true,
  },
};

function manifestToAsset(
  entry: (typeof FLAGSHIP_SCENE_ASSETS)[number],
): CinematicSceneAsset | undefined {
  if (!entry.officialAsset) return undefined;
  return {
    url: entry.officialAsset.url,
    assetKey: entry.officialAsset.assetKey,
    sourceEntityId: entry.officialAsset.sourceEntityId,
    relevance: entry.officialAsset.relevance,
    confidence: "HIGH",
    qualityStatus: entry.qualityStatus,
    focalPoint: entry.officialAsset.focalPoint,
    aspectRatio: entry.officialAsset.aspectRatio,
    compositionHint: entry.composition,
    source: entry.officialAsset.source,
    assetType: entry.officialAsset.assetType,
    variant: "event",
  };
}

function applySceneCurations(scene: CinematicScene): CinematicScene {
  const manifest = flagshipAssetBySceneId.get(scene.id);
  const override = SCENE_OVERRIDES[scene.id];
  let next: CinematicScene = { ...scene };

  if (manifest) {
    next.visualSubject = manifest.visualSubject;
    next.shotType = manifest.shotType;
    next.worldNodeArchetype = manifest.worldNodeArchetype;
    next.environmentalMotifs = manifest.environmentalMotifs;
    next.composition = manifest.composition;
    next.narrativePhrases = manifest.narrativePhrases;
    next.curated = true;

    if (manifest.composition === "NO_IMAGE") {
      next.image = undefined;
    } else if (manifest.officialAsset) {
      next.image = manifestToAsset(manifest);
    }
  }

  if (override) {
    next = {
      ...next,
      ...override,
      coordinates: override.coordinates ?? next.coordinates,
      graphTarget: override.graphTarget ?? next.graphTarget,
      environmentalMotifs:
        override.environmentalMotifs ?? next.environmentalMotifs,
      curated: true,
    };
  }

  if (!next.shotType) next.shotType = inferShotType(next);
  if (!next.visualSubject) next.visualSubject = next.title;
  if (!next.worldNodeArchetype && (next.worldScale ?? 1) >= 1.8) {
    next.worldNodeArchetype = inferWorldNodeArchetype(next) ?? undefined;
  }
  if (!next.environmentalMotifs?.length && next.atmosphere) {
    next.environmentalMotifs = defaultMotifsForAtmosphere(next.atmosphere);
  }

  if (!next.narrativePhrases?.length && next.narrative) {
    next.narrativePhrases = next.narrative
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return next;
}

function enrichSceneDefaults(scene: CinematicScene): CinematicScene {
  let next = { ...scene };
  if (!next.shotType) next.shotType = inferShotType(next);
  if (!next.visualSubject) next.visualSubject = next.title;
  if (!next.worldNodeArchetype && (next.worldScale ?? 1) >= 1.8) {
    next.worldNodeArchetype = inferWorldNodeArchetype(next) ?? undefined;
  }
  if (!next.environmentalMotifs?.length && next.atmosphere) {
    next.environmentalMotifs = defaultMotifsForAtmosphere(next.atmosphere);
  }
  if (!next.narrativePhrases?.length && next.narrative) {
    next.narrativePhrases = next.narrative
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return next;
}

export function applyFlagshipCurations(journey: CinematicJourney): CinematicJourney {
  const isFlagship = FLAGSHIP_SCENE_ASSETS.some((e) => e.journeyId === journey.id);
  const scenes = journey.scenes.map((s) =>
    isFlagship ? applySceneCurations(s) : enrichSceneDefaults(s),
  );
  const curated: CinematicJourney = {
    ...journey,
    scenes,
    cinematicReady: journey.cinematicReady,
  };
  const withSequences = attachIntroOutroSequences(curated);
  const readiness = evaluateJourneyReadiness(withSequences);
  return {
    ...withSequences,
    loreReady: journey.cinematicReady,
    visualReady: readiness.visualReady,
    recordReady: readiness.recordReady,
    readiness,
  };
}
