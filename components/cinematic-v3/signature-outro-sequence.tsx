"use client";

import Image from "next/image";
import * as React from "react";
import { constellationById } from "@/data/cinematic/constellation-anchors";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import { computeOutroPhaseState } from "@/lib/cinematic-v3/intro-outro";
import type { CinematicCoordinates, CinematicOutro } from "@/types";
import { ConstellationSilhouette } from "./constellation-silhouette";

function pathPointsToSvg(
  points: CinematicCoordinates[],
  visitedIndices: number[],
  width: number,
  height: number,
): string {
  if (points.length < 2) return "";
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

  const toScreen = (p: CinematicCoordinates) => ({
    x: width / 2 + (p.x - (minX + maxX) / 2) * scale,
    y: height / 2 + (p.z - (minY + maxY) / 2) * scale,
  });

  const segments: string[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    if (!visitedIndices.includes(i) || !visitedIndices.includes(i + 1)) continue;
    const a = toScreen(points[i]);
    const b = toScreen(points[i + 1]);
    segments.push(`M ${a.x} ${a.y} L ${b.x} ${b.y}`);
  }
  return segments.join(" ");
}

export function SignatureOutroSequence({
  outro,
  elapsedMs,
  pathPoints,
  visitedIndices,
  recordMode = false,
}: {
  outro: CinematicOutro;
  elapsedMs: number;
  pathPoints: CinematicCoordinates[];
  visitedIndices: number[];
  recordMode?: boolean;
}) {
  const constellation = constellationById.get(outro.constellationId);
  const state = computeOutroPhaseState(outro, elapsedMs);
  const atmosphere = getAtmosphereConfig("CELESTIAL");
  const focal = outro.optionalSplashEcho?.focalPoint ?? { x: 0.5, y: 0.35 };
  const pathD = pathPointsToSvg(pathPoints, visitedIndices, 100, 100);
  const showText = outro.showText && !recordMode;

  if (!constellation) return null;

  return (
    <div
      className="absolute inset-0 z-[55] overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 90% 80% at 50% 50%, ${atmosphere.background}ee, #000)`,
        opacity: Math.min(1, state.progress * 1.2 + 0.15),
      }}
    >
      {outro.showSplashEcho && outro.optionalSplashEcho?.url ? (
        <div
          className="absolute inset-[-6%]"
          style={{
            opacity: state.splashEchoOpacity,
            filter: "brightness(0.55) saturate(0.45) blur(2px)",
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
        {pathD ? (
          <path
            d={pathD}
            fill="none"
            stroke="#d4a85c"
            strokeWidth={0.35}
            strokeOpacity={0.55}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 3px rgba(212,168,92,0.4))" }}
          />
        ) : null}
      </svg>

      <div
        className="absolute inset-[10%] sm:inset-[12%]"
        style={{
          opacity: state.constellationOpacity,
          transform: `scale(${1 / state.pullbackScale})`,
        }}
      >
        <ConstellationSilhouette
          constellation={constellation}
          visibleStarCount={constellation.anchors.length}
          lineProgress={Math.min(1, state.phaseProgress + (state.phase === "constellation_reform" ? 0.4 : 0))}
          heroStarId={constellation.heroStarId}
          heroIntensity={0.85}
          opacity={1}
          className="h-full w-full"
        />
      </div>

      {showText ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10 px-8 text-center"
          style={{ opacity: state.textOpacity }}
        >
          <p className="text-eyebrow mb-2 tracking-[0.25em] text-gold/70 uppercase">
            The constellation remains
          </p>
          <h2 className="text-monument text-parchment text-3xl sm:text-4xl">
            {outro.title}
          </h2>
          {outro.subtitle ? (
            <p className="mt-2 text-parchment/60 text-sm">{outro.subtitle}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
