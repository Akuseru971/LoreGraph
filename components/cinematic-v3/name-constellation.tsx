"use client";

import * as React from "react";
import type { NameConstellationMode } from "@/lib/cinematic-v3/chapter-hub";
import {
  getHeroAnchorPosition,
  lineStrokeForWeight,
  linesForVisibleAnchors,
  starRadiusForWeight,
} from "@/lib/cinematic-v3/constellation-builder";
import { isNameConstellation } from "@/lib/cinematic-v3/name-constellation";
import type { ChampionConstellation } from "@/types";

const MODE_SCALE: Record<NameConstellationMode, number> = {
  intro: 1.05,
  "inter-chapter": 1,
  outro: 1.02,
};

const MODE_LINE_BOOST: Record<NameConstellationMode, number> = {
  intro: 1.15,
  "inter-chapter": 1.08,
  outro: 1.12,
};

export function NameConstellation({
  constellation,
  mode = "intro",
  nameOpacity = 1,
  heroStarId,
  heroIntensity = 1,
  zoomProgress = 0,
  opacity = 1,
  lineColor = "#e8d4a0",
  starColor = "#fff8ee",
  softenNonHero = 0,
  showStars = true,
  showLines = true,
  enableGlow,
  className,
}: {
  constellation: ChampionConstellation;
  mode?: NameConstellationMode;
  /** Global fade for entire word — all stars/lines appear together. */
  nameOpacity?: number;
  heroStarId?: string;
  heroIntensity?: number;
  zoomProgress?: number;
  opacity?: number;
  lineColor?: string;
  starColor?: string;
  softenNonHero?: number;
  showStars?: boolean;
  showLines?: boolean;
  enableGlow?: boolean;
  className?: string;
}) {
  if (!isNameConstellation(constellation)) return null;

  const globalReveal = nameOpacity >= 0.98;
  const visibleIds = React.useMemo(
    () => new Set(constellation.anchors.map((a) => a.id)),
    [constellation.anchors],
  );
  const heroId = heroStarId ?? constellation.heroStarId;
  const heroPos = getHeroAnchorPosition(constellation, heroId);

  const modeScale = MODE_SCALE[mode];
  const zoomCx = heroPos.x * 100;
  const zoomCy = heroPos.y * 100;
  const scale = (1 + zoomProgress * 3.2) * modeScale;
  const translateX = zoomProgress * (50 - zoomCx) * 0.9;
  const translateY = zoomProgress * (50 - zoomCy) * 0.9;

  const anchorById = React.useMemo(
    () => new Map(constellation.anchors.map((a) => [a.id, a])),
    [constellation.anchors],
  );

  const lineDraw = globalReveal ? 1 : nameOpacity;
  const lines = React.useMemo(
    () => linesForVisibleAnchors(constellation, visibleIds, lineDraw),
    [constellation, visibleIds, lineDraw],
  );

  const lineBoost = MODE_LINE_BOOST[mode];
  const effectiveOpacity = opacity * nameOpacity;
  const glowOn = enableGlow ?? (mode === "intro" || mode === "outro");
  const filterId = `name-glow-${constellation.id.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ opacity: effectiveOpacity }}
      aria-hidden
    >
      {glowOn ? (
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.35" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      ) : null}
      <g
        filter={glowOn ? `url(#${filterId})` : undefined}
        style={{
          transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
          transformOrigin: `${zoomCx}% ${zoomCy}%`,
        }}
      >
        {showLines &&
          lines.map((line) => {
          const from = anchorById.get(line.from);
          const to = anchorById.get(line.to);
          if (!from || !to) return null;
          const stroke = lineStrokeForWeight(line.weight);
          const drawT = globalReveal ? 1 : line.drawT;
          return (
            <line
              key={`${line.from}:${line.to}`}
              x1={from.x * 100}
              y1={from.y * 100}
              x2={to.x * 100}
              y2={to.y * 100}
              stroke={lineColor}
              strokeWidth={stroke.width * lineBoost}
              strokeOpacity={stroke.opacity * drawT * nameOpacity}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
          })}
        {showStars &&
          constellation.anchors.map((anchor) => {
          const isHero = anchor.id === heroId;
          const radius = starRadiusForWeight(anchor.visualWeight ?? "MEDIUM");
          const dim = !isHero && softenNonHero > 0 ? 1 - softenNonHero * 0.6 : 1;
          const heroBoost = isHero ? heroIntensity : 1;
          const starOpacity = nameOpacity * (isHero ? 0.98 : 0.86) * dim;
          return (
            <g key={anchor.id}>
              {isHero && heroIntensity > 1.1 ? (
                <circle
                  cx={anchor.x * 100}
                  cy={anchor.y * 100}
                  r={radius * 5 * heroBoost}
                  fill="rgba(255,240,200,0.14)"
                />
              ) : null}
              <circle
                cx={anchor.x * 100}
                cy={anchor.y * 100}
                r={radius * (isHero ? 1.55 * heroBoost : 1.08)}
                fill={isHero ? "#ffffff" : starColor}
                fillOpacity={starOpacity}
              />
              {!isHero ? (
                <circle
                  cx={anchor.x * 100}
                  cy={anchor.y * 100}
                  r={radius * 2.4}
                  fill={starColor}
                  fillOpacity={0.1 * dim * nameOpacity}
                />
              ) : null}
            </g>
          );
          })}
      </g>
    </svg>
  );
}
