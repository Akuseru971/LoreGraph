"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { characterById } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { RegionIcon } from "@/components/region-badge";
import { RELATIONSHIP_LABEL, edgeStroke } from "@/lib/graph/style";
import { cn, hexToRgba, initials } from "@/lib/utils";
import type { GraphEdge, GraphNode, GraphPath } from "@/types";

const SHAPE: Record<string, string> = {
  region: "[clip-path:polygon(50%_0%,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)]",
  faction: "[clip-path:polygon(50%_0%,100%_14%,100%_62%,50%_100%,0%_62%,0%_14%)]",
  event: "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]",
};

/**
 * The path visualisation. A path is linear, so this is a deliberate chain
 * rather than a force layout: vertical on phones, horizontal on desktop, with
 * each hop labelled so the route reads as a sentence.
 */
export function ConnectionGraph({
  path,
  activeStep,
  onStepFocus,
  className,
}: {
  path: GraphPath;
  activeStep?: number | null;
  onStepFocus?: (index: number | null) => void;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "scrollbar-none overflow-x-auto overflow-y-hidden px-1 py-2",
        className,
      )}
    >
      <ol className="flex min-w-fit flex-col items-stretch gap-0 md:flex-row md:items-start md:justify-center">
        {path.nodes.map((node, index) => {
          const step = path.steps[index];
          return (
            <React.Fragment key={`${node.id}-${index}`}>
              <motion.li
                initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.12,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex shrink-0 justify-center md:w-[112px]"
              >
                <PathNode
                  node={node}
                  emphasis={index === 0 || index === path.nodes.length - 1}
                />
              </motion.li>

              {step ? (
                <Connector
                  edge={step.edge}
                  index={index}
                  active={activeStep === index}
                  reduceMotion={Boolean(reduceMotion)}
                  onFocus={onStepFocus}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}

function PathNode({ node, emphasis }: { node: GraphNode; emphasis: boolean }) {
  const character = node.type === "character" ? characterById.get(node.id) : null;
  const size = emphasis ? 72 : 56;
  const regionSlug =
    node.type === "region" ? node.metadata.region : undefined;

  const visual = character ? (
    <EntityPortrait
      assetKey={character.assetKey}
      name={character.name}
      accentColor={character.accentColor}
      className="size-full"
      sizes="72px"
    />
  ) : (
    <span
      aria-hidden
      className={cn("grid size-full place-items-center", SHAPE[node.type])}
      style={{
        background: `linear-gradient(160deg, ${hexToRgba(node.metadata.accentColor, 0.4)}, ${hexToRgba(node.metadata.accentColor, 0.1)})`,
        boxShadow: `inset 0 0 0 1.5px ${hexToRgba(node.metadata.accentColor, 0.55)}`,
        color: node.metadata.accentColor,
      }}
    >
      {regionSlug ? (
        <RegionIcon slug={regionSlug} size={size * 0.3} />
      ) : (
        <span className="font-mono text-[0.625rem]">{initials(node.name)}</span>
      )}
    </span>
  );

  const body = (
    <span className="flex w-[104px] flex-col items-center text-center">
      <span
        className={cn(
          "relative overflow-hidden transition-transform duration-300",
          character ? "rounded-full" : "",
          character && "group-hover:scale-105",
        )}
        style={{
          width: size,
          height: size,
          boxShadow: character
            ? `0 0 0 ${emphasis ? 2 : 1.5}px ${hexToRgba(
                emphasis ? "#C9A96E" : node.metadata.accentColor,
                emphasis ? 0.9 : 0.5,
              )}`
            : undefined,
        }}
      >
        {visual}
      </span>
      <span
        className={cn(
          "text-parchment mt-2 block max-w-full truncate text-xs font-medium",
          emphasis && "text-[0.8125rem]",
        )}
      >
        {node.name}
      </span>
      {node.type !== "character" ? (
        <span className="text-muted-dim block text-[0.625rem] tracking-wide uppercase">
          {node.type}
        </span>
      ) : null}
    </span>
  );

  if (character) {
    return (
      <Link
        href={`/champion/${character.slug}`}
        className="group focus-visible:outline-gold"
        aria-label={`Open ${character.name}`}
      >
        {body}
      </Link>
    );
  }
  return body;
}

function Connector({
  edge,
  index,
  active,
  reduceMotion,
  onFocus,
}: {
  edge: GraphEdge;
  index: number;
  active: boolean;
  reduceMotion: boolean;
  onFocus?: (index: number | null) => void;
}) {
  const color = edgeStroke(edge);
  const label =
    edge.connectionKind === "direct"
      ? RELATIONSHIP_LABEL[edge.relationship]
      : edge.label;

  return (
    <li
      className="flex shrink-0 items-center justify-center md:h-[72px] md:w-[86px]"
      onMouseEnter={() => onFocus?.(index)}
      onMouseLeave={() => onFocus?.(null)}
    >
      {/* Mobile: vertical rail with the label beside it. */}
      <span className="flex h-14 items-center gap-2.5 md:hidden">
        <span className="relative ml-[35px] flex h-full w-[2px] justify-center">
          <span
            aria-hidden
            className="h-full w-full"
            style={{
              background:
                edge.connectionKind === "direct"
                  ? hexToRgba(color, active ? 0.95 : 0.5)
                  : `repeating-linear-gradient(to bottom, ${hexToRgba(color, active ? 0.9 : 0.45)} 0 4px, transparent 4px 9px)`,
            }}
          />
        </span>
        <StepLabel index={index} label={label} color={color} active={active} />
      </span>

      {/* Desktop: horizontal rail with the label above. */}
      <span className="relative hidden w-full items-center justify-center md:flex">
        <span
          aria-hidden
          className="absolute top-[36px] right-0 left-0 h-[2px]"
          style={{
            background:
              edge.connectionKind === "direct"
                ? `linear-gradient(90deg, ${hexToRgba(color, 0.2)}, ${hexToRgba(color, active ? 1 : 0.6)}, ${hexToRgba(color, 0.2)})`
                : `repeating-linear-gradient(to right, ${hexToRgba(color, active ? 0.9 : 0.5)} 0 4px, transparent 4px 9px)`,
          }}
        />
        {!reduceMotion ? (
          <motion.span
            aria-hidden
            className="absolute top-[33px] size-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: ["0%", "88%"], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.4,
              delay: index * 0.4,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: "easeInOut",
            }}
          />
        ) : null}
        <span className="absolute -top-1 flex justify-center">
          <StepLabel index={index} label={label} color={color} active={active} />
        </span>
      </span>
    </li>
  );
}

function StepLabel({
  index,
  label,
  color,
  active,
}: {
  index: number;
  label: string;
  color: string;
  active: boolean;
}) {
  return (
    <span
      className="text-eyebrow inline-flex items-center gap-1.5 rounded-full border px-2 py-1 whitespace-nowrap transition-colors"
      style={{
        borderColor: hexToRgba(color, active ? 0.8 : 0.3),
        backgroundColor: active ? hexToRgba(color, 0.16) : "rgba(8,11,18,0.85)",
        color,
      }}
    >
      <span className="text-muted-dim tabular-nums">{index + 1}</span>
      {label}
    </span>
  );
}
