"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EntityPortrait } from "@/components/entity-portrait";
import {
  championArtPosition,
  generateArtwork,
  getChampionAssetUrl,
} from "@/lib/assets";
import { cn, hexToRgba } from "@/lib/utils";
import type { JourneyFormat, JourneyStep } from "@/types";

export type ScenePhase = "travel" | "arrival" | "narration" | "departure";

export function CinematicScene({
  step,
  phase,
  format,
  lineIndex,
}: {
  step: JourneyStep;
  phase: ScenePhase;
  format: JourneyFormat;
  lineIndex: number;
}) {
  const reduceMotion = useReducedMotion();
  const accent = step.accentColor ?? "#C9A96E";
  const artwork = step.assetKey
    ? generateArtwork(step.assetKey, accent, "splash")
    : null;
  const splash = step.assetKey ? getChampionAssetUrl(step.assetKey, "splash") : null;

  const isPortrait = format === "portrait";
  const isSquare = format === "square";

  const cameraScale =
    phase === "travel" ? 0.92 : phase === "arrival" ? 1.02 : phase === "narration" ? 1 : 0.96;

  const cameraY =
    phase === "travel" ? 24 : phase === "arrival" ? 0 : phase === "narration" ? -6 : 16;

  return (
    <motion.div
      className={cn(
        "relative flex h-full w-full flex-col justify-end overflow-hidden",
        isPortrait && "justify-center px-6 pb-28 pt-20",
        isSquare && "justify-center px-8 pb-20",
      )}
      animate={
        reduceMotion
          ? { opacity: phase === "departure" ? 0 : 1 }
          : { scale: cameraScale, y: cameraY, opacity: phase === "departure" ? 0 : 1 }
      }
      transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(70% 60% at 50% 35%, ${hexToRgba(accent, 0.22)} 0%, transparent 70%), #080b12`,
          }}
        />
        {artwork && splash && step.assetKey ? (
          <Image
            src={splash}
            alt=""
            fill
            className="object-cover opacity-35"
            style={{ objectPosition: championArtPosition(step.assetKey) }}
            sizes={isPortrait ? "100vw" : "100vw"}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
        <div className="vignette absolute inset-0" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-3xl px-6 pb-16 sm:px-10",
          isPortrait && "max-w-md text-center",
          isSquare && "max-w-lg text-center",
        )}
      >
        {step.type === "CHARACTER" && step.assetKey ? (
          <div
            className={cn(
              "mb-8 flex justify-start",
              (isPortrait || isSquare) && "justify-center",
            )}
          >
            <EntityPortrait
              assetKey={step.assetKey}
              name={step.title}
              accentColor={accent}
              variant="splash"
              rounded="rounded-[var(--radius-card)]"
              className={cn(
                "aspect-[3/4] w-36 border border-line/60 shadow-2xl sm:w-44",
                isPortrait && "w-40",
              )}
              sizes="176px"
            />
          </div>
        ) : null}

        {step.eyebrow ? (
          <motion.p
            className="text-eyebrow text-gold/90"
            initial={false}
            animate={{ opacity: phase === "travel" ? 0 : 1, y: phase === "travel" ? 12 : 0 }}
            transition={{ duration: 0.45 }}
          >
            {step.eyebrow}
          </motion.p>
        ) : null}

        <motion.h2
          className={cn(
            "text-monument mt-3 text-[clamp(2rem,8vw,4.5rem)] leading-none",
            step.type === "ERA" && "text-gold/80",
          )}
          initial={false}
          animate={{ opacity: phase === "travel" ? 0 : 1, y: phase === "travel" ? 20 : 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          {step.title}
        </motion.h2>

        <div className="mt-6 space-y-3">
          {step.narration.map((line, i) => (
            <motion.p
              key={`${step.id}-line-${i}`}
              className="text-parchment/90 text-base leading-relaxed sm:text-lg"
              initial={false}
              animate={{
                opacity:
                  phase === "narration" && i <= lineIndex
                    ? 1
                    : phase === "departure"
                      ? 0.4
                      : 0,
                y: phase === "narration" && i <= lineIndex ? 0 : 10,
              }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
