"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import { edgeStyle } from "@/lib/graph/style";
import type { GraphEdge } from "@/types";

export interface LoreEdgeData extends Record<string, unknown> {
  edge: GraphEdge;
  emphasised: boolean;
  dimmed: boolean;
  showLabel: boolean;
}

export type LoreFlowEdge = Edge<LoreEdgeData, "lore">;

export function LoreGraphEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps<LoreFlowEdge>) {
  if (!data) return null;
  const { edge, emphasised, dimmed, showLabel } = data;

  const [path, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const style = edgeStyle(edge, emphasised);

  return (
    <>
      <BaseEdge
        path={path}
        style={{
          ...style,
          opacity: dimmed ? 0.12 : 1,
          transition: "opacity 300ms ease, stroke 300ms ease",
        }}
        className={emphasised && edge.connectionKind === "indirect" ? "edge-flow" : undefined}
      />
      {showLabel ? (
        <EdgeLabelRenderer>
          <span
            className="text-eyebrow nodrag nopan pointer-events-none absolute rounded-full border border-line bg-ink/90 px-2 py-0.5 backdrop-blur-sm"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              color: style.stroke,
              borderColor: style.stroke,
            }}
          >
            {edge.label}
          </span>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}
