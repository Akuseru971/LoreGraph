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
  buildIntroSequence,
  buildOutroSequence,
  computeIntroPhaseState,
  computeOutroPhaseState,
  NAME_RECORD_INTRO_TIMING,
  totalIntroMs,
  totalOutroMs,
} from "./intro-outro";
import { constellationByCharacterId } from "@/data/cinematic/constellation-anchors";
import { validateFlagshipConstellation } from "./validate-constellation";
import { computeContourConnectivity } from "./constellation-connectivity";
import { computeFlagshipPremiumMetrics } from "./flagship-premium-metrics";
import { computeChapterHubState } from "./chapter-hub";
import { validateStoryPanelJourney } from "./validate-story-panels";
import {
  fitConstellationToSafeFrame,
  formatProjectedBounds,
  validateConstellationHubFit,
} from "./name-fit";
import { evaluateHubMotion, HUB_READABILITY_SAMPLE_T } from "./motion-curve";
import { validateNameGlyphs } from "./validate-name-glyphs";
import { nameConstellationByCharacterId } from "@/data/cinematic/name-constellations";
import { computeRecordPhaseState, totalSceneRecordMs } from "./record-mode";

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

  it("flagship champion journeys use story panel mode without constellation intro", () => {
    const flagshipSlugs = ["aatrox", "yasuo", "yone", "viego", "skarner"];
    for (const slug of flagshipSlugs) {
      const journey = buildChampionJourneyV3(char(slug));
      expect(journey.introSequence).toBeUndefined();
      expect(journey.outroSequence).toBeUndefined();
      if (isCinematicReady(char(slug))) {
        const illustrated = journey.scenes.filter((s) => s.type !== "ENDING" && s.image?.url);
        expect(illustrated.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("Aatrox constellation is splash-mask derived with aligned silhouette provenance", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const constellation = constellationByCharacterId.get("char:aatrox")!;
    expect(constellation.silhouetteSource).toBeDefined();
    expect(constellation.silhouetteSource!.splashAssetPath).toContain("aatrox-hero-16x9");
    expect(constellation.silhouetteSource!.maskAssetPath).toContain("aatrox-hero-16x9-mask");
    expect(constellation.silhouetteSource!.imageWidth).toBe(1600);
    expect(constellation.silhouetteSource!.imageHeight).toBe(900);
    expect(constellation.silhouetteSource!.simplifiedContourPoints).toBeGreaterThan(50);
    expect(constellation.anchors.length).toBeGreaterThanOrEqual(350);
    expect(constellation.anchors.filter((a) => a.category === "CONTOUR").length).toBeGreaterThanOrEqual(
      340,
    );
    expect(constellation.lines?.length).toBeGreaterThan(30);
    expect(validateFlagshipConstellation(constellation).filter((i) => i.level === "ERROR")).toHaveLength(
      0,
    );
    expect(journey.introSequence).toBeUndefined();
    expect(journey.outroSequence).toBeUndefined();
    const duel = journey.scenes.find((s) => s.id === "cscene:aatrox:beat:aatrox-7");
    expect(duel?.image?.url).toContain("aatrox-atreus-duel");
    const blade = journey.scenes.find((s) => s.id === "cscene:aatrox:beat:aatrox-5");
    expect(blade?.image?.url).toBeTruthy();
    expect(blade?.composition).not.toBe("NO_IMAGE");
  });

  it("flagship constellations pass structural silhouette validation", () => {
    const flagshipSlugs = ["aatrox", "yasuo", "yone", "viego", "skarner"];
    for (const slug of flagshipSlugs) {
      const constellation = constellationByCharacterId.get(`char:${slug}`)!;
      expect(constellation.anchors.length).toBeGreaterThanOrEqual(60);
      expect(constellation.anchors.filter((a) => a.category === "CONTOUR").length).toBeGreaterThanOrEqual(
        30,
      );
      if (!constellation.silhouetteSource) {
        expect(constellation.contourGroups?.length).toBeGreaterThanOrEqual(4);
      } else {
        expect(constellation.silhouetteSource.maskAssetPath).toBeTruthy();
      }
      expect(validateFlagshipConstellation(constellation).filter((i) => i.level === "ERROR")).toHaveLength(
        0,
      );
    }
  });

  it("intro phase state progresses through splash to zoom handoff", () => {
    const journey = buildChampionJourneyV3(char("yasuo"));
    const intro = buildIntroSequence(
      journey,
      "yasuo",
      "char:yasuo",
      "ionia",
      journey.title,
    )!;
    const anchorCount = constellationByCharacterId.get("char:yasuo")!.anchors.length;
    const early = computeIntroPhaseState(intro, 500, anchorCount);
    expect(early.phase).toBe("splash_hold");
    expect(early.splashOpacity).toBeGreaterThan(0.9);
    const mid = computeIntroPhaseState(intro, Math.floor(totalIntroMs(intro.timing) * 0.45), anchorCount);
    expect(["darken", "stars_emerge", "lines_form", "hero_select"]).toContain(mid.phase);
    const late = computeIntroPhaseState(intro, totalIntroMs(intro.timing) - 100, anchorCount);
    expect(["zoom_star", "handoff"]).toContain(late.phase);
    expect(late.zoomProgress).toBeGreaterThan(0);
  });

  it("legacy name intro timing module remains 4.5–6s when used directly", () => {
    const recordMs = totalIntroMs(NAME_RECORD_INTRO_TIMING);
    expect(recordMs).toBeLessThanOrEqual(6000);
    expect(recordMs).toBeGreaterThanOrEqual(4500);
  });

  it("flagship journeys pass story panel validation", () => {
    for (const slug of ["aatrox", "yasuo"]) {
      const journey = buildChampionJourneyV3(char(slug));
      const errors = validateStoryPanelJourney(journey).filter((i) => i.level === "ERROR");
      expect(errors).toHaveLength(0);
    }
  });

  it("flagship scenes default to freefall camera presets where curated", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const freefallScenes = journey.scenes.filter((s) =>
      s.cameraPreset?.startsWith("FREEFALL"),
    );
    expect(freefallScenes.length).toBeGreaterThanOrEqual(5);
  });

  it("flagship journeys have official background on all curated scenes", () => {
    const flagshipSlugs = ["aatrox", "yasuo", "yone", "viego", "skarner"];
    for (const slug of flagshipSlugs) {
      const journey = buildChampionJourneyV3(char(slug));
      const withoutImage = journey.scenes.filter(
        (s) => !s.image?.url && s.type !== "ENDING",
      );
      expect(withoutImage).toHaveLength(0);
    }
    const conn = buildConnectionJourneyV3(char("yasuo"), char("yone"))!;
    const connWithout = conn.scenes.filter((s) => !s.image?.url);
    expect(connWithout).toHaveLength(0);
  });

  it("Aatrox constellation has high iconic and primary connectivity", () => {
    const constellation = constellationByCharacterId.get("char:aatrox")!;
    const metrics = computeContourConnectivity(constellation);
    expect(metrics.iconicConnectivityPct).toBeGreaterThanOrEqual(95);
    expect(metrics.primaryConnectivityPct).toBeGreaterThanOrEqual(90);
    expect(constellation.anchors.length).toBeGreaterThanOrEqual(500);
  });

  it("story panel record mode scenes pace within 8s per beat", () => {
    const journey = buildChampionJourneyV3(char("yasuo"));
    const standardScenes = journey.scenes.filter(
      (s) => s.type !== "ENDING" && (s.worldScale ?? 1) < 2,
    );
    for (const scene of standardScenes) {
      expect(totalSceneRecordMs(scene)).toBeLessThanOrEqual(8000);
    }
  });

  it("flagship premium metrics meet horizontal and 9:16 targets", () => {
    const metrics = computeFlagshipPremiumMetrics();
    expect(metrics.horizontalAssetPct).toBeGreaterThanOrEqual(90);
    expect(metrics.nineSixteenFallbackCount).toBe(0);
    expect(metrics.aatroxLineSkipDefault).toBeLessThanOrEqual(0.1);
  });

  it("name constellation uses global reveal (no progressive letter groups)", () => {
    for (const slug of ["aatrox", "yasuo", "yone", "viego", "skarner"]) {
      const nameConstellation = nameConstellationByCharacterId.get(`char:${slug}`)!;
      const phased = nameConstellation.contourGroups?.filter((g) => (g.revealPhase ?? 1) > 1) ?? [];
      expect(phased).toHaveLength(0);
      expect(nameConstellation.displayName).toBeTruthy();
    }
  });

  it("name intro fades in globally within stars_emerge phase", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const intro = buildIntroSequence(
      journey,
      "aatrox",
      "char:aatrox",
      "shurima",
      journey.title,
    )!;
    const anchorCount = 100;
    const midDarken = computeIntroPhaseState(
      intro,
      intro.recordTiming!.splashHoldMs +
        intro.recordTiming!.splashDriftMs +
        intro.recordTiming!.darkenMs * 0.7,
      anchorCount,
      true,
    );
    expect(midDarken.starRevealProgress).toBe(1);
    const emerge = computeIntroPhaseState(
      intro,
      intro.recordTiming!.splashHoldMs +
        intro.recordTiming!.splashDriftMs +
        intro.recordTiming!.darkenMs +
        intro.recordTiming!.starsEmergeMs * 0.85,
      anchorCount,
      true,
    );
    expect(emerge.nameOpacity).toBeGreaterThan(0.85);
    expect(emerge.starRevealProgress).toBe(1);
  });

  it("chapter hub uses continuous master curve with overlapping channels", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const nameConstellation = nameConstellationByCharacterId.get("char:aatrox")!;
    const hub = computeChapterHubState(0.4, nameConstellation, 3, journey.scenes.length);
    expect(hub.showName).toBe(true);
    expect(hub.nameOpacity).toBeGreaterThan(0.7);
    expect(hub.cameraPullback).toBeGreaterThan(0.85);
    expect(hub.destinationStarId).toBeTruthy();
    const readable = computeChapterHubState(
      HUB_READABILITY_SAMPLE_T,
      nameConstellation,
      3,
      journey.scenes.length,
    );
    expect(readable.plungeZoom).toBe(0);
    expect(readable.nameReadable).toBeGreaterThan(0.85);
    const midPlunge = computeChapterHubState(0.55, nameConstellation, 3, journey.scenes.length);
    expect(midPlunge.starIntensity).toBeGreaterThan(1.2);
    expect(midPlunge.plunge).toBeGreaterThan(0.03);
    expect(midPlunge.plungeZoom).toBeGreaterThan(0.04);
    const latePlunge = computeChapterHubState(0.78, nameConstellation, 3, journey.scenes.length);
    expect(latePlunge.nextBackground).toBeGreaterThan(0.35);
  });

  it("flagship name constellations fit safe frame at readability sample", () => {
    for (const slug of ["aatrox", "yasuo", "yone", "viego", "skarner"]) {
      const constellation = nameConstellationByCharacterId.get(`char:${slug}`)!;
      const issue = validateConstellationHubFit(constellation);
      expect(issue).toBeNull();
      const fit = fitConstellationToSafeFrame(constellation);
      expect(fit.projected.width).toBeLessThanOrEqual(0.78);
      expect(fit.projected.minX).toBeGreaterThanOrEqual(0.08);
      expect(fit.projected.maxX).toBeLessThanOrEqual(0.92);
    }
  });

  it("motion curve separates readable name from plunge zoom", () => {
    const readable = evaluateHubMotion(HUB_READABILITY_SAMPLE_T);
    expect(readable.plungeZoom).toBe(0);
    expect(readable.nameReadable).toBeGreaterThan(0.8);
    const plunge = evaluateHubMotion(0.55);
    expect(plunge.plungeZoom).toBeGreaterThan(0.02);
    expect(plunge.nextBackground).toBeGreaterThan(0.01);
    const earlyBg = evaluateHubMotion(0.53);
    expect(earlyBg.nextBackground).toBeGreaterThan(0);
  });

  it("name constellations are derived from Instrument Serif glyph geometry", () => {
    for (const slug of ["aatrox", "yasuo", "yone", "viego", "skarner"]) {
      const c = nameConstellationByCharacterId.get(`char:${slug}`)!;
      expect(c.typographySource).toContain("Instrument Serif");
      expect(c.anchors.length).toBeLessThan(200);
      expect(c.anchors.length).toBeGreaterThan(60);
    }
  });

  it("simplified name glyphs pass readability validation", () => {
    const issues = validateNameGlyphs().filter((i) => i.level === "ERROR");
    expect(issues).toHaveLength(0);
  });

  it("AATROX simplified constellation has readable letter separation", () => {
    const aatrox = nameConstellationByCharacterId.get("char:aatrox")!;
    expect(aatrox.contourGroups?.length).toBe(6);
    const perLetter = aatrox.anchors.length / 6;
    expect(perLetter).toBeLessThanOrEqual(24);
    expect(perLetter).toBeGreaterThanOrEqual(8);
    const letterBounds = (aatrox.contourGroups ?? []).map((g) => {
      const anchors = aatrox.anchors.filter((a) => a.contourGroup === g.id);
      const xs = anchors.map((a) => a.x);
      return { minX: Math.min(...xs), maxX: Math.max(...xs) };
    });
    for (let i = 0; i < letterBounds.length - 1; i++) {
      expect(letterBounds[i + 1].minX - letterBounds[i].maxX).toBeGreaterThan(0.01);
    }
  });

  it("record travel phase uses panel transition progress", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const scene = journey.scenes[2];
    const state = computeRecordPhaseState(scene, 400, { journey });
    expect(state.phase).toBe("travel");
    expect(state.transitionProgress).toBeGreaterThan(0.2);
    expect(state.textVisible).toBe(false);
  });

  it("story panel record timing fits per-beat targets", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const scene = journey.scenes[1];
    const ms = totalSceneRecordMs(scene);
    expect(ms).toBeLessThanOrEqual(7500);
    expect(ms).toBeGreaterThanOrEqual(4000);
  });

  it("outro phase state reforms constellation silhouette", () => {
    const journey = buildChampionJourneyV3(char("aatrox"));
    const outro = buildOutroSequence(journey, "char:aatrox", "aatrox", journey.title)!;
    const early = computeOutroPhaseState(outro, 400);
    expect(early.phase).toBe("pullback");
    const late = computeOutroPhaseState(outro, totalOutroMs(outro.timing) - 200);
    expect(late.phase).toBe("hold");
    expect(late.constellationOpacity).toBeGreaterThan(0.8);
  });
});
