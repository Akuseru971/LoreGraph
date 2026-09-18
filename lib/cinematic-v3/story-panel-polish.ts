import type { CinematicJourney, CinematicScene } from "@/types";
import { isStoryPanelJourney } from "./story-panel-mode";

/** Story-panel ending copy — no constellation language. */
export function polishStoryPanelScenes(journey: CinematicJourney): CinematicJourney {
  if (!isStoryPanelJourney(journey)) return journey;

  const scenes = journey.scenes.map((scene) => {
    if (scene.type !== "ENDING") return scene;
    if (journey.id === "cinematic:character:yasuo") return scene;

    return {
      ...scene,
      eyebrow: scene.eyebrow === "The larger constellation" ? "THE LEGEND" : scene.eyebrow,
      narrativePhrases: scene.narrativePhrases ?? [
        scene.narrative.includes("constellation")
          ? `The legend of ${journey.title} endures across Runeterra.`
          : scene.narrative,
      ],
    } satisfies CinematicScene;
  });

  return { ...journey, scenes };
}
