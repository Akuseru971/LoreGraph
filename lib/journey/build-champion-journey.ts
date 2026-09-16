import { eventById, regionBySlug } from "@/data";
import type { Character, Journey, TimelineBeat } from "@/types";
import {
  characterStep,
  eraTransitionStep,
  eventStep,
  makeStep,
  openingChampionStep,
  resetStepCounter,
} from "./steps";
import { DEFAULT_SCENE_DURATION_MS, journeyEstimatedDuration } from "./timing";

function beatToStep(beat: TimelineBeat, character: Character): ReturnType<typeof makeStep> {
  const accent = character.accentColor;
  if (beat.eventId) {
    const event = eventById.get(beat.eventId);
    if (event) {
      return eventStep(
        {
          id: event.id,
          title: beat.title,
          description: beat.description,
          era: beat.era,
          canonStatus: event.canonStatus,
        },
        accent,
        [beat.description],
      );
    }
  }

  return makeStep({
    type: "EVENT",
    title: beat.title,
    eyebrow: beat.era,
    narration: [beat.description],
    accentColor: accent,
    canonStatus: character.canonStatus,
    contentType: "fact",
    sourceIds: character.sourceIds,
    duration: DEFAULT_SCENE_DURATION_MS,
    cameraPreset: "close",
    transition: "travel",
  });
}

/** Build a cinematic journey from a champion's verified timeline. */
export function buildChampionJourney(character: Character): Journey {
  resetStepCounter();
  const steps: ReturnType<typeof makeStep>[] = [];

  steps.push(openingChampionStep(character));

  const region = regionBySlug.get(character.region);
  if (region && character.timeline.length > 0) {
    const firstEra = character.timeline[0]?.era;
    if (firstEra) {
      steps.push(
        eraTransitionStep(firstEra, [
          `To understand ${character.name}, we follow the thread backward into ${firstEra.toLowerCase()}.`,
        ]),
      );
    }
  }

  let lastEra: string | null = null;
  const beats = [...character.timeline].sort((a, b) => a.order - b.order);

  for (const beat of beats) {
    if (lastEra && beat.era !== lastEra) {
      steps.push(
        eraTransitionStep(beat.era, [`The story moves into ${beat.era.toLowerCase()}.`]),
      );
    }
    lastEra = beat.era;
    steps.push(beatToStep(beat, character));
  }

  steps.push(
    characterStep(character, {
      eyebrow: "Present",
      narration: [character.shortDescription],
      contentType: "fact",
    }),
  );

  steps.push(
    makeStep({
      type: "ENDING",
      title: character.name,
      eyebrow: character.title,
      narration: [
        character.timeline.length > 0
          ? `This is the thread that leads to ${character.name} today.`
          : character.shortDescription,
      ],
      assetKey: character.assetKey,
      accentColor: character.accentColor,
      canonStatus: character.canonStatus,
      contentType: "editorial",
      duration: 4000,
      cameraPreset: "close",
      transition: "fade",
    }),
  );

  return {
    id: `journey:champion:${character.slug}`,
    type: "CHAMPION_STORY",
    title: character.name,
    subtitle: character.title,
    sourceChampionId: character.id,
    steps,
    estimatedDuration: journeyEstimatedDuration(steps),
  };
}
