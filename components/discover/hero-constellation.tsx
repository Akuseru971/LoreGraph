"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { characterBySlug } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { hexToRgba } from "@/lib/utils";
import type { Character } from "@/types";

interface ConstellationNode {
  character: Character;
  /** 0–1 normalised position inside the hero. */
  x: number;
  y: number;
  size: number;
}

const LAYOUT: Array<{ slug: string; x: number; y: number; size: number }> = [
  { slug: "aatrox", x: 0.12, y: 0.28, size: 52 },
  { slug: "pantheon", x: 0.28, y: 0.14, size: 44 },
  { slug: "swain", x: 0.48, y: 0.1, size: 46 },
  { slug: "leblanc", x: 0.68, y: 0.18, size: 42 },
  { slug: "jinx", x: 0.86, y: 0.32, size: 50 },
  { slug: "vi", x: 0.78, y: 0.55, size: 44 },
  { slug: "yasuo", x: 0.58, y: 0.62, size: 48 },
  { slug: "yone", x: 0.38, y: 0.58, size: 44 },
  { slug: "viego", x: 0.2, y: 0.68, size: 46 },
  { slug: "thresh", x: 0.08, y: 0.48, size: 40 },
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 0],
  [1, 7],
  [2, 6],
  [3, 5],
];

/**
 * Subtle animated network behind the Discover hero. Desktop gets parallax;
 * mobile gets a static, low-motion version.
 */
export function HeroConstellation({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const nodes = React.useMemo<ConstellationNode[]>(
    () =>
      LAYOUT.flatMap((slot) => {
        const character = characterBySlug.get(slot.slug);
        return character
          ? [{ character, x: slot.x, y: slot.y, size: slot.size }]
          : [];
      }),
    [],
  );

  return (
    <div aria-hidden className={className}>
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none">
        {EDGES.map(([a, b], index) => {
          const from = nodes[a];
          const to = nodes[b];
          if (!from || !to) return null;
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={`${from.x * 100}%`}
              y1={`${from.y * 100}%`}
              x2={`${to.x * 100}%`}
              y2={`${to.y * 100}%`}
              stroke="rgba(201,169,110,0.14)"
              strokeWidth="1"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: reduceMotion ? 0 : 0.2 + index * 0.06,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
      </svg>

      {nodes.map((node, index) => (
        <ConstellationPortrait
          key={node.character.id}
          node={node}
          index={index}
          reduceMotion={Boolean(reduceMotion)}
        />
      ))}
    </div>
  );
}

function ConstellationPortrait({
  node,
  index,
  reduceMotion,
}: {
  node: ConstellationNode;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
        width: node.size,
        height: node.size,
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.55, scale: 1 }}
      transition={{
        delay: reduceMotion ? 0 : 0.15 + index * 0.05,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/champion/${node.character.slug}`}
        tabIndex={-1}
        className="block size-full rounded-full opacity-60 transition-opacity hover:opacity-90"
        style={{
          boxShadow: `0 0 24px -4px ${hexToRgba(node.character.accentColor, 0.5)}`,
        }}
      >
        <EntityPortrait
          assetKey={node.character.assetKey}
          name={node.character.name}
          accentColor={node.character.accentColor}
          className="size-full"
          sizes={`${node.size}px`}
        />
      </Link>
    </motion.div>
  );
}
