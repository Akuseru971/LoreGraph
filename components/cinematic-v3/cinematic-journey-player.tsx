"use client";

import { useReducedMotion } from "framer-motion";
import * as React from "react";
import { track } from "@/lib/analytics";
import {
  totalIntroMsForMode,
  totalOutroMsForMode,
} from "@/lib/cinematic-v3/intro-outro";
import { FLAGSHIP_JOURNEY_IDS } from "@/data/cinematic/flagship-assets";
import { preloadSceneImages } from "@/lib/cinematic-v3/scene-image-preload";
import { evaluatePanelTransition } from "@/lib/cinematic-v3/panel-transition";
import { isStoryPanelJourney } from "@/lib/cinematic-v3/story-panel-mode";
import {
  computeRecordPhaseState,
  totalSceneRecordMs,
} from "@/lib/cinematic-v3/record-mode";
import { detectCinematicQuality } from "@/lib/cinematic-v3/quality";
import type {
  CinematicJourney,
  CinematicJourneyPhase,
  CinematicPlayerOptions,
} from "@/types";
import { CinematicFrameShell } from "./cinematic-frame-shell";
import { CinematicSceneCanvas } from "./cinematic-scene-canvas";
import { CinematicDebugPanel } from "./debug-panel";
import { FilmicOverlay } from "./filmic-overlay";
import { GraphRevealOverlay } from "./graph-reveal-overlay";
import { JourneyControlsV3 } from "./journey-controls-v3";
import { RecordModeControls } from "./record-mode-controls";
import { ReducedMotionJourney } from "./reduced-motion-journey";
import { SceneNarrativeOverlay } from "./scene-narrative-overlay";
import { SceneBackgroundLayer } from "./scene-background-layer";
import { SignatureIntroSequence } from "./signature-intro-sequence";
import { SignatureOutroSequence } from "./signature-outro-sequence";

const SOUND_PREF_KEY = "loregraph.journey.sound";
const RECORD_LEAD_IN_MS = 400;

export function CinematicJourneyPlayer({
  journey,
  onClose,
  onExploreNode,
  playerOptions = {},
}: {
  journey: CinematicJourney;
  onClose: () => void;
  onExploreNode?: (entityId: string) => void;
  playerOptions?: CinematicPlayerOptions;
}) {
  const reduceMotion = useReducedMotion();
  const aspectMode = playerOptions.aspectMode ?? "AUTO";
  const recordMode = playerOptions.recordMode ?? false;
  const showText = playerOptions.showText ?? true;
  const showImages = playerOptions.showImages ?? true;
  const environmentOnly = playerOptions.environmentOnly ?? false;
  const directorPreview = playerOptions.directorPreview ?? "full";
  const directorSceneIndex = playerOptions.directorSceneIndex ?? 0;
  const backgroundOnly =
    playerOptions.backgroundOnly ?? directorPreview === "background-only";
  const showBackgroundDiagnostics = playerOptions.showBackgroundDiagnostics ?? false;
  const showWatermark = playerOptions.showWatermark ?? false;
  const deterministic = playerOptions.deterministic ?? recordMode;
  const isFlagship = FLAGSHIP_JOURNEY_IDS.includes(
    journey.id as (typeof FLAGSHIP_JOURNEY_IDS)[number],
  );
  const use2DBackgrounds = isFlagship && showImages && !environmentOnly;
  const useStoryPanels = isStoryPanelJourney(journey);
  const hasIntro =
    !useStoryPanels &&
    Boolean(journey.introSequence) &&
    directorPreview !== "scene" &&
    directorPreview !== "outro" &&
    directorPreview !== "inter-chapter" &&
    directorPreview !== "arrival" &&
    directorPreview !== "departure" &&
    directorPreview !== "motion-loop" &&
    directorPreview !== "background-only" &&
    directorPreview !== "text-layout" &&
    directorPreview !== "full-aatrox" &&
    directorPreview !== "full-yasuo";
  const hasOutro =
    !useStoryPanels &&
    Boolean(journey.outroSequence) &&
    directorPreview !== "intro" &&
    directorPreview !== "scene" &&
    directorPreview !== "inter-chapter" &&
    directorPreview !== "arrival" &&
    directorPreview !== "departure" &&
    directorPreview !== "motion-loop" &&
    directorPreview !== "background-only" &&
    directorPreview !== "text-layout" &&
    directorPreview !== "full-aatrox" &&
    directorPreview !== "full-yasuo";

  const quality = React.useMemo(() => {
    if (recordMode) return "high" as const;
    return detectCinematicQuality(Boolean(reduceMotion));
  }, [reduceMotion, recordMode]);

  const initialPhase: CinematicJourneyPhase =
    directorPreview === "outro"
      ? "outro"
      : directorPreview === "scene" ||
          directorPreview === "transition" ||
          directorPreview === "inter-chapter" ||
          directorPreview === "arrival" ||
          directorPreview === "departure" ||
          directorPreview === "motion-loop" ||
          directorPreview === "background-only" ||
          directorPreview === "text-layout" ||
          directorPreview === "full-aatrox" ||
          directorPreview === "full-yasuo"
        ? "playing"
        : hasIntro
          ? "intro"
          : "playing";
  const [journeyPhase, setJourneyPhase] = React.useState<CinematicJourneyPhase>(initialPhase);
  const [introElapsedMs, setIntroElapsedMs] = React.useState(0);
  const [outroElapsedMs, setOutroElapsedMs] = React.useState(0);
  const [outroStarted, setOutroStarted] = React.useState(directorPreview === "outro");
  const [sceneIndex, setSceneIndex] = React.useState(
    directorPreview === "scene" ||
      directorPreview === "transition" ||
      directorPreview === "inter-chapter" ||
      directorPreview === "arrival" ||
      directorPreview === "departure" ||
      directorPreview === "motion-loop" ||
      directorPreview === "background-only"
      ? directorSceneIndex || (directorPreview === "motion-loop" ? 2 : directorSceneIndex)
      : directorPreview === "outro"
        ? journey.scenes.length - 1
        : 0,
  );
  const previewTravelProgress =
    directorPreview === "inter-chapter"
      ? 0.42
      : directorPreview === "arrival"
        ? 0.92
        : directorPreview === "departure"
          ? 0.08
          : directorPreview === "transition"
            ? 0.45
            : 1;
  const [transitionProgress, setTransitionProgress] = React.useState(previewTravelProgress);
  const [graphRevealProgress, setGraphRevealProgress] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [arrived, setArrived] = React.useState(
    directorPreview === "transition" ||
      directorPreview === "inter-chapter" ||
      directorPreview === "arrival" ||
      directorPreview === "departure" ||
      directorPreview === "motion-loop"
      ? false
      : !hasIntro,
  );
  const [visitedSceneIndices, setVisitedSceneIndices] = React.useState<number[]>(
    directorPreview === "outro"
      ? journey.scenes.map((_, i) => i)
      : directorPreview === "scene" || directorPreview === "transition"
        ? Array.from({ length: directorSceneIndex + 1 }, (_, i) => i)
        : hasIntro
          ? []
          : [0],
  );
  const [controlsVisible, setControlsVisible] = React.useState(!recordMode);
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const [recordActive, setRecordActive] = React.useState(false);
  const [recordPaused, setRecordPaused] = React.useState(false);
  const [recordTitles, setRecordTitles] = React.useState(showText);
  const [recordNarrative, setRecordNarrative] = React.useState(showText);
  const [recordWatermark, setRecordWatermark] = React.useState(showWatermark);
  const [sceneElapsedMs, setSceneElapsedMs] = React.useState(0);
  const [arrivalPulse, setArrivalPulse] = React.useState(0);
  const [handoffProgress, setHandoffProgress] = React.useState(0);
  const [recordLeadInDone, setRecordLeadInDone] = React.useState(!recordMode);
  const startedRef = React.useRef(false);
  const hideTimer = React.useRef<number | null>(null);
  const recordRaf = React.useRef<number | null>(null);
  const recordStart = React.useRef<number>(0);
  const introRaf = React.useRef<number | null>(null);
  const introStart = React.useRef<number>(0);
  const outroRaf = React.useRef<number | null>(null);
  const outroStart = React.useRef<number>(0);

  const scene = journey.scenes[sceneIndex];
  const isEnding = scene?.type === "ENDING";
  const introTotalMs = journey.introSequence
    ? totalIntroMsForMode(journey.introSequence, recordActive)
    : 0;
  const outroTotalMs = journey.outroSequence
    ? totalOutroMsForMode(journey.outroSequence, recordActive)
    : 0;
  const recordPhase = React.useMemo(() => {
    if (!recordActive || !scene || journeyPhase !== "playing") return undefined;
    return computeRecordPhaseState(scene, sceneElapsedMs, { journey });
  }, [recordActive, scene, sceneElapsedMs, journeyPhase, journey]);

  const panelTransition = React.useMemo(() => {
    if (!useStoryPanels) return undefined;
    const hold = recordPhase?.holdProgress ?? (arrived ? 0.5 : 0);
    const travelT = recordPhase?.transitionProgress ?? transitionProgress;
    return evaluatePanelTransition(travelT, hold, sceneIndex);
  }, [useStoryPanels, recordPhase, transitionProgress, arrived, sceneIndex]);

  const departureProgress =
    recordPhase?.phase === "departure" ? recordPhase.phaseProgress : 0;

  const finishIntro = React.useCallback(() => {
    if (directorPreview === "intro") return;
    setJourneyPhase("playing");
    setSceneIndex(0);
    setTransitionProgress(0.15);
    setArrived(false);
    setVisitedSceneIndices([0]);
    setSceneElapsedMs(0);
    setArrivalPulse(0.4);
    setHandoffProgress(1);
    const handoffStart = performance.now();
    const handoffDuration = 700;
    const travelDuration = journey.scenes[0]?.transitionDurationMs ?? 2400;
    const travelStart = performance.now();
    const handoffFrame = () => {
      const ht = Math.min(1, (performance.now() - handoffStart) / handoffDuration);
      setHandoffProgress(1 - ht);
      if (ht < 1) requestAnimationFrame(handoffFrame);
    };
    requestAnimationFrame(handoffFrame);
    const travelFrame = () => {
      const t = Math.min(1, (performance.now() - travelStart) / travelDuration);
      setTransitionProgress(0.15 + (1 - Math.pow(1 - t, 3)) * 0.85);
      if (t < 1) requestAnimationFrame(travelFrame);
      else {
        setArrived(true);
        setArrivalPulse(0.65);
        setHandoffProgress(0);
      }
    };
    requestAnimationFrame(travelFrame);
  }, [journey.scenes, directorPreview]);

  const skipIntro = React.useCallback(() => {
    if (journeyPhase !== "intro" || recordActive) return;
    finishIntro();
  }, [journeyPhase, recordActive, finishIntro]);

  const startOutro = React.useCallback(() => {
    if (!hasOutro || outroStarted) return;
    setOutroStarted(true);
    setJourneyPhase("outro");
    setOutroElapsedMs(0);
    outroStart.current = performance.now();
  }, [hasOutro, outroStarted]);

  const prevScene = sceneIndex > 0 ? journey.scenes[sceneIndex - 1] : undefined;
  const nextScene =
    sceneIndex < journey.scenes.length - 1 ? journey.scenes[sceneIndex + 1] : undefined;
  const traveling = !arrived && sceneIndex > 0 && journeyPhase === "playing";

  React.useEffect(() => {
    if (use2DBackgrounds) preloadSceneImages(journey.scenes);
  }, [journey.scenes, use2DBackgrounds]);

  React.useEffect(() => {
    if (directorPreview !== "background-only" || journeyPhase !== "playing") return;
    setArrived(true);
    setTransitionProgress(1);
    const cycleMs = 4000;
    let idx = 0;
    const tick = () => {
      idx = (idx + 1) % journey.scenes.length;
      setSceneIndex(idx);
      setArrived(true);
      setTransitionProgress(1);
    };
    const interval = window.setInterval(tick, cycleMs);
    return () => window.clearInterval(interval);
  }, [directorPreview, journeyPhase, journey.scenes.length]);

  React.useEffect(() => {
    if (
      (directorPreview !== "motion-loop" && directorPreview !== "transition-loop") ||
      journeyPhase !== "playing"
    )
      return;
    const loopScene = Math.max(1, directorSceneIndex || 2);
    setSceneIndex(loopScene);
    setArrived(false);
    let start = performance.now();
    const duration = useStoryPanels ? 5500 : 2800;
    let raf = 0;
    const tick = () => {
      const t = ((performance.now() - start) % duration) / duration;
      setTransitionProgress(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [directorPreview, journeyPhase, directorSceneIndex, useStoryPanels]);

  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track({
      name: "journey_started",
      journeyId: journey.id,
      journeyKind: journey.kind,
      sceneCount: journey.scenes.length,
    });
  }, [journey]);

  React.useEffect(() => {
    const stored = localStorage.getItem(SOUND_PREF_KEY);
    if (stored === "1") setSoundEnabled(true);
  }, []);

  React.useEffect(() => {
    if (!recordMode) {
      setRecordLeadInDone(true);
      return;
    }
    const t = window.setTimeout(() => setRecordLeadInDone(true), RECORD_LEAD_IN_MS);
    return () => window.clearTimeout(t);
  }, [recordMode]);

  React.useEffect(() => {
    if (journeyPhase !== "intro" || !recordLeadInDone) return;
    introStart.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - introStart.current;
      setIntroElapsedMs(elapsed);
      if (elapsed >= introTotalMs) {
        finishIntro();
        return;
      }
      introRaf.current = requestAnimationFrame(tick);
    };
    introRaf.current = requestAnimationFrame(tick);
    return () => {
      if (introRaf.current) cancelAnimationFrame(introRaf.current);
    };
  }, [journeyPhase, introTotalMs, finishIntro, recordLeadInDone]);

  React.useEffect(() => {
    if (journeyPhase !== "outro") return;
    outroStart.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - outroStart.current;
      setOutroElapsedMs(elapsed);
      if (elapsed >= outroTotalMs) return;
      outroRaf.current = requestAnimationFrame(tick);
    };
    outroRaf.current = requestAnimationFrame(tick);
    return () => {
      if (outroRaf.current) cancelAnimationFrame(outroRaf.current);
    };
  }, [journeyPhase, outroTotalMs]);

  React.useEffect(() => {
    if (recordActive || journeyPhase !== "playing" || backgroundOnly) return;
    if (sceneIndex === 0 && hasIntro) {
      setTransitionProgress(1);
      setArrived(true);
      setVisitedSceneIndices([0]);
      return;
    }
    if (sceneIndex === 0) {
      setTransitionProgress(1);
      setArrived(true);
      setVisitedSceneIndices([0]);
      return;
    }
    setTransitionProgress(0);
    setArrived(false);
    const duration = useStoryPanels
      ? 850
      : (scene?.transitionDurationMs ?? 2000);
    const start = performance.now();
    const frame = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      setTransitionProgress(t);
      if (t < 1) requestAnimationFrame(frame);
      else {
        setArrived(true);
        setVisitedSceneIndices((prev) =>
          prev.includes(sceneIndex) ? prev : [...prev, sceneIndex],
        );
      }
    };
    requestAnimationFrame(frame);
  }, [sceneIndex, scene?.transitionDurationMs, recordActive, journeyPhase, hasIntro, useStoryPanels, backgroundOnly]);

  React.useEffect(() => {
    if (recordMode && !recordActive) setRecordActive(true);
  }, [recordMode, recordActive]);

  React.useEffect(() => {
    if (recordActive && journeyPhase === "playing") setSceneElapsedMs(0);
  }, [sceneIndex, recordActive, journeyPhase]);

  React.useEffect(() => {
    if (!recordActive || recordPaused || !scene || journeyPhase !== "playing") return;
    recordStart.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - recordStart.current;
      setSceneElapsedMs(elapsed);
      const phase = computeRecordPhaseState(scene, elapsed);
      setTransitionProgress(phase.transitionProgress);
      setArrived(phase.arrived);
      if (phase.phase === "arrival" && phase.phaseProgress > 0.85) {
        setArrivalPulse(Math.min(1, phase.phaseProgress));
      } else if (phase.phase === "departure") {
        setArrivalPulse(0);
      }
      if (elapsed >= totalSceneRecordMs(scene)) {
        if (sceneIndex < journey.scenes.length - 1) {
          setSceneIndex((i) => i + 1);
          setArrivalPulse(0);
          setVisitedSceneIndices((prev) =>
            prev.includes(sceneIndex + 1) ? prev : [...prev, sceneIndex + 1],
          );
        } else if (hasOutro && !outroStarted) {
          startOutro();
        }
        return;
      }
      recordRaf.current = requestAnimationFrame(tick);
    };
    recordRaf.current = requestAnimationFrame(tick);
    return () => {
      if (recordRaf.current) cancelAnimationFrame(recordRaf.current);
    };
  }, [
    recordActive,
    recordPaused,
    scene,
    sceneIndex,
    journey.scenes.length,
    journeyPhase,
    hasOutro,
    outroStarted,
    startOutro,
  ]);

  React.useEffect(() => {
    if (!isEnding || !arrived || journeyPhase !== "playing") return;
    const start = performance.now();
    const duration = recordActive ? 5500 : 3500;
    const frame = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      setGraphRevealProgress(t);
      if (t >= 0.55 && hasOutro && !outroStarted && !recordActive) {
        startOutro();
      }
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [isEnding, arrived, recordActive, journeyPhase, hasOutro, outroStarted, startOutro]);

  const bumpControls = () => {
    if (recordActive || journeyPhase === "intro") return;
    setControlsVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setControlsVisible(false), 5000);
  };

  const goNext = React.useCallback(() => {
    if (recordActive || journeyPhase !== "playing") return;
    if (sceneIndex >= journey.scenes.length - 1) return;
    setSceneIndex((i) => i + 1);
  }, [sceneIndex, journey.scenes.length, recordActive, journeyPhase]);

  const goPrev = React.useCallback(() => {
    if (recordActive || journeyPhase !== "playing" || sceneIndex <= 0) return;
    setSceneIndex((i) => i - 1);
    setGraphRevealProgress(0);
    setOutroStarted(false);
    setJourneyPhase("playing");
    setOutroElapsedMs(0);
  }, [sceneIndex, recordActive, journeyPhase]);

  const restart = () => {
    setJourneyPhase(hasIntro ? "intro" : "playing");
    setIntroElapsedMs(0);
    setOutroElapsedMs(0);
    setOutroStarted(false);
    setSceneIndex(0);
    setGraphRevealProgress(0);
    setVisitedSceneIndices(hasIntro ? [] : [0]);
    setArrived(!hasIntro);
    setTransitionProgress(hasIntro ? 0 : 1);
    setSceneElapsedMs(0);
    setArrivalPulse(0);
    setHandoffProgress(0);
    setRecordLeadInDone(!recordMode);
  };

  const jumpToScene = React.useCallback(
    (index: number) => {
      if (recordActive || journeyPhase !== "playing") return;
      if (index < 0 || index >= journey.scenes.length) return;
      setSceneIndex(index);
      setGraphRevealProgress(0);
      setOutroStarted(false);
      setOutroElapsedMs(0);
      setVisitedSceneIndices(Array.from({ length: index + 1 }, (_, i) => i));
    },
    [journey.scenes.length, recordActive, journeyPhase],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (journeyPhase === "intro") {
        if (e.key === " " || e.key === "ArrowRight") {
          e.preventDefault();
          skipIntro();
        }
        return;
      }
      if (recordActive || journeyPhase !== "playing") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose, recordActive, journeyPhase, skipIntro]);

  React.useEffect(() => {
    if (recordActive || journeyPhase !== "playing") return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) goNext();
      else goPrev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev, recordActive, journeyPhase]);

  if (!scene && journeyPhase === "playing") return null;

  const useWebGL = quality !== "low" && !(useStoryPanels && use2DBackgrounds);
  const narrativeVisible =
    journeyPhase === "playing" &&
    !backgroundOnly &&
    (directorPreview === "text-layout" ||
      (recordActive ? Boolean(recordPhase?.textVisible) : arrived));
  const effectiveAspect = recordActive ? "16:9" : aspectMode;
  const showCanvas = journeyPhase === "playing" || journeyPhase === "outro";
  const outroComplete = outroElapsedMs >= outroTotalMs;
  const canvasOpacity =
    journeyPhase === "outro"
      ? Math.max(0.15, 1 - outroElapsedMs / (outroTotalMs * 0.6))
      : handoffProgress > 0
        ? 0.2 + (1 - handoffProgress) * 0.8
        : journeyPhase === "intro"
          ? 0
          : 1;
  const showRecordLeadIn = recordActive && !recordLeadInDone;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black"
      onPointerMove={bumpControls}
      onClick={bumpControls}
    >
      <CinematicFrameShell aspectMode={effectiveAspect} className="h-full w-full">
        {showCanvas && scene ? (
          <>
            {use2DBackgrounds ? (
              <SceneBackgroundLayer
                scene={scene}
                prevScene={prevScene}
                nextScene={nextScene}
                panelTransition={panelTransition}
                travelProgress={transitionProgress}
                holdProgress={recordPhase?.holdProgress ?? (arrived ? 0.55 : 0)}
                departureProgress={departureProgress}
                sceneIndex={sceneIndex}
                arrived={arrived}
                traveling={traveling}
                showImages={showImages}
                showDiagnostics={showBackgroundDiagnostics}
                aspectMode={effectiveAspect}
                storyPanelMode={useStoryPanels}
              />
            ) : null}
          <div className="absolute inset-0" style={{ opacity: canvasOpacity }}>
            {useWebGL ? (
              <CinematicSceneCanvas
                journey={journey}
                sceneIndex={sceneIndex}
                transitionProgress={transitionProgress}
                graphRevealProgress={graphRevealProgress}
                quality={quality}
                arrived={arrived}
                visitedSceneIndices={visitedSceneIndices}
                showImages={showImages && !environmentOnly}
                environmentOnly={environmentOnly}
                arrivalPulse={arrivalPulse}
                use2DBackgrounds={use2DBackgrounds}
                hubMotion={undefined}
                backgroundOnly={backgroundOnly}
              />
            ) : (
              <ReducedMotionJourney journey={journey} sceneIndex={sceneIndex} />
            )}
          </div>
          </>
        ) : null}

        {showRecordLeadIn ? (
          <div className="absolute inset-0 z-[70] bg-black" aria-hidden />
        ) : null}

        {journeyPhase === "intro" && journey.introSequence && recordLeadInDone && !useStoryPanels ? (
          <SignatureIntroSequence
            intro={journey.introSequence}
            elapsedMs={introElapsedMs}
            recordMode={recordActive}
            onComplete={finishIntro}
          />
        ) : null}

        {journeyPhase === "outro" && journey.outroSequence && !useStoryPanels ? (
          <SignatureOutroSequence
            outro={journey.outroSequence}
            elapsedMs={outroElapsedMs}
            pathPoints={journey.scenes.map((s) => s.coordinates)}
            visitedIndices={visitedSceneIndices}
            scenes={journey.scenes}
            recordMode={recordActive}
          />
        ) : null}

        <FilmicOverlay enabled={recordActive || aspectMode === "16:9"} />
        {recordWatermark && recordActive ? (
          <div className="pointer-events-none absolute bottom-[12%] right-[6%] z-40 text-parchment/30 text-xs tracking-widest uppercase">
            LoreGraph
          </div>
        ) : null}
        {journeyPhase === "playing" && scene ? (
          <SceneNarrativeOverlay
            scene={scene}
            sceneIndex={sceneIndex}
            sceneCount={journey.scenes.length}
            visible={narrativeVisible}
            recordPhase={recordPhase}
            aspectMode={effectiveAspect}
            showTitles={recordActive ? recordTitles : showText}
            showNarrative={recordActive ? recordNarrative : showText}
            recordMode={recordActive}
            storyPanelMode={useStoryPanels}
          />
        ) : null}
        {!recordActive && journeyPhase === "playing" && !useStoryPanels ? (
          <GraphRevealOverlay
            journey={journey}
            progress={outroStarted && outroComplete ? 1 : graphRevealProgress}
            onContinueExploring={() => {
              if (journey.primaryCharacterId) onExploreNode?.(journey.primaryCharacterId);
              onClose();
            }}
          />
        ) : null}
      </CinematicFrameShell>

      {!recordActive && journeyPhase === "playing" ? (
        <JourneyControlsV3
          sceneIndex={sceneIndex}
          sceneCount={journey.scenes.length}
          era={scene?.eyebrow}
          playing={playing}
          soundEnabled={soundEnabled}
          onPlayPause={() => setPlaying((p) => !p)}
          onPrev={goPrev}
          onNext={goNext}
          onRestart={restart}
          onExit={onClose}
          onToggleSound={() => setSoundEnabled((s) => !s)}
          canExplore={Boolean(scene?.entityId)}
          onExploreNode={
            scene?.entityId ? () => onExploreNode?.(scene.entityId!) : undefined
          }
          hidden={!controlsVisible && graphRevealProgress < 0.5 && !outroComplete}
        />
      ) : null}

      {!recordMode ? (
      <RecordModeControls
        active={recordActive}
        paused={recordPaused}
        onStart={() => {
          setRecordActive(true);
          setSceneElapsedMs(0);
          restart();
        }}
        onRestart={restart}
        onPause={() => setRecordPaused((p) => !p)}
        onExit={() => {
          setRecordActive(false);
          onClose();
        }}
        showTitles={recordTitles}
        showNarrative={recordNarrative}
        showWatermark={recordWatermark}
        onToggleTitles={() => setRecordTitles((t) => !t)}
        onToggleNarrative={() => setRecordNarrative((n) => !n)}
        onToggleWatermark={() => setRecordWatermark((w) => !w)}
      />
      ) : null}

      {process.env.NODE_ENV !== "production" && !recordActive && !recordMode ? (
        <CinematicDebugPanel
          journey={journey}
          sceneIndex={sceneIndex}
          transitionProgress={transitionProgress}
          arrived={arrived}
          onJumpToScene={jumpToScene}
        />
      ) : null}
    </div>
  );
}
