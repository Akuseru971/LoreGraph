"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CinematicScene } from "@/types";

export function SceneNarrativeOverlay({
  scene,
  sceneIndex,
  sceneCount,
  visible,
}: {
  scene: CinematicScene;
  sceneIndex: number;
  sceneCount: number;
  visible: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end px-4 pb-24 sm:px-8 sm:pb-28"
      aria-live="polite"
      role="region"
      aria-label={`Scene ${sceneIndex + 1} of ${sceneCount}: ${scene.title}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: "easeOut" }}
        className="max-w-2xl"
      >
        {scene.eyebrow ? (
          <p className="text-eyebrow text-gold/80 mb-2 tracking-[0.2em] uppercase">
            {scene.eyebrow}
          </p>
        ) : null}
        <h2 className="text-monument text-parchment text-[clamp(1.75rem,5vw,3rem)] leading-none">
          {scene.title}
        </h2>
        <p className="text-parchment/85 mt-4 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
          {scene.narrative}
        </p>
        {scene.evidenceClass !== "FACT" ? (
          <p className="text-muted mt-2 text-xs italic">
            {scene.evidenceClass === "EDITORIAL_TRANSITION"
              ? "Editorial transition"
              : "Supported synthesis"}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
