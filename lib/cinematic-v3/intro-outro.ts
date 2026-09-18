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
  backgroundFade: number;
  subjectOpacity: number;
  visibleStarCount: number;
  starRevealProgress: number;
  lineProgress: number;
  heroStarIntensity: number;
  zoomProgress: number;
  constellationOpacity: number;
  handoffBlend: number;
  textOpacity: number;
  complete: boolean;
}

export interface OutroPhaseState {
  phase: OutroPhase;
  progress: number;
  phaseProgress: number;
  pathOpacity: number;
  pathMorphProgress: number;
  secondaryStarProgress: number;
  microStarProgress: number;
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

export function effectiveIntroTiming(
  intro: CinematicIntro,
  recordMode: boolean,
): CinematicIntroTiming {
  if (recordMode && intro.recordTiming) return intro.recordTiming;
  return intro.timing;
}

export function effectiveOutroTiming(
  outro: CinematicOutro,
  recordMode: boolean,
): CinematicOutroTiming {
  if (recordMode && outro.recordTiming) return outro.recordTiming;
  return outro.timing;
}

export function totalIntroMsForMode(
  intro: CinematicIntro,
  recordMode: boolean,
): number {
  return totalIntroMs(effectiveIntroTiming(intro, recordMode));
}

export function totalOutroMsForMode(
  outro: CinematicOutro,
  recordMode: boolean,
): number {
  return totalOutroMs(effectiveOutroTiming(outro, recordMode));
}

export function computeIntroPhaseState(
  intro: CinematicIntro,
  elapsedMs: number,
  anchorCount: number,
  recordMode = false,
): IntroPhaseState {
  const timing = effectiveIntroTiming(intro, recordMode);
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
  let backgroundFade = 0;
  let subjectOpacity = 1;
  let visibleStarCount = 0;
  let starRevealProgress = 0;
  let lineProgress = 0;
  let heroStarIntensity = 0.6;
  let zoomProgress = 0;
  let constellationOpacity = 0;
  let handoffBlend = 0;
  let textOpacity = 0;

  if (phase === "splash_hold") {
    textOpacity = easeOut(phaseProgress) * 0.9;
  } else if (phase === "splash_drift") {
    textOpacity = 0.9 * (1 - t * 0.5);
  } else if (phase === "darken") {
    backgroundFade = t * 0.65;
    splashDarken = t * 0.35;
    colorDrain = t * 0.25;
    starRevealProgress = t * 0.12;
    constellationOpacity = t * 0.2;
    textOpacity = 0.45 * (1 - t);
  } else if (phase === "stars_emerge") {
    backgroundFade = 0.65 + t * 0.3;
    splashDarken = 0.35 + t * 0.4;
    colorDrain = 0.25 + t * 0.45;
    subjectOpacity = 1 - t * 0.75;
    starRevealProgress = 0.12 + t * 0.55;
    visibleStarCount = Math.max(2, Math.ceil(anchorCount * starRevealProgress));
    constellationOpacity = 0.2 + t * 0.65;
    textOpacity = 0;
  } else if (phase === "lines_form") {
    backgroundFade = 0.95;
    subjectOpacity = 0.25 * (1 - t);
    splashOpacity = 0.35 * (1 - t);
    starRevealProgress = 0.67 + t * 0.28;
    visibleStarCount = anchorCount;
    lineProgress = easeOut(phaseProgress);
    constellationOpacity = 0.85 + t * 0.12;
  } else if (phase === "hero_select") {
    splashOpacity = 0.08 * (1 - t);
    subjectOpacity = 0;
    starRevealProgress = 0.95 + t * 0.05;
    visibleStarCount = anchorCount;
    lineProgress = 1;
    heroStarIntensity = 0.7 + t * 1.1;
    constellationOpacity = 0.97;
  } else if (phase === "zoom_star") {
    splashOpacity = 0;
    subjectOpacity = 0;
    starRevealProgress = 1;
    visibleStarCount = anchorCount;
    lineProgress = 1 - t * 0.4;
    heroStarIntensity = 1.8 + t * 1.4;
    zoomProgress = easeOut(phaseProgress);
    constellationOpacity = 1;
    handoffBlend = t * 0.35;
  } else {
    zoomProgress = 1;
    heroStarIntensity = 2.4;
    starRevealProgress = 1;
    visibleStarCount = anchorCount;
    constellationOpacity = 1 - t * 0.5;
    handoffBlend = 0.35 + t * 0.65;
    splashOpacity = 0;
    subjectOpacity = 0;
  }

  return {
    phase,
    progress,
    phaseProgress,
    splashOpacity,
    splashDarken,
    colorDrain,
    backgroundFade,
    subjectOpacity,
    visibleStarCount,
    starRevealProgress,
    lineProgress,
    heroStarIntensity,
    zoomProgress,
    constellationOpacity,
    handoffBlend,
    textOpacity,
    complete,
  };
}

export function computeOutroPhaseState(
  outro: CinematicOutro,
  elapsedMs: number,
  recordMode = false,
): OutroPhaseState {
  const timing = effectiveOutroTiming(outro, recordMode);
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
  let pathMorphProgress = 0;
  let secondaryStarProgress = 0;
  let microStarProgress = 0;
  let constellationOpacity = 0;
  let splashEchoOpacity = 0;
  let textOpacity = 0;
  let pullbackScale = 1;

  if (phase === "pullback") {
    pullbackScale = 1 + t * 0.3;
    pathOpacity = t * 0.55;
  } else if (phase === "path_reveal") {
    pullbackScale = 1.3 + t * 0.15;
    pathOpacity = 0.55 + t * 0.4;
    pathMorphProgress = t * 0.15;
  } else if (phase === "nodes_connect") {
    pullbackScale = 1.45;
    pathOpacity = 0.95;
    pathMorphProgress = 0.15 + t * 0.45;
    constellationOpacity = t * 0.25;
  } else if (phase === "constellation_reform") {
    pullbackScale = 1.45 - t * 0.1;
    pathOpacity = 0.95 - t * 0.5;
    pathMorphProgress = 0.6 + t * 0.4;
    secondaryStarProgress = t;
    constellationOpacity = 0.25 + t * 0.55;
    microStarProgress = Math.max(0, t - 0.4) / 0.6;
    textOpacity = t * 0.5;
  } else if (phase === "splash_echo") {
    pullbackScale = 1.35;
    pathOpacity = 0.45 * (1 - t);
    pathMorphProgress = 1;
    secondaryStarProgress = 1;
    microStarProgress = 1;
    constellationOpacity = 0.95;
    splashEchoOpacity = t * 0.2;
    textOpacity = 0.5;
  } else {
    pullbackScale = 1.35;
    pathOpacity = 0.2 * (1 - t * 0.5);
    pathMorphProgress = 1;
    secondaryStarProgress = 1;
    microStarProgress = 1;
    constellationOpacity = 1;
    splashEchoOpacity = outro.showSplashEcho ? 0.2 * (1 - t * 0.25) : 0;
    textOpacity = 0.5 + t * 0.45;
  }

  return {
    phase,
    progress,
    phaseProgress,
    pathOpacity,
    pathMorphProgress,
    secondaryStarProgress,
    microStarProgress,
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
    recordTiming: override?.recordTiming
      ? mergeIntroTiming(override.recordTiming)
      : undefined,
    atmosphere: override?.atmosphere,
    eyebrow: region?.name ?? regionSlug,
    title,
    subtitle,
    showText: override?.showText ?? true,
    recordShowIntroTitle: override?.recordShowIntroTitle,
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
    recordTiming: override?.recordTiming
      ? mergeOutroTiming(override.recordTiming)
      : undefined,
    pathToAnchorMapping: override?.pathToAnchorMapping,
    title,
    subtitle,
    showText: override?.showText ?? true,
    recordShowOutroTitle: override?.recordShowOutroTitle,
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
