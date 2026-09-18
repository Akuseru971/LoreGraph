"use client";

import * as React from "react";
import type { NameConstellationMode } from "@/lib/cinematic-v3/chapter-hub";
import {
  getHeroAnchorPosition,
  lineStrokeForWeight,
  linesForVisibleAnchors,
  starRadiusForWeight,
} from "@/lib/cinematic-v3/constellation-builder";
import { fitConstellationToSafeFrame } from "@/lib/cinematic-v3/name-fit";
import { isNameConstellation } from "@/lib/cinematic-v3/name-constellation";
import type { ChampionConstellation } from "@/types";

const MODE_SCALE: Record<NameConstellationMode, number> = {
  intro: 1.05,
  "inter-chapter": 1,
  outro: 1.02,
};

const MODE_LINE_BOOST: Record<NameConstellationMode, number> = {
  intro: 0.72,
  "inter-chapter": 0.65,
  outro: 0.7,
};

const NAME_LINE_OPACITY: Record<NameConstellationMode, number> = {
  intro: 0.38,
  "inter-chapter": 0.28,
  outro: 0.34,
};

const NAME_STAR_SCALE: Record<NameConstellationMode, number> = {
  intro: 1.35,
  "inter-chapter": 1.28,
  outro: 1.32,
};

const HUB_CENTER_Y = 44;

export function NameConstellation({
  constellation,
  mode = "intro",
  nameOpacity = 1,
  heroStarId,
  heroIntensity = 1,
  zoomProgress = 0,
  plungeZoom = 0,
  nameBreathing = 1,
  opacity = 1,
  lineColor = "#d4c090",
  starColor = "#fff8ee",
  minimalStyle = false,
  softenNonHero = 0,
  showStars = true,
  showLines = true,
  enableGlow,
  className,
}: {
  constellation: ChampionConstellation;
  mode?: NameConstellationMode;
  nameOpacity?: number;
  heroStarId?: string;
  heroIntensity?: number;
  /** Legacy plunge zoom — use plungeZoom when set. */
  zoomProgress?: number;
  /** 0 during readable hub; ramps only after full name is visible. */
  plungeZoom?: number;
  nameBreathing?: number;
  opacity?: number;
  lineColor?: string;
  starColor?: string;
  softenNonHero?: number;
  showStars?: boolean;
  showLines?: boolean;
  enableGlow?: boolean;
  /** Black-and-white QA — no glow, high contrast stars. */
  minimalStyle?: boolean;
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

  const hubFit = React.useMemo(
    () => (mode === "inter-chapter" ? fitConstellationToSafeFrame(constellation) : null),
    [constellation, mode],
  );

  const effectivePlunge = plungeZoom > 0 ? plungeZoom : zoomProgress;
  const modeScale = MODE_SCALE[mode];
  const heroCx = heroPos.x * 100;
  const heroCy = heroPos.y * 100;

  let scale = (1 + effectivePlunge * 3.2) * modeScale;
  let translateX = effectivePlunge * (50 - heroCx) * 0.9;
  let translateY = effectivePlunge * (50 - heroCy) * 0.9;
  let originX = heroCx;
  let originY = heroCy;

  if (mode === "inter-chapter" && hubFit) {
    const fitScale = hubFit.scale * nameBreathing;
    const centerOriginX = hubFit.bounds.centerX * 100;
    const centerOriginY = hubFit.bounds.centerY * 100;

    if (effectivePlunge < 0.08) {
      scale = fitScale;
      translateX = hubFit.offsetX * 100;
      translateY = hubFit.offsetY * 100;
      originX = centerOriginX;
      originY = centerOriginY;
    } else {
      const plungeT = (effectivePlunge - 0.08) / 0.92;
      const plungeScale = fitScale * (1 + plungeT * 1.8);
      scale = plungeScale;
      originX = centerOriginX + (heroCx - centerOriginX) * plungeT;
      originY = centerOriginY + (heroCy - centerOriginY) * plungeT;
      translateX = hubFit.offsetX * 100 * (1 - plungeT) + plungeT * (50 - heroCx) * 0.75;
      translateY = hubFit.offsetY * 100 * (1 - plungeT) + plungeT * (HUB_CENTER_Y - heroCy) * 0.75;
    }
  }

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
  const lineOpacityScale = NAME_LINE_OPACITY[mode];
  const starScale = NAME_STAR_SCALE[mode];
  const effectiveOpacity = opacity * nameOpacity;
  const glowOn = !minimalStyle && (enableGlow ?? (mode === "intro" || mode === "outro"));
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
          transformOrigin: `${originX}% ${originY}%`,
        }}
      >
        {showStars &&
          constellation.anchors.map((anchor) => {
            const isHero = anchor.id === heroId;
            const baseRadius = starRadiusForWeight(anchor.visualWeight ?? "MEDIUM");
            const radius = baseRadius * starScale;
            const dim = !isHero && softenNonHero > 0 ? 1 - softenNonHero * 0.6 : 1;
            const heroBoost = isHero ? Math.min(heroIntensity, 1.35) : 1;
            const isPrimary = anchor.visualWeight === "HIGH" || anchor.visualWeight === "HERO";
            const starOpacity = nameOpacity * (isHero ? 1 : isPrimary ? 0.95 : 0.72) * dim;
            const fill = minimalStyle ? (isHero ? "#ffffff" : isPrimary ? "#f0f0f0" : "#aaaaaa") : isHero ? "#ffffff" : starColor;
            return (
              <g key={anchor.id}>
                {isHero && heroIntensity > 1.05 && !minimalStyle ? (
                  <circle
                    cx={anchor.x * 100}
                    cy={anchor.y * 100}
                    r={radius * 3.2 * heroBoost}
                    fill="rgba(255,240,200,0.1)"
                  />
                ) : null}
                <circle
                  cx={anchor.x * 100}
                  cy={anchor.y * 100}
                  r={radius * (isHero ? 1.4 * heroBoost : isPrimary ? 1.22 : 0.88)}
                  fill={fill}
                  fillOpacity={starOpacity}
                />
                {!isHero && !minimalStyle ? (
                  <circle
                    cx={anchor.x * 100}
                    cy={anchor.y * 100}
                    r={radius * (isPrimary ? 2.2 : 1.6)}
                    fill={starColor}
                    fillOpacity={0.08 * dim * nameOpacity}
                  />
                ) : null}
              </g>
            );
          })}
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
                stroke={minimalStyle ? "#666666" : lineColor}
                strokeWidth={stroke.width * lineBoost}
                strokeOpacity={stroke.opacity * lineOpacityScale * drawT * nameOpacity}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
      </g>
    </svg>
  );
}
