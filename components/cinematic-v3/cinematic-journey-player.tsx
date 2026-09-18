"use client";

import { useReducedMotion } from "framer-motion";
import * as React from "react";
import { track } from "@/lib/analytics";
import { detectCinematicQuality } from "@/lib/cinematic-v3/quality";
import type { CinematicJourney } from "@/types";
import { CinematicSceneCanvas } from "./cinematic-scene-canvas";
import { CinematicDebugPanel } from "./debug-panel";
import { GraphRevealOverlay } from "./graph-reveal-overlay";
import { JourneyControlsV3 } from "./journey-controls-v3";
import { ReducedMotionJourney } from "./reduced-motion-journey";
import { SceneNarrativeOverlay } from "./scene-narrative-overlay";

const SOUND_PREF_KEY = "loregraph.journey.sound";

export function CinematicJourneyPlayer({
  journey,
  onClose,
  onExploreNode,
}: {
  journey: CinematicJourney;
  onClose: () => void;
  onExploreNode?: (entityId: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const quality = React.useMemo(
    () => detectCinematicQuality(Boolean(reduceMotion)),
    [reduceMotion],
  );

  const [sceneIndex, setSceneIndex] = React.useState(0);
  const [transitionProgress, setTransitionProgress] = React.useState(1);
  const [graphRevealProgress, setGraphRevealProgress] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [arrived, setArrived] = React.useState(true);
  const [visitedSceneIndices, setVisitedSceneIndices] = React.useState<number[]>([0]);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  const startedRef = React.useRef(false);
  const hideTimer = React.useRef<number | null>(null);

  const scene = journey.scenes[sceneIndex];
  const isEnding = scene?.type === "ENDING";

  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track({
      name: "journey_started",
      journeyId: journey.id,
      journeyKind: journey.kind,
      sceneCount: journey.scenes.length,
    });
    if (journey.kind === "CONNECTION") {
      track({
        name: "connection_journey_started",
        journeyId: journey.id,
        from: journey.primaryCharacterId?.replace("char:", "") ?? "",
        to: journey.secondaryCharacterId?.replace("char:", "") ?? "",
      });
    }
  }, [journey]);

  React.useEffect(() => {
    const stored = localStorage.getItem(SOUND_PREF_KEY);
    if (stored === "1") setSoundEnabled(true);
  }, []);

  React.useEffect(() => {
    if (sceneIndex === 0) {
      setTransitionProgress(1);
      setArrived(true);
      setVisitedSceneIndices([0]);
      return;
    }
    setTransitionProgress(0);
    setArrived(false);
    const duration = scene?.transitionDurationMs ?? 2600;
    const start = performance.now();

    const frame = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setTransitionProgress(eased);
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setArrived(true);
        setVisitedSceneIndices((prev) =>
          prev.includes(sceneIndex) ? prev : [...prev, sceneIndex],
        );
        track({
          name: "journey_scene_viewed",
          journeyId: journey.id,
          sceneIndex,
          sceneType: scene?.type ?? "EVENT",
        });
      }
    };
    requestAnimationFrame(frame);
  }, [sceneIndex, scene?.transitionDurationMs, scene?.type, journey.id]);

  React.useEffect(() => {
    if (!isEnding || !arrived) return;
    const start = performance.now();
    const duration = 3500;
    const frame = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      setGraphRevealProgress(t);
      if (t < 1) requestAnimationFrame(frame);
      else {
        track({
          name: "journey_completed",
          journeyId: journey.id,
          sceneCount: journey.scenes.length,
        });
      }
    };
    requestAnimationFrame(frame);
  }, [isEnding, arrived, journey.id, journey.scenes.length]);

  const bumpControls = () => {
    setControlsVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setControlsVisible(false), 5000);
  };

  const goNext = React.useCallback(() => {
    if (sceneIndex >= journey.scenes.length - 1) return;
    setSceneIndex((i) => i + 1);
  }, [sceneIndex, journey.scenes.length]);

  const goPrev = React.useCallback(() => {
    if (sceneIndex <= 0) return;
    setSceneIndex((i) => i - 1);
    setGraphRevealProgress(0);
  }, [sceneIndex]);

  const restart = () => {
    setSceneIndex(0);
    setGraphRevealProgress(0);
    setVisitedSceneIndices([0]);
    setArrived(true);
    setTransitionProgress(1);
    track({ name: "journey_replayed", journeyId: journey.id });
  };

  const jumpToScene = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= journey.scenes.length) return;
      setSceneIndex(index);
      setGraphRevealProgress(0);
      setVisitedSceneIndices(
        Array.from({ length: index + 1 }, (_, i) => i),
      );
    },
    [journey.scenes.length],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        track({ name: "journey_exited", journeyId: journey.id, sceneIndex });
        onClose();
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose, journey.id, sceneIndex]);

  React.useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) goNext();
      else goPrev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  const toggleSound = () => {
    setSoundEnabled((s) => {
      const next = !s;
      localStorage.setItem(SOUND_PREF_KEY, next ? "1" : "0");
      if (next) track({ name: "journey_sound_enabled", journeyId: journey.id });
      return next;
    });
  };

  if (!scene) return null;

  const useWebGL = quality !== "low";

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink"
      onPointerMove={bumpControls}
      onClick={bumpControls}
    >
      {useWebGL ? (
        <CinematicSceneCanvas
          journey={journey}
          sceneIndex={sceneIndex}
          transitionProgress={transitionProgress}
          graphRevealProgress={graphRevealProgress}
          quality={quality}
          arrived={arrived}
          visitedSceneIndices={visitedSceneIndices}
        />
      ) : (
        <ReducedMotionJourney journey={journey} sceneIndex={sceneIndex} />
      )}

      <SceneNarrativeOverlay
        scene={scene}
        sceneIndex={sceneIndex}
        sceneCount={journey.scenes.length}
        visible={arrived}
      />

      <GraphRevealOverlay
        journey={journey}
        progress={graphRevealProgress}
        onContinueExploring={() => {
          if (journey.primaryCharacterId) {
            onExploreNode?.(journey.primaryCharacterId);
          }
          onClose();
        }}
      />

      <JourneyControlsV3
        sceneIndex={sceneIndex}
        sceneCount={journey.scenes.length}
        era={scene.eyebrow}
        playing={playing}
        soundEnabled={soundEnabled}
        onPlayPause={() => setPlaying((p) => !p)}
        onPrev={goPrev}
        onNext={goNext}
        onRestart={restart}
        onExit={() => {
          track({ name: "journey_exited", journeyId: journey.id, sceneIndex });
          onClose();
        }}
        onToggleSound={toggleSound}
        canExplore={Boolean(scene.entityId)}
        onExploreNode={
          scene.entityId
            ? () => {
                track({
                  name: "journey_node_explored",
                  journeyId: journey.id,
                  entityId: scene.entityId!,
                });
                onExploreNode?.(scene.entityId!);
              }
            : undefined
        }
        hidden={!controlsVisible && graphRevealProgress < 0.5}
      />

      {process.env.NODE_ENV !== "production" ? (
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
