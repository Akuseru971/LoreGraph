"use client";

import { ChevronRight } from "lucide-react";
import * as React from "react";
import { characterById } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { RELATIONSHIP_LABEL, edgeStroke } from "@/lib/graph/style";
import type { Neighbor } from "@/lib/graph";
import { cn, hexToRgba } from "@/lib/utils";
import type { GraphEdge, GraphNode } from "@/types";

/**
 * Text equivalent of the knowledge graph. Always rendered (it is the primary
 * interface on small screens and the accessible alternative on large ones), so
 * nothing in the graph is reachable only by pointer.
 */
export function RelationshipList({
  neighbors,
  onSelect,
  selectedId,
  className,
}: {
  neighbors: Neighbor[];
  onSelect: (node: GraphNode, edge: GraphEdge) => void;
  selectedId?: string | null;
  className?: string;
}) {
  const direct = neighbors.filter((n) => n.edge.connectionKind === "direct");
  const indirect = neighbors.filter((n) => n.edge.connectionKind === "indirect");

  return (
    <div className={cn("space-y-6", className)}>
      {direct.length > 0 ? (
        <Group
          title="Direct relationships"
          hint="Documented between the two characters"
          items={direct}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ) : null}
      {indirect.length > 0 ? (
        <Group
          title="Indirect lore connections"
          hint="Shared factions, regions and events"
          items={indirect}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ) : null}
    </div>
  );
}

function Group({
  title,
  hint,
  items,
  onSelect,
  selectedId,
}: {
  title: string;
  hint: string;
  items: Neighbor[];
  onSelect: (node: GraphNode, edge: GraphEdge) => void;
  selectedId?: string | null;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-eyebrow text-gold">{title}</h3>
        <span className="text-muted-dim hidden text-[0.6875rem] sm:block">{hint}</span>
      </div>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {items.map(({ node, edge }) => (
          <li key={`${node.id}:${edge.id}`}>
            <ConnectionButton
              node={node}
              edge={edge}
              selected={selectedId === node.id}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ConnectionButton({
  node,
  edge,
  selected,
  onSelect,
}: {
  node: GraphNode;
  edge: GraphEdge;
  selected: boolean;
  onSelect: (node: GraphNode, edge: GraphEdge) => void;
}) {
  const character = node.type === "character" ? characterById.get(node.id) : null;
  const accent = edgeStroke(edge);
  const label =
    edge.connectionKind === "direct"
      ? RELATIONSHIP_LABEL[edge.relationship]
      : edge.label;

  return (
    <button
      type="button"
      onClick={() => onSelect(node, edge)}
      aria-label={`${node.name} — ${label}. ${edge.description}`}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
        selected
          ? "border-gold/50 bg-gold/8"
          : "border-line bg-white/[0.02] hover:border-line-strong hover:bg-white/[0.05]",
      )}
    >
      {character ? (
        <EntityPortrait
          assetKey={character.assetKey}
          name={character.name}
          accentColor={character.accentColor}
          className="size-9 shrink-0"
          sizes="36px"
        />
      ) : (
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border text-[0.625rem] font-medium"
          style={{
            borderColor: hexToRgba(node.metadata.accentColor, 0.4),
            background: hexToRgba(node.metadata.accentColor, 0.1),
            color: node.metadata.accentColor,
          }}
        >
          {node.type === "event" ? "EV" : node.type === "region" ? "RG" : "FC"}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="text-parchment block truncate text-sm font-medium">
          {node.name}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-[2px] w-3 shrink-0 rounded-full"
            style={{
              backgroundColor: accent,
              opacity: edge.connectionKind === "direct" ? 1 : 0.45,
            }}
          />
          <span className="text-muted truncate text-[0.6875rem] tracking-wide uppercase">
            {label}
          </span>
        </span>
      </span>

      <ChevronRight
        aria-hidden
        className="text-muted-dim group-hover:text-muted size-4 shrink-0 transition-colors"
      />
    </button>
  );
}
