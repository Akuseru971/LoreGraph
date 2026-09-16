import type {
  CanonStatus,
  ConnectionCategory,
  ConnectionConfidence,
  GraphEdge,
  LoreGraph,
  PathStep,
} from "@/types";
import { DAILY_INELIGIBLE_EVENT_ROLES } from "@/lib/events/roles";
import { isConnectBridgeNode } from "@/lib/graph/connect-eligibility";
import { edgeCategory } from "@/lib/truth/layer";

/** Map legacy seed values to Canon Model V3. */
const CANON_MIGRATION: Record<string, CanonStatus> = {
  CANON: "CURRENT_CANON",
  OLD_LORE: "LEGACY_LORE",
  RETCONNED: "LEGACY_LORE",
  AMBIGUOUS: "AMBIGUOUS",
  ALTERNATE_UNIVERSE: "ALTERNATE_UNIVERSE",
};

export const CANON_STATUS_LABEL: Record<CanonStatus, string> = {
  CURRENT_CANON: "Current canon",
  AMBIGUOUS: "Ambiguous",
  RECONCILIATION_PENDING: "Reconciliation pending",
  LEGACY_LORE: "Legacy lore",
  ALTERNATE_UNIVERSE: "Alternate universe",
  THEMATIC_ONLY: "Thematic only",
  UNKNOWN: "Unknown",
};

export const CANON_STATUS_HINT: Record<CanonStatus, string> = {
  CURRENT_CANON: "Part of Runeterra's active intended canon.",
  AMBIGUOUS: "Strongly implied but not explicitly established.",
  RECONCILIATION_PENDING:
    "Official sources conflict or have not been fully reconciled.",
  LEGACY_LORE: "Superseded, retconned or replaced material.",
  ALTERNATE_UNIVERSE: "A separate setting such as Star Guardian or PROJECT.",
  THEMATIC_ONLY: "Editorial comparison with no narrative relationship.",
  UNKNOWN: "Insufficient evidence to classify.",
};

export function normalizeCanonStatus(
  status?: string | CanonStatus | null,
): CanonStatus {
  if (!status) return "UNKNOWN";
  return CANON_MIGRATION[status] ?? (status as CanonStatus);
}

/** Verified curated seeds without explicit status are treated as current canon. */
export function resolveSeedCanonStatus(
  explicit?: string | CanonStatus | null,
  verified?: boolean,
): CanonStatus {
  if (explicit) return normalizeCanonStatus(explicit);
  if (verified) return "CURRENT_CANON";
  return "UNKNOWN";
}

export const resolveCharacterCanonStatus = resolveSeedCanonStatus;

export function normalizeConnectionCategory(
  category: ConnectionCategory | string,
): ConnectionCategory {
  if (category === "LEGACY_LORE") return "LEGACY_CONNECTION";
  return category as ConnectionCategory;
}

export function normalizeConfidence(
  confidence: ConnectionConfidence,
): ConnectionConfidence {
  return confidence === "INTERPRETIVE" ? "UNCERTAIN" : confidence;
}

export function isCurrentCanon(status?: string | CanonStatus | null): boolean {
  return normalizeCanonStatus(status) === "CURRENT_CANON";
}

export function isDailyEligibleCanon(status?: string | CanonStatus | null): boolean {
  const normalized = normalizeCanonStatus(status);
  return normalized === "CURRENT_CANON";
}

const DAILY_EDGE_CATEGORIES = new Set<ConnectionCategory>([
  "DIRECT_CANON",
  "SHARED_EVENT",
  "STRUCTURAL_LORE",
]);

const DAILY_REVIEW_STATUSES = new Set(["VERIFIED_CANON", "APPROVED_EDITORIAL"]);

/** Whether an edge may appear in the default Daily Connection challenge. */
export function isDailyEligibleEdge(edge: GraphEdge): boolean {
  const category = normalizeConnectionCategory(
    edge.connectionCategory ?? "STRUCTURAL_LORE",
  );
  if (!DAILY_EDGE_CATEGORIES.has(category)) return false;
  if (!edge.verified) return false;
  if (edge.needsReview) return false;
  if (edge.reviewStatus && !DAILY_REVIEW_STATUSES.has(edge.reviewStatus)) {
    return false;
  }
  if (normalizeConfidence(edge.confidence) === "UNCERTAIN") return false;
  if (!isDailyEligibleCanon(edge.canonStatus)) return false;
  if (category === "STRUCTURAL_LORE" && edge.confidence === "DERIVED") {
    return false;
  }
  if (edge.eventRole && DAILY_INELIGIBLE_EVENT_ROLES.has(edge.eventRole)) {
    return false;
  }
  return true;
}

/** Whether every step in a path is safe for Daily Connection. */
export function isDailyEligiblePath(
  steps: PathStep[],
  graph: LoreGraph,
  endpoints: { start: string; end: string },
): boolean {
  if (steps.length === 0) return false;

  for (const step of steps) {
    if (!isDailyEligibleEdge(step.edge)) return false;
    if (!isConnectBridgeNode(graph, step.from.id, endpoints)) return false;
    if (!isConnectBridgeNode(graph, step.to.id, endpoints)) return false;
    if (edgeCategory(step.edge) === "SHARED_REGION") return false;
    if (edgeCategory(step.edge) === "SHARED_FACTION") return false;
  }

  return true;
}

/** @deprecated Pass full path steps and graph */
export function isDailyEligiblePathEdges(edges: GraphEdge[]): boolean {
  return edges.length > 0 && edges.every(isDailyEligibleEdge);
}
