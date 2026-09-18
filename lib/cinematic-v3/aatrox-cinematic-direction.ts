import { NAME_RECORD_INTRO_TIMING, NAME_OUTRO_TIMING } from "@/lib/cinematic-v3/intro-outro";
import type {
  CinematicIntroTiming,
  CinematicJourney,
  CinematicOutroTiming,
  CinematicScene,
  CinematicSceneOverride,
} from "@/types";

export const AATROX_JOURNEY_ID = "cinematic:character:aatrox";

/** Record-mode name constellation intro ~5.6s */
export const AATROX_RECORD_INTRO_TIMING: CinematicIntroTiming = NAME_RECORD_INTRO_TIMING;

export const AATROX_INTERACTIVE_INTRO_TIMING: CinematicIntroTiming = {
  splashHoldMs: 1100,
  splashDriftMs: 400,
  darkenMs: 1200,
  starsEmergeMs: 1400,
  linesFormMs: 400,
  heroSelectMs: 500,
  zoomStarMs: 1300,
  handoffMs: 500,
};

export const AATROX_RECORD_OUTRO_TIMING: CinematicOutroTiming = NAME_OUTRO_TIMING;

export const AATROX_SCENE_OVERRIDES: Record<string, CinematicSceneOverride> = {
  "cscene:aatrox:origin": {
    coordinates: { x: 0, y: 0.2, z: 0 },
    shotType: "ESTABLISHING",
    cameraPreset: "FREEFALL",
    atmosphere: "SHURIMA",
    environmentalMotifs: ["SUN_DISC", "SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-1": {
    coordinates: { x: 0, y: 0.6, z: 14 },
    shotType: "REVEAL",
    worldNodeArchetype: "ASCENSION",
    worldScale: 2.8,
    cameraPreset: "FREEFALL_SPIRAL",
    atmosphere: "SHURIMA",
    environmentalMotifs: ["SUN_DISC", "SHURIMA_ARCHES", "CELESTIAL_ORBITS"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-2": {
    coordinates: { x: -0.8, y: 0.1, z: 28 },
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "CATASTROPHE",
    worldScale: 3.2,
    cameraPreset: "FREEFALL_DROP",
    atmosphere: "VOID",
    environmentalMotifs: ["VOID_RIFT", "VOID_FILAMENTS"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-3": {
    coordinates: { x: 0.4, y: -0.2, z: 40 },
    shotType: "TRANSFORMATION",
    worldNodeArchetype: "MAGICAL_RUPTURE",
    worldScale: 2.2,
    cameraPreset: "FREEFALL_SPIRAL",
    atmosphere: "DARKIN",
    environmentalMotifs: ["VOID_FILAMENTS", "SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-4": {
    coordinates: { x: -0.5, y: 0, z: 52 },
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "WAR",
    worldScale: 3,
    cameraPreset: "FREEFALL",
    atmosphere: "DARKIN",
    environmentalMotifs: ["NOXIAN_ASH", "SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-5": {
    coordinates: { x: 0, y: -0.4, z: 64 },
    shotType: "AFTERMATH",
    worldNodeArchetype: "IMPRISONMENT",
    worldScale: 1.8,
    cameraPreset: "FREEFALL_DROP",
    atmosphere: "DARKIN",
    environmentalMotifs: ["SHURIMA_ARCHES"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-6": {
    coordinates: { x: 0.6, y: 0.2, z: 76 },
    shotType: "REVEAL",
    worldNodeArchetype: "RETURN",
    worldScale: 2,
    cameraPreset: "FREEFALL",
    atmosphere: "DARKIN",
    environmentalMotifs: ["SHURIMA_ARCHES", "CELESTIAL_ORBITS"],
    curated: true,
  },
  "cscene:aatrox:beat:aatrox-7": {
    coordinates: { x: 0, y: 0.8, z: 90 },
    shotType: "IMPACT",
    worldNodeArchetype: "WAR",
    worldScale: 2.6,
    cameraPreset: "FREEFALL_DROP",
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
        recordShowIntroTitle: false,
        recordTiming: AATROX_RECORD_INTRO_TIMING,
        timing: AATROX_INTERACTIVE_INTRO_TIMING,
        title: "Aatrox",
        subtitle: "The Darkin Blade",
      }
    : undefined;

  const outro = journey.outroSequence
    ? {
        ...journey.outroSequence,
        recordShowOutroTitle: false,
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
