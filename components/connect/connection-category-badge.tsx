import {
  CONFIDENCE_LABEL,
  CONNECTION_CATEGORY_LABEL,
  edgeCategory,
} from "@/lib/truth/layer";
import { cn, hexToRgba } from "@/lib/utils";
import type { GraphEdge } from "@/types";

const CATEGORY_TONE: Record<string, string> = {
  DIRECT_CANON: "#6FA88C",
  SHARED_EVENT: "#C9A96E",
  STRUCTURAL_LORE: "#8B7FC7",
  SHARED_FACTION: "#6E82A8",
  SHARED_REGION: "#647085",
  THEMATIC_PARALLEL: "#8F9AAD",
  AMBIGUOUS: "#A85059",
  LEGACY_CONNECTION: "#8C7748",
};

export function ConnectionCategoryBadge({
  edge,
  className,
}: {
  edge: GraphEdge;
  className?: string;
}) {
  const category = edgeCategory(edge);
  const color = CATEGORY_TONE[category] ?? "#C9A96E";
  const label = CONNECTION_CATEGORY_LABEL[category];

  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center rounded-full border px-2 py-0.5 whitespace-nowrap",
        className,
      )}
      style={{
        borderColor: hexToRgba(color, 0.45),
        backgroundColor: hexToRgba(color, 0.1),
        color,
      }}
    >
      {label}
    </span>
  );
}

export function ConfidenceBadge({ edge }: { edge: GraphEdge }) {
  const label = CONFIDENCE_LABEL[edge.confidence];
  return (
    <span className="text-eyebrow text-muted-dim rounded-full border border-line px-2 py-0.5">
      {label}
    </span>
  );
}
