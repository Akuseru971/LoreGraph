import type { CinematicCameraPreset, CinematicCoordinates } from "@/types";

function vec3(c: CinematicCoordinates): [number, number, number] {
  return [c.x, c.y, c.z];
}

function catmullRom(
  p0: [number, number, number],
  p1: [number, number, number],
  p2: [number, number, number],
  p3: [number, number, number],
  t: number,
): [number, number, number] {
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    0.5 *
      (2 * p1[0] +
        (-p0[0] + p2[0]) * t +
        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
    0.5 *
      (2 * p1[1] +
        (-p0[1] + p2[1]) * t +
        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
    0.5 *
      (2 * p1[2] +
        (-p0[2] + p2[2]) * t +
        (2 * p0[2] - 5 * p1[2] + 4 * p2[2] - p3[2]) * t2 +
        (-p0[2] + 3 * p1[2] - 3 * p2[2] + p3[2]) * t3),
  ];
}

function controlOffset(
  preset: CinematicCameraPreset,
  from: CinematicCoordinates,
  to: CinematicCoordinates,
): CinematicCoordinates {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dz = to.z - from.z;
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

  switch (preset) {
    case "CURVE_LEFT":
      return { x: from.x - 2.5, y: from.y + 1.2, z: from.z + dz * 0.35 };
    case "CURVE_RIGHT":
      return { x: from.x + 2.5, y: from.y + 1.2, z: from.z + dz * 0.35 };
    case "ASCEND":
      return { x: from.x + dx * 0.4, y: from.y + 2.8, z: from.z + dz * 0.5 };
    case "DESCEND":
      return { x: from.x + dx * 0.4, y: from.y - 1.8, z: from.z + dz * 0.5 };
    case "ORBIT":
      return {
        x: from.x + (dy / len) * 2,
        y: from.y + 1.5,
        z: from.z + dz * 0.6,
      };
    case "PASS_THROUGH":
      return { x: to.x, y: to.y + 0.5, z: from.z + dz * 0.5 };
    case "FAST_APPROACH":
      return { x: from.x + dx * 0.25, y: from.y + 0.6, z: from.z + dz * 0.2 };
    case "PULL_BACK":
      return { x: from.x - dx * 0.15, y: from.y + 2, z: from.z - 2 };
    default:
      return { x: from.x + dx * 0.35, y: from.y + 0.8, z: from.z + dz * 0.45 };
  }
}

export function easeStarTravel(t: number, preset: CinematicCameraPreset): number {
  const clamped = Math.max(0, Math.min(1, t));
  if (preset === "FAST_APPROACH" || preset === "PASS_THROUGH") {
    return 1 - Math.pow(1 - clamped, 2.2);
  }
  if (preset === "HOLD") return clamped < 0.05 ? 0 : 1;
  return clamped < 0.5
    ? 2 * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
}

export function interpolateStarPosition(
  from: CinematicCoordinates,
  to: CinematicCoordinates,
  t: number,
  preset: CinematicCameraPreset = "SLOW_APPROACH",
  prev?: CinematicCoordinates,
  next?: CinematicCoordinates,
): CinematicCoordinates {
  const eased = easeStarTravel(t, preset);
  const p0 = vec3(prev ?? { x: from.x - 2, y: from.y, z: from.z - 4 });
  const p1 = vec3(from);
  const mid = controlOffset(preset, from, to);
  const p2 = vec3(mid);
  const p3 = vec3(next ?? { x: to.x + 2, y: to.y, z: to.z + 4 });
  const end = vec3(to);

  const curve = catmullRom(p0, p1, p2, end as [number, number, number], eased);
  const blend = catmullRom(p1, p2, end as [number, number, number], p3, eased);
  const mix = preset === "ORBIT" || preset === "CURVE_LEFT" || preset === "CURVE_RIGHT" ? 0.65 : 0.35;

  return {
    x: curve[0] * mix + blend[0] * (1 - mix),
    y: curve[1] * mix + blend[1] * (1 - mix),
    z: curve[2] * mix + blend[2] * (1 - mix),
  };
}

export function cameraFollowPosition(
  star: CinematicCoordinates,
  preset: CinematicCameraPreset,
  t: number,
  graphRevealProgress = 0,
): CinematicCoordinates {
  const config = {
    SLOW_APPROACH: { x: 0, y: 1.6, z: 5.5 },
    FAST_APPROACH: { x: 0, y: 1.1, z: 4.2 },
    ORBIT: { x: 2.8, y: 1.4, z: 3.5 },
    DESCEND: { x: 0, y: -0.5, z: 5 },
    ASCEND: { x: 0, y: 2.8, z: 5.5 },
    CURVE_LEFT: { x: -2.2, y: 1.5, z: 4.8 },
    CURVE_RIGHT: { x: 2.2, y: 1.5, z: 4.8 },
    PASS_THROUGH: { x: 0, y: 0.6, z: 2.5 },
    PULL_BACK: { x: 0, y: 4.5, z: 14 },
    HOLD: { x: 0, y: 1.4, z: 5 },
  }[preset];

  const settle = Math.min(1, t * 1.2);
  const pullZ = graphRevealProgress * 14;
  const pullY = graphRevealProgress * 6;

  return {
    x: star.x + config.x * (1 - settle * 0.25),
    y: star.y + config.y * (1 - settle * 0.2) + pullY,
    z: star.z + config.z * (1 - settle * 0.15) + pullZ,
  };
}

export function trailLengthForPreset(preset: CinematicCameraPreset): number {
  if (preset === "FAST_APPROACH" || preset === "PASS_THROUGH") return 36;
  if (preset === "HOLD") return 18;
  return 28;
}
