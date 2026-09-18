import type { CinematicCameraPreset } from "@/types";

export interface CameraMotionConfig {
  preset: CinematicCameraPreset;
  durationMs: number;
  easing: "easeInOut" | "easeOut" | "easeIn" | "linear";
  offset: { x: number; y: number; z: number };
  lookAhead: number;
}

export const CAMERA_PRESETS: Record<CinematicCameraPreset, Omit<CameraMotionConfig, "preset">> = {
  SLOW_APPROACH: {
    durationMs: 2800,
    easing: "easeInOut",
    offset: { x: 0, y: 1.5, z: 6 },
    lookAhead: 0.3,
  },
  FAST_APPROACH: {
    durationMs: 1800,
    easing: "easeOut",
    offset: { x: 0, y: 0.8, z: 4 },
    lookAhead: 0.5,
  },
  ORBIT: {
    durationMs: 3200,
    easing: "easeInOut",
    offset: { x: 3, y: 1.2, z: 2 },
    lookAhead: 0.2,
  },
  DESCEND: {
    durationMs: 2400,
    easing: "easeInOut",
    offset: { x: 0, y: -2, z: 5 },
    lookAhead: 0.25,
  },
  ASCEND: {
    durationMs: 2400,
    easing: "easeInOut",
    offset: { x: 0, y: 3, z: 5 },
    lookAhead: 0.25,
  },
  CURVE_LEFT: {
    durationMs: 2600,
    easing: "easeInOut",
    offset: { x: -2.5, y: 1, z: 4 },
    lookAhead: 0.35,
  },
  CURVE_RIGHT: {
    durationMs: 2600,
    easing: "easeInOut",
    offset: { x: 2.5, y: 1, z: 4 },
    lookAhead: 0.35,
  },
  PASS_THROUGH: {
    durationMs: 2200,
    easing: "easeIn",
    offset: { x: 0, y: 0.5, z: 0 },
    lookAhead: 1.0,
  },
  PULL_BACK: {
    durationMs: 4000,
    easing: "easeOut",
    offset: { x: 0, y: 4, z: 14 },
    lookAhead: 0.1,
  },
  HOLD: {
    durationMs: 5000,
    easing: "linear",
    offset: { x: 0, y: 1.5, z: 5 },
    lookAhead: 0.2,
  },
};

export function getCameraConfig(preset: CinematicCameraPreset): CameraMotionConfig {
  return { preset, ...CAMERA_PRESETS[preset] };
}

export function ease(t: number, kind: CameraMotionConfig["easing"]): number {
  const clamped = Math.max(0, Math.min(1, t));
  switch (kind) {
    case "easeIn":
      return clamped * clamped;
    case "easeOut":
      return 1 - (1 - clamped) * (1 - clamped);
    case "easeInOut":
      return clamped < 0.5
        ? 2 * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
    default:
      return clamped;
  }
}

export function interpolateCamera(
  from: { x: number; y: number; z: number },
  to: { x: number; y: number; z: number },
  t: number,
  preset: CinematicCameraPreset,
): { x: number; y: number; z: number } {
  const config = getCameraConfig(preset);
  const e = ease(t, config.easing);
  const offset = config.offset;
  return {
    x: from.x + (to.x - from.x) * e + offset.x * (1 - e),
    y: from.y + (to.y - from.y) * e + offset.y * (1 - e),
    z: from.z + (to.z - from.z) * e + offset.z * (1 - e),
  };
}
