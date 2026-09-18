import type {
  CinematicCoordinates,
  CinematicScene,
  CinematicSceneType,
} from "@/types";

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededUnit(seed: number, index: number): number {
  const x = Math.sin((seed + index) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const TYPE_X_OFFSET: Record<CinematicSceneType, number> = {
  ORIGIN: 0,
  EVENT: 0,
  RELATIONSHIP: 2.5,
  TRANSFORMATION: -1.5,
  CONFLICT: 0,
  LOCATION: 1.8,
  ARTIFACT: -2,
  FACTION: 1.2,
  CONSEQUENCE: 0.8,
  ENDING: 0,
};

const TYPE_Z_STEP: Record<CinematicSceneType, number> = {
  ORIGIN: 0,
  EVENT: 10,
  RELATIONSHIP: 8,
  TRANSFORMATION: 9,
  CONFLICT: 7,
  LOCATION: 8,
  ARTIFACT: 7,
  FACTION: 8,
  CONSEQUENCE: 7,
  ENDING: 12,
};

export function layoutScenes(
  scenes: Omit<CinematicScene, "coordinates" | "graphTarget">[],
  journeyId: string,
): CinematicScene[] {
  const seed = hashSeed(journeyId);
  let z = 0;
  const count = scenes.length;

  return scenes.map((scene, index) => {
    const xBase = TYPE_X_OFFSET[scene.type] ?? 0;
    const xJitter = (seededUnit(seed, index * 3) - 0.5) * 2;
    const yJitter = (seededUnit(seed, index * 3 + 1) - 0.5) * 1.5;
    const zStep = TYPE_Z_STEP[scene.type] ?? 8;

    if (index > 0) z += zStep;

    const worldScale = scene.worldScale ?? (scene.type === "EVENT" ? 1.8 : 1);
    const x = xBase + xJitter + (scene.type === "RELATIONSHIP" ? index * 0.4 : 0);
    const y = yJitter + (scene.type === "TRANSFORMATION" ? 1.2 : 0);

    const coordinates: CinematicCoordinates = { x, y, z };

    const graphAngle = (index / Math.max(1, count - 1)) * Math.PI * 1.6 - Math.PI * 0.8;
    const graphRadius = 3 + index * 0.35;
    const graphTarget: CinematicCoordinates = {
      x: Math.cos(graphAngle) * graphRadius,
      y: Math.sin(graphAngle) * graphRadius * 0.4,
      z: index * 0.5,
    };

    return {
      ...scene,
      coordinates,
      graphTarget,
      worldScale,
    };
  });
}

export function collapseToGraphLayout(
  scenes: CinematicScene[],
  progress: number,
): CinematicCoordinates[] {
  const p = Math.max(0, Math.min(1, progress));
  return scenes.map((scene) => ({
    x: scene.coordinates.x + (scene.graphTarget!.x - scene.coordinates.x) * p,
    y: scene.coordinates.y + (scene.graphTarget!.y - scene.coordinates.y) * p,
    z: scene.coordinates.z + (scene.graphTarget!.z - scene.coordinates.z) * p,
  }));
}
