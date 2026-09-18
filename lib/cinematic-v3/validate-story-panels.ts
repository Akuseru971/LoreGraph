import { FLAGSHIP_JOURNEY_IDS } from "@/data/cinematic/flagship-assets";
import { buildChampionJourneyV3 } from "./build-champion-journey";
import { isStoryPanelJourney } from "./story-panel-mode";
import type { CinematicJourney } from "@/types";
import { characters } from "@/data/characters";

export interface StoryPanelValidationIssue {
  level: "ERROR" | "WARNING";
  journeyId: string;
  sceneId?: string;
  message: string;
}

export function validateStoryPanelJourney(journey: CinematicJourney): StoryPanelValidationIssue[] {
  const issues: StoryPanelValidationIssue[] = [];
  if (!isStoryPanelJourney(journey)) return issues;

  if (journey.introSequence) {
    issues.push({
      level: "WARNING",
      journeyId: journey.id,
      message: "Story panel journey should not include constellation intro",
    });
  }

  for (const scene of journey.scenes) {
    if (scene.type === "ENDING") continue;
    if (!scene.image?.url) {
      issues.push({
        level: "ERROR",
        journeyId: journey.id,
        sceneId: scene.id,
        message: "Story beat missing official image",
      });
    }
    if (!scene.image?.focalPoint) {
      issues.push({
        level: "WARNING",
        journeyId: journey.id,
        sceneId: scene.id,
        message: "Scene image missing focal point metadata",
      });
    }
    if (!scene.eyebrow && scene.importance === "CORE") {
      issues.push({
        level: "WARNING",
        journeyId: journey.id,
        sceneId: scene.id,
        message: "CORE beat missing eyebrow label",
      });
    }
  }

  return issues;
}

export function validateFlagshipStoryPanels(): StoryPanelValidationIssue[] {
  const issues: StoryPanelValidationIssue[] = [];
  for (const id of FLAGSHIP_JOURNEY_IDS) {
    if (!id.startsWith("cinematic:character:")) continue;
    const slug = id.replace("cinematic:character:", "");
    const c = characters.find((ch) => ch.slug === slug);
    if (!c) continue;
    const journey = buildChampionJourneyV3(c);
    issues.push(...validateStoryPanelJourney(journey));
  }
  return issues;
}
