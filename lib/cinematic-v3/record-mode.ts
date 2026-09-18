import { easePanelTravel } from "./panel-transition";
import type { CinematicJourney, CinematicRecordTiming, CinematicScene } from "@/types";

export const DEFAULT_RECORD_TIMING: CinematicRecordTiming = {
  travelMs: 800,
  arrivalSettleMs: 500,
  eyebrowRevealMs: 350,
  titleRevealMs: 450,
  narrativeRevealMs: 650,
  readingHoldMs: 2800,
  departurePrepMs: 700,
};

/** @deprecated Constellation hub travel floor — not used in story panel mode. */
export const MIN_CHAPTER_TRAVEL_MS = 2100;

export function recordTimingForScene(scene: CinematicScene): CinematicRecordTiming {
  if (scene.recordTiming) return scene.recordTiming;

  const base = { ...DEFAULT_RECORD_TIMING };
  const isCore = scene.importance === "CORE";
  const isEnding = scene.type === "ENDING";
  const isMajorEvent =
    (scene.worldScale ?? 1) >= 2 || scene.worldNodeArchetype === "INVASION";

  if (isEnding) {
    return {
      ...base,
      travelMs: 600,
      readingHoldMs: 3200,
      arrivalSettleMs: 400,
      narrativeRevealMs: 700,
    };
  }

  if (scene.shotType === "AFTERMATH") {
    return {
      ...base,
      travelMs: 700,
      readingHoldMs: 3000,
      arrivalSettleMs: 450,
      departurePrepMs: 750,
    };
  }

  if (isMajorEvent) {
    return {
      ...base,
      travelMs: 850,
      readingHoldMs: 3200,
      arrivalSettleMs: 550,
      narrativeRevealMs: 750,
    };
  }

  if (scene.shotType === "IMPACT" || scene.type === "CONFLICT") {
    return {
      ...base,
      travelMs: 750,
      arrivalSettleMs: 450,
      readingHoldMs: 2800,
      narrativeRevealMs: 700,
    };
  }

  if (!isCore) {
    return {
      ...base,
      travelMs: 700,
      readingHoldMs: 2400,
    };
  }

  return base;
}

export function totalSceneRecordMs(scene: CinematicScene): number {
  const t = recordTimingForScene(scene);
  const phrases = scene.narrativePhrases?.length
    ? scene.narrativePhrases
    : splitNarrativePhrases(scene.narrative);
  return (
    t.travelMs +
    t.arrivalSettleMs +
    t.eyebrowRevealMs +
    t.titleRevealMs +
    t.narrativeRevealMs * phrases.length +
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
  holdProgress: number;
}

export function computeRecordPhaseState(
  scene: CinematicScene,
  sceneElapsedMs: number,
  _options?: { journey?: CinematicJourney; targetSceneIndex?: number },
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
    return {
      phase: "travel",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: -1,
      textVisible: false,
      arrived: false,
      transitionProgress: easePanelTravel(p),
      holdProgress: 0,
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
      arrived: p > 0.7,
      transitionProgress: 1,
      holdProgress: p * 0.15,
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
      holdProgress: 0.15 + p * 0.2,
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
      holdProgress: 0.35 + p * 0.25,
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
    const narrativeT = phraseIndex / Math.max(1, phrases.length - 1);
    return {
      phase: "narrative",
      phaseProgress: p,
      sceneElapsedMs: elapsed,
      narrativePhraseIndex: phraseIndex,
      textVisible: true,
      arrived: true,
      transitionProgress: 1,
      holdProgress: 0.55 + narrativeT * 0.35,
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
      holdProgress: 0.9 + p * 0.1,
    };
  }

  const p = (elapsed - holdEnd) / t.departurePrepMs;
  return {
    phase: "departure",
    phaseProgress: p,
    sceneElapsedMs: elapsed,
    narrativePhraseIndex: phrases.length - 1,
    textVisible: p < 0.4,
    arrived: true,
    transitionProgress: 1,
    holdProgress: 1,
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
