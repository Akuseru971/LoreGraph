"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { CinematicJourney } from "@/types";

export function GraphRevealOverlay({
  journey,
  progress,
  onContinueExploring,
}: {
  journey: CinematicJourney;
  progress: number;
  onContinueExploring: () => void;
}) {
  const reduceMotion = useReducedMotion();
  if (progress < 0.85) return null;

  const opacity = Math.min(1, (progress - 0.85) / 0.15);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-ink/40"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: reduceMotion ? 0.2 : 0.8 }}
    >
      <div className="text-center px-6">
        <p className="text-eyebrow text-gold mb-3 tracking-[0.25em] uppercase">
          The larger constellation
        </p>
        <h2 className="text-monument text-parchment text-3xl sm:text-4xl">
          {journey.title}
        </h2>
        <p className="text-parchment/75 mx-auto mt-4 max-w-md text-sm leading-relaxed">
          You followed one thread through Runeterra. Every node you visited belongs to a
          much larger network of verified lore.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onContinueExploring}
            className="rounded-full border border-gold/50 bg-gold/10 px-6 py-3 text-sm text-gold"
          >
            Continue exploring
          </button>
          {journey.primaryCharacterId ? (
            <Link
              href={`/champion/${journey.primaryCharacterId.replace("char:", "")}?tab=connections`}
              className="rounded-full border border-line px-6 py-3 text-sm text-parchment"
            >
              View in graph
            </Link>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
