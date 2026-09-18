import type { CinematicScene, WorldNodeArchetype } from "@/types";

export interface WorldNodeArchetypeConfig {
  archetype: WorldNodeArchetype;
  ringCount: number;
  horizontalScale: number;
  verticalBeam: boolean;
  convergingPaths: boolean;
  inwardPressure: boolean;
  outwardPulse: boolean;
  particleChaos: number;
  directionalLines: boolean;
}

export const WORLD_NODE_ARCHETYPES: Record<WorldNodeArchetype, WorldNodeArchetypeConfig> = {
  WAR: {
    archetype: "WAR",
    ringCount: 4,
    horizontalScale: 1.6,
    verticalBeam: false,
    convergingPaths: true,
    inwardPressure: false,
    outwardPulse: false,
    particleChaos: 0.7,
    directionalLines: true,
  },
  INVASION: {
    archetype: "INVASION",
    ringCount: 3,
    horizontalScale: 1.8,
    verticalBeam: false,
    convergingPaths: false,
    inwardPressure: true,
    outwardPulse: false,
    particleChaos: 0.5,
    directionalLines: true,
  },
  CATASTROPHE: {
    archetype: "CATASTROPHE",
    ringCount: 3,
    horizontalScale: 1.3,
    verticalBeam: true,
    convergingPaths: true,
    inwardPressure: true,
    outwardPulse: true,
    particleChaos: 0.9,
    directionalLines: false,
  },
  ASCENSION: {
    archetype: "ASCENSION",
    ringCount: 4,
    horizontalScale: 1.1,
    verticalBeam: true,
    convergingPaths: false,
    inwardPressure: false,
    outwardPulse: true,
    particleChaos: 0.2,
    directionalLines: false,
  },
  MAGICAL_RUPTURE: {
    archetype: "MAGICAL_RUPTURE",
    ringCount: 2,
    horizontalScale: 1.2,
    verticalBeam: true,
    convergingPaths: false,
    inwardPressure: false,
    outwardPulse: true,
    particleChaos: 0.85,
    directionalLines: false,
  },
  POLITICAL_CHANGE: {
    archetype: "POLITICAL_CHANGE",
    ringCount: 2,
    horizontalScale: 1.4,
    verticalBeam: false,
    convergingPaths: false,
    inwardPressure: false,
    outwardPulse: false,
    particleChaos: 0.3,
    directionalLines: true,
  },
  IMPRISONMENT: {
    archetype: "IMPRISONMENT",
    ringCount: 3,
    horizontalScale: 0.75,
    verticalBeam: false,
    convergingPaths: true,
    inwardPressure: true,
    outwardPulse: false,
    particleChaos: 0.15,
    directionalLines: false,
  },
  RETURN: {
    archetype: "RETURN",
    ringCount: 1,
    horizontalScale: 0.9,
    verticalBeam: true,
    convergingPaths: false,
    inwardPressure: false,
    outwardPulse: true,
    particleChaos: 0.25,
    directionalLines: false,
  },
};

export function inferWorldNodeArchetype(scene: CinematicScene): WorldNodeArchetype | null {
  if (scene.worldNodeArchetype) return scene.worldNodeArchetype;
  if (scene.eventId?.includes("noxian-invasion")) return "INVASION";
  if (scene.eventId?.includes("ruination")) return "CATASTROPHE";
  if (scene.eventId?.includes("void")) return "CATASTROPHE";
  if (scene.eventId?.includes("ascension")) return "ASCENSION";
  if (scene.eventId?.includes("darkin-war")) return "WAR";
  if (scene.eventId?.includes("aatrox-return") || scene.title.toLowerCase().includes("sealed")) {
    return "IMPRISONMENT";
  }
  if (scene.relationshipChoreography === "TRANSFORM") return "RETURN";
  if ((scene.worldScale ?? 1) >= 2.4) return "INVASION";
  if ((scene.worldScale ?? 1) >= 2) return "WAR";
  return null;
}

export function worldNodeConfig(scene: CinematicScene): WorldNodeArchetypeConfig | null {
  const archetype = inferWorldNodeArchetype(scene);
  if (!archetype) return null;
  return WORLD_NODE_ARCHETYPES[archetype];
}
