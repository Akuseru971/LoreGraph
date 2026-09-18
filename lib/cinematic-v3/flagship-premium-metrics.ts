import {
  FLAGSHIP_SCENE_ASSETS,
  FLAGSHIP_JOURNEY_IDS,
} from "@/data/cinematic/flagship-assets";
import { characters } from "@/data/characters";
import { constellationByCharacterId } from "@/data/cinematic/constellation-anchors";
import { applyFlagshipCurations } from "./apply-flagship";
import { buildChampionJourneyV3 } from "./build-champion-journey";
import { buildConnectionJourneyV3 } from "./build-connection-journey";
import { computeContourConnectivity } from "./constellation-connectivity";
import {
  AATROX_RECORD_INTRO_TIMING,
  AATROX_RECORD_OUTRO_TIMING,
} from "./aatrox-cinematic-direction";
import { recordTimingForScene, totalSceneRecordMs } from "./record-mode";
import { totalIntroMs } from "./intro-outro";
import type { CinematicJourney } from "@/types";

const EXACT_RELEVANCE = new Set([
  "EXACT_EVENT",
  "EXACT_STORY",
  "EXACT_ARTIFACT",
  "OFFICIAL_CINEMATIC_STILL",
]);

const CONTEXTUAL_RELEVANCE = new Set([
  "CHARACTER_CONTEXT",
  "EXACT_LOCATION",
  "REGION_CONTEXT",
]);

function buildJourney(id: string): CinematicJourney | null {
  if (id === "cinematic:connection:yasuo:yone") {
    const yasuo = characters.find((c) => c.slug === "yasuo")!;
    const yone = characters.find((c) => c.slug === "yone")!;
    const j = buildConnectionJourneyV3(yasuo, yone);
    return j ? applyFlagshipCurations(j) : null;
  }
  const slug = id.replace("cinematic:character:", "");
  const c = characters.find((ch) => ch.slug === slug);
  if (!c) return null;
  return applyFlagshipCurations(buildChampionJourneyV3(c));
}

function isHorizontal(url: string, aspectRatio?: number): boolean {
  if (aspectRatio !== undefined) return aspectRatio >= 1.2;
  return !url.includes("9x16") && !url.includes("4x5");
}

function isNineSixteen(url: string, aspectRatio?: number): boolean {
  if (aspectRatio !== undefined) return aspectRatio < 0.7;
  return url.includes("9x16");
}

function isGenericRegion(url: string): boolean {
  return url.includes("/regions/ionia") || url.includes("/regions/ixtal");
}

export interface FlagshipPremiumMetrics {
  aatroxAnchorCount: number;
  aatroxIconicConnectivityPct: number;
  aatroxPrimaryConnectivityPct: number;
  aatroxLineSkipDefault: number;
  introTimingMs: number;
  outroTimingMs: number;
  standardSceneAvgMs: number;
  majorEventAvgMs: number;
  flagshipScenesReviewed: number;
  horizontalAssetPct: number;
  nineSixteenFallbackCount: number;
  genericRegionFallbackCount: number;
  exactAssetPct: number;
  contextualAssetPct: number;
  thematicAssetPct: number;
  qualityBreakdown: Record<string, number>;
}

export function computeFlagshipPremiumMetrics(): FlagshipPremiumMetrics {
  const aatroxConstellation = constellationByCharacterId.get("char:aatrox");
  const connectivity = aatroxConstellation
    ? computeContourConnectivity(aatroxConstellation)
    : null;

  let horizontal = 0;
  let nineSixteen = 0;
  let genericRegion = 0;
  let exact = 0;
  let contextual = 0;
  let thematic = 0;
  const qualityBreakdown: Record<string, number> = {};

  for (const entry of FLAGSHIP_SCENE_ASSETS) {
    const asset = entry.officialAsset;
    if (!asset) continue;
    qualityBreakdown[entry.qualityStatus] =
      (qualityBreakdown[entry.qualityStatus] ?? 0) + 1;
    if (isHorizontal(asset.url, asset.aspectRatio)) horizontal++;
    if (isNineSixteen(asset.url, asset.aspectRatio)) nineSixteen++;
    if (isGenericRegion(asset.url)) genericRegion++;
    if (EXACT_RELEVANCE.has(asset.relevance)) exact++;
    else if (CONTEXTUAL_RELEVANCE.has(asset.relevance)) contextual++;
    else thematic++;
  }

  const total = FLAGSHIP_SCENE_ASSETS.filter((e) => e.officialAsset).length;

  const journeys = FLAGSHIP_JOURNEY_IDS.map((id) => buildJourney(id)).filter(Boolean) as CinematicJourney[];
  const standardDurations: number[] = [];
  const majorDurations: number[] = [];

  for (const journey of journeys) {
    for (const scene of journey.scenes) {
      const ms = totalSceneRecordMs(scene);
      const isMajor =
        (scene.worldScale ?? 1) >= 2 || scene.worldNodeArchetype === "INVASION";
      if (isMajor) majorDurations.push(ms);
      else if (scene.type !== "ENDING") standardDurations.push(ms);
    }
  }

  const outroTimingMs =
    AATROX_RECORD_OUTRO_TIMING.pullbackMs +
    AATROX_RECORD_OUTRO_TIMING.pathRevealMs +
    AATROX_RECORD_OUTRO_TIMING.nodesConnectMs +
    AATROX_RECORD_OUTRO_TIMING.constellationReformMs +
    AATROX_RECORD_OUTRO_TIMING.splashEchoMs +
    AATROX_RECORD_OUTRO_TIMING.holdMs;

  return {
    aatroxAnchorCount: connectivity?.anchorCount ?? 0,
    aatroxIconicConnectivityPct: connectivity?.iconicConnectivityPct ?? 0,
    aatroxPrimaryConnectivityPct: connectivity?.primaryConnectivityPct ?? 0,
    aatroxLineSkipDefault: 0.08,
    introTimingMs: totalIntroMs(AATROX_RECORD_INTRO_TIMING),
    outroTimingMs,
    standardSceneAvgMs:
      standardDurations.length > 0
        ? Math.round(standardDurations.reduce((a, b) => a + b, 0) / standardDurations.length)
        : 0,
    majorEventAvgMs:
      majorDurations.length > 0
        ? Math.round(majorDurations.reduce((a, b) => a + b, 0) / majorDurations.length)
        : 0,
    flagshipScenesReviewed: FLAGSHIP_SCENE_ASSETS.length,
    horizontalAssetPct: total > 0 ? Math.round((horizontal / total) * 1000) / 10 : 0,
    nineSixteenFallbackCount: nineSixteen,
    genericRegionFallbackCount: genericRegion,
    exactAssetPct: total > 0 ? Math.round((exact / total) * 1000) / 10 : 0,
    contextualAssetPct: total > 0 ? Math.round((contextual / total) * 1000) / 10 : 0,
    thematicAssetPct: total > 0 ? Math.round((thematic / total) * 1000) / 10 : 0,
    qualityBreakdown,
  };
}

export function averageSceneMsForJourney(journey: CinematicJourney): number {
  const scenes = journey.scenes.filter((s) => s.type !== "ENDING");
  if (!scenes.length) return 0;
  return Math.round(
    scenes.reduce((sum, s) => sum + totalSceneRecordMs(s), 0) / scenes.length,
  );
}

export function sceneTimingBreakdown(journey: CinematicJourney) {
  const standard: number[] = [];
  const major: number[] = [];
  for (const scene of journey.scenes) {
    const ms = totalSceneRecordMs(scene);
    const isMajor =
      (scene.worldScale ?? 1) >= 2 || scene.worldNodeArchetype === "INVASION";
    if (scene.type === "ENDING") continue;
    if (isMajor) major.push(ms);
    else standard.push(ms);
  }
  return {
    standardAvg: standard.length
      ? Math.round(standard.reduce((a, b) => a + b, 0) / standard.length)
      : 0,
    majorAvg: major.length
      ? Math.round(major.reduce((a, b) => a + b, 0) / major.length)
      : 0,
  };
}
