import type { CinematicRecordTiming, CinematicScene } from "@/types";

export const DEFAULT_RECORD_TIMING: CinematicRecordTiming = {
  travelMs: 2800,
  arrivalSettleMs: 700,
  eyebrowRevealMs: 400,
  titleRevealMs: 650,
  narrativeRevealMs: 900,
  readingHoldMs: 4500,
  departurePrepMs: 600,
};

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
      travelMs: 4200,
      readingHoldMs: 6500,
      arrivalSettleMs: 900,
    };
  }

  if (scene.shotType === "AFTERMATH") {
    return {
      ...base,
      travelMs: 2400,
      readingHoldMs: 5500,
      arrivalSettleMs: 900,
      departurePrepMs: 800,
    };
  }

  if (isMajorEvent) {
    return {
      ...base,
      travelMs: 3200,
      readingHoldMs: 5200,
      arrivalSettleMs: 800,
    };
  }

  if (scene.shotType === "IMPACT" || scene.type === "CONFLICT") {
    return {
      ...base,
      travelMs: 2200,
      arrivalSettleMs: 500,
      readingHoldMs: 4000,
    };
  }

  if (!isCore) {
    return {
      ...base,
      travelMs: 2200,
      readingHoldMs: 3200,
    };
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
}

export function computeRecordPhaseState(
  scene: CinematicScene,
  sceneElapsedMs: number,
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
      transitionProgress: easeOutCubic(p),
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
