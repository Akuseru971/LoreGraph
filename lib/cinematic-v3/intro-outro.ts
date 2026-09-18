import { characterById, regionBySlug } from "@/data";
import {
  constellationByCharacterId,
  constellationById,
} from "@/data/cinematic/constellation-anchors";
import {
  cinematicIntroOverrides,
  cinematicOutroOverrides,
} from "@/data/cinematic/intro-outro-overrides";
import { FLAGSHIP_JOURNEY_IDS } from "@/data/cinematic/flagship-assets";
import { getChampionAssetUrl } from "@/lib/assets";
import type {
  ChampionConstellation,
  ChampionConstellationAnchor,
  CinematicIntro,
  CinematicIntroTiming,
  CinematicJourney,
  CinematicOutro,
  CinematicOutroTiming,
  CinematicSceneAsset,
  RegionSlug,
} from "@/types";

export const DEFAULT_INTRO_TIMING: CinematicIntroTiming = {
  splashHoldMs: 2000,
  splashDriftMs: 1200,
  darkenMs: 2200,
  starsEmergeMs: 2000,
  linesFormMs: 1600,
  heroSelectMs: 1000,
  zoomStarMs: 2200,
  handoffMs: 800,
};

export const DEFAULT_OUTRO_TIMING: CinematicOutroTiming = {
  pullbackMs: 1800,
  pathRevealMs: 1600,
  nodesConnectMs: 1400,
  constellationReformMs: 2800,
  splashEchoMs: 1400,
  holdMs: 2400,
};

export type IntroPhase =
  | "splash_hold"
  | "splash_drift"
  | "darken"
  | "stars_emerge"
  | "lines_form"
  | "hero_select"
  | "zoom_star"
  | "handoff";

export type OutroPhase =
  | "pullback"
  | "path_reveal"
  | "nodes_connect"
  | "constellation_reform"
  | "splash_echo"
  | "hold";

export interface IntroPhaseState {
  phase: IntroPhase;
  progress: number;
  phaseProgress: number;
  splashOpacity: number;
  splashDarken: number;
  colorDrain: number;
  visibleStarCount: number;
  lineProgress: number;
  heroStarIntensity: number;
  zoomProgress: number;
  constellationOpacity: number;
  textOpacity: number;
  complete: boolean;
}

export interface OutroPhaseState {
  phase: OutroPhase;
  progress: number;
  phaseProgress: number;
  pathOpacity: number;
  constellationOpacity: number;
  splashEchoOpacity: number;
  textOpacity: number;
  pullbackScale: number;
  complete: boolean;
}

const INTRO_PHASE_ORDER: IntroPhase[] = [
  "splash_hold",
  "splash_drift",
  "darken",
  "stars_emerge",
  "lines_form",
  "hero_select",
  "zoom_star",
  "handoff",
];

const OUTRO_PHASE_ORDER: OutroPhase[] = [
  "pullback",
  "path_reveal",
  "nodes_connect",
  "constellation_reform",
  "splash_echo",
  "hold",
];

function mergeIntroTiming(
  partial?: Partial<CinematicIntroTiming>,
): CinematicIntroTiming {
  return { ...DEFAULT_INTRO_TIMING, ...partial };
}

function mergeOutroTiming(
  partial?: Partial<CinematicOutroTiming>,
): CinematicOutroTiming {
  return { ...DEFAULT_OUTRO_TIMING, ...partial };
}

export function totalIntroMs(timing: CinematicIntroTiming): number {
  return (
    timing.splashHoldMs +
    timing.splashDriftMs +
    timing.darkenMs +
    timing.starsEmergeMs +
    timing.linesFormMs +
    timing.heroSelectMs +
    timing.zoomStarMs +
    timing.handoffMs
  );
}

export function totalOutroMs(timing: CinematicOutroTiming): number {
  return (
    timing.pullbackMs +
    timing.pathRevealMs +
    timing.nodesConnectMs +
    timing.constellationReformMs +
    timing.splashEchoMs +
    timing.holdMs
  );
}

function phaseAtElapsed(
  order: string[],
  durations: number[],
  elapsedMs: number,
): { index: number; phaseProgress: number; complete: boolean } {
  let remaining = elapsedMs;
  for (let i = 0; i < order.length; i++) {
    const dur = durations[i];
    if (remaining < dur) {
      return {
        index: i,
        phaseProgress: dur > 0 ? remaining / dur : 1,
        complete: false,
      };
    }
    remaining -= dur;
  }
  return { index: order.length - 1, phaseProgress: 1, complete: true };
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function computeIntroPhaseState(
  intro: CinematicIntro,
  elapsedMs: number,
  anchorCount: number,
): IntroPhaseState {
  const timing = intro.timing;
  const durations = [
    timing.splashHoldMs,
    timing.splashDriftMs,
    timing.darkenMs,
    timing.starsEmergeMs,
    timing.linesFormMs,
    timing.heroSelectMs,
    timing.zoomStarMs,
    timing.handoffMs,
  ];
  const { index, phaseProgress, complete } = phaseAtElapsed(
    INTRO_PHASE_ORDER,
    durations,
    elapsedMs,
  );
  const phase = INTRO_PHASE_ORDER[index];
  const t = easeInOut(phaseProgress);
  const total = totalIntroMs(timing);
  const progress = Math.min(1, elapsedMs / total);

  let splashOpacity = 1;
  let splashDarken = 0;
  let colorDrain = 0;
  let visibleStarCount = 0;
  let lineProgress = 0;
  let heroStarIntensity = 0.6;
  let zoomProgress = 0;
  let constellationOpacity = 0;
  let textOpacity = 0;

  if (phase === "splash_hold") {
    textOpacity = easeOut(phaseProgress) * 0.85;
  } else if (phase === "splash_drift") {
    textOpacity = 0.85 * (1 - t * 0.4);
  } else if (phase === "darken") {
    splashDarken = t * 0.72;
    colorDrain = t * 0.55;
    textOpacity = 0.5 * (1 - t);
    constellationOpacity = t * 0.15;
  } else if (phase === "stars_emerge") {
    splashDarken = 0.72 + t * 0.18;
    colorDrain = 0.55 + t * 0.35;
    splashOpacity = 1 - t * 0.85;
    visibleStarCount = Math.max(1, Math.ceil(anchorCount * easeOut(phaseProgress)));
    constellationOpacity = 0.15 + t * 0.55;
  } else if (phase === "lines_form") {
    splashOpacity = 0.15 * (1 - t);
    visibleStarCount = anchorCount;
    lineProgress = easeOut(phaseProgress);
    constellationOpacity = 0.7 + t * 0.25;
  } else if (phase === "hero_select") {
    splashOpacity = 0;
    visibleStarCount = anchorCount;
    lineProgress = 1;
    heroStarIntensity = 0.6 + t * 0.9;
    constellationOpacity = 0.95;
  } else if (phase === "zoom_star") {
    visibleStarCount = anchorCount;
    lineProgress = 1 - t * 0.35;
    heroStarIntensity = 1.5 + t * 1.2;
    zoomProgress = easeOut(phaseProgress);
    constellationOpacity = 1 - t * 0.4;
  } else {
    zoomProgress = 1;
    heroStarIntensity = 2.2 * (1 - t);
    constellationOpacity = 0.6 * (1 - t);
    splashOpacity = 0;
  }

  return {
    phase,
    progress,
    phaseProgress,
    splashOpacity,
    splashDarken,
    colorDrain,
    visibleStarCount,
    lineProgress,
    heroStarIntensity,
    zoomProgress,
    constellationOpacity,
    textOpacity,
    complete,
  };
}

export function computeOutroPhaseState(
  outro: CinematicOutro,
  elapsedMs: number,
): OutroPhaseState {
  const timing = outro.timing;
  const durations = [
    timing.pullbackMs,
    timing.pathRevealMs,
    timing.nodesConnectMs,
    timing.constellationReformMs,
    outro.showSplashEcho ? timing.splashEchoMs : 0,
    timing.holdMs,
  ];
  const { index, phaseProgress, complete } = phaseAtElapsed(
    OUTRO_PHASE_ORDER,
    durations,
    elapsedMs,
  );
  const phase = OUTRO_PHASE_ORDER[index];
  const t = easeInOut(phaseProgress);
  const total = totalOutroMs(timing);
  const progress = Math.min(1, elapsedMs / total);

  let pathOpacity = 0;
  let constellationOpacity = 0;
  let splashEchoOpacity = 0;
  let textOpacity = 0;
  let pullbackScale = 1;

  if (phase === "pullback") {
    pullbackScale = 1 + t * 0.35;
    pathOpacity = t * 0.5;
  } else if (phase === "path_reveal") {
    pullbackScale = 1.35 + t * 0.2;
    pathOpacity = 0.5 + t * 0.45;
  } else if (phase === "nodes_connect") {
    pullbackScale = 1.55;
    pathOpacity = 0.95;
    constellationOpacity = t * 0.35;
  } else if (phase === "constellation_reform") {
    pullbackScale = 1.55 - t * 0.15;
    pathOpacity = 0.95 - t * 0.25;
    constellationOpacity = 0.35 + t * 0.6;
    textOpacity = t * 0.7;
  } else if (phase === "splash_echo") {
    pullbackScale = 1.4;
    pathOpacity = 0.7 * (1 - t * 0.5);
    constellationOpacity = 0.95;
    splashEchoOpacity = t * 0.22;
    textOpacity = 0.7;
  } else {
    pullbackScale = 1.4;
    pathOpacity = 0.35 * (1 - t * 0.5);
    constellationOpacity = 1;
    splashEchoOpacity = outro.showSplashEcho ? 0.22 * (1 - t * 0.3) : 0;
    textOpacity = 0.7 + t * 0.3;
  }

  return {
    phase,
    progress,
    phaseProgress,
    pathOpacity,
    constellationOpacity,
    splashEchoOpacity,
    textOpacity,
    pullbackScale,
    complete,
  };
}

function splashAssetForCharacter(
  characterId: string,
  slug: string,
): CinematicSceneAsset {
  const url = getChampionAssetUrl(slug, "splash");
  return {
    url,
    sourceEntityId: characterId,
    relevance: "CHARACTER_CONTEXT",
    confidence: "HIGH",
    variant: "splash",
    assetType: "champion",
    focalPoint: cinematicIntroOverrides[characterId]?.splashFocal,
    aspectRatio: 16 / 9,
  };
}

export function getConstellationForIntro(
  intro: CinematicIntro,
): ChampionConstellation | undefined {
  return constellationById.get(intro.constellationId);
}

export function getHeroAnchor(
  constellation: ChampionConstellation,
  heroStarId: string,
): ChampionConstellationAnchor | undefined {
  return constellation.anchors.find((a) => a.id === heroStarId);
}

export function orderedAnchorsForReveal(
  constellation: ChampionConstellation,
): ChampionConstellationAnchor[] {
  const primary = constellation.anchors.filter((a) => a.importance === "PRIMARY");
  const secondary = constellation.anchors.filter((a) => a.importance === "SECONDARY");
  return [...primary, ...secondary];
}

export function buildIntroSequence(
  journey: CinematicJourney,
  characterSlug: string,
  characterId: string,
  regionSlug: RegionSlug,
  title: string,
  subtitle?: string,
): CinematicIntro | undefined {
  const override = cinematicIntroOverrides[characterId];
  const constellation =
    (override?.constellationId
      ? constellationById.get(override.constellationId)
      : undefined) ?? constellationByCharacterId.get(characterId);
  if (!constellation) return undefined;

  const region = regionBySlug.get(regionSlug);
  return {
    type: "SPLASH_TO_CONSTELLATION",
    splashAsset: splashAssetForCharacter(characterId, characterSlug),
    constellationId: constellation.id,
    heroStarId: override?.heroStarId ?? constellation.heroStarId,
    timing: mergeIntroTiming(override?.timing),
    atmosphere: override?.atmosphere,
    eyebrow: region?.name ?? regionSlug,
    title,
    subtitle,
    showText: override?.showText ?? true,
    splashFocal: override?.splashFocal,
  };
}

export function buildOutroSequence(
  journey: CinematicJourney,
  characterId: string,
  characterSlug: string,
  title: string,
  subtitle?: string,
): CinematicOutro | undefined {
  const override = cinematicOutroOverrides[characterId];
  const constellation =
    (override?.constellationId
      ? constellationById.get(override.constellationId)
      : undefined) ?? constellationByCharacterId.get(characterId);
  if (!constellation) return undefined;

  return {
    type: "CONSTELLATION_REFORM",
    constellationId: constellation.id,
    optionalSplashEcho: splashAssetForCharacter(characterId, characterSlug),
    timing: mergeOutroTiming(override?.timing),
    title,
    subtitle,
    showText: override?.showText ?? true,
    showSplashEcho: override?.showSplashEcho ?? true,
  };
}

const FLAGSHIP_SET = new Set<string>(FLAGSHIP_JOURNEY_IDS);

export function attachIntroOutroSequences(
  journey: CinematicJourney,
  characterSlug?: string,
): CinematicJourney {
  if (!FLAGSHIP_SET.has(journey.id as (typeof FLAGSHIP_JOURNEY_IDS)[number])) {
    return journey;
  }
  if (journey.kind !== "CHARACTER" || !journey.primaryCharacterId) {
    return journey;
  }

  const character = characterById.get(journey.primaryCharacterId);
  const slug =
    characterSlug ?? character?.slug ?? journey.primaryCharacterId.replace(/^char:/, "");
  const regionSlug = character?.region ?? "runeterra";
  const intro = buildIntroSequence(
    journey,
    slug,
    journey.primaryCharacterId,
    regionSlug,
    journey.title,
    journey.subtitle,
  );
  const outro = buildOutroSequence(
    journey,
    journey.primaryCharacterId,
    slug,
    journey.title,
    journey.subtitle,
  );

  if (!intro && !outro) return journey;

  return {
    ...journey,
    introSequence: intro,
    outroSequence: outro,
  };
}
