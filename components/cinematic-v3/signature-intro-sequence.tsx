"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import {
  computeIntroPhaseState,
  getConstellationForIntro,
  totalIntroMs,
} from "@/lib/cinematic-v3/intro-outro";
import type { CinematicIntro } from "@/types";
import { ConstellationSilhouette } from "./constellation-silhouette";

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
  const state = computeIntroPhaseState(intro, elapsedMs, anchorCount);
  const atmosphere = getAtmosphereConfig(intro.atmosphere ?? "CELESTIAL");
  const focal = intro.splashFocal ?? intro.splashAsset.focalPoint ?? { x: 0.5, y: 0.35 };

  React.useEffect(() => {
    if (state.complete) onComplete?.();
  }, [state.complete, onComplete]);

  const total = totalIntroMs(intro.timing);
  const driftX = Math.sin(elapsedMs / 3200) * 0.8;
  const driftY = Math.cos(elapsedMs / 4100) * 0.4;
  const breathe = 1 + Math.sin(elapsedMs / 2800) * 0.012;

  const showText = intro.showText && !recordMode;
  const objectPosition = `${focal.x * 100}% ${focal.y * 100}%`;

  if (!constellation) return null;

  return (
    <div
      className="absolute inset-0 z-[60] overflow-hidden"
      style={{ background: atmosphere.background }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${atmosphere.particleColor}22, transparent 70%)`,
        }}
      />

      <motion.div
        className="absolute inset-[-4%]"
        style={{
          opacity: state.splashOpacity,
          filter: `brightness(${1 - state.splashDarken}) saturate(${1 - state.colorDrain}) blur(${state.zoomProgress * 6}px)`,
          transform: `scale(${breathe * (1 + state.zoomProgress * 0.15)}) translate(${driftX}%, ${driftY}%)`,
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
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, transparent 20%, ${atmosphere.background} ${55 + state.splashDarken * 35}%)`,
          opacity: 0.55 + state.splashDarken * 0.4,
        }}
      />

      <div
        className="absolute inset-[8%] sm:inset-[10%]"
        style={{ opacity: state.constellationOpacity }}
      >
        <ConstellationSilhouette
          constellation={constellation}
          visibleStarCount={state.visibleStarCount}
          lineProgress={state.lineProgress}
          heroStarId={intro.heroStarId}
          heroIntensity={state.heroStarIntensity}
          zoomProgress={state.zoomProgress}
          zoomTargetId={intro.heroStarId}
          opacity={1}
          lineColor="#d4a85c"
          starColor="#f0e6d2"
          className="h-full w-full"
        />
      </div>

      {state.zoomProgress > 0.35 ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${focal.x * 100}% ${focal.y * 100}%, rgba(255,240,210,${state.zoomProgress * 0.35}) 0%, transparent 55%)`,
          }}
        />
      ) : null}

      {showText ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-[10%] z-10 px-8 text-center"
          style={{ opacity: state.textOpacity }}
        >
          {intro.eyebrow ? (
            <p className="text-eyebrow mb-3 tracking-[0.28em] text-gold/80 uppercase">
              {intro.eyebrow}
            </p>
          ) : null}
          <h1 className="text-monument text-parchment text-4xl sm:text-5xl md:text-6xl">
            {intro.title}
          </h1>
          {intro.subtitle ? (
            <p className="mt-3 text-parchment/65 text-sm sm:text-base tracking-wide">
              {intro.subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      {!recordMode && !reduceMotion && elapsedMs < total - 400 ? (
        <p className="pointer-events-none absolute bottom-[12%] inset-x-0 text-center text-parchment/35 text-xs tracking-widest uppercase">
          Press Space to begin
        </p>
      ) : null}

      {state.zoomProgress > 0.7 ? (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: (state.zoomProgress - 0.7) / 0.3 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.4 }}
        />
      ) : null}
    </div>
  );
}
