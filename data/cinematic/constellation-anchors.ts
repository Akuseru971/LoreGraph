import type { ChampionConstellation } from "@/types";

/** Hand-curated constellation silhouettes for flagship champion intros/outros. */
export const CHAMPION_CONSTELLATIONS: ChampionConstellation[] = [
  {
    id: "constellation:aatrox",
    characterId: "char:aatrox",
    heroStarId: "blade-core",
    anchors: [
      { id: "crown", x: 0.5, y: 0.1, importance: "SECONDARY", connectsTo: ["left-shoulder", "right-shoulder"] },
      { id: "left-wing", x: 0.1, y: 0.34, importance: "SECONDARY", connectsTo: ["left-shoulder", "left-claw"] },
      { id: "right-wing", x: 0.9, y: 0.34, importance: "SECONDARY", connectsTo: ["right-shoulder", "right-claw"] },
      { id: "left-shoulder", x: 0.3, y: 0.26, importance: "SECONDARY", connectsTo: ["crown", "body-core"] },
      { id: "right-shoulder", x: 0.7, y: 0.26, importance: "SECONDARY", connectsTo: ["crown", "body-core"] },
      { id: "blade-tip", x: 0.74, y: 0.14, importance: "SECONDARY", connectsTo: ["blade-core"] },
      { id: "blade-core", x: 0.56, y: 0.4, importance: "PRIMARY", connectsTo: ["body-core", "blade-tip"] },
      { id: "body-core", x: 0.5, y: 0.52, importance: "SECONDARY", connectsTo: ["left-foot", "right-foot"] },
      { id: "left-claw", x: 0.18, y: 0.52, importance: "SECONDARY", connectsTo: ["left-wing"] },
      { id: "right-claw", x: 0.82, y: 0.52, importance: "SECONDARY", connectsTo: ["right-wing"] },
      { id: "left-foot", x: 0.36, y: 0.88, importance: "SECONDARY", connectsTo: ["body-core"] },
      { id: "right-foot", x: 0.64, y: 0.88, importance: "SECONDARY", connectsTo: ["body-core"] },
    ],
  },
  {
    id: "constellation:yasuo",
    characterId: "char:yasuo",
    heroStarId: "wind-blade",
    anchors: [
      { id: "head", x: 0.52, y: 0.12, importance: "SECONDARY", connectsTo: ["torso", "scarf"] },
      { id: "wind-blade", x: 0.7, y: 0.08, importance: "PRIMARY", connectsTo: ["right-hand", "torso"] },
      { id: "left-hand", x: 0.26, y: 0.36, importance: "SECONDARY", connectsTo: ["torso", "lower-blade"] },
      { id: "right-hand", x: 0.72, y: 0.3, importance: "SECONDARY", connectsTo: ["wind-blade", "torso"] },
      { id: "torso", x: 0.5, y: 0.4, importance: "SECONDARY", connectsTo: ["left-foot", "right-foot"] },
      { id: "scarf", x: 0.78, y: 0.22, importance: "SECONDARY", connectsTo: ["head"] },
      { id: "lower-blade", x: 0.34, y: 0.72, importance: "SECONDARY", connectsTo: ["left-hand"] },
      { id: "left-foot", x: 0.4, y: 0.9, importance: "SECONDARY", connectsTo: ["torso"] },
      { id: "right-foot", x: 0.58, y: 0.86, importance: "SECONDARY", connectsTo: ["torso"] },
    ],
  },
  {
    id: "constellation:yone",
    characterId: "char:yone",
    heroStarId: "spirit-blade",
    anchors: [
      { id: "mask", x: 0.5, y: 0.13, importance: "SECONDARY", connectsTo: ["torso", "spirit-cord"] },
      { id: "left-blade", x: 0.2, y: 0.42, importance: "SECONDARY", connectsTo: ["left-hand", "torso"] },
      { id: "spirit-blade", x: 0.8, y: 0.36, importance: "PRIMARY", connectsTo: ["right-hand", "torso"] },
      { id: "left-hand", x: 0.28, y: 0.38, importance: "SECONDARY", connectsTo: ["left-blade"] },
      { id: "right-hand", x: 0.72, y: 0.32, importance: "SECONDARY", connectsTo: ["spirit-blade"] },
      { id: "torso", x: 0.5, y: 0.44, importance: "SECONDARY", connectsTo: ["left-leg", "right-leg"] },
      { id: "spirit-cord", x: 0.56, y: 0.56, importance: "SECONDARY", connectsTo: ["mask", "torso"] },
      { id: "left-leg", x: 0.4, y: 0.86, importance: "SECONDARY", connectsTo: ["torso"] },
      { id: "right-leg", x: 0.6, y: 0.88, importance: "SECONDARY", connectsTo: ["torso"] },
    ],
  },
  {
    id: "constellation:viego",
    characterId: "char:viego",
    heroStarId: "soul-blade",
    anchors: [
      { id: "crown", x: 0.5, y: 0.1, importance: "SECONDARY", connectsTo: ["left-shoulder", "right-shoulder"] },
      { id: "soul-blade", x: 0.66, y: 0.24, importance: "PRIMARY", connectsTo: ["right-shoulder", "torso"] },
      { id: "left-shoulder", x: 0.32, y: 0.28, importance: "SECONDARY", connectsTo: ["crown", "cape-left"] },
      { id: "right-shoulder", x: 0.68, y: 0.28, importance: "SECONDARY", connectsTo: ["crown", "soul-blade"] },
      { id: "torso", x: 0.5, y: 0.48, importance: "SECONDARY", connectsTo: ["base"] },
      { id: "cape-left", x: 0.14, y: 0.54, importance: "SECONDARY", connectsTo: ["left-shoulder"] },
      { id: "cape-right", x: 0.86, y: 0.54, importance: "SECONDARY", connectsTo: ["right-shoulder"] },
      { id: "base", x: 0.5, y: 0.88, importance: "SECONDARY", connectsTo: ["torso"] },
    ],
  },
  {
    id: "constellation:skarner",
    characterId: "char:skarner",
    heroStarId: "stinger",
    anchors: [
      { id: "crest", x: 0.5, y: 0.1, importance: "SECONDARY", connectsTo: ["head", "segment-1"] },
      { id: "head", x: 0.5, y: 0.18, importance: "SECONDARY", connectsTo: ["left-claw", "right-claw"] },
      { id: "left-claw", x: 0.14, y: 0.34, importance: "SECONDARY", connectsTo: ["head", "segment-1"] },
      { id: "right-claw", x: 0.86, y: 0.34, importance: "SECONDARY", connectsTo: ["head", "segment-1"] },
      { id: "segment-1", x: 0.5, y: 0.34, importance: "SECONDARY", connectsTo: ["segment-2"] },
      { id: "segment-2", x: 0.5, y: 0.5, importance: "SECONDARY", connectsTo: ["segment-3"] },
      { id: "segment-3", x: 0.5, y: 0.66, importance: "SECONDARY", connectsTo: ["left-leg", "right-leg"] },
      { id: "stinger", x: 0.72, y: 0.2, importance: "PRIMARY", connectsTo: ["segment-1"] },
      { id: "left-leg", x: 0.3, y: 0.78, importance: "SECONDARY", connectsTo: ["segment-3"] },
      { id: "right-leg", x: 0.7, y: 0.78, importance: "SECONDARY", connectsTo: ["segment-3"] },
    ],
  },
];

export const constellationById = new Map(
  CHAMPION_CONSTELLATIONS.map((c) => [c.id, c]),
);

export const constellationByCharacterId = new Map(
  CHAMPION_CONSTELLATIONS.map((c) => [c.characterId, c]),
);
