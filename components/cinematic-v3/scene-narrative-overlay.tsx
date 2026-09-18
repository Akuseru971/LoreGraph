"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CAPTION_SAFE_BOTTOM, CINEMATIC_SAFE_AREA } from "@/lib/cinematic-v3/cinematic-frame";
import {
  compositionForScene,
  narrativePlacementForComposition,
} from "@/lib/cinematic-v3/composition";
import type { CinematicAspectMode, CinematicScene } from "@/types";
import type { RecordPhaseState } from "@/lib/cinematic-v3/record-mode";

const POSITION_CLASS: Record<
  ReturnType<typeof narrativePlacementForComposition>["position"],
  string
> = {
  left: "items-start justify-end",
  right: "items-end justify-end",
  "bottom-center": "items-center justify-end",
  "center-left": "items-start justify-center",
  "center-right": "items-end justify-center",
};

const GRADIENT_CLASS: Record<
  ReturnType<typeof narrativePlacementForComposition>["gradientSide"],
  string
> = {
  left: "bg-gradient-to-r from-ink/55 via-ink/20 to-transparent",
  right: "bg-gradient-to-l from-ink/55 via-ink/20 to-transparent",
  bottom: "bg-gradient-to-t from-ink/60 via-ink/15 to-transparent",
  none: "",
};

export function SceneNarrativeOverlay({
  scene,
  sceneIndex,
  sceneCount,
  visible,
  recordPhase,
  aspectMode = "AUTO",
  showTitles = true,
  showNarrative = true,
  recordMode = false,
}: {
  scene: CinematicScene;
  sceneIndex: number;
  sceneCount: number;
  visible: boolean;
  recordPhase?: RecordPhaseState;
  aspectMode?: CinematicAspectMode;
  showTitles?: boolean;
  showNarrative?: boolean;
  recordMode?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const composition = compositionForScene(scene, scene.image);
  const placement = narrativePlacementForComposition(composition);
  const is169 = aspectMode === "16:9" || recordMode;

  const phrases = scene.narrativePhrases?.length
    ? scene.narrativePhrases
    : [scene.narrative];

  const phase = recordPhase?.phase ?? (visible ? "hold" : "travel");
  const eyebrowVisible =
    showTitles && (phase === "eyebrow" || phase === "title" || phase === "narrative" || phase === "hold" || (visible && !recordMode));
  const titleVisible =
    showTitles && (phase === "title" || phase === "narrative" || phase === "hold" || (visible && !recordMode));
  const phraseIndex = recordPhase?.narrativePhraseIndex ?? phrases.length - 1;

  const textAlign =
    placement.align === "center"
      ? "text-center mx-auto"
      : placement.align === "end"
        ? "text-right ml-auto"
        : "text-left";

  const padStyle = is169
    ? {
        paddingLeft: `${CINEMATIC_SAFE_AREA.left * 100}%`,
        paddingRight: `${CINEMATIC_SAFE_AREA.right * 100}%`,
        paddingTop: `${CINEMATIC_SAFE_AREA.top * 100}%`,
        paddingBottom: `${(CINEMATIC_SAFE_AREA.bottom + CAPTION_SAFE_BOTTOM) * 100}%`,
      }
    : undefined;

  const eyebrowSize = is169 ? "text-[clamp(1.1rem,1.4vw,1.75rem)]" : "text-eyebrow";
  const titleSize = is169
    ? "text-[clamp(2.5rem,4.2vw,5rem)]"
    : "text-[clamp(1.75rem,5vw,3rem)]";
  const bodySize = is169
    ? "text-[clamp(1.25rem,1.8vw,2.25rem)]"
    : "text-[0.9375rem] sm:text-base";

  if (!visible && recordMode) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 flex flex-col ${POSITION_CLASS[placement.position]}`}
      style={padStyle}
      aria-live="polite"
      role="region"
      aria-label={`Scene ${sceneIndex + 1} of ${sceneCount}: ${scene.title}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: visible || recordPhase?.textVisible ? 1 : 0, y: 0 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: "easeOut" }}
        className={`${textAlign} rounded-lg px-4 py-5 sm:px-6 ${GRADIENT_CLASS[placement.gradientSide]}`}
        style={{ maxWidth: placement.maxWidth }}
      >
        {scene.eyebrow && eyebrowVisible ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: recordMode ? 0 : 0.1 }}
            className={`${eyebrowSize} text-gold/85 mb-2 tracking-[0.2em] uppercase`}
          >
            {scene.eyebrow}
          </motion.p>
        ) : null}
        {titleVisible ? (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: recordMode ? 0.05 : 0.2 }}
            className={`text-monument text-parchment ${titleSize} leading-none`}
          >
            {scene.title}
          </motion.h2>
        ) : null}
        {showNarrative ? (
          <div className="mt-4 space-y-3">
            {phrases.map((phrase, i) => {
              const show =
                !recordMode ||
                phase === "hold" ||
                (phase === "narrative" && i <= phraseIndex) ||
                (visible && !recordMode);
              if (!show) return null;
              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: recordMode ? i * 0.15 : 0.35 + i * 0.12 }}
                  className={`text-parchment/88 ${bodySize} leading-relaxed`}
                >
                  {phrase}
                </motion.p>
              );
            })}
          </div>
        ) : null}
        {scene.evidenceClass !== "FACT" && showNarrative ? (
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
