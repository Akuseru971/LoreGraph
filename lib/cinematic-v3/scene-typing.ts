import { eventById } from "@/data";
import type {
  CinematicEvidenceClass,
  CinematicSceneType,
  RelationshipChoreography,
  TimelineBeat,
} from "@/types";

const TRANSFORMATION_PATTERNS =
  /\b(ascend|ascended|darkin|sealed|corrupt|transform|returned|reborn|azakana|ruined)\b/i;
const CONFLICT_PATTERNS =
  /\b(duel|fight|battle|war|killed|confront|severed|betray|invasion)\b/i;

export function inferSceneType(
  beat: TimelineBeat,
  index: number,
  total: number,
): CinematicSceneType {
  if (index === 0) return "ORIGIN";
  if (index === total - 1) return "CONSEQUENCE";

  const text = `${beat.title} ${beat.description}`;
  if (CONFLICT_PATTERNS.test(text)) return "CONFLICT";
  if (TRANSFORMATION_PATTERNS.test(text)) return "TRANSFORMATION";
  if (beat.eventId) {
    const event = eventById.get(beat.eventId);
    if (event && (event.importance ?? 0) >= 85) return "EVENT";
    return "EVENT";
  }
  return "CONSEQUENCE";
}

export function evidenceClassForBeat(beat: TimelineBeat): CinematicEvidenceClass {
  if (beat.evidenceClass === "FACT") return "FACT";
  if (beat.evidenceClass === "SUPPORTED_SYNTHESIS") return "SUPPORTED_SYNTHESIS";
  return "EDITORIAL_TRANSITION";
}

export function cameraForSceneType(type: CinematicSceneType): import("@/types").CinematicCameraPreset {
  switch (type) {
    case "ORIGIN":
      return "SLOW_APPROACH";
    case "EVENT":
      return "FAST_APPROACH";
    case "RELATIONSHIP":
      return "CURVE_RIGHT";
    case "TRANSFORMATION":
      return "ORBIT";
    case "CONFLICT":
      return "FAST_APPROACH";
    case "ENDING":
      return "PULL_BACK";
    default:
      return "SLOW_APPROACH";
  }
}

export function choreographyForRelationship(
  relationshipType?: string,
): RelationshipChoreography {
  const t = (relationshipType ?? "").toLowerCase();
  if (t.includes("brother") || t.includes("sibling")) return "PARALLEL";
  if (t.includes("mentor") || t.includes("student")) return "LEAD";
  if (t.includes("enemy") || t.includes("rival")) return "CONVERGE";
  if (t.includes("lover") || t.includes("partner")) return "ORBIT";
  return "PARALLEL";
}

export function worldScaleForEvent(eventId?: string): number {
  if (!eventId) return 1;
  const event = eventById.get(eventId);
  if (!event) return 1;
  const importance = event.importance ?? 50;
  if (importance >= 90) return 2.8;
  if (importance >= 80) return 2.2;
  if (importance >= 70) return 1.6;
  return 1.2;
}
