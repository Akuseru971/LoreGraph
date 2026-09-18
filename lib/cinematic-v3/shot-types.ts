import type { CinematicCameraPreset, CinematicScene, CinematicShotType } from "@/types";

export interface ShotCameraHints {
  preset?: CinematicCameraPreset;
  offsetScale: number;
  fovScale: number;
  lookAhead: number;
  starScale: number;
}

const SHOT_HINTS: Record<CinematicShotType, ShotCameraHints> = {
  ESTABLISHING: { offsetScale: 1.35, fovScale: 1.08, lookAhead: 0.15, starScale: 0.85 },
  FOLLOW: { offsetScale: 1, fovScale: 1, lookAhead: 0.45, starScale: 1 },
  REVEAL: { offsetScale: 1.1, fovScale: 1.02, lookAhead: 0.35, starScale: 1 },
  PORTRAIT: { offsetScale: 0.85, fovScale: 0.95, lookAhead: 0.25, starScale: 1.05 },
  WIDE_EVENT: { offsetScale: 1.55, fovScale: 1.12, lookAhead: 0.1, starScale: 0.65 },
  DUAL_CHARACTER: { offsetScale: 1.25, fovScale: 1.06, lookAhead: 0.2, starScale: 0.9 },
  IMPACT: { offsetScale: 0.75, fovScale: 0.98, lookAhead: 0.55, starScale: 1.1 },
  AFTERMATH: { offsetScale: 1.2, fovScale: 1.04, lookAhead: 0.12, starScale: 0.8 },
  TRANSFORMATION: { offsetScale: 1.05, fovScale: 1, lookAhead: 0.3, starScale: 1.15 },
  PULLBACK: { offsetScale: 1.8, fovScale: 1.15, lookAhead: 0.05, starScale: 0.55 },
};

export function inferShotType(scene: CinematicScene): CinematicShotType {
  if (scene.shotType) return scene.shotType;
  if (scene.type === "ENDING") return "PULLBACK";
  if (scene.type === "CONFLICT") return "IMPACT";
  if (scene.relationshipChoreography === "FADE") return "AFTERMATH";
  if (scene.relationshipChoreography === "TRANSFORM") return "TRANSFORMATION";
  if (scene.secondaryCharacterIds?.length && scene.type === "RELATIONSHIP") {
    return "DUAL_CHARACTER";
  }
  if ((scene.worldScale ?? 1) >= 2.2) return "WIDE_EVENT";
  if (scene.type === "ORIGIN") return "ESTABLISHING";
  if (scene.type === "TRANSFORMATION") return "TRANSFORMATION";
  if (scene.image?.url) return "REVEAL";
  return "FOLLOW";
}

export function shotCameraHints(scene: CinematicScene): ShotCameraHints {
  const shot = inferShotType(scene);
  const hints = SHOT_HINTS[shot];
  return {
    ...hints,
    preset: scene.cameraPreset ?? hints.preset,
  };
}
