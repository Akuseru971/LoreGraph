"use client";

import Image from "next/image";
import * as React from "react";
import { constellationById } from "@/data/cinematic/constellation-anchors";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import { computeOutroPhaseState } from "@/lib/cinematic-v3/intro-outro";
import type { CinematicCoordinates, CinematicOutro, CinematicScene } from "@/types";
import {
  ConstellationSilhouette,
  orderedAnchorsForReveal,
} from "./constellation-silhouette";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function pathNodeScreenPos(
  points: CinematicCoordinates[],
  index: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.z);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const pad = 12;
  const scaleX = (width - pad * 2) / Math.max(0.01, maxX - minX);
  const scaleY = (height - pad * 2) / Math.max(0.01, maxY - minY);
  const scale = Math.min(scaleX, scaleY) * 0.55;
  const p = points[index];
  return {
    x: width / 2 + (p.x - (minX + maxX) / 2) * scale,
    y: height / 2 + (p.z - (minY + maxY) / 2) * scale,
  };
}

export function SignatureOutroSequence({
  outro,
  elapsedMs,
  pathPoints,
  visitedIndices,
  scenes,
  recordMode = false,
}: {
  outro: CinematicOutro;
  elapsedMs: number;
  pathPoints: CinematicCoordinates[];
  visitedIndices: number[];
  scenes?: CinematicScene[];
  recordMode?: boolean;
}) {
  const constellation = constellationById.get(outro.constellationId);
  const state = computeOutroPhaseState(outro, elapsedMs, recordMode);
  const atmosphere = getAtmosphereConfig("CELESTIAL");
  const focal = outro.optionalSplashEcho?.focalPoint ?? { x: 0.52, y: 0.3 };

  const mapping = outro.pathToAnchorMapping ?? {};
  const anchorMap = React.useMemo(() => {
    const m = new Map<string, { x: number; y: number }>();
    for (const a of constellation?.anchors ?? []) {
      m.set(a.id, { x: a.x * 100, y: a.y * 100 });
    }
    return m;
  }, [constellation]);

  const morphNodes = React.useMemo(() => {
    if (!scenes || !constellation) return [];
    return scenes
      .map((scene, i) => {
        const anchorId = mapping[scene.id];
        if (!anchorId || !visitedIndices.includes(i)) return null;
        const from = pathNodeScreenPos(pathPoints, i, 100, 100);
        const target = anchorMap.get(anchorId);
        if (!target) return null;
        const delay = i * 0.06;
        const t = Math.max(0, Math.min(1, (state.pathMorphProgress - delay) / (1 - delay * 0.5)));
        const eased = easeInOutCubic(t);
        return {
          key: scene.id,
          x: from.x + (target.x - from.x) * eased,
          y: from.y + (target.y - from.y) * eased,
          opacity: state.pathOpacity * (1 - eased * 0.6),
          size: 0.35 + eased * 0.15,
        };
      })
      .filter(Boolean) as Array<{
      key: string;
      x: number;
      y: number;
      opacity: number;
      size: number;
    }>;
  }, [scenes, constellation, mapping, visitedIndices, pathPoints, anchorMap, state.pathMorphProgress, state.pathOpacity]);

  const ordered = constellation ? orderedAnchorsForReveal(constellation) : [];
  const primaryCount = ordered.filter((a) => a.importance === "PRIMARY").length;
  const secondaryCount = ordered.filter((a) => a.importance === "SECONDARY").length;
  const starReveal =
    state.pathMorphProgress * primaryCount +
    state.secondaryStarProgress * secondaryCount +
    state.microStarProgress * (ordered.length - primaryCount - secondaryCount);
  const revealProgress = Math.min(1, starReveal / ordered.length);

  const showOutroTitle =
    recordMode
      ? outro.recordShowOutroTitle ?? false
      : outro.showText ?? true;

  if (!constellation) return null;

  const pathSegments: string[] = [];
  for (let i = 0; i < pathPoints.length - 1; i++) {
    if (!visitedIndices.includes(i) || !visitedIndices.includes(i + 1)) continue;
    const a = pathNodeScreenPos(pathPoints, i, 100, 100);
    const b = pathNodeScreenPos(pathPoints, i + 1, 100, 100);
    pathSegments.push(`M ${a.x} ${a.y} L ${b.x} ${b.y}`);
  }

  return (
    <div
      className="absolute inset-0 z-[55] overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 90% 80% at 50% 50%, ${atmosphere.background}ee, #000)`,
        opacity: Math.min(1, state.progress * 1.15 + 0.1),
      }}
    >
      {outro.showSplashEcho &&
      outro.optionalSplashEcho?.url &&
      state.splashEchoOpacity > 0.02 ? (
        <div
          className="absolute inset-[-6%]"
          style={{
            opacity: state.splashEchoOpacity,
            filter: "brightness(0.5) saturate(0.4) blur(3px)",
            transform: `scale(${state.pullbackScale * 0.95})`,
          }}
        >
          <Image
            src={outro.optionalSplashEcho.url}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: `${focal.x * 100}% ${focal.y * 100}%` }}
            sizes="100vw"
          />
        </div>
      ) : null}

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: state.pathOpacity }}
        aria-hidden
      >
        {pathSegments.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#d4a85c"
            strokeWidth={0.3}
            strokeOpacity={0.5 * (1 - state.pathMorphProgress * 0.5)}
            strokeLinecap="round"
          />
        ))}
        {morphNodes.map((node) => (
          <circle
            key={node.key}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="#f0e6d2"
            opacity={node.opacity}
            style={{ filter: "drop-shadow(0 0 2px rgba(212,168,92,0.5))" }}
          />
        ))}
      </svg>

      <div
        className="absolute inset-[8%] sm:inset-[10%]"
        style={{
          opacity: state.constellationOpacity,
          transform: `scale(${1 / state.pullbackScale})`,
        }}
      >
        <ConstellationSilhouette
          constellation={constellation}
          starRevealProgress={revealProgress}
          lineProgress={Math.min(1, state.secondaryStarProgress + 0.2)}
          heroStarId={constellation.heroStarId}
          heroIntensity={0.9}
          opacity={1}
          showLines={state.secondaryStarProgress > 0.3}
          className="h-full w-full"
        />
      </div>

      {showOutroTitle && state.textOpacity > 0.1 && state.phase === "hold" ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10 px-8 text-center"
          style={{ opacity: state.textOpacity }}
        >
          <h2 className="text-monument text-parchment text-3xl sm:text-4xl tracking-wide">
            {outro.title?.toUpperCase()}
          </h2>
          {outro.subtitle ? (
            <p className="mt-2 text-gold/65 text-sm tracking-[0.18em] uppercase">
              {outro.subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
