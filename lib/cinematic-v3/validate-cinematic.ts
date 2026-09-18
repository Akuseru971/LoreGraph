import { characterById, eventById, sourceById } from "@/data";
import { claimById } from "@/data/knowledge/claims";
import { isTrustedClaim } from "@/lib/knowledge/claim-evidence";
import type { CinematicJourney, CinematicScene } from "@/types";

export interface CinematicValidationIssue {
  level: "ERROR" | "WARNING";
  sceneId?: string;
  kind: string;
  message: string;
}

function validateScene(scene: CinematicScene): CinematicValidationIssue[] {
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
    issues.push(...validateScene(scene));
  }

  if (journey.primaryCharacterId && !characterById.has(journey.primaryCharacterId)) {
    issues.push({
      level: "ERROR",
      kind: "invalid_primary_character",
      message: `Invalid primaryCharacterId: ${journey.primaryCharacterId}`,
    });
  }

  return issues;
}
