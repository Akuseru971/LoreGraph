import { AATROX_PATH_TO_ANCHOR } from "@/data/cinematic/constellations/aatrox";
import type {
  CinematicIntroTiming,
  CinematicJourney,
  CinematicOutroTiming,
  CinematicScene,
  CinematicSceneOverride,
} from "@/types";

export const AATROX_JOURNEY_ID = "cinematic:character:aatrox";

/** Record-mode intro ~6.2s — fast enough for content, long enough for splash→constellation read */
export const AATROX_RECORD_INTRO_TIMING: CinematicIntroTiming = {
  splashHoldMs: 1000,
  splashDriftMs: 500,
  darkenMs: 900,
  starsEmergeMs: 1100,
  linesFormMs: 800,
  heroSelectMs: 500,
  zoomStarMs: 1100,
  handoffMs: 500,
};

export const AATROX_INTERACTIVE_INTRO_TIMING: CinematicIntroTiming = {
  splashHoldMs: 1400,
  splashDriftMs: 700,
  darkenMs: 1200,
  starsEmergeMs: 1400,
  linesFormMs: 1000,
  heroSelectMs: 600,
  zoomStarMs: 1400,
  handoffMs: 600,
};

export const AATROX_RECORD_OUTRO_TIMING: CinematicOutroTiming = {
  pullbackMs: 700,
  pathRevealMs: 500,
  nodesConnectMs: 500,
  constellationReformMs: 900,
  splashEchoMs: 450,
  holdMs: 1200,
};

export const AATROX_SCENE_OVERRIDES: Record<string, CinematicSceneOverride> = {
  "cscene:aatrox:origin": {
    coordinates: { x: 0, y: 0.2, z: 0 },
    shotType: "ESTABLISHING",
    cameraPreset: "SLOW_APPROACH",
    atmosphere: "SHURIMA",
    environmentalMotifs: ["SUN_DISC", "SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-1": {
    coordinates: { x: 0, y: 0.6, z: 14 },
    shotType: "REVEAL",
    worldNodeArchetype: "ASCENSION",
    worldScale: 2.8,
    cameraPreset: "ASCEND",
    atmosphere: "SHURIMA",
    environmentalMotifs: ["SUN_DISC", "SHURIMA_ARCHES", "CELESTIAL_ORBITS"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-2": {
    coordinates: { x: -0.8, y: 0.1, z: 28 },
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "CATASTROPHE",
    worldScale: 3.2,
    cameraPreset: "FAST_APPROACH",
    atmosphere: "VOID",
    environmentalMotifs: ["VOID_RIFT", "VOID_FILAMENTS"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-3": {
    coordinates: { x: 0.4, y: -0.2, z: 40 },
    shotType: "TRANSFORMATION",
    worldNodeArchetype: "MAGICAL_RUPTURE",
    worldScale: 2.2,
    cameraPreset: "ORBIT",
    atmosphere: "DARKIN",
    environmentalMotifs: ["VOID_FILAMENTS", "SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-4": {
    coordinates: { x: -0.5, y: 0, z: 52 },
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "WAR",
    worldScale: 3,
    cameraPreset: "CURVE_LEFT",
    atmosphere: "DARKIN",
    environmentalMotifs: ["NOXIAN_ASH", "SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-5": {
    coordinates: { x: 0, y: -0.4, z: 64 },
    shotType: "AFTERMATH",
    worldNodeArchetype: "IMPRISONMENT",
    worldScale: 1.8,
    cameraPreset: "DESCEND",
    atmosphere: "DARKIN",
    environmentalMotifs: ["SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-6": {
    coordinates: { x: 0.6, y: 0.2, z: 76 },
    shotType: "REVEAL",
    worldNodeArchetype: "RETURN",
    worldScale: 2,
    cameraPreset: "SLOW_APPROACH",
    atmosphere: "DARKIN",
    environmentalMotifs: ["SHURIMA_ARCHES", "CELESTIAL_ORBITS"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-7": {
    coordinates: { x: 0, y: 0.8, z: 90 },
    shotType: "IMPACT",
    worldNodeArchetype: "WAR",
    worldScale: 2.6,
    cameraPreset: "FAST_APPROACH",
    atmosphere: "CELESTIAL",
    environmentalMotifs: ["TARGON_CONSTELLATIONS", "CELESTIAL_ORBITS"],
    curated: true,
  },
  "cscene:aatrox:ending": {
    coordinates: { x: 0, y: 1.2, z: 104 },
    shotType: "PULLBACK",
    cameraPreset: "PULL_BACK",
    atmosphere: "CELESTIAL",
    curated: true,
  },
};

export function applyAatroxCinematicDirection(
  journey: CinematicJourney,
): CinematicJourney {
  if (journey.id !== AATROX_JOURNEY_ID) return journey;

  const scenes = journey.scenes.map((scene) => {
    const override = AATROX_SCENE_OVERRIDES[scene.id];
    if (!override) return scene;
    return {
      ...scene,
      ...override,
      coordinates: override.coordinates ?? scene.coordinates,
      graphTarget: override.graphTarget ?? scene.graphTarget,
      environmentalMotifs: override.environmentalMotifs ?? scene.environmentalMotifs,
      curated: true,
    } satisfies CinematicScene;
  });

  const intro = journey.introSequence
    ? {
        ...journey.introSequence,
        splashFocal: { x: 0.52, y: 0.3 },
        recordShowIntroTitle: true,
        recordTiming: AATROX_RECORD_INTRO_TIMING,
        timing: AATROX_INTERACTIVE_INTRO_TIMING,
        title: "Aatrox",
        subtitle: "The Darkin Blade",
      }
    : undefined;

  const outro = journey.outroSequence
    ? {
        ...journey.outroSequence,
        pathToAnchorMapping: AATROX_PATH_TO_ANCHOR,
        recordShowOutroTitle: true,
        recordTiming: AATROX_RECORD_OUTRO_TIMING,
        timing: AATROX_RECORD_OUTRO_TIMING,
        showText: true,
      }
    : undefined;

  return {
    ...journey,
    scenes,
    introSequence: intro,
    outroSequence: outro,
  };
}
