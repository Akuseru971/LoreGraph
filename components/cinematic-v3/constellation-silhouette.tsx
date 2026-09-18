"use client";

import * as React from "react";
import type { ChampionConstellation, ChampionConstellationAnchor } from "@/types";

function anchorById(
  anchors: ChampionConstellationAnchor[],
): Map<string, ChampionConstellationAnchor> {
  return new Map(anchors.map((a) => [a.id, a]));
}

export function ConstellationSilhouette({
  constellation,
  visibleStarCount,
  lineProgress = 1,
  heroStarId,
  heroIntensity = 1,
  zoomProgress = 0,
  zoomTargetId,
  opacity = 1,
  lineColor = "#d4a85c",
  starColor = "#f0e6d2",
  className,
}: {
  constellation: ChampionConstellation;
  visibleStarCount: number;
  lineProgress?: number;
  heroStarId?: string;
  heroIntensity?: number;
  zoomProgress?: number;
  zoomTargetId?: string;
  opacity?: number;
  lineColor?: string;
  starColor?: string;
  className?: string;
}) {
  const ordered = React.useMemo(() => {
    const primary = constellation.anchors.filter((a) => a.importance === "PRIMARY");
    const secondary = constellation.anchors.filter((a) => a.importance === "SECONDARY");
    return [...primary, ...secondary];
  }, [constellation.anchors]);

  const visible = ordered.slice(0, visibleStarCount);
  const anchorMap = anchorById(constellation.anchors);
  const hero = heroStarId
    ? anchorMap.get(heroStarId)
    : anchorMap.get(constellation.heroStarId);

  const zoomCx = hero ? hero.x * 100 : 50;
  const zoomCy = hero ? hero.y * 100 : 50;
  const scale = 1 + zoomProgress * 2.8;
  const translateX = zoomProgress * (50 - zoomCx) * 0.85;
  const translateY = zoomProgress * (50 - zoomCy) * 0.85;

  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = [];
  const seen = new Set<string>();
  for (const anchor of visible) {
    for (const targetId of anchor.connectsTo ?? []) {
      const target = anchorMap.get(targetId);
      if (!target || !visible.find((v) => v.id === targetId)) continue;
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

  const lineOpacity = 0.22 + lineProgress * 0.38;
  const softenOthers = zoomProgress > 0.1;

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
          transition: "transform 80ms linear",
        }}
      >
        {lines.map((line, i) => {
          const drawT = Math.max(0, Math.min(1, lineProgress - i * 0.04));
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={lineColor}
              strokeWidth={0.18 + drawT * 0.12}
              strokeOpacity={lineOpacity * drawT * (softenOthers ? 0.55 : 1)}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 2px rgba(212,168,92,0.35))",
                strokeDasharray: len,
                strokeDashoffset: len * (1 - drawT),
              }}
            />
          );
        })}
        {visible.map((anchor) => {
          const isHero =
            anchor.id === (heroStarId ?? constellation.heroStarId);
          const baseR = anchor.importance === "PRIMARY" ? 0.55 : 0.38;
          const r = isHero ? baseR * (1 + heroIntensity * 0.35) : baseR;
          const starOpacity =
            softenOthers && !isHero ? 0.35 + (1 - zoomProgress) * 0.4 : 1;
          return (
            <g key={anchor.id} opacity={starOpacity}>
              {isHero ? (
                <circle
                  cx={anchor.x * 100}
                  cy={anchor.y * 100}
                  r={r * 2.2}
                  fill={starColor}
                  opacity={0.08 + heroIntensity * 0.06}
                />
              ) : null}
              <circle
                cx={anchor.x * 100}
                cy={anchor.y * 100}
                r={r}
                fill={isHero ? "#fff8e8" : starColor}
                opacity={isHero ? 0.95 : 0.75}
                style={{
                  filter: isHero
                    ? `drop-shadow(0 0 ${4 + heroIntensity * 6}px rgba(255,230,180,0.85))`
                    : "drop-shadow(0 0 2px rgba(212,168,92,0.5))",
                }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
