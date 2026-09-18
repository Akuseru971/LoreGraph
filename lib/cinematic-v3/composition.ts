import type {
  CinematicComposition,
  CinematicScene,
  CinematicSceneAsset,
} from "@/types";

export interface NarrativePlacement {
  position: "left" | "right" | "bottom-center" | "center-left" | "center-right";
  align: "start" | "center" | "end";
  maxWidth: string;
  gradientSide: "left" | "right" | "bottom" | "none";
}

const PLACEMENT: Record<CinematicComposition, NarrativePlacement> = {
  FULL_BLEED: {
    position: "bottom-center",
    align: "center",
    maxWidth: "42rem",
    gradientSide: "bottom",
  },
  LEFT_SUBJECT: {
    position: "center-right",
    align: "start",
    maxWidth: "28rem",
    gradientSide: "right",
  },
  RIGHT_SUBJECT: {
    position: "center-left",
    align: "start",
    maxWidth: "28rem",
    gradientSide: "left",
  },
  CENTER_REVEAL: {
    position: "bottom-center",
    align: "center",
    maxWidth: "36rem",
    gradientSide: "bottom",
  },
  DISTANT_WORLD: {
    position: "center-left",
    align: "start",
    maxWidth: "30rem",
    gradientSide: "left",
  },
  BACKGROUND_MEMORY: {
    position: "center-left",
    align: "start",
    maxWidth: "32rem",
    gradientSide: "left",
  },
  DUAL_SUBJECT: {
    position: "bottom-center",
    align: "center",
    maxWidth: "34rem",
    gradientSide: "bottom",
  },
  NO_IMAGE: {
    position: "center-left",
    align: "start",
    maxWidth: "32rem",
    gradientSide: "none",
  },
};

export function compositionForScene(
  scene: CinematicScene,
  asset?: CinematicSceneAsset | null,
): CinematicComposition {
  if (scene.composition) return scene.composition;
  if (asset?.compositionHint) return asset.compositionHint;
  if (!asset?.url || asset.confidence === "LOW") return "NO_IMAGE";

  const fp = asset.focalPoint;
  if (scene.type === "RELATIONSHIP" || scene.secondaryCharacterIds?.length) {
    return "DUAL_SUBJECT";
  }
  if (scene.type === "EVENT" && (scene.worldScale ?? 1) >= 2) {
    return "DISTANT_WORLD";
  }
  if (scene.type === "ENDING") return "CENTER_REVEAL";
  if (fp) {
    if (fp.x < 0.38) return "LEFT_SUBJECT";
    if (fp.x > 0.62) return "RIGHT_SUBJECT";
  }
  if (scene.type === "TRANSFORMATION" || scene.type === "CONFLICT") {
    return "CENTER_REVEAL";
  }
  return "BACKGROUND_MEMORY";
}

export function narrativePlacementForComposition(
  composition: CinematicComposition,
): NarrativePlacement {
  return PLACEMENT[composition];
}

export function imageOffsetForComposition(
  composition: CinematicComposition,
  focalPoint?: { x: number; y: number },
): { x: number; y: number; z: number } {
  switch (composition) {
    case "LEFT_SUBJECT":
      return { x: -1.8, y: 0.4, z: -2.8 };
    case "RIGHT_SUBJECT":
      return { x: 1.8, y: 0.4, z: -2.8 };
    case "DISTANT_WORLD":
      return { x: 0, y: 0.8, z: -4.5 };
    case "DUAL_SUBJECT":
      return { x: 0, y: 0.6, z: -3.2 };
    case "CENTER_REVEAL":
      return { x: 0, y: 0.2, z: -3 };
    case "FULL_BLEED":
      return { x: 0, y: 0.5, z: -3.5 };
    case "BACKGROUND_MEMORY":
    case "NO_IMAGE":
    default:
      return {
        x: (focalPoint?.x ?? 0.5) * 0.6 - 0.3,
        y: 0.5,
        z: -2.6,
      };
  }
}
