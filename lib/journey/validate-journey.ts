import { characterById, eventById, loreEntityById, sourceById } from "@/data";
import type { Journey } from "@/types";

export interface JourneyValidationIssue {
  level: "ERROR" | "WARNING";
  stepId?: string;
  message: string;
}

export function validateJourney(journey: Journey): JourneyValidationIssue[] {
  const issues: JourneyValidationIssue[] = [];
  const seen = new Set<string>();

  if (journey.steps.length === 0) {
    issues.push({ level: "ERROR", message: "Journey has no steps" });
    return issues;
  }

  for (const step of journey.steps) {
    if (seen.has(step.id)) {
      issues.push({
        level: "ERROR",
        stepId: step.id,
        message: `Duplicate step id: ${step.id}`,
      });
    }
    seen.add(step.id);

    if (!step.title.trim()) {
      issues.push({ level: "ERROR", stepId: step.id, message: "Empty title" });
    }

    if (step.narration.length === 0) {
      issues.push({ level: "ERROR", stepId: step.id, message: "Empty narration" });
    }

    for (const line of step.narration) {
      if (line.length > 320) {
        issues.push({
          level: "WARNING",
          stepId: step.id,
          message: "Narration line excessively long",
        });
      }
    }

    if (step.contentType === "fact" && step.canonStatus === "LEGACY_LORE") {
      issues.push({
        level: "WARNING",
        stepId: step.id,
        message: "Fact-classified scene uses legacy lore status",
      });
    }

    if (step.entityId) {
      const valid =
        characterById.has(step.entityId) ||
        eventById.has(step.entityId) ||
        loreEntityById.has(step.entityId) ||
        step.type === "REGION" ||
        step.type === "FACTION" ||
        step.type === "OPENING" ||
        step.type === "ENDING" ||
        step.type === "ERA" ||
        step.type === "TRANSITION";
      if (!valid) {
        issues.push({
          level: "ERROR",
          stepId: step.id,
          message: `Invalid entity reference: ${step.entityId}`,
        });
      }
    }

    if (step.sourceIds) {
      for (const sid of step.sourceIds) {
        if (!sourceById.has(sid)) {
          issues.push({
            level: "WARNING",
            stepId: step.id,
            message: `Unknown source: ${sid}`,
          });
        }
      }
    }

    if (step.duration < 500 || step.duration > 15000) {
      issues.push({
        level: "WARNING",
        stepId: step.id,
        message: "Unusual scene duration",
      });
    }
  }

  return issues;
}
