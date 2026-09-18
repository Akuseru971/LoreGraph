import type {
  CinematicAssetQualityStatus,
  CinematicComposition,
  CinematicSceneAssetRelevance,
  CinematicShotType,
  EnvironmentalMotifType,
  WorldNodeArchetype,
} from "@/types";

export interface FlagshipSceneAssetEntry {
  sceneId: string;
  journeyId: string;
  visualSubject: string;
  requiredVisualSubject: string;
  shotType: CinematicShotType;
  worldNodeArchetype?: WorldNodeArchetype;
  environmentalMotifs: EnvironmentalMotifType[];
  composition: CinematicComposition;
  qualityStatus: CinematicAssetQualityStatus;
  officialAsset?: {
    url: string;
    sourceEntityId?: string;
    assetKey?: string;
    relevance: CinematicSceneAssetRelevance;
    focalPoint?: { x: number; y: number };
    aspectRatio?: number;
    source?: string;
    assetType?: "event" | "region" | "artifact" | "story" | "champion";
  };
  narrativePhrases?: string[];
}

export const FLAGSHIP_JOURNEY_IDS = [
  "cinematic:character:aatrox",
  "cinematic:character:yasuo",
  "cinematic:character:yone",
  "cinematic:connection:yasuo:yone",
  "cinematic:character:viego",
  "cinematic:character:skarner",
] as const;

const EVENT = "/assets/events";
const ARTIFACT = "/assets/artifacts";

export const FLAGSHIP_SCENE_ASSETS: FlagshipSceneAssetEntry[] = [
  // —— Aatrox ——
  {
    sceneId: "cscene:aatrox:origin",
    journeyId: "cinematic:character:aatrox",
    visualSubject: "Aatrox, the Darkin Blade",
    requiredVisualSubject: "Aatrox introduction",
    shotType: "ESTABLISHING",
    environmentalMotifs: ["SUN_DISC", "SHURIMA_ARCHES"],
    composition: "CENTER_REVEAL",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Once Shurima's greatest champion, Aatrox was raised by the Sun Disc.",
      "He was made to fight wars no mortal army could survive.",
    ],
  },
  {
    sceneId: "cscene:aatrox:beat:aatrox-1",
    journeyId: "cinematic:character:aatrox",
    visualSubject: "Shuriman Ascension",
    requiredVisualSubject: "Ascension ritual",
    shotType: "REVEAL",
    worldNodeArchetype: "ASCENSION",
    environmentalMotifs: ["SUN_DISC", "SHURIMA_ARCHES"],
    composition: "DISTANT_WORLD",
    qualityStatus: "CURATED",
    officialAsset: {
      url: `${EVENT}/golden-age-shurima.webp`,
      sourceEntityId: "event:ascension-ritual",
      assetKey: "shurima-ascension",
      relevance: "EXACT_EVENT",
      focalPoint: { x: 0.5, y: 0.25 },
      aspectRatio: 16 / 9,
      source: "Riot Games — Shurima",
      assetType: "event",
    },
    narrativePhrases: [
      "Chosen as one of Shurima's god-warriors, Aatrox was given power by the Sun Disc.",
    ],
  },
  {
    sceneId: "cscene:aatrox:beat:aatrox-2",
    journeyId: "cinematic:character:aatrox",
    visualSubject: "Void War / Icathia incursion",
    requiredVisualSubject: "Void incursion",
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "CATASTROPHE",
    environmentalMotifs: ["VOID_RIFT", "VOID_FILAMENTS"],
    composition: "DISTANT_WORLD",
    qualityStatus: "CURATED",
    officialAsset: {
      url: `${EVENT}/void-war.webp`,
      sourceEntityId: "event:void-incursion",
      assetKey: "void-incursion",
      relevance: "EXACT_EVENT",
      focalPoint: { x: 0.5, y: 0.35 },
      aspectRatio: 16 / 9,
      source: "Riot Games — Void War",
      assetType: "event",
    },
    narrativePhrases: [
      "Aatrox fought as one of Shurima's defenders against the Void.",
      "The world changed during that war.",
    ],
  },
  {
    sceneId: "cscene:aatrox:beat:aatrox-3",
    journeyId: "cinematic:character:aatrox",
    visualSubject: "Darkin corruption",
    requiredVisualSubject: "Darkin transformation",
    shotType: "TRANSFORMATION",
    worldNodeArchetype: "MAGICAL_RUPTURE",
    environmentalMotifs: ["VOID_FILAMENTS", "SHURIMA_ARCHES"],
    composition: "NO_IMAGE",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Something in the Ascended broke during those centuries.",
      "Corruption spread among the survivors.",
    ],
  },
  {
    sceneId: "cscene:aatrox:beat:aatrox-4",
    journeyId: "cinematic:character:aatrox",
    visualSubject: "Darkin War",
    requiredVisualSubject: "Great Darkin War",
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "WAR",
    environmentalMotifs: ["SHURIMA_ARCHES", "NOXIAN_ASH"],
    composition: "DISTANT_WORLD",
    qualityStatus: "CURATED",
    officialAsset: {
      url: `${EVENT}/great-darkin-war.webp`,
      sourceEntityId: "event:darkin-war",
      assetKey: "darkin-war",
      relevance: "EXACT_EVENT",
      focalPoint: { x: 0.6, y: 0.28 },
      aspectRatio: 16 / 9,
      source: "Twilight of the Gods",
      assetType: "event",
    },
  },
  {
    sceneId: "cscene:aatrox:beat:aatrox-5",
    journeyId: "cinematic:character:aatrox",
    visualSubject: "Sealed inside the blade",
    requiredVisualSubject: "Darkin imprisonment",
    shotType: "AFTERMATH",
    worldNodeArchetype: "IMPRISONMENT",
    environmentalMotifs: ["SHURIMA_ARCHES"],
    composition: "NO_IMAGE",
    qualityStatus: "CURATED",
    officialAsset: {
      url: `${ARTIFACT}/darkin-blade-aatrox.webp`,
      sourceEntityId: "artifact:darkin-blade-aatrox",
      relevance: "EXACT_ARTIFACT",
      focalPoint: { x: 0.5, y: 0.4 },
      aspectRatio: 16 / 9,
      source: "Riot Games",
      assetType: "artifact",
    },
    narrativePhrases: [
      "Aatrox was sealed inside the sword he fought with after the Darkin War.",
    ],
  },
  {
    sceneId: "cscene:aatrox:beat:aatrox-7",
    journeyId: "cinematic:character:aatrox",
    visualSubject: "Duel with the Aspect of War",
    requiredVisualSubject: "Aatrox vs Pantheon",
    shotType: "IMPACT",
    environmentalMotifs: ["TARGON_CONSTELLATIONS", "CELESTIAL_ORBITS"],
    composition: "NO_IMAGE",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Aatrox destroyed the celestial Aspect of War within Atreus.",
      "Atreus survived.",
    ],
  },
  // —— Yasuo ↔ Yone ——
  {
    sceneId: "cscene:yasuo-yone:parallel",
    journeyId: "cinematic:connection:yasuo:yone",
    visualSubject: "Brothers of Ionia",
    requiredVisualSubject: "Yasuo and Yone parallel journey",
    shotType: "DUAL_CHARACTER",
    environmentalMotifs: ["IONIAN_SPIRIT_ARCS", "IONIAN_FLOATING_LIGHTS"],
    composition: "NO_IMAGE",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Yasuo and Yone grew up as brothers in Ionia.",
      "Two paths that began in parallel.",
    ],
  },
  {
    sceneId: "cscene:yasuo-yone:invasion",
    journeyId: "cinematic:connection:yasuo:yone",
    visualSubject: "Noxian invasion of Ionia",
    requiredVisualSubject: "Noxian Invasion",
    shotType: "WIDE_EVENT",
    worldNodeArchetype: "INVASION",
    environmentalMotifs: ["IONIAN_SPIRIT_ARCS", "NOXIAN_MONOLITHS", "NOXIAN_ASH"],
    composition: "DISTANT_WORLD",
    qualityStatus: "CURATED",
    officialAsset: {
      url: `${EVENT}/noxian-invasion-ionia.webp`,
      sourceEntityId: "event:noxian-invasion-ionia",
      assetKey: "ionian-war",
      relevance: "EXACT_EVENT",
      focalPoint: { x: 0.5, y: 0.32 },
      aspectRatio: 16 / 9,
      source: "Riot Games — Warriors",
      assetType: "event",
    },
    narrativePhrases: [
      "Noxus invaded Ionia, pulling both brothers into a war neither was prepared for.",
    ],
  },
  {
    sceneId: "cscene:yasuo-yone:accusation",
    journeyId: "cinematic:connection:yasuo:yone",
    visualSubject: "Elder Souma falls",
    requiredVisualSubject: "Elder Souma / accusation",
    shotType: "AFTERMATH",
    environmentalMotifs: ["IONIAN_SPIRIT_ARCS"],
    composition: "NO_IMAGE",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "An Ionian elder died. Yasuo was blamed.",
      "The distance between the brothers began to grow.",
    ],
  },
  {
    sceneId: "cscene:yasuo-yone:duel",
    journeyId: "cinematic:connection:yasuo:yone",
    visualSubject: "Brothers' duel",
    requiredVisualSubject: "Yasuo vs Yone duel",
    shotType: "IMPACT",
    environmentalMotifs: ["IONIAN_SPIRIT_ARCS"],
    composition: "NO_IMAGE",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Yone hunted Yasuo for the elder's death.",
      "Their paths converged — and only one walked away.",
    ],
  },
  {
    sceneId: "cscene:yasuo-yone:fade",
    journeyId: "cinematic:connection:yasuo:yone",
    visualSubject: "Yone falls",
    requiredVisualSubject: "Yone's death",
    shotType: "AFTERMATH",
    environmentalMotifs: ["IONIAN_FLOATING_LIGHTS"],
    composition: "NO_IMAGE",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Yone's light faded in the duel.",
      "Yasuo survived — carrying a guilt the story would not let him escape.",
    ],
  },
  {
    sceneId: "cscene:yasuo-yone:return",
    journeyId: "cinematic:connection:yasuo:yone",
    visualSubject: "Yone's azakana return",
    requiredVisualSubject: "Yone transformation",
    shotType: "TRANSFORMATION",
    worldNodeArchetype: "RETURN",
    environmentalMotifs: ["IONIAN_SPIRIT_ARCS", "SHADOW_WISPS"],
    composition: "CENTER_REVEAL",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Yone returned changed — bound to an azakana mask.",
      "Hunting spirits in a different light.",
    ],
  },
  {
    sceneId: "cscene:yasuo-yone:ending",
    journeyId: "cinematic:connection:yasuo:yone",
    visualSubject: "Two threads in the constellation",
    requiredVisualSubject: "Connection pullback",
    shotType: "PULLBACK",
    environmentalMotifs: ["TARGON_CONSTELLATIONS", "CELESTIAL_ORBITS"],
    composition: "NO_IMAGE",
    qualityStatus: "ABSTRACT_REQUIRED",
    narrativePhrases: [
      "Two brothers, one invasion, one duel.",
      "Two paths that no longer run parallel — but still belong to the same constellation.",
    ],
  },
  // —— Viego ——
  {
    sceneId: "cscene:viego:origin",
    journeyId: "cinematic:character:viego",
    visualSubject: "Viego, the Ruined King",
    requiredVisualSubject: "Ruination catastrophe",
    shotType: "ESTABLISHING",
    worldNodeArchetype: "CATASTROPHE",
    environmentalMotifs: ["SHADOW_WISPS", "SHADOW_ARCHES"],
    composition: "DISTANT_WORLD",
    qualityStatus: "CURATED",
    officialAsset: {
      url: `${EVENT}/ruination-helia.webp`,
      sourceEntityId: "event:the-ruination",
      assetKey: "ruination",
      relevance: "EXACT_EVENT",
      focalPoint: { x: 0.55, y: 0.3 },
      aspectRatio: 16 / 9,
      source: "Riot Games — Ruination",
      assetType: "event",
    },
    narrativePhrases: [
      "Viego's grief shattered the Blessed Isles.",
      "Ruination spread from a single king's refusal to let go.",
    ],
  },
];

export const flagshipAssetBySceneId = new Map(
  FLAGSHIP_SCENE_ASSETS.map((e) => [e.sceneId, e]),
);
