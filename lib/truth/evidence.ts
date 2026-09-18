import {
  CANON_STATUS_LABEL,
  normalizeCanonStatus,
  normalizeConfidence,
} from "@/lib/canon/model";
import { normalizeConnectionCategory } from "@/lib/canon/model";
import type { CanonStatus, ConnectionCategory, ConnectionConfidence, GraphEdge } from "@/types";
import { edgeCategory } from "./layer";

/** User-facing connection evidence labels (what kind of link this is). */
export const CONNECTION_EVIDENCE_LABEL: Record<ConnectionCategory, string> = {
  DIRECT_CANON: "Direct canon",
  SHARED_EVENT: "Shared event",
  SHARED_FACTION: "Shared faction",
  SHARED_REGION: "Shared region",
  STRUCTURAL_LORE: "Structural connection",
  THEMATIC_PARALLEL: "Thematic connection",
  AMBIGUOUS: "Ambiguous connection",
  LEGACY_CONNECTION: "Legacy connection",
};

/** Secondary muted line explaining evidence strength — not source material status. */
export function connectionEvidenceLine(
  category: ConnectionCategory,
  confidence: ConnectionConfidence,
): string {
  const cat = normalizeConnectionCategory(category);
  const conf = normalizeConfidence(confidence);

  if (cat === "DIRECT_CANON" && conf === "DOCUMENTED") {
    return "Explicitly documented";
  }
  if (cat === "DIRECT_CANON") return "Documented relationship";
  if (cat === "THEMATIC_PARALLEL") return "Editorial interpretation";
  if (cat === "AMBIGUOUS") return "Not explicitly confirmed";
  if (cat === "LEGACY_CONNECTION") return "Superseded material";
  if (cat === "STRUCTURAL_LORE") return "Structurally inferred";
  if (cat === "SHARED_EVENT") return "Shared documented event";
  if (cat === "SHARED_FACTION" || cat === "SHARED_REGION") {
    return "Derived from shared context";
  }
  if (conf === "DERIVED") return "Inferred from lore structure";
  return "Evidence under review";
}

/** Source material status — separate from whether the relationship itself is proven. */
export function sourceMaterialLine(canonStatus?: CanonStatus | string | null): string {
  const label = CANON_STATUS_LABEL[normalizeCanonStatus(canonStatus)];
  return `Sources · ${label}`;
}

export function edgeEvidencePresentation(edge: GraphEdge) {
  const category = edgeCategory(edge);
  return {
    connectionLabel: CONNECTION_EVIDENCE_LABEL[category],
    evidenceLine: connectionEvidenceLine(category, edge.confidence),
    sourceLine: sourceMaterialLine(edge.canonStatus),
  };
}
