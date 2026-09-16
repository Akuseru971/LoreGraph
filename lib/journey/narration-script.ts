import type { Journey } from "@/types";

export interface JourneyScriptSection {
  label: string;
  lines: string[];
}

/** Export a journey as a social / voiceover script. */
export function getJourneyNarrationScript(journey: Journey): JourneyScriptSection[] {
  const sections: JourneyScriptSection[] = [];

  if (journey.type === "CONNECTION_STORY") {
    sections.push({
      label: "HOOK",
      lines: [
        `How are ${journey.title.replace(" → ", " and ")} connected?`,
      ],
    });
  } else {
    sections.push({
      label: "HOOK",
      lines: [`The story of ${journey.title}.`],
    });
  }

  journey.steps.forEach((step, index) => {
    if (step.type === "OPENING" || step.type === "ENDING") return;
    sections.push({
      label: `SCENE ${index}`,
      lines: [step.eyebrow, step.title, ...step.narration].filter(Boolean) as string[],
    });
  });

  const ending = journey.steps.find((s) => s.type === "ENDING");
  sections.push({
    label: "ENDING",
    lines: ending
      ? [ending.eyebrow ?? "", ending.title, ...ending.narration].filter(Boolean)
      : ["Explore more at LoreGraph."],
  });

  return sections;
}

export function formatJourneyScript(journey: Journey): string {
  return getJourneyNarrationScript(journey)
    .map((s) => `${s.label}:\n${s.lines.map((l) => `  ${l}`).join("\n")}`)
    .join("\n\n");
}
