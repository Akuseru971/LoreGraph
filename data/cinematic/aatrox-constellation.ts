import type { ChampionConstellation } from "@/types";

/**
 * High-fidelity Aatrox constellation curated for the splash art crop
 * (focal ~0.52, 0.30) — winged Darkin silhouette, blade raised right.
 */
export const AATROX_CONSTELLATION: ChampionConstellation = {
  id: "constellation:aatrox",
  characterId: "char:aatrox",
  heroStarId: "blade-core",
  anchors: [
    // —— PRIMARY landmarks ——
    { id: "horn-left", x: 0.44, y: 0.07, importance: "PRIMARY", connectsTo: ["crown", "head-core"] },
    { id: "horn-right", x: 0.56, y: 0.07, importance: "PRIMARY", connectsTo: ["crown", "head-core"] },
    { id: "crown", x: 0.5, y: 0.1, importance: "PRIMARY", connectsTo: ["left-shoulder", "right-shoulder"] },
    { id: "head-core", x: 0.5, y: 0.14, importance: "PRIMARY", connectsTo: ["crown", "chest"] },
    { id: "left-shoulder", x: 0.28, y: 0.22, importance: "PRIMARY", connectsTo: ["crown", "left-wing-root", "chest"] },
    { id: "right-shoulder", x: 0.72, y: 0.22, importance: "PRIMARY", connectsTo: ["crown", "right-wing-root", "chest"] },
    { id: "left-wing-root", x: 0.18, y: 0.28, importance: "PRIMARY", connectsTo: ["left-shoulder", "left-wing-tip"] },
    { id: "left-wing-tip", x: 0.04, y: 0.36, importance: "PRIMARY", connectsTo: ["left-wing-root"] },
    { id: "right-wing-root", x: 0.82, y: 0.28, importance: "PRIMARY", connectsTo: ["right-shoulder", "right-wing-tip"] },
    { id: "right-wing-tip", x: 0.96, y: 0.36, importance: "PRIMARY", connectsTo: ["right-wing-root"] },
    { id: "chest", x: 0.5, y: 0.3, importance: "PRIMARY", connectsTo: ["blade-grip", "hips"] },
    { id: "blade-grip", x: 0.58, y: 0.26, importance: "PRIMARY", connectsTo: ["blade-core", "chest", "right-hand"] },
    { id: "blade-core", x: 0.64, y: 0.2, importance: "PRIMARY", connectsTo: ["blade-grip", "blade-mid", "blade-tip"] },
    { id: "blade-mid", x: 0.7, y: 0.12, importance: "PRIMARY", connectsTo: ["blade-core", "blade-tip"] },
    { id: "blade-tip", x: 0.78, y: 0.05, importance: "PRIMARY", connectsTo: ["blade-mid"] },
    { id: "right-hand", x: 0.66, y: 0.28, importance: "PRIMARY", connectsTo: ["blade-grip", "right-shoulder"] },
    { id: "left-hand", x: 0.34, y: 0.34, importance: "PRIMARY", connectsTo: ["left-shoulder", "left-claw"] },
    { id: "left-claw", x: 0.22, y: 0.42, importance: "PRIMARY", connectsTo: ["left-hand"] },
    { id: "hips", x: 0.5, y: 0.48, importance: "PRIMARY", connectsTo: ["chest", "left-thigh", "right-thigh"] },
    { id: "left-thigh", x: 0.4, y: 0.62, importance: "PRIMARY", connectsTo: ["hips", "left-foot"] },
    { id: "right-thigh", x: 0.6, y: 0.62, importance: "PRIMARY", connectsTo: ["hips", "right-foot"] },
    { id: "left-foot", x: 0.36, y: 0.88, importance: "PRIMARY", connectsTo: ["left-thigh"] },
    { id: "right-foot", x: 0.64, y: 0.88, importance: "PRIMARY", connectsTo: ["right-thigh"] },

    // —— SECONDARY structure ——
    { id: "left-wing-mid", x: 0.1, y: 0.32, importance: "SECONDARY", connectsTo: ["left-wing-root", "left-wing-tip"] },
    { id: "right-wing-mid", x: 0.9, y: 0.32, importance: "SECONDARY", connectsTo: ["right-wing-root", "right-wing-tip"] },
    { id: "torso-mid", x: 0.5, y: 0.38, importance: "SECONDARY", connectsTo: ["chest", "hips"] },
    { id: "blade-edge", x: 0.74, y: 0.08, importance: "SECONDARY", connectsTo: ["blade-mid"] },

    // —— MICRO contour (density, no required lines) ——
    { id: "m-lw-1", x: 0.08, y: 0.3, importance: "MICRO" },
    { id: "m-lw-2", x: 0.06, y: 0.34, importance: "MICRO" },
    { id: "m-lw-3", x: 0.12, y: 0.35, importance: "MICRO" },
    { id: "m-rw-1", x: 0.92, y: 0.3, importance: "MICRO" },
    { id: "m-rw-2", x: 0.94, y: 0.34, importance: "MICRO" },
    { id: "m-rw-3", x: 0.88, y: 0.35, importance: "MICRO" },
    { id: "m-horn-l", x: 0.42, y: 0.09, importance: "MICRO" },
    { id: "m-horn-r", x: 0.58, y: 0.09, importance: "MICRO" },
    { id: "m-blade-1", x: 0.68, y: 0.16, importance: "MICRO" },
    { id: "m-blade-2", x: 0.72, y: 0.1, importance: "MICRO" },
    { id: "m-blade-3", x: 0.76, y: 0.06, importance: "MICRO" },
    { id: "m-arm-l", x: 0.3, y: 0.3, importance: "MICRO" },
    { id: "m-arm-r", x: 0.7, y: 0.3, importance: "MICRO" },
    { id: "m-leg-l", x: 0.38, y: 0.74, importance: "MICRO" },
    { id: "m-leg-r", x: 0.62, y: 0.74, importance: "MICRO" },
    { id: "m-cape-l", x: 0.14, y: 0.44, importance: "MICRO" },
    { id: "m-cape-r", x: 0.86, y: 0.44, importance: "MICRO" },
    { id: "m-spine", x: 0.5, y: 0.42, importance: "MICRO" },
    { id: "m-knee-l", x: 0.38, y: 0.76, importance: "MICRO" },
    { id: "m-knee-r", x: 0.62, y: 0.76, importance: "MICRO" },
  ],
};

/** Maps journey scene IDs to constellation anchor targets for outro assembly. */
export const AATROX_PATH_TO_ANCHOR: Record<string, string> = {
  "cscene:aatrox:beat:aatrox-1": "crown",
  "cscene:aatrox:beat:aatrox-2": "left-wing-tip",
  "cscene:aatrox:beat:aatrox-3": "chest",
  "cscene:aatrox:beat:aatrox-4": "right-wing-tip",
  "cscene:aatrox:beat:aatrox-5": "blade-core",
  "cscene:aatrox:beat:aatrox-6": "blade-grip",
  "cscene:aatrox:beat:aatrox-7": "blade-tip",
};
