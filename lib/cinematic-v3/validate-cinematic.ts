import { characterById, eventById, sourceById } from "@/data";
import { eventAssetByEventId } from "@/data/knowledge/event-assets";
import { claimById } from "@/data/knowledge/claims";
import { isTrustedClaim } from "@/lib/knowledge/claim-evidence";
import type { CinematicJourney, CinematicScene } from "@/types";
import { flagshipAssetBySceneId, FLAGSHIP_JOURNEY_IDS } from "@/data/cinematic/flagship-assets";
import { constellationById } from "@/data/cinematic/constellation-anchors";
import { compositionForScene } from "./composition";
import { eventSlugFromId } from "./resolve-scene-asset";

export interface CinematicValidationIssue {
  level: "ERROR" | "WARNING";
  sceneId?: string;
  kind: string;
  message: string;
}

function validateSceneAssets(
  scene: CinematicScene,
  journey: CinematicJourney,
): CinematicValidationIssue[] {
  const issues: CinematicValidationIssue[] = [];
  const composition = compositionForScene(scene, scene.image);

  if (scene.image?.confidence === "LOW" && composition !== "NO_IMAGE") {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "low_confidence_image",
      message: "LOW-confidence image shown in cinematic mode",
    });
  }

  if (
    scene.type === "EVENT" &&
    scene.image?.relevance === "CHARACTER_CONTEXT" &&
    scene.eventId &&
    eventAssetByEventId.has(scene.eventId)
  ) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "event_champion_fallback",
      message: "EVENT scene uses champion fallback when event art exists",
    });
  }

  if (scene.image?.url && !scene.image.aspectRatio && !scene.image.focalPoint) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "missing_focal_point",
      message: "Image lacks focal point metadata",
    });
  }

  if (
    scene.entityId &&
    scene.image?.sourceEntityId &&
    scene.entityId !== scene.primaryCharacterId &&
    scene.image.sourceEntityId !== scene.entityId &&
    scene.image.relevance === "CHARACTER_CONTEXT" &&
    (scene.type === "EVENT" || scene.type === "CONFLICT")
  ) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "unrelated_image_entity",
      message: `Image source ${scene.image.sourceEntityId} unrelated to entity ${scene.entityId}`,
    });
  }

  if (scene.eventId && !scene.image?.url) {
    const slug = eventSlugFromId(scene.eventId);
    if (slug && eventAssetByEventId.has(scene.eventId)) {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "missing_event_visual",
        message: "High-confidence event art exists but scene has no image",
      });
    }
  }

  const sameUrlScenes = journey.scenes.filter((s) => s.image?.url === scene.image?.url);
  if (scene.image?.url && sameUrlScenes.length > 2 && scene.type !== "ORIGIN") {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "reused_champion_image",
      message: `Same image reused across ${sameUrlScenes.length} scenes`,
    });
  }

  if (scene.image?.focalPoint && composition === "LEFT_SUBJECT" && scene.image.focalPoint.x > 0.6) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "composition_focal_conflict",
      message: "LEFT_SUBJECT composition conflicts with right-side focal point",
    });
  }

  const manifest = flagshipAssetBySceneId.get(scene.id);
  if (manifest && !scene.visualSubject) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "missing_visual_subject",
      message: "Flagship scene missing visualSubject",
    });
  }

  if (manifest?.qualityStatus === "CURATED" && scene.image?.confidence === "LOW") {
    issues.push({
      level: "ERROR",
      sceneId: scene.id,
      kind: "curated_low_confidence",
      message: "CURATED scene using LOW-confidence asset",
    });
  }

  if (scene.importance === "CORE" && !scene.shotType) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "missing_shot_type",
      message: "CORE scene missing shotType",
    });
  }

  if (
    !scene.environmentalMotifs?.length &&
    scene.type !== "ENDING" &&
    scene.importance === "CORE"
  ) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "missing_environment_motif",
      message: "CORE scene missing environmental motifs",
    });
  }

  if (
    (scene.worldScale ?? 1) >= 2 &&
    !scene.worldNodeArchetype &&
    (scene.type === "EVENT" || scene.type === "CONFLICT")
  ) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "missing_world_node_archetype",
      message: "Major event scene missing WorldNode archetype",
    });
  }

  if (
    journey.recordReady &&
    manifest?.qualityStatus === "MISSING"
  ) {
    issues.push({
      level: "ERROR",
      sceneId: scene.id,
      kind: "record_ready_missing_asset",
      message: "Record-ready journey has MISSING asset status",
    });
  }

  return issues;
}

function validateScene(scene: CinematicScene, journey: CinematicJourney): CinematicValidationIssue[] {
  const issues: CinematicValidationIssue[] = [];

  if (!scene.narrative.trim()) {
    issues.push({
      level: "ERROR",
      sceneId: scene.id,
      kind: "empty_narrative",
      message: "Scene has empty narrative",
    });
  }

  if (scene.narrative.split(/\s+/).length > 65) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "narrative_long",
      message: "Narrative exceeds recommended length",
    });
  }

  if (scene.evidenceClass === "FACT") {
    if (!scene.claimIds.length) {
      issues.push({
        level: "ERROR",
        sceneId: scene.id,
        kind: "fact_no_claim",
        message: "FACT scene lacks claimIds",
      });
    } else {
      for (const claimId of scene.claimIds) {
        const claim = claimById.get(claimId);
        if (!claim) {
          issues.push({
            level: "ERROR",
            sceneId: scene.id,
            kind: "invalid_claim",
            message: `Unknown claim: ${claimId}`,
          });
        } else if (!isTrustedClaim(claim)) {
          issues.push({
            level: "ERROR",
            sceneId: scene.id,
            kind: "untrusted_claim",
            message: `FACT scene uses untrusted claim: ${claimId}`,
          });
        }
      }
    }
  }

  if (scene.type === "RELATIONSHIP" && !scene.secondaryCharacterIds?.length) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "relationship_no_secondary",
      message: "Relationship scene has no secondary characters",
    });
  }

  if (scene.type === "CONFLICT" && scene.evidenceClass === "FACT" && !scene.eventId) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "unsupported_conflict",
      message: "Conflict scene marked FACT without eventId",
    });
  }

  if (scene.type === "TRANSFORMATION" && scene.evidenceClass === "FACT" && !scene.claimIds.length) {
    issues.push({
      level: "WARNING",
      sceneId: scene.id,
      kind: "unsupported_transformation",
      message: "Transformation scene marked FACT without claims",
    });
  }

  if (scene.eventId && !eventById.has(scene.eventId)) {
    issues.push({
      level: "ERROR",
      sceneId: scene.id,
      kind: "invalid_event",
      message: `Invalid eventId: ${scene.eventId}`,
    });
  }

  for (const sid of scene.sourceIds) {
    if (!sourceById.has(sid)) {
      issues.push({
        level: "WARNING",
        sceneId: scene.id,
        kind: "unknown_source",
        message: `Unknown source: ${sid}`,
      });
    }
  }

  if (!scene.coordinates) {
    issues.push({
      level: "ERROR",
      sceneId: scene.id,
      kind: "missing_coordinates",
      message: "Scene missing spatial coordinates",
    });
  }

  issues.push(...validateSceneAssets(scene, journey));

  return issues;
}

export function validateCinematicJourney(journey: CinematicJourney): CinematicValidationIssue[] {
  const issues: CinematicValidationIssue[] = [];
  const seen = new Set<string>();

  if (journey.scenes.length < 2) {
    issues.push({
      level: "ERROR",
      kind: "too_few_scenes",
      message: "Journey has fewer than 2 scenes",
    });
  }

  const meaningful = journey.scenes.filter((s) => s.type !== "ENDING");
  if (meaningful.length < 2) {
    issues.push({
      level: "ERROR",
      kind: "too_few_meaningful_scenes",
      message: "Journey has fewer than 2 meaningful scenes",
    });
  }

  const hasEnding = journey.scenes.some((s) => s.type === "ENDING");
  if (!hasEnding) {
    issues.push({
      level: "ERROR",
      kind: "missing_ending",
      message: "Journey lacks ENDING scene with graph reveal",
    });
  }

  if (hasEnding) {
    const ending = journey.scenes.find((s) => s.type === "ENDING");
    if (ending && !ending.graphTarget) {
      issues.push({
        level: "WARNING",
        kind: "ending_no_graph_target",
        message: "ENDING scene missing graphTarget coordinates",
      });
    }
  }

  if (!journey.continuity) {
    issues.push({
      level: "ERROR",
      kind: "missing_continuity",
      message: "Journey continuity unresolved",
    });
  }

  for (const scene of journey.scenes) {
    if (seen.has(scene.id)) {
      issues.push({
        level: "ERROR",
        sceneId: scene.id,
        kind: "duplicate_scene",
        message: `Duplicate scene id: ${scene.id}`,
      });
    }
    seen.add(scene.id);
    issues.push(...validateScene(scene, journey));
  }

  if (journey.primaryCharacterId && !characterById.has(journey.primaryCharacterId)) {
    issues.push({
      level: "ERROR",
      kind: "invalid_primary_character",
      message: `Invalid primaryCharacterId: ${journey.primaryCharacterId}`,
    });
  }

  const isFlagship = FLAGSHIP_JOURNEY_IDS.includes(
    journey.id as (typeof FLAGSHIP_JOURNEY_IDS)[number],
  );
  if (isFlagship && journey.kind === "CHARACTER") {
    if (!journey.introSequence) {
      issues.push({
        level: "WARNING",
        kind: "missing_intro_sequence",
        message: "Flagship CHARACTER journey missing introSequence",
      });
    } else if (!constellationById.has(journey.introSequence.constellationId)) {
      issues.push({
        level: "ERROR",
        kind: "invalid_intro_constellation",
        message: `Unknown constellation: ${journey.introSequence.constellationId}`,
      });
    }
    if (!journey.outroSequence) {
      issues.push({
        level: "WARNING",
        kind: "missing_outro_sequence",
        message: "Flagship CHARACTER journey missing outroSequence",
      });
    }
  }

  return issues;
}
