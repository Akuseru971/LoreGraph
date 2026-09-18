"use client";

import * as React from "react";
import type { ChampionConstellation, ChampionConstellationAnchor } from "@/types";

function anchorById(
  anchors: ChampionConstellationAnchor[],
): Map<string, ChampionConstellationAnchor> {
  return new Map(anchors.map((a) => [a.id, a]));
}

export function orderedAnchorsForReveal(
  constellation: ChampionConstellation,
): ChampionConstellationAnchor[] {
  const primary = constellation.anchors.filter((a) => a.importance === "PRIMARY");
  const secondary = constellation.anchors.filter((a) => a.importance === "SECONDARY");
  const micro = constellation.anchors.filter((a) => a.importance === "MICRO");
  return [...primary, ...secondary, ...micro];
}

export function getHeroAnchorPosition(
  constellation: ChampionConstellation,
  heroStarId?: string,
): { x: number; y: number } {
  const id = heroStarId ?? constellation.heroStarId;
  const anchor = constellation.anchors.find((a) => a.id === id);
  return anchor ? { x: anchor.x, y: anchor.y } : { x: 0.5, y: 0.35 };
}

export function ConstellationSilhouette({
  constellation,
  visibleStarCount,
  starRevealProgress = 1,
  lineProgress = 1,
  heroStarId,
  heroIntensity = 1,
  zoomProgress = 0,
  opacity = 1,
  lineColor = "#d4a85c",
  starColor = "#f0e6d2",
  showLines = true,
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
  className?: string;
}) {
  const ordered = React.useMemo(
    () => orderedAnchorsForReveal(constellation),
    [constellation],
  );

  const revealCount =
    visibleStarCount ??
    Math.ceil(ordered.length * Math.min(1, Math.max(0, starRevealProgress)));
  const visible = ordered.slice(0, revealCount);
  const anchorMap = anchorById(constellation.anchors);
  const heroId = heroStarId ?? constellation.heroStarId;
  const hero = anchorMap.get(heroId);
  const heroPos = getHeroAnchorPosition(constellation, heroId);

  const zoomCx = heroPos.x * 100;
  const zoomCy = heroPos.y * 100;
  const scale = 1 + zoomProgress * 3.2;
  const translateX = zoomProgress * (50 - zoomCx) * 0.9;
  const translateY = zoomProgress * (50 - zoomCy) * 0.9;

  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = [];
  const seen = new Set<string>();
  if (showLines) {
    for (const anchor of visible) {
      if (anchor.importance === "MICRO") continue;
      for (const targetId of anchor.connectsTo ?? []) {
        const target = anchorMap.get(targetId);
        if (!target || target.importance === "MICRO") continue;
        if (!visible.find((v) => v.id === targetId)) continue;
        const key = [anchor.id, targetId].sort().join(":");
        if (seen.has(key)) continue;
        seen.add(key);
        lines.push({
          x1: anchor.x * 100,
          y1: anchor.y * 100,
          x2: target.x * 100,
          y2: target.y * 100,
          key,
        });
      }
    }
  }

  const lineOpacity = 0.18 + lineProgress * 0.32;
  const softenOthers = zoomProgress > 0.08;

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
        {lines.map((line, i) => {
          const drawT = Math.max(0, Math.min(1, lineProgress - i * 0.03));
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={lineColor}
              strokeWidth={0.14 + drawT * 0.1}
              strokeOpacity={lineOpacity * drawT * (softenOthers ? 0.45 : 1)}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 1.5px rgba(212,168,92,0.3))",
                strokeDasharray: len,
                strokeDashoffset: len * (1 - drawT),
              }}
            />
          );
        })}
        {visible.map((anchor, idx) => {
          const isHero = anchor.id === heroId;
          const isMicro = anchor.importance === "MICRO";
          const isPrimary = anchor.importance === "PRIMARY";
          const birthT = Math.max(
            0,
            Math.min(1, starRevealProgress * ordered.length - idx),
          );
          const baseR = isMicro ? 0.14 : isPrimary ? 0.48 : 0.32;
          const r = isHero ? baseR * (1 + heroIntensity * 0.4) : baseR;
          const starOpacity =
            birthT *
            (softenOthers && !isHero
              ? 0.3 + (1 - zoomProgress) * 0.45
              : isMicro
                ? 0.55
                : 0.85);
          if (starOpacity <= 0.01) return null;
          return (
            <g key={anchor.id} opacity={starOpacity}>
              {isHero ? (
                <>
                  <circle
                    cx={anchor.x * 100}
                    cy={anchor.y * 100}
                    r={r * 3}
                    fill={starColor}
                    opacity={0.06 + heroIntensity * 0.05}
                  />
                  <line
                    x1={anchor.x * 100 - r * 4}
                    y1={anchor.y * 100}
                    x2={anchor.x * 100 + r * 4}
                    y2={anchor.y * 100}
                    stroke="#fff8e8"
                    strokeWidth={0.08}
                    strokeOpacity={0.35 + heroIntensity * 0.15}
                  />
                  <line
                    x1={anchor.x * 100}
                    y1={anchor.y * 100 - r * 2.5}
                    x2={anchor.x * 100}
                    y2={anchor.y * 100 + r * 2.5}
                    stroke="#fff8e8"
                    strokeWidth={0.06}
                    strokeOpacity={0.25 + heroIntensity * 0.1}
                  />
                </>
              ) : null}
              <circle
                cx={anchor.x * 100}
                cy={anchor.y * 100}
                r={r}
                fill={isHero ? "#ffffff" : isMicro ? "#c8b898" : starColor}
                opacity={isHero ? 1 : isMicro ? 0.65 : 0.8}
                style={{
                  filter: isHero
                    ? `drop-shadow(0 0 ${5 + heroIntensity * 8}px rgba(255,235,200,0.9))`
                    : isMicro
                      ? "drop-shadow(0 0 1px rgba(212,168,92,0.35))"
                      : "drop-shadow(0 0 2px rgba(212,168,92,0.45))",
                }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
