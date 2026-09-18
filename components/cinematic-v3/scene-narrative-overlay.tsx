"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  compositionForScene,
} from "@/lib/cinematic-v3/composition";
import { storyPanelPlacement } from "@/lib/cinematic-v3/story-panel-layout";
import type { CinematicAspectMode, CinematicScene } from "@/types";
import type { RecordPhaseState } from "@/lib/cinematic-v3/record-mode";

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
  storyPanelMode = false,
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
  storyPanelMode?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const composition = compositionForScene(scene, scene.image);
  const placement = storyPanelPlacement(aspectMode, composition, recordMode);
  const isPortrait = aspectMode === "9:16";

  const phrases = scene.narrativePhrases?.length
    ? scene.narrativePhrases
    : [scene.narrative];

  const phase = recordPhase?.phase ?? (visible ? "hold" : "travel");
  const eyebrowVisible =
    showTitles &&
    (phase === "eyebrow" ||
      phase === "title" ||
      phase === "narrative" ||
      phase === "hold" ||
      (visible && !recordMode));
  const titleVisible =
    showTitles &&
    (phase === "title" ||
      phase === "narrative" ||
      phase === "hold" ||
      (visible && !recordMode));
  const phraseIndex = recordPhase?.narrativePhraseIndex ?? phrases.length - 1;

  const textAlignClass =
    placement.textAlign === "center"
      ? "text-center mx-auto"
      : placement.textAlign === "right"
        ? "text-right ml-auto"
        : "text-left";

  if (!visible && recordMode) return null;

  const panelClass = storyPanelMode
    ? `rounded-sm border border-white/8 bg-black/52 backdrop-blur-[2px] ${placement.panelPadding}`
    : `rounded-lg px-4 py-5 sm:px-6 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 flex flex-col ${placement.positionClass}`}
      style={placement.safePadding}
      aria-live="polite"
      role="region"
      aria-label={`Scene ${sceneIndex + 1} of ${sceneCount}: ${scene.title}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: isPortrait ? 20 : 14 }}
        animate={{
          opacity: visible || recordPhase?.textVisible ? 1 : 0,
          y: 0,
        }}
        transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: "easeOut" }}
        className={`${textAlignClass} ${panelClass}`}
        style={{ maxWidth: placement.maxWidth }}
      >
        {scene.eyebrow && eyebrowVisible ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`${placement.eyebrowSize} text-gold/90 mb-3 font-medium uppercase`}
          >
            {scene.eyebrow}
          </motion.p>
        ) : null}
        {titleVisible ? (
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: recordMode ? 0 : 0.08 }}
            className={`text-monument text-parchment ${placement.titleSize} leading-[0.95] tracking-tight`}
          >
            {scene.title}
          </motion.h2>
        ) : null}
        {showNarrative ? (
          <div className="mt-4 space-y-2.5">
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: recordMode ? i * 0.12 : 0.2 + i * 0.1,
                  }}
                  className={`text-parchment/90 ${placement.bodySize} leading-relaxed`}
                >
                  {phrase}
                </motion.p>
              );
            })}
          </div>
        ) : null}
        {scene.evidenceClass !== "FACT" && showNarrative && !storyPanelMode ? (
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
