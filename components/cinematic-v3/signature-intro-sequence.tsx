"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import {
  computeIntroPhaseState,
  getConstellationForIntro,
  totalIntroMsForMode,
} from "@/lib/cinematic-v3/intro-outro";
import type { CinematicIntro } from "@/types";
import {
  ConstellationSilhouette,
  getHeroAnchorPosition,
} from "./constellation-silhouette";

export function SignatureIntroSequence({
  intro,
  elapsedMs,
  recordMode = false,
  onComplete,
}: {
  intro: CinematicIntro;
  elapsedMs: number;
  recordMode?: boolean;
  onComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const constellation = getConstellationForIntro(intro);
  const anchorCount = constellation?.anchors.length ?? 8;
  const state = computeIntroPhaseState(intro, elapsedMs, anchorCount, recordMode);
  const atmosphere = getAtmosphereConfig(intro.atmosphere ?? "CELESTIAL");
  const focal = intro.splashFocal ?? intro.splashAsset.focalPoint ?? { x: 0.52, y: 0.3 };
  const heroPos = constellation
    ? getHeroAnchorPosition(constellation, intro.heroStarId)
    : { x: 0.64, y: 0.2 };

  React.useEffect(() => {
    if (state.complete) onComplete?.();
  }, [state.complete, onComplete]);

  const total = totalIntroMsForMode(intro, recordMode);
  const driftX = Math.sin(elapsedMs / 3200) * 0.6;
  const driftY = Math.cos(elapsedMs / 4100) * 0.3;
  const breathe = 1 + Math.sin(elapsedMs / 2800) * 0.01;

  const showTitle =
    recordMode
      ? intro.recordShowIntroTitle ?? false
      : intro.showText ?? true;

  const objectPosition = `${focal.x * 100}% ${focal.y * 100}%`;
  const heroCx = heroPos.x * 100;
  const heroCy = heroPos.y * 100;

  if (!constellation) return null;

  const subjectMask = `radial-gradient(ellipse 42% 58% at ${heroCx * 0.55 + 22}% ${heroCy * 0.7 + 12}%, black 15%, rgba(0,0,0,0.85) 45%, transparent 72%)`;

  return (
    <div
      className="absolute inset-0 z-[60] overflow-hidden"
      style={{ background: atmosphere.background }}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.35 + state.backgroundFade * 0.5,
          background: `radial-gradient(ellipse 90% 75% at 50% 38%, ${atmosphere.particleColor}18, ${atmosphere.background} 70%)`,
        }}
      />

      <div
        className="absolute inset-[-3%]"
        style={{
          opacity: state.splashOpacity * state.subjectOpacity,
          filter: `brightness(${1 - state.splashDarken}) saturate(${1 - state.colorDrain})`,
          transform: `scale(${breathe * (1 + state.zoomProgress * 0.08)}) translate(${driftX}%, ${driftY}%)`,
          WebkitMaskImage: state.starRevealProgress > 0.05 ? subjectMask : undefined,
          maskImage: state.starRevealProgress > 0.05 ? subjectMask : undefined,
        }}
      >
        <Image
          src={intro.splashAsset.url}
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition }}
          sizes="100vw"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: state.backgroundFade * 0.85,
          background: `radial-gradient(ellipse 85% 70% at 50% 42%, transparent 8%, ${atmosphere.background} 68%)`,
        }}
      />

      <div
        className="absolute inset-[-3%]"
        style={{
          opacity: state.constellationOpacity,
          mixBlendMode: state.starRevealProgress > 0.1 ? "screen" : "normal",
          transform: `scale(${breathe * (1 + state.zoomProgress * 0.08)}) translate(${driftX}%, ${driftY}%)`,
        }}
      >
        <ConstellationSilhouette
          constellation={constellation}
          starRevealProgress={state.starRevealProgress}
          lineProgress={state.lineProgress}
          heroStarId={intro.heroStarId}
          heroIntensity={state.heroStarIntensity}
          zoomProgress={state.zoomProgress}
          opacity={1}
          showLines={state.lineProgress > 0.05}
          className="h-full w-full"
        />
      </div>

      {state.zoomProgress > 0.05 || state.handoffBlend > 0 ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${heroCx}% ${heroCy}%, rgba(255,245,225,${(state.zoomProgress * 0.4 + state.handoffBlend * 0.35) * state.heroStarIntensity * 0.15}) 0%, transparent 50%)`,
          }}
        />
      ) : null}

      {showTitle && state.textOpacity > 0.02 ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-[10%] z-10 px-8 text-center"
          style={{ opacity: state.textOpacity }}
        >
          <h1 className="text-monument text-parchment text-4xl sm:text-5xl md:text-6xl tracking-wide">
            {intro.title?.toUpperCase()}
          </h1>
          {intro.subtitle ? (
            <p className="mt-3 text-gold/75 text-sm sm:text-base tracking-[0.2em] uppercase">
              {intro.subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      {!recordMode && !reduceMotion && elapsedMs < total - 400 ? (
        <p className="pointer-events-none absolute bottom-[12%] inset-x-0 text-center text-parchment/30 text-xs tracking-widest uppercase">
          Skip intro
        </p>
      ) : null}
    </div>
  );
}
