"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  compositionForScene,
  narrativePlacementForComposition,
} from "@/lib/cinematic-v3/composition";
import type { CinematicScene } from "@/types";

const POSITION_CLASS: Record<
  ReturnType<typeof narrativePlacementForComposition>["position"],
  string
> = {
  left: "items-start justify-end pl-4 sm:pl-8 pb-24 sm:pb-28",
  right: "items-end justify-end pr-4 sm:pr-8 pb-24 sm:pb-28",
  "bottom-center": "items-center justify-end px-4 pb-24 sm:pb-28",
  "center-left": "items-start justify-center pl-4 sm:pl-10",
  "center-right": "items-end justify-center pr-4 sm:pr-10",
};

const GRADIENT_CLASS: Record<
  ReturnType<typeof narrativePlacementForComposition>["gradientSide"],
  string
> = {
  left: "bg-gradient-to-r from-ink/50 via-ink/20 to-transparent",
  right: "bg-gradient-to-l from-ink/50 via-ink/20 to-transparent",
  bottom: "bg-gradient-to-t from-ink/55 via-ink/15 to-transparent",
  none: "",
};

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
  const composition = compositionForScene(scene, scene.image);
  const placement = narrativePlacementForComposition(composition);

  const textAlign =
    placement.align === "center"
      ? "text-center mx-auto"
      : placement.align === "end"
        ? "text-right ml-auto"
        : "text-left";

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 flex flex-col ${POSITION_CLASS[placement.position]}`}
      aria-live="polite"
      role="region"
      aria-label={`Scene ${sceneIndex + 1} of ${sceneCount}: ${scene.title}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: "easeOut" }}
        className={`max-w-[${placement.maxWidth}] ${textAlign} rounded-lg px-4 py-5 sm:px-6 ${GRADIENT_CLASS[placement.gradientSide]}`}
        style={{ maxWidth: placement.maxWidth }}
      >
        {scene.eyebrow ? (
          <p className="text-eyebrow text-gold/80 mb-2 tracking-[0.2em] uppercase">
            {scene.eyebrow}
          </p>
        ) : null}
        <h2 className="text-monument text-parchment text-[clamp(1.75rem,5vw,3rem)] leading-none">
          {scene.title}
        </h2>
        <p className="text-parchment/85 mt-4 text-[0.9375rem] leading-relaxed sm:text-base">
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
