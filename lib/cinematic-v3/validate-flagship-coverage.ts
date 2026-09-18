import {
  FLAGSHIP_JOURNEY_IDS,
  FLAGSHIP_SCENE_ASSETS,
  flagshipAssetBySceneId,
} from "@/data/cinematic/flagship-assets";
import { constellationByCharacterId } from "@/data/cinematic/constellation-anchors";
import {
  AATROX_RECORD_INTRO_TIMING,
  AATROX_RECORD_OUTRO_TIMING,
} from "./aatrox-cinematic-direction";
import { computeContourConnectivity } from "./constellation-connectivity";
import { compositionForScene } from "./composition";
import { nameConstellationByCharacterId } from "@/data/cinematic/name-constellations";
import { chapterHubTimingMs, CHAPTER_HUB_TIMING } from "./chapter-hub";
import { validateConstellationHubFit } from "./name-fit";
import { DEFAULT_INTRO_TIMING } from "./intro-outro";
import { DEFAULT_RECORD_TIMING, recordTimingForScene, totalSceneRecordMs } from "./record-mode";
import type { CinematicJourney } from "@/types";
import type { CinematicValidationIssue } from "./validate-cinematic";
import { totalIntroMs } from "./intro-outro";

const MAX_RECORD_INTRO_MS = 7000;
const MAX_STANDARD_SCENE_MS = 6000;
const MAX_MAJOR_SCENE_MS = 6500;
const MIN_AATROX_SILHOUETTE_ANCHORS = 350;
const MIN_ICONIC_CONNECTIVITY = 95;
const MIN_PRIMARY_CONNECTIVITY = 90;

export function validateFlagshipCoverage(journey: CinematicJourney): CinematicValidationIssue[] {
  const issues: CinematicValidationIssue[] = [];
  if (!FLAGSHIP_JOURNEY_IDS.includes(journey.id as (typeof FLAGSHIP_JOURNEY_IDS)[number])) {
    return issues;
  }

  for (const scene of journey.scenes) {
    const manifest = flagshipAssetBySceneId.get(scene.id);
    const composition = scene.composition ?? compositionForScene(scene, scene.image);

    if (composition === "NO_IMAGE" && !manifest?.noImageJustification) {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "flagship_no_image",
        message: "Flagship scene has NO_IMAGE without explicit justification",
      });
    }

    if (!scene.image?.url && scene.type !== "ENDING") {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "flagship_missing_background",
        message: "Flagship scene missing official background visual",
      });
    }

    if (scene.image?.confidence === "LOW" && manifest?.officialAsset) {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "low_confidence_when_curated_exists",
        message: "Scene uses LOW-confidence asset but curated official asset is defined",
      });
    }

    const sceneMs = totalSceneRecordMs(scene);
    const isMajor =
      (scene.worldScale ?? 1) >= 2 || scene.worldNodeArchetype === "INVASION";
    const maxMs = isMajor ? MAX_MAJOR_SCENE_MS : MAX_STANDARD_SCENE_MS;
    if (sceneMs > maxMs && scene.importance === "CORE" && scene.type !== "ENDING") {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "scene_timing_too_slow",
        message: `Record scene ${sceneMs}ms exceeds ${maxMs}ms target`,
      });
    }

    const assetUrl = scene.image?.url ?? manifest?.officialAsset?.url ?? "";
    if (assetUrl.includes("9x16")) {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "vertical_asset_fallback",
        message: "Flagship scene still uses 9:16 asset in record mode",
      });
    }
  }

  if (journey.introSequence?.recordTiming) {
    const introMs = totalIntroMs(journey.introSequence.recordTiming);
    if (introMs > MAX_RECORD_INTRO_MS) {
      issues.push({
        level: "WARNING",
        kind: "intro_timing_too_slow",
        message: `Record intro ${introMs}ms exceeds ${MAX_RECORD_INTRO_MS}ms target`,
      });
    }
    if (introMs < 4500 || introMs > 5800) {
      issues.push({
        level: "WARNING",
        kind: "intro_timing_out_of_band",
        message: `Record intro ${introMs}ms outside 4.5–5.8s target band`,
      });
    }
  }

  if (journey.introSequence?.type === "NAME_CONSTELLATION" && journey.primaryCharacterId) {
    const nameConstellation = nameConstellationByCharacterId.get(journey.primaryCharacterId);
    if (nameConstellation) {
      const progressiveGroups =
        nameConstellation.contourGroups?.filter((g) => (g.revealPhase ?? 1) > 1) ?? [];
      if (progressiveGroups.length > 0) {
        issues.push({
          level: "WARNING",
          kind: "name_progressive_reveal",
          message: `Name constellation uses progressive reveal (${progressiveGroups.length} phased groups) — should fade globally`,
        });
      }
      if (!nameConstellation.typographySource) {
        issues.push({
          level: "WARNING",
          kind: "name_missing_font_source",
          message: "Name constellation lacks font-derived typographySource",
        });
      }
      const hubFitIssue = validateConstellationHubFit(nameConstellation);
      if (hubFitIssue) {
        issues.push({
          level: "ERROR",
          kind: "name_hub_fit",
          message: `${hubFitIssue.displayName} hub fit failed: ${hubFitIssue.message}`,
        });
      }
    }
  }

  const travelMs = recordTimingForScene(journey.scenes[1] ?? journey.scenes[0]).travelMs;
  const hubTiming = chapterHubTimingMs(travelMs);
  if (hubTiming.nameReadableMs < CHAPTER_HUB_TIMING.nameReadableMs.min) {
    issues.push({
      level: "WARNING",
      kind: "inter_chapter_name_too_fast",
      message: `Inter-chapter name readable window ${hubTiming.nameReadableMs}ms below ${CHAPTER_HUB_TIMING.nameReadableMs.min}ms`,
    });
  }

  for (const scene of journey.scenes) {
    if (scene.type === "ENDING") continue;
    const comp = scene.composition ?? compositionForScene(scene, scene.image);
    if (scene.image?.url && comp === "BACKGROUND_MEMORY" && scene.importance === "CORE") {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "weak_background_composition",
        message: "CORE flagship beat uses BACKGROUND_MEMORY — prefer FULL_BLEED for illustrated presence",
      });
    }
  }

  if (journey.id === "cinematic:character:aatrox") {
    const constellation = constellationByCharacterId.get("char:aatrox");
    if (constellation && constellation.anchors.length < MIN_AATROX_SILHOUETTE_ANCHORS) {
      issues.push({
        level: "WARNING",
        kind: "low_constellation_density",
        message: `Aatrox has ${constellation.anchors.length} anchors — need ≥${MIN_AATROX_SILHOUETTE_ANCHORS} for recognition`,
      });
    }
    if (constellation) {
      const connectivity = computeContourConnectivity(constellation);
      if (connectivity.iconicConnectivityPct < MIN_ICONIC_CONNECTIVITY) {
        issues.push({
          level: "WARNING",
          kind: "low_iconic_connectivity",
          message: `Aatrox iconic connectivity ${connectivity.iconicConnectivityPct}% — target ≥${MIN_ICONIC_CONNECTIVITY}%`,
        });
      }
      if (connectivity.primaryConnectivityPct < MIN_PRIMARY_CONNECTIVITY) {
        issues.push({
          level: "WARNING",
          kind: "low_primary_connectivity",
          message: `Aatrox primary connectivity ${connectivity.primaryConnectivityPct}% — target ≥${MIN_PRIMARY_CONNECTIVITY}%`,
        });
      }
    }
  }

  const manifestScenes = FLAGSHIP_SCENE_ASSETS.filter((e) => e.journeyId === journey.id);
  for (const entry of manifestScenes) {
    if (!entry.officialAsset && !entry.noImageJustification) {
      issues.push({
        level: "WARNING",
        sceneId: entry.sceneId,
        kind: "manifest_missing_asset",
        message: "Flagship manifest entry lacks officialAsset",
      });
    }
  }

  return issues;
}

export function flagshipTimingSummary() {
  return {
    defaultIntroMs: totalIntroMs(DEFAULT_INTRO_TIMING),
    aatroxRecordIntroMs: totalIntroMs(AATROX_RECORD_INTRO_TIMING),
    aatroxRecordOutroMs:
      AATROX_RECORD_OUTRO_TIMING.pullbackMs +
      AATROX_RECORD_OUTRO_TIMING.pathRevealMs +
      AATROX_RECORD_OUTRO_TIMING.nodesConnectMs +
      AATROX_RECORD_OUTRO_TIMING.constellationReformMs +
      AATROX_RECORD_OUTRO_TIMING.splashEchoMs +
      AATROX_RECORD_OUTRO_TIMING.holdMs,
    defaultSceneMs:
      DEFAULT_RECORD_TIMING.travelMs +
      DEFAULT_RECORD_TIMING.arrivalSettleMs +
      DEFAULT_RECORD_TIMING.eyebrowRevealMs +
      DEFAULT_RECORD_TIMING.titleRevealMs +
      DEFAULT_RECORD_TIMING.narrativeRevealMs +
      DEFAULT_RECORD_TIMING.readingHoldMs +
      DEFAULT_RECORD_TIMING.departurePrepMs,
  };
}
