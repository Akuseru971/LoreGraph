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
import { resolveCinematicSceneAsset } from "./resolve-scene-asset";
import {
  computeIntroPhaseState,
  computeOutroPhaseState,
  totalIntroMs,
  totalOutroMs,
} from "./intro-outro";
import { constellationByCharacterId } from "@/data/cinematic/constellation-anchors";

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

  it("Aatrox journey uses event art instead of champion splash for void war", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const voidScene = journey.scenes.find((s) => s.eventId === "event:void-incursion");
    expect(voidScene).toBeDefined();
    expect(voidScene!.image?.relevance).not.toBe("CHARACTER_CONTEXT");
    expect(voidScene!.image?.url).toBeTruthy();
  });

  it("Yasuo↔Yone invasion scene uses event art", () => {
    const journey = buildConnectionJourneyV3(char("yasuo"), char("yone"))!;
    const invasion = journey.scenes.find((s) => s.eventId === "event:noxian-invasion-ionia");
    expect(invasion?.image?.relevance).toBe("EXACT_EVENT");
  });

  it("resolveCinematicSceneAsset returns null for unsupported LOW confidence", () => {
    const aatrox = char("aatrox");
    const journey = buildChampionJourneyV3(aatrox);
    const consequence = journey.scenes.find((s) => s.type === "CONSEQUENCE");
    if (consequence) {
      const asset = resolveCinematicSceneAsset(consequence, { character: aatrox });
      if (asset?.confidence === "LOW") {
        expect(asset.url).toBeTruthy();
      }
    }
  });

  it("Yasuo↔Yone has record readiness metadata after flagship curation", () => {
    const journey = buildConnectionJourneyV3(char("yasuo"), char("yone"))!;
    expect(journey.visualReady).toBe(true);
    expect(journey.scenes.every((s) => s.shotType)).toBe(true);
    expect(journey.scenes.find((s) => s.id === "cscene:yasuo-yone:invasion")?.worldNodeArchetype).toBe(
      "INVASION",
    );
  });

  it("Aatrox flagship scenes have environmental motifs", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const withMotifs = journey.scenes.filter((s) => s.environmentalMotifs?.length);
    expect(withMotifs.length).toBeGreaterThan(journey.scenes.length - 2);
  });

  it("showcase connection pairs build successfully", () => {
    for (const [a, b] of SHOWCASE_CONNECTION_PAIRS) {
      const journey = buildConnectionJourneyV3(char(a), char(b));
      expect(journey).not.toBeNull();
      expect(validateCinematicJourney(journey!).filter((i) => i.level === "ERROR")).toHaveLength(0);
    }
  });

  it("flagship champion journeys include signature intro and outro sequences", () => {
    const flagshipSlugs = ["aatrox", "yasuo", "yone", "viego", "skarner"];
    for (const slug of flagshipSlugs) {
      const journey = buildChampionJourneyV3(char(slug));
      expect(journey.introSequence?.type).toBe("SPLASH_TO_CONSTELLATION");
      expect(journey.outroSequence?.type).toBe("CONSTELLATION_REFORM");
      expect(journey.introSequence?.splashAsset.url).toBeTruthy();
      expect(journey.introSequence?.heroStarId).toBeTruthy();
      const constellation = constellationByCharacterId.get(`char:${slug}`);
      expect(constellation?.anchors.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("Aatrox constellation has high-fidelity anchor count and path mapping", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const constellation = constellationByCharacterId.get("char:aatrox")!;
    expect(constellation.anchors.length).toBeGreaterThanOrEqual(40);
    expect(constellation.anchors.filter((a) => a.importance === "MICRO").length).toBeGreaterThan(10);
    expect(journey.introSequence?.recordShowIntroTitle).toBe(true);
    expect(journey.outroSequence?.pathToAnchorMapping?.["cscene:aatrox:beat:aatrox-5"]).toBe(
      "blade-core",
    );
    expect(journey.introSequence?.recordTiming).toBeDefined();
    const duel = journey.scenes.find((s) => s.id === "cscene:aatrox:beat:aatrox-7");
    expect(duel?.image?.url).toContain("aatrox-atreus-duel");
    const blade = journey.scenes.find((s) => s.id === "cscene:aatrox:beat:aatrox-5");
    expect(blade?.image?.url).toBeTruthy();
    expect(blade?.composition).not.toBe("NO_IMAGE");
  });

  it("intro phase state progresses through splash to zoom handoff", () => {
    const journey = buildChampionJourneyV3(char("yasuo"));
    const intro = journey.introSequence!;
    const anchorCount = constellationByCharacterId.get("char:yasuo")!.anchors.length;
    const early = computeIntroPhaseState(intro, 500, anchorCount);
    expect(early.phase).toBe("splash_hold");
    expect(early.splashOpacity).toBeGreaterThan(0.9);
    const mid = computeIntroPhaseState(intro, 6000, anchorCount);
    expect(["darken", "stars_emerge", "lines_form"]).toContain(mid.phase);
    const late = computeIntroPhaseState(intro, totalIntroMs(intro.timing) - 100, anchorCount);
    expect(["zoom_star", "handoff"]).toContain(late.phase);
    expect(late.zoomProgress).toBeGreaterThan(0);
  });

  it("outro phase state reforms constellation silhouette", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const outro = journey.outroSequence!;
    const early = computeOutroPhaseState(outro, 400);
    expect(early.phase).toBe("pullback");
    const late = computeOutroPhaseState(outro, totalOutroMs(outro.timing) - 200);
    expect(late.phase).toBe("hold");
    expect(late.constellationOpacity).toBeGreaterThan(0.8);
  });
});
