"use client";

import * as React from "react";
import {
  anchorsVisibleAtReveal,
  getHeroAnchorPosition,
  lineStrokeForWeight,
  linesForVisibleAnchors,
  orderedAnchorsByReveal,
  starRadiusForWeight,
} from "@/lib/cinematic-v3/constellation-builder";
import type {
  ChampionConstellation,
  ChampionConstellationAnchor,
  ConstellationVisualWeight,
} from "@/types";

export { getHeroAnchorPosition, orderedAnchorsByReveal as orderedAnchorsForReveal };

export function ConstellationSilhouette({
  constellation,
  starRevealProgress = 1,
  lineProgress = 1,
  heroStarId,
  heroIntensity = 1,
  zoomProgress = 0,
  opacity = 1,
  lineColor = "#d4a85c",
  starColor = "#f0e6d2",
  showLines = true,
  lineFilter,
  className,
}: {
  constellation: ChampionConstellation;
  visibleStarCount?: number;
  starRevealProgress?: number;
  lineProgress?: number;
  heroStarId?: string;
  heroIntensity?: number;
  zoomProgress?: number;
  opacity?: number;
  lineColor?: string;
  starColor?: string;
  showLines?: boolean;
  lineFilter?: "all" | "contour" | "iconic" | "none";
  className?: string;
}) {
  const visible = React.useMemo(
    () => anchorsVisibleAtReveal(constellation, starRevealProgress),
    [constellation, starRevealProgress],
  );
  const visibleIds = React.useMemo(
    () => new Set(visible.map((a) => a.id)),
    [visible],
  );
  const heroId = heroStarId ?? constellation.heroStarId;
  const heroPos = getHeroAnchorPosition(constellation, heroId);

  const zoomCx = heroPos.x * 100;
  const zoomCy = heroPos.y * 100;
  const scale = 1 + zoomProgress * 3.2;
  const translateX = zoomProgress * (50 - zoomCx) * 0.9;
  const translateY = zoomProgress * (50 - zoomCy) * 0.9;
  const softenOthers = zoomProgress > 0.08;

  const anchorById = React.useMemo(
    () => new Map(constellation.anchors.map((a) => [a.id, a])),
    [constellation.anchors],
  );

  const lines = React.useMemo(() => {
    if (!showLines || lineFilter === "none") return [];
    const all = linesForVisibleAnchors(constellation, visibleIds, lineProgress);
    if (lineFilter === "contour") {
      return all.filter((l) => l.category === "CONTOUR");
    }
    if (lineFilter === "iconic") {
      return all.filter(
        (l) => l.category === "ICONIC" || l.weight === "ICONIC",
      );
    }
    return all;
  }, [constellation, visibleIds, lineProgress, showLines, lineFilter]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <g
        style={{
          transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
          transformOrigin: `${zoomCx}% ${zoomCy}%`,
        }}
      >
        {lines.map((line) => {
          const from = anchorById.get(line.from);
          const to = anchorById.get(line.to);
          if (!from || !to) return null;
          const stroke = lineStrokeForWeight(line.weight);
          const len = Math.hypot(
            (to.x - from.x) * 100,
            (to.y - from.y) * 100,
          );
          return (
            <line
              key={`${line.from}:${line.to}`}
              x1={from.x * 100}
              y1={from.y * 100}
              x2={to.x * 100}
              y2={to.y * 100}
              stroke={lineColor}
              strokeWidth={stroke.width}
              strokeOpacity={
                stroke.opacity * line.drawT * (softenOthers ? 0.5 : 1)
              }
              strokeLinecap="round"
              style={{
                strokeDasharray: len,
                strokeDashoffset: len * (1 - line.drawT),
              }}
            />
          );
        })}
        {visible.map((anchor) => renderStar(anchor, {
          heroId,
          heroIntensity,
          softenOthers,
          zoomProgress,
          starColor,
        }))}
      </g>
    </svg>
  );
}

function effectiveWeight(
  anchor: ChampionConstellationAnchor,
  heroId: string,
): ConstellationVisualWeight {
  if (anchor.id === heroId) return "HERO";
  return anchor.visualWeight ?? weightFromCategory(anchor.category);
}

function weightFromCategory(
  category: ChampionConstellationAnchor["category"],
): ConstellationVisualWeight {
  switch (category) {
    case "CONTOUR":
      return "HIGH";
    case "ICONIC":
      return "HIGH";
    case "STRUCTURAL":
      return "MEDIUM";
    case "DETAIL":
      return "LOW";
    case "ATMOSPHERIC":
      return "LOW";
    default:
      return "MEDIUM";
  }
}

function renderStar(
  anchor: ChampionConstellationAnchor,
  opts: {
    heroId: string;
    heroIntensity: number;
    softenOthers: boolean;
    zoomProgress: number;
    starColor: string;
  },
) {
  const isHero = anchor.id === opts.heroId;
  const weight = effectiveWeight(anchor, opts.heroId);
  const baseR = starRadiusForWeight(weight);
  const r = isHero ? baseR * (1 + opts.heroIntensity * 0.35) : baseR;
  const starOpacity =
    opts.softenOthers && !isHero
      ? 0.35 + (1 - opts.zoomProgress) * 0.5
      : weight === "LOW"
        ? 0.6
        : 0.88;

  return (
    <g key={anchor.id} opacity={starOpacity}>
      {isHero ? (
        <>
          <circle
            cx={anchor.x * 100}
            cy={anchor.y * 100}
            r={r * 3.2}
            fill={opts.starColor}
            opacity={0.06 + opts.heroIntensity * 0.05}
          />
          <line
            x1={anchor.x * 100 - r * 5}
            y1={anchor.y * 100}
            x2={anchor.x * 100 + r * 5}
            y2={anchor.y * 100}
            stroke="#fff8e8"
            strokeWidth={0.07}
            strokeOpacity={0.3 + opts.heroIntensity * 0.15}
          />
          <line
            x1={anchor.x * 100}
            y1={anchor.y * 100 - r * 3}
            x2={anchor.x * 100}
            y2={anchor.y * 100 + r * 3}
            stroke="#fff8e8"
            strokeWidth={0.05}
            strokeOpacity={0.2 + opts.heroIntensity * 0.1}
          />
        </>
      ) : null}
      <circle
        cx={anchor.x * 100}
        cy={anchor.y * 100}
        r={r}
        fill={isHero ? "#ffffff" : weight === "LOW" ? "#c8b898" : opts.starColor}
        opacity={isHero ? 1 : weight === "LOW" ? 0.55 : 0.82}
        style={{
          filter: isHero
            ? `drop-shadow(0 0 ${5 + opts.heroIntensity * 8}px rgba(255,235,200,0.9))`
            : weight === "LOW"
              ? undefined
              : "drop-shadow(0 0 1.5px rgba(212,168,92,0.4))",
        }}
      />
    </g>
  );
}
