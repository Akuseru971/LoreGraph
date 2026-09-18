import { normalizeCanonStatus } from "@/lib/canon/model";
import type { CanonStatus, JourneyContentType, JourneyStep } from "@/types";
import {
  DEFAULT_SCENE_DURATION_MS,
  ERA_TRANSITION_MS,
  LONG_SCENE_DURATION_MS,
  OPENING_DURATION_MS,
} from "./timing";

let stepCounter = 0;

export function resetStepCounter(): void {
  stepCounter = 0;
}

function nextId(prefix: string): string {
  stepCounter += 1;
  return `jstep:${prefix}-${stepCounter}`;
}

export function makeStep(
  partial: Omit<JourneyStep, "id"> & { id?: string },
): JourneyStep {
  return {
    id: partial.id ?? nextId(partial.type.toLowerCase()),
    ...partial,
    canonStatus: normalizeCanonStatus(partial.canonStatus),
  };
}

export function eraTransitionStep(
  era: string,
  narration?: string[],
  contentType: JourneyContentType = "editorial",
): JourneyStep {
  return makeStep({
    type: "ERA",
    title: era,
    eyebrow: "Time passes",
    narration: narration ?? [`The thread stretches across ${era.toLowerCase()}.`],
    canonStatus: "CURRENT_CANON",
    contentType,
    duration: ERA_TRANSITION_MS,
    transition: "era-skip",
    cameraPreset: "pullback",
  });
}

export function characterStep(
  character: {
    id: string;
    name: string;
    title: string;
    shortDescription: string;
    assetKey: string;
    accentColor: string;
    canonStatus: CanonStatus;
    sourceIds: string[];
  },
  options?: {
    eyebrow?: string;
    narration?: string[];
    duration?: number;
    contentType?: JourneyContentType;
  },
): JourneyStep {
  return makeStep({
    type: "CHARACTER",
    entityId: character.id,
    title: character.name,
    eyebrow: options?.eyebrow ?? character.title,
    narration: options?.narration ?? [character.shortDescription],
    assetKey: character.assetKey,
    accentColor: character.accentColor,
    canonStatus: character.canonStatus,
    contentType: options?.contentType ?? "fact",
    sourceIds: character.sourceIds,
    duration: options?.duration ?? DEFAULT_SCENE_DURATION_MS,
    cameraPreset: "approach",
    transition: "travel",
  });
}

export function eventStep(
  event: {
    id: string;
    title: string;
    description: string;
    era: string;
    canonStatus: CanonStatus;
  },
  accentColor: string,
  narration?: string[],
): JourneyStep {
  return makeStep({
    type: "EVENT",
    entityId: event.id,
    title: event.title,
    eyebrow: event.era,
    narration: narration ?? [event.description],
    accentColor,
    canonStatus: event.canonStatus,
    contentType: "fact",
    duration: LONG_SCENE_DURATION_MS,
    cameraPreset: "close",
    transition: "travel",
  });
}

export function conceptStep(
  concept: {
    id: string;
    name: string;
    shortDescription: string;
    accentColor: string;
  },
  narration?: string[],
  contentType: JourneyContentType = "fact",
): JourneyStep {
  return makeStep({
    type: "CONCEPT",
    entityId: concept.id,
    title: concept.name,
    eyebrow: "Structural connection",
    narration: narration ?? [concept.shortDescription],
    accentColor: concept.accentColor,
    canonStatus: "CURRENT_CANON",
    contentType,
    duration: DEFAULT_SCENE_DURATION_MS,
    cameraPreset: "wide",
    transition: "travel",
  });
}

export function regionStep(
  region: { id: string; name: string; shortDescription: string; accentColor: string },
  eyebrow?: string,
): JourneyStep {
  return makeStep({
    type: "REGION",
    entityId: region.id,
    title: region.name,
    eyebrow: eyebrow ?? "Region",
    narration: [region.shortDescription],
    accentColor: region.accentColor,
    canonStatus: "CURRENT_CANON",
    contentType: "fact",
    duration: DEFAULT_SCENE_DURATION_MS,
    cameraPreset: "wide",
    transition: "travel",
  });
}

export function openingChampionStep(
  character: {
    name: string;
    title: string;
    assetKey: string;
    accentColor: string;
  },
): JourneyStep {
  return makeStep({
    type: "OPENING",
    title: character.name,
    eyebrow: "The story of",
    narration: [character.title],
    assetKey: character.assetKey,
    accentColor: character.accentColor,
    canonStatus: "CURRENT_CANON",
    contentType: "editorial",
    duration: OPENING_DURATION_MS,
    cameraPreset: "close",
    transition: "fade",
  });
}
