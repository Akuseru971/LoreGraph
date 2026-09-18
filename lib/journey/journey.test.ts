import { describe, expect, it } from "vitest";
import { characterBySlug } from "@/data";
import { buildLoreGraph, resetLoreGraphCache } from "@/lib/graph/build";
import { findNarrativePath } from "@/lib/graph/algorithms";
import { buildChampionJourney } from "./build-champion-journey";
import { buildConnectionJourney } from "./build-connection-journey";
import { validateJourney } from "./validate-journey";

resetLoreGraphCache();
const graph = buildLoreGraph();

describe("cinematic journey builders", () => {
  it("builds Aatrox champion story from timeline", () => {
    const aatrox = characterBySlug.get("aatrox")!;
    const journey = buildChampionJourney(aatrox);
    expect(journey.steps.length).toBeGreaterThan(3);
    expect(journey.type).toBe("CHAMPION_STORY");
    const errors = validateJourney(journey).filter((i) => i.level === "ERROR");
    expect(errors).toHaveLength(0);
    expect(journey.steps.some((s) => s.title.toLowerCase().includes("void"))).toBe(true);
  });

  it("builds Yasuo champion story", () => {
    const yasuo = characterBySlug.get("yasuo")!;
    const journey = buildChampionJourney(yasuo);
    expect(journey.steps.length).toBeGreaterThan(2);
    expect(validateJourney(journey).filter((i) => i.level === "ERROR")).toHaveLength(0);
  });

  it("Aatrox → Pantheon connection expands beyond single hop", () => {
    const a = characterBySlug.get("aatrox")!;
    const b = characterBySlug.get("pantheon")!;
    const path = findNarrativePath(a.id, b.id, graph)!;
    const journey = buildConnectionJourney(a, b, path);
    expect(journey.steps.length).toBeGreaterThan(path.steps.length + 2);
    expect(
      journey.steps.some((s) =>
        s.narration.some((n) => n.toLowerCase().includes("aspect")),
      ),
    ).toBe(true);
  });

  it("Aatrox → Kai'Sa does not place Kai'Sa in ancient Void war", () => {
    const a = characterBySlug.get("aatrox")!;
    const b = characterBySlug.get("kaisa")!;
    const path = findNarrativePath(a.id, b.id, graph)!;
    const journey = buildConnectionJourney(a, b, path);
    const ancientVoidWithKaisa = journey.steps.some(
      (s) =>
        s.eyebrow?.toLowerCase().includes("ancient") &&
        s.title.toLowerCase().includes("kaisa"),
    );
    expect(ancientVoidWithKaisa).toBe(false);
    expect(
      journey.steps.at(-1)?.narration.some((n) => n.toLowerCase().includes("indirect")) ||
        journey.steps.at(-1)?.eyebrow?.toLowerCase().includes("indirect"),
    ).toBe(true);
  });

  it("Yasuo → Yone prefers direct framing", () => {
    const a = characterBySlug.get("yasuo")!;
    const b = characterBySlug.get("yone")!;
    const path = findNarrativePath(a.id, b.id, graph)!;
    const journey = buildConnectionJourney(a, b, path);
    expect(path.directOnly).toBe(true);
    expect(journey.steps.some((s) => s.entityId === b.id)).toBe(true);
  });
});
