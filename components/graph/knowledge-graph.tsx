"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type NodeMouseHandler,
} from "@xyflow/react";
import * as React from "react";
import { LoreGraphEdge, type LoreFlowEdge } from "./graph-edge";
import { LoreGraphNode, type LoreFlowNode } from "./graph-node";
import { radialLayout } from "@/lib/graph/layout";
import { RELATIONSHIP_LABEL } from "@/lib/graph/style";
import type { Neighbor } from "@/lib/graph";
import type { GraphEdge, GraphNode } from "@/types";
import "@xyflow/react/dist/style.css";

const nodeTypes = { lore: LoreGraphNode };
const edgeTypes = { lore: LoreGraphEdge };

export interface KnowledgeGraphProps {
  center: GraphNode;
  neighbors: Neighbor[];
  /** Relationships between the neighbours themselves, so clusters read as clusters. */
  crossEdges?: GraphEdge[];
  selectedNodeId?: string | null;
  onSelectNode?: (node: GraphNode, edge: GraphEdge | null) => void;
  onOpenNode?: (node: GraphNode) => void;
  className?: string;
}

function useElementWidth() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ width: 900, height: 600 });

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}

function GraphCanvas({
  center,
  neighbors,
  crossEdges = [],
  selectedNodeId,
  onSelectNode,
  onOpenNode,
}: KnowledgeGraphProps) {
  const { ref, width, height } = useElementWidth();
  const { fitView } = useReactFlow();
  const [hovered, setHovered] = React.useState<string | null>(null);

  const edgeByNeighbor = React.useMemo(() => {
    const map = new Map<string, GraphEdge>();
    for (const { node, edge } of neighbors) map.set(node.id, edge);
    return map;
  }, [neighbors]);

  const layout = React.useMemo(
    () => radialLayout(center, neighbors, { width, height }),
    [center, neighbors, width, height],
  );

  /** Nodes one hop from the current selection stay lit; the rest fade back. */
  const focus = selectedNodeId ?? hovered;
  const litNodeIds = React.useMemo(() => {
    if (!focus || focus === center.id) return null;
    const lit = new Set<string>([center.id, focus]);
    for (const edge of crossEdges) {
      if (edge.source === focus) lit.add(edge.target);
      if (edge.target === focus) lit.add(edge.source);
    }
    return lit;
  }, [focus, center.id, crossEdges]);

  const nodes = React.useMemo<LoreFlowNode[]>(
    () =>
      layout.positioned.map((item) => {
        const edge = edgeByNeighbor.get(item.node.id);
        const isCenter = item.node.id === center.id;
        return {
          id: item.node.id,
          type: "lore" as const,
          position: { x: item.x - item.size / 2, y: item.y - item.size / 2 },
          draggable: false,
          data: {
            entity: item.node,
            size: item.size,
            selected: selectedNodeId === item.node.id,
            dimmed: litNodeIds ? !litNodeIds.has(item.node.id) : false,
            isCenter,
            caption: isCenter
              ? (item.node.metadata.title ?? undefined)
              : edge
                ? edge.connectionKind === "direct"
                  ? RELATIONSHIP_LABEL[edge.relationship]
                  : edge.label
                : undefined,
          },
        };
      }),
    [layout, edgeByNeighbor, center.id, selectedNodeId, litNodeIds],
  );

  const edges = React.useMemo<LoreFlowEdge[]>(() => {
    const present = new Set(layout.positioned.map((p) => p.node.id));
    const all: GraphEdge[] = [
      ...neighbors.map((n) => n.edge),
      ...crossEdges.filter((e) => present.has(e.source) && present.has(e.target)),
    ];

    const seen = new Set<string>();
    return all
      .filter((edge) => {
        if (seen.has(edge.id)) return false;
        seen.add(edge.id);
        return present.has(edge.source) && present.has(edge.target);
      })
      .map((edge) => {
        const touchesFocus =
          focus != null && (edge.source === focus || edge.target === focus);
        return {
          id: edge.id,
          type: "lore" as const,
          source: edge.source,
          target: edge.target,
          data: {
            edge,
            emphasised: touchesFocus,
            dimmed: focus != null && !touchesFocus && focus !== center.id,
            showLabel: touchesFocus && edge.connectionKind === "direct",
          },
        };
      });
  }, [layout, neighbors, crossEdges, focus, center.id]);

  // Re-frame when the set of nodes changes (filters) or the container resizes.
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void fitView({ padding: 0.22, duration: 400 });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [fitView, nodes.length, width, height]);

  const handleClick = React.useCallback<NodeMouseHandler<LoreFlowNode>>(
    (_event, node) => {
      const entity = node.data.entity;
      onSelectNode?.(entity, edgeByNeighbor.get(entity.id) ?? null);
    },
    [onSelectNode, edgeByNeighbor],
  );

  const handleDoubleClick = React.useCallback<NodeMouseHandler<LoreFlowNode>>(
    (_event, node) => {
      onOpenNode?.(node.data.entity);
    },
    [onOpenNode],
  );

  return (
    <div ref={ref} className="size-full">
      <ReactFlow<LoreFlowNode, LoreFlowEdge>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleClick}
        onNodeDoubleClick={handleDoubleClick}
        onNodeMouseEnter={(_e, node) => setHovered(node.id)}
        onNodeMouseLeave={() => setHovered(null)}
        onPaneClick={() => onSelectNode?.(center, null)}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        /* Page scroll must keep working on touch devices and trackpads. */
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        minZoom={0.35}
        maxZoom={1.9}
        fitView
        fitViewOptions={{ padding: 0.22 }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={26}
          size={1}
          color="rgba(245,242,232,0.07)"
        />
        <Controls
          showInteractive={false}
          className="!bottom-4 !left-4 overflow-hidden !rounded-lg !border !border-line !shadow-none"
        />
      </ReactFlow>
    </div>
  );
}

/** Reusable knowledge graph surface. Wrapped so callers never touch React Flow. */
export function KnowledgeGraph(props: KnowledgeGraphProps) {
  return (
    <div className={props.className}>
      <ReactFlowProvider>
        <GraphCanvas {...props} />
      </ReactFlowProvider>
    </div>
  );
}

export default KnowledgeGraph;
