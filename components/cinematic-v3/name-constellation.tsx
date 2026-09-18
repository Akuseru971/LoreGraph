"use client";

import * as React from "react";
import {
  anchorsVisibleAtReveal,
  getHeroAnchorPosition,
  lineStrokeForWeight,
  linesForVisibleAnchors,
  starRadiusForWeight,
} from "@/lib/cinematic-v3/constellation-builder";
import { isNameConstellation } from "@/lib/cinematic-v3/name-constellation";
import type { ChampionConstellation } from "@/types";

export function NameConstellation({
  constellation,
  starRevealProgress = 1,
  lineProgress = 1,
  heroStarId,
  heroIntensity = 1,
  zoomProgress = 0,
  opacity = 1,
  lineColor = "#e8d4a0",
  starColor = "#fff8ee",
  softenNonHero = 0,
  className,
}: {
  constellation: ChampionConstellation;
  starRevealProgress?: number;
  lineProgress?: number;
  heroStarId?: string;
  heroIntensity?: number;
  zoomProgress?: number;
  opacity?: number;
  lineColor?: string;
  starColor?: string;
  /** 0–1 how much to dim non-hero stars during hero select */
  softenNonHero?: number;
  className?: string;
}) {
  const visible = React.useMemo(
    () => anchorsVisibleAtReveal(constellation, starRevealProgress),
    [constellation, starRevealProgress],
  );
  const visibleIds = React.useMemo(() => new Set(visible.map((a) => a.id)), [visible]);
  const heroId = heroStarId ?? constellation.heroStarId;
  const heroPos = getHeroAnchorPosition(constellation, heroId);

  const zoomCx = heroPos.x * 100;
  const zoomCy = heroPos.y * 100;
  const scale = 1 + zoomProgress * 2.8;
  const translateX = zoomProgress * (50 - zoomCx) * 0.85;
  const translateY = zoomProgress * (50 - zoomCy) * 0.85;

  const anchorById = React.useMemo(
    () => new Map(constellation.anchors.map((a) => [a.id, a])),
    [constellation.anchors],
  );

  const lines = React.useMemo(
    () => linesForVisibleAnchors(constellation, visibleIds, lineProgress),
    [constellation, visibleIds, lineProgress],
  );

  if (!isNameConstellation(constellation)) return null;

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
          const len = Math.hypot((to.x - from.x) * 100, (to.y - from.y) * 100);
          return (
            <line
              key={`${line.from}:${line.to}`}
              x1={from.x * 100}
              y1={from.y * 100}
              x2={to.x * 100}
              y2={to.y * 100}
              stroke={lineColor}
              strokeWidth={stroke.width}
              strokeOpacity={stroke.opacity * line.drawT}
              strokeLinecap="round"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - line.drawT)}
            />
          );
        })}
        {visible.map((anchor) => {
          const isHero = anchor.id === heroId;
          const radius = starRadiusForWeight(anchor.visualWeight ?? "MEDIUM");
          const dim = !isHero && softenNonHero > 0 ? 1 - softenNonHero * 0.55 : 1;
          const heroBoost = isHero ? heroIntensity : 1;
          return (
            <g key={anchor.id}>
              {isHero && heroIntensity > 1 ? (
                <circle
                  cx={anchor.x * 100}
                  cy={anchor.y * 100}
                  r={radius * 4.5 * heroBoost}
                  fill="rgba(255,240,200,0.12)"
                />
              ) : null}
              <circle
                cx={anchor.x * 100}
                cy={anchor.y * 100}
                r={radius * (isHero ? 1.4 * heroBoost : 1)}
                fill={isHero ? "#ffffff" : starColor}
                fillOpacity={(isHero ? 0.98 : 0.82) * dim}
              />
              {!isHero ? (
                <circle
                  cx={anchor.x * 100}
                  cy={anchor.y * 100}
                  r={radius * 2.2}
                  fill={starColor}
                  fillOpacity={0.08 * dim}
                />
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
