"use client";

import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import * as React from "react";
import { regionBySlug } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { RegionIcon } from "@/components/region-badge";
import { cn, hexToRgba, initials } from "@/lib/utils";
import type { GraphNode } from "@/types";

export interface LoreNodeData extends Record<string, unknown> {
  entity: GraphNode;
  size: number;
  selected: boolean;
  dimmed: boolean;
  isCenter: boolean;
  /** Text shown under the node. */
  caption?: string;
}

export type LoreFlowNode = Node<LoreNodeData, "lore">;

const CLIP = {
  region: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
  faction: "polygon(50% 0%, 100% 14%, 100% 62%, 50% 100%, 0% 62%, 0% 14%)",
  event: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
} as const;

export function LoreGraphNode({ data }: NodeProps<LoreFlowNode>) {
  const { entity, size, selected, dimmed, isCenter, caption } = data;
  const accent = entity.metadata.accentColor;
  const region = entity.metadata.region
    ? regionBySlug.get(entity.metadata.region)
    : undefined;
  const ringColor = region?.accentColor ?? accent;

  const shared = cn(
    "relative grid place-items-center transition-all duration-300",
    dimmed ? "opacity-25" : "opacity-100",
  );

  // Both handles sit at the centre of the shape so edges are drawn
  // centre-to-centre in every direction — a radial layout has no meaningful
  // "top" or "bottom" side to anchor to.
  const handleStyle: React.CSSProperties = {
    left: size / 2,
    top: size / 2,
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={handleStyle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={handleStyle}
      />

      {entity.type === "character" ? (
        <div
          className={cn(shared, "rounded-full")}
          style={{
            width: size,
            height: size,
            boxShadow: selected
              ? `0 0 0 2px #C9A96E, 0 0 34px -6px ${hexToRgba("#C9A96E", 0.75)}`
              : `0 0 0 1.5px ${hexToRgba(ringColor, 0.55)}`,
          }}
        >
          <EntityPortrait
            assetKey={entity.metadata.assetKey ?? entity.slug}
            name={entity.name}
            accentColor={accent}
            className="size-full"
            sizes={`${size}px`}
          />
          {selected ? (
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1.5 rounded-full border border-gold/60"
              style={{ animation: "lg-pulse-ring 2.6s ease-in-out infinite" }}
            />
          ) : null}
        </div>
      ) : (
        <NonCharacterNode
          entity={entity}
          size={size}
          selected={selected}
          dimmed={dimmed}
        />
      )}

      <span
        className={cn(
          "mt-2 max-w-[120px] text-center leading-tight transition-opacity duration-300",
          dimmed ? "opacity-30" : "opacity-100",
        )}
      >
        <span
          className={cn(
            "text-parchment block truncate font-medium",
            isCenter ? "text-sm" : "text-[0.6875rem]",
          )}
        >
          {entity.name}
        </span>
        {caption ? (
          <span className="text-muted block truncate text-[0.625rem]">{caption}</span>
        ) : null}
      </span>
    </div>
  );
}

function NonCharacterNode({
  entity,
  size,
  selected,
  dimmed,
}: {
  entity: GraphNode;
  size: number;
  selected: boolean;
  dimmed: boolean;
}) {
  const accent = entity.metadata.accentColor;
  const clip =
    entity.type === "region"
      ? CLIP.region
      : entity.type === "faction"
        ? CLIP.faction
        : CLIP.event;

  const regionSlug =
    entity.type === "region" ? entity.metadata.region : undefined;

  return (
    <div
      className={cn(
        "relative grid place-items-center transition-all duration-300",
        dimmed ? "opacity-25" : "opacity-100",
      )}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: clip,
          background: `linear-gradient(160deg, ${hexToRgba(accent, 0.38)}, ${hexToRgba(
            accent,
            0.1,
          )})`,
          border: "none",
          boxShadow: selected ? `0 0 26px -6px ${hexToRgba("#C9A96E", 0.8)}` : undefined,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: clip,
          boxShadow: `inset 0 0 0 1.5px ${
            selected ? "#C9A96E" : hexToRgba(accent, 0.6)
          }`,
        }}
      />
      <span
        className="relative"
        style={{ color: accent, fontSize: Math.max(9, size * 0.22) }}
      >
        {regionSlug ? (
          <RegionIcon slug={regionSlug} size={size * 0.32} />
        ) : (
          <span className="font-mono text-[0.625rem] font-medium">
            {initials(entity.name)}
          </span>
        )}
      </span>
    </div>
  );
}
