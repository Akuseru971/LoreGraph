import { computeChapterHubState, type ChapterHubState } from "./chapter-hub";
import { easeFreefallTravel } from "./star-path";
import type { ChampionConstellation, CinematicRecordTiming, CinematicScene } from "@/types";

export const DEFAULT_RECORD_TIMING: CinematicRecordTiming = {
  travelMs: 2100,
  arrivalSettleMs: 320,
  eyebrowRevealMs: 220,
  titleRevealMs: 320,
  narrativeRevealMs: 380,
  readingHoldMs: 2400,
  departurePrepMs: 250,
};

/** Minimum travel for inter-chapter name hub readability (0.6–1.0s name window). */
export const MIN_CHAPTER_TRAVEL_MS = 2100;

function withChapterTravelFloor(timing: CinematicRecordTiming): CinematicRecordTiming {
  return {
    ...timing,
    travelMs: Math.max(timing.travelMs, MIN_CHAPTER_TRAVEL_MS),
  };
}

export function recordTimingForScene(scene: CinematicScene): CinematicRecordTiming {
  if (scene.recordTiming) return withChapterTravelFloor(scene.recordTiming);

  const base = { ...DEFAULT_RECORD_TIMING };
  const isCore = scene.importance === "CORE";
  const isEnding = scene.type === "ENDING";
  const isMajorEvent =
    (scene.worldScale ?? 1) >= 2 || scene.worldNodeArchetype === "INVASION";

  if (isEnding) {
    return withChapterTravelFloor({
      ...base,
      travelMs: 1300,
      readingHoldMs: 2800,
      arrivalSettleMs: 350,
      narrativeRevealMs: 400,
    });
  }

  if (scene.shotType === "AFTERMATH") {
    return withChapterTravelFloor({
      ...base,
      travelMs: 1200,
      readingHoldMs: 2500,
      arrivalSettleMs: 300,
      departurePrepMs: 300,
      narrativeRevealMs: 400,
    });
  }

  if (isMajorEvent) {
    return withChapterTravelFloor({
      ...base,
      travelMs: 1500,
      readingHoldMs: 2700,
      arrivalSettleMs: 350,
      narrativeRevealMs: 400,
    });
  }

  if (scene.shotType === "IMPACT" || scene.type === "CONFLICT") {
    return withChapterTravelFloor({
      ...base,
      travelMs: 1200,
      arrivalSettleMs: 300,
      readingHoldMs: 2400,
      narrativeRevealMs: 400,
    });
  }

  if (!isCore) {
    return withChapterTravelFloor({
      ...base,
      travelMs: 1200,
      readingHoldMs: 2200,
    });
  }

  return base;
}

export function totalSceneRecordMs(scene: CinematicScene): number {
  const t = recordTimingForScene(scene);
  return (
    t.travelMs +
    t.arrivalSettleMs +
    t.eyebrowRevealMs +
    t.titleRevealMs +
    t.narrativeRevealMs +
    t.readingHoldMs +
    t.departurePrepMs
  );
}

export type RecordPhase =
  | "travel"
  | "arrival"
  | "eyebrow"
  | "title"
  | "narrative"
  | "hold"
  | "departure";

export interface RecordPhaseState {
  phase: RecordPhase;
  phaseProgress: number;
  sceneElapsedMs: number;
  narrativePhraseIndex: number;
  textVisible: boolean;
  arrived: boolean;
  transitionProgress: number;
  chapterHub?: ChapterHubState;
}

export function computeRecordPhaseState(
  scene: CinematicScene,
  sceneElapsedMs: number,
  options?: {
    nameConstellation?: ChampionConstellation;
    targetSceneIndex?: number;
    totalScenes?: number;
  },
): RecordPhaseState {
  const t = recordTimingForScene(scene);
  const phrases = scene.narrativePhrases?.length
    ? scene.narrativePhrases
    : splitNarrativePhrases(scene.narrative);

  let cursor = 0;
  const travelEnd = (cursor += t.travelMs);
  const arrivalEnd = (cursor += t.arrivalSettleMs);
  const eyebrowEnd = (cursor += t.eyebrowRevealMs);
  const titleEnd = (cursor += t.titleRevealMs);
  const narrativeEnd = (cursor += t.narrativeRevealMs * phrases.length);
  const holdEnd = (cursor += t.readingHoldMs);
  const departureEnd = (cursor += t.departurePrepMs);

  const elapsed = Math.min(sceneElapsedMs, departureEnd);

  if (elapsed < travelEnd) {
    const p = elapsed / t.travelMs;
    const chapterHub =
      options?.nameConstellation && options.targetSceneIndex !== undefined
        ? computeChapterHubState(
            p,
            options.nameConstellation,
            options.targetSceneIndex,
            options.totalScenes ?? options.targetSceneIndex + 1,
          )
        : undefined;
    return {
      phase: "travel",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: -1,
      textVisible: false,
      arrived: false,
      transitionProgress: easeFreefallTravel(p),
      chapterHub,
    };
  }

  if (elapsed < arrivalEnd) {
    const p = (elapsed - travelEnd) / t.arrivalSettleMs;
    return {
      phase: "arrival",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: -1,
      textVisible: false,
      arrived: p > 0.85,
      transitionProgress: 1,
    };
  }

  if (elapsed < eyebrowEnd) {
    const p = (elapsed - arrivalEnd) / t.eyebrowRevealMs;
    return {
      phase: "eyebrow",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: -1,
      textVisible: true,
      arrived: true,
      transitionProgress: 1,
    };
  }

  if (elapsed < titleEnd) {
    const p = (elapsed - eyebrowEnd) / t.titleRevealMs;
    return {
      phase: "title",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: -1,
      textVisible: true,
      arrived: true,
      transitionProgress: 1,
    };
  }

  if (elapsed < narrativeEnd) {
    const narrativeElapsed = elapsed - titleEnd;
    const phraseDuration = t.narrativeRevealMs;
    const phraseIndex = Math.min(
      phrases.length - 1,
      Math.floor(narrativeElapsed / phraseDuration),
    );
    const p = (narrativeElapsed % phraseDuration) / phraseDuration;
    return {
      phase: "narrative",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: phraseIndex,
      textVisible: true,
      arrived: true,
      transitionProgress: 1,
    };
  }

  if (elapsed < holdEnd) {
    const p = (elapsed - narrativeEnd) / t.readingHoldMs;
    return {
      phase: "hold",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: phrases.length - 1,
      textVisible: true,
      arrived: true,
      transitionProgress: 1,
    };
  }

  const p = (elapsed - holdEnd) / t.departurePrepMs;
  return {
    phase: "departure",
    phaseProgress: p,
    sceneElapsedMs: elapsed,
    narrativePhraseIndex: phrases.length - 1,
    textVisible: p < 0.35,
    arrived: true,
    transitionProgress: 1,
  };
}

export function splitNarrativePhrases(narrative: string): string[] {
  const sentences = narrative
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length <= 1) return [narrative.trim()];
  if (sentences.length === 2) return sentences;
  return [sentences[0], sentences.slice(1).join(" ")];
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
}
