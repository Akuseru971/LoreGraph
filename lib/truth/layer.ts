import {
  isCurrentCanon,
  normalizeCanonStatus,
  normalizeConnectionCategory,
} from "@/lib/canon/model";
import type {
  ConnectionCategory,
  ConnectionConfidence,
  GraphEdge,
  Relationship,
  RelationshipType,
} from "@/types";

/** Consumer-facing badge labels — never expose internal enum names. */
export const CONNECTION_CATEGORY_LABEL: Record<ConnectionCategory, string> = {
  DIRECT_CANON: "Direct canon",
  SHARED_EVENT: "Shared event",
  SHARED_FACTION: "Shared faction",
  SHARED_REGION: "Shared region",
  STRUCTURAL_LORE: "Lore connection",
  THEMATIC_PARALLEL: "Thematic parallel",
  AMBIGUOUS: "Ambiguous",
  LEGACY_CONNECTION: "Old lore",
};

export const CONFIDENCE_LABEL: Record<ConnectionConfidence, string> = {
  DOCUMENTED: "Documented",
  STRONG: "Strong",
  DERIVED: "Derived",
  INTERPRETIVE: "Uncertain",
  UNCERTAIN: "Uncertain",
};

/** Pathfinding cost — lower is preferred. */
export const CATEGORY_PATH_COST: Record<string, number> = {
  DIRECT_CANON: 1,
  SHARED_EVENT: 2.5,
  STRUCTURAL_LORE: 4,
  SHARED_FACTION: 5,
  SHARED_REGION: 7,
  AMBIGUOUS: 16,
  THEMATIC_PARALLEL: 22,
  LEGACY_CONNECTION: 20,
};

export interface RelSeedLike {
  type: RelationshipType;
  canon?: string;
  verified?: boolean;
  connectionType?: ConnectionCategory;
  importance: number;
}

/** Infer Truth Layer category from legacy seed fields when not explicit. */
export function inferConnectionCategory(seed: RelSeedLike): ConnectionCategory {
  if (seed.connectionType) {
    return normalizeConnectionCategory(seed.connectionType);
  }

  const canon = normalizeCanonStatus(seed.canon);

  if (canon === "LEGACY_LORE") return "LEGACY_CONNECTION";
  if (canon === "ALTERNATE_UNIVERSE" || canon === "THEMATIC_ONLY") {
    return "THEMATIC_PARALLEL";
  }
  if (canon === "AMBIGUOUS" || canon === "UNKNOWN" || seed.verified === false) {
    if (seed.type === "unknown" || seed.type === "related") {
      return "THEMATIC_PARALLEL";
    }
    return "AMBIGUOUS";
  }

  if (seed.type === "faction" || seed.type === "political") {
    return seed.importance >= 70 ? "STRUCTURAL_LORE" : "SHARED_FACTION";
  }

  if (seed.type === "unknown" || seed.type === "related") {
    return "THEMATIC_PARALLEL";
  }

  return "DIRECT_CANON";
}

export function inferConfidence(
  category: ConnectionCategory,
  verified: boolean,
  hasSources: boolean,
): ConnectionConfidence {
  const cat = normalizeConnectionCategory(category);
  if (cat === "THEMATIC_PARALLEL") return "UNCERTAIN";
  if (cat === "AMBIGUOUS" || cat === "LEGACY_CONNECTION") return "UNCERTAIN";
  if (cat === "SHARED_REGION" || cat === "SHARED_FACTION") return "DERIVED";
  if (cat === "STRUCTURAL_LORE") return verified && hasSources ? "STRONG" : "DERIVED";
  if (verified && hasSources) return "DOCUMENTED";
  if (verified) return "STRONG";
  return "DERIVED";
}

export function needsReview(rel: Relationship): boolean {
  if (rel.connectionType === "DIRECT_CANON" && !rel.verified) return true;
  if (rel.connectionType === "DIRECT_CANON" && rel.sourceIds.length === 0) {
    return true;
  }
  if (
    rel.connectionType === "DIRECT_CANON" &&
    rel.confidence === "UNCERTAIN"
  ) {
    return true;
  }
  if (rel.needsReview) return true;
  if (!rel.shortExplanation || rel.shortExplanation.length < 12) return true;
  return false;
}

export function reviewReason(rel: Relationship): string | null {
  if (rel.connectionType === "DIRECT_CANON" && !rel.verified) {
    return "Marked DIRECT_CANON but verified is false";
  }
  if (rel.connectionType === "DIRECT_CANON" && rel.sourceIds.length === 0) {
    return "DIRECT_CANON without source references";
  }
  if (rel.connectionType === "THEMATIC_PARALLEL" && rel.verified) {
    return "Thematic edge should not be verified as canon";
  }
  if (!rel.shortExplanation) return "Missing summary";
  if (rel.needsReview) return rel.editorialNote ?? "Flagged for review";
  return null;
}

export function edgeCategory(edge: GraphEdge): ConnectionCategory {
  const raw =
    edge.connectionCategory ??
    (edge.connectionKind === "direct" ? "DIRECT_CANON" : "STRUCTURAL_LORE");
  return normalizeConnectionCategory(raw);
}

export function isDirectCanon(edge: GraphEdge): boolean {
  return (
    edgeCategory(edge) === "DIRECT_CANON" &&
    edge.verified &&
    isCurrentCanon(edge.canonStatus)
  );
}

export function pathUsesOnlyInterpretive(steps: GraphEdge[]): boolean {
  return steps.every((e) => {
    const cat = edgeCategory(e);
    return (
      cat === "THEMATIC_PARALLEL" ||
      cat === "AMBIGUOUS" ||
      cat === "LEGACY_CONNECTION"
    );
  });
}

export function indirectPathDisclaimer(
  fromName: string,
  toName: string,
  steps: GraphEdge[],
): string | null {
  const hasDirect = steps.some((e) => edgeCategory(e) === "DIRECT_CANON");
  const charToChar = steps.every(
    (e) => e.connectionKind === "direct" && edgeCategory(e) === "DIRECT_CANON",
  );
  if (charToChar && hasDirect && steps.length === 1) return null;

  return `${fromName} and ${toName} have no documented direct relationship. Their stories intersect through the lore chain above.`;
}

export function connectionDepthLabel(
  length: number,
  directOnly: boolean,
): string {
  if (directOnly || length === 1) return "Direct connection";
  if (length === 2) return "2-step indirect connection";
  if (length === 3) return "3-step connection";
  return `${length}-step connection`;
}
