import { beforeEach, describe, expect, it } from "vitest";
import { characters } from "@/data/characters";
import { buildLoreGraph, resetLoreGraphCache } from "@/lib/graph/build";
import { buildChampionJourneyV3 } from "./build-champion-journey";
import { buildConnectionJourneyV3 } from "./build-connection-journey";
import {
  isCinematicReady,
  SHOWCASE_CHAMPION_SLUGS,
  SHOWCASE_CONNECTION_PAIRS,
} from "./readiness";
import { validateCinematicJourney } from "./validate-cinematic";

beforeEach(() => {
  resetLoreGraphCache();
  buildLoreGraph();
});

function char(slug: string) {
  const c = characters.find((ch) => ch.slug === slug);
  if (!c) throw new Error(`missing champion ${slug}`);
  return c;
}

describe("Cinematic Journey V3", () => {
  it("builds Aatrox journey with >=5 scenes when cinematic-ready", () => {
    const aatrox = char("aatrox");
    expect(isCinematicReady(aatrox)).toBe(true);
    const journey = buildChampionJourneyV3(aatrox);
    expect(journey.scenes.length).toBeGreaterThanOrEqual(5);
    expect(journey.cinematicReady).toBe(true);
    const errors = validateCinematicJourney(journey).filter((i) => i.level === "ERROR");
    expect(errors).toHaveLength(0);
    expect(journey.scenes.some((s) => s.type === "ORIGIN")).toBe(true);
    expect(journey.scenes.some((s) => s.type === "ENDING")).toBe(true);
  });

  it("builds Yasuo journey with trusted beats only", () => {
    const yasuo = char("yasuo");
    const journey = buildChampionJourneyV3(yasuo);
    expect(journey.scenes.length).toBeGreaterThanOrEqual(4);
    const factScenes = journey.scenes.filter((s) => s.evidenceClass === "FACT");
    for (const scene of factScenes) {
      expect(scene.claimIds.length).toBeGreaterThan(0);
    }
  });

  it("builds Yasuo↔Yone connection with choreography", () => {
    const journey = buildConnectionJourneyV3(char("yasuo"), char("yone"));
    expect(journey).not.toBeNull();
    expect(journey!.scenes.length).toBeGreaterThanOrEqual(6);
    expect(journey!.kind).toBe("CONNECTION");
    expect(journey!.scenes.some((s) => s.type === "CONFLICT")).toBe(true);
    expect(journey!.scenes.some((s) => s.relationshipChoreography === "FADE")).toBe(true);
    const errors = validateCinematicJourney(journey!).filter((i) => i.level === "ERROR");
    expect(errors).toHaveLength(0);
  });

  it("assigns spatial coordinates deterministically", () => {
    const a = buildChampionJourneyV3(char("aatrox"));
    const b = buildChampionJourneyV3(char("aatrox"));
    expect(a.scenes.map((s) => s.coordinates)).toEqual(b.scenes.map((s) => s.coordinates));
  });

  it("marks Viego not cinematic-ready without trusted beats", () => {
    const viego = char("viego");
    expect(isCinematicReady(viego)).toBe(false);
    const journey = buildChampionJourneyV3(viego);
    expect(journey.cinematicReady).toBe(false);
  });

  it("showcase champions build without fatal validation errors when ready", () => {
    for (const slug of SHOWCASE_CHAMPION_SLUGS) {
      const c = char(slug);
      const journey = buildChampionJourneyV3(c);
      const errors = validateCinematicJourney(journey).filter((i) => i.level === "ERROR");
      if (isCinematicReady(c)) {
        expect(journey.scenes.length).toBeGreaterThanOrEqual(3);
        expect(errors).toHaveLength(0);
      }
    }
  });

  it("showcase connection pairs build successfully", () => {
    for (const [a, b] of SHOWCASE_CONNECTION_PAIRS) {
      const journey = buildConnectionJourneyV3(char(a), char(b));
      expect(journey).not.toBeNull();
      expect(validateCinematicJourney(journey!).filter((i) => i.level === "ERROR")).toHaveLength(0);
    }
  });
});
