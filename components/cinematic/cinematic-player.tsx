"use client";

import * as React from "react";
import { Dialog, DialogTitle, FullscreenContent } from "@/components/ui/dialog";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Journey, JourneyFormat, JourneyPlaybackMode } from "@/types";
import { CinematicScene, type ScenePhase } from "./cinematic-scene";
import { GoldenTrail } from "./golden-trail";
import { JourneyControls } from "./journey-controls";
import { RecordingFrame } from "./recording-frame";

const PHASE_TIMING: Record<ScenePhase, number> = {
  travel: 0.18,
  arrival: 0.12,
  narration: 0.55,
  departure: 0.15,
};

function phaseAt(progress: number): ScenePhase {
  let acc = 0;
  for (const [phase, weight] of Object.entries(PHASE_TIMING) as [ScenePhase, number][]) {
    acc += weight;
    if (progress <= acc) return phase;
  }
  return "departure";
}

export function CinematicPlayer({
  journey,
  open,
  onClose,
  initialFormat = "landscape",
  initialRecording = false,
}: {
  journey: Journey | null;
  open: boolean;
  onClose: () => void;
  initialFormat?: JourneyFormat;
  initialRecording?: boolean;
}) {
  if (!journey) return null;
  return (
    <CinematicPlayerInner
      key={journey.id}
      journey={journey}
      open={open}
      onClose={onClose}
      initialFormat={initialFormat}
      initialRecording={initialRecording}
    />
  );
}

function CinematicPlayerInner({
  journey,
  open,
  onClose,
  initialFormat,
  initialRecording,
}: {
  journey: Journey;
  open: boolean;
  onClose: () => void;
  initialFormat: JourneyFormat;
  initialRecording: boolean;
}) {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [stepProgress, setStepProgress] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [mode, setMode] = React.useState<JourneyPlaybackMode>("auto");
  const [format, setFormat] = React.useState<JourneyFormat>(initialFormat);
  const [recording, setRecording] = React.useState(initialRecording);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const startedRef = React.useRef(false);
  const hideTimer = React.useRef<number | null>(null);

  const step = journey.steps[stepIndex];
  const phase = phaseAt(stepProgress);
  const lineIndex =
    phase === "narration"
      ? Math.max(
          0,
          Math.min(
            step.narration.length - 1,
            Math.floor(
              ((stepProgress - PHASE_TIMING.travel - PHASE_TIMING.arrival) /
                PHASE_TIMING.narration) *
                step.narration.length,
            ),
          ),
        )
      : 0;
  const totalProgress =
    (stepIndex + stepProgress) / Math.max(1, journey.steps.length - 1);

  React.useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;
    track({
      name: "cinematic_start",
      journeyType: journey.type,
      sourceChampion: journey.sourceChampionId?.replace("char:", "") ?? "",
      targetChampion: journey.targetChampionId?.replace("char:", "") ?? "",
      sceneCount: journey.steps.length,
      completionPercent: 0,
    });
  }, [open, journey]);

  React.useEffect(() => {
    if (!open || !playing || mode !== "auto") return;
    const tick = 50;
    const timer = window.setInterval(() => {
      setStepProgress((p) => {
        const duration = step.duration;
        const next = p + tick / duration;
        if (next >= 1) return 1;
        return next;
      });
    }, tick);
    return () => window.clearInterval(timer);
  }, [open, playing, mode, step.duration]);

  React.useEffect(() => {
    if (stepProgress < 1 || mode !== "auto" || !playing) return;
    const t = window.setTimeout(() => {
      if (stepIndex >= journey.steps.length - 1) {
        track({
          name: "cinematic_complete",
          journeyType: journey.type,
          sourceChampion: journey.sourceChampionId?.replace("char:", "") ?? "",
          targetChampion: journey.targetChampionId?.replace("char:", "") ?? "",
          sceneCount: journey.steps.length,
          completionPercent: 100,
        });
        setPlaying(false);
        return;
      }
      setStepIndex((i) => i + 1);
      setStepProgress(0);
      track({
        name: "cinematic_scene_view",
        journeyType: journey.type,
        sourceChampion: journey.sourceChampionId?.replace("char:", "") ?? "",
        targetChampion: journey.targetChampionId?.replace("char:", "") ?? "",
        sceneCount: journey.steps.length,
        completionPercent: Math.round(((stepIndex + 1) / journey.steps.length) * 100),
      });
    }, 120);
    return () => window.clearTimeout(t);
  }, [stepProgress, stepIndex, journey, mode, playing]);

  const bumpControls = () => {
    setControlsVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    if (!recording) {
      hideTimer.current = window.setTimeout(() => setControlsVisible(false), 4000);
    }
  };

  const restart = () => {
    setStepIndex(0);
    setStepProgress(0);
    setPlaying(true);
    track({
      name: "cinematic_replay",
      journeyType: journey.type,
      sourceChampion: journey.sourceChampionId?.replace("char:", "") ?? "",
      targetChampion: journey.targetChampionId?.replace("char:", "") ?? "",
      sceneCount: journey.steps.length,
      completionPercent: 0,
    });
  };

  const goPrev = () => {
    if (stepIndex <= 0) return;
    setStepIndex((i) => i - 1);
    setStepProgress(0);
    track({
      name: "cinematic_skip",
      journeyType: journey.type,
      sourceChampion: journey.sourceChampionId?.replace("char:", "") ?? "",
      targetChampion: journey.targetChampionId?.replace("char:", "") ?? "",
      sceneCount: journey.steps.length,
      completionPercent: Math.round((stepIndex / journey.steps.length) * 100),
    });
  };

  const goNext = () => {
    if (stepIndex >= journey.steps.length - 1) return;
    setStepIndex((i) => i + 1);
    setStepProgress(0);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <FullscreenContent
        className={cn(recording && "flex items-center justify-center bg-black")}
        onPointerMove={bumpControls}
        onClick={bumpControls}
      >
        <DialogTitle className="sr-only">{journey.title} cinematic journey</DialogTitle>

        {!recording ? (
          <header className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <p className="text-eyebrow text-muted truncate">{journey.subtitle ?? journey.title}</p>
            <div className="flex items-center gap-2">
              {(["landscape", "portrait", "square"] as JourneyFormat[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFormat(f);
                    track({
                      name: "cinematic_format_select",
                      journeyType: journey.type,
                      sourceChampion: journey.sourceChampionId?.replace("char:", "") ?? "",
                      targetChampion: journey.targetChampionId?.replace("char:", "") ?? "",
                      sceneCount: journey.steps.length,
                      completionPercent: Math.round(totalProgress * 100),
                    });
                  }}
                  className={cn(
                    "text-eyebrow rounded-full border px-2.5 py-1",
                    format === f
                      ? "border-gold/50 text-gold"
                      : "border-line text-muted",
                  )}
                >
                  {f === "landscape" ? "16:9" : f === "portrait" ? "9:16" : "1:1"}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setRecording(true);
                  track({
                    name: "cinematic_recording_mode",
                    journeyType: journey.type,
                    sourceChampion: journey.sourceChampionId?.replace("char:", "") ?? "",
                    targetChampion: journey.targetChampionId?.replace("char:", "") ?? "",
                    sceneCount: journey.steps.length,
                    completionPercent: Math.round(totalProgress * 100),
                  });
                }}
                className="text-eyebrow rounded-full border border-line px-2.5 py-1 text-muted"
              >
                Rec
              </button>
            </div>
          </header>
        ) : null}

        <RecordingFrame format={format} recording={recording} className="h-full">
          <GoldenTrail
            active={phase === "travel" || phase === "departure"}
            progress={phase === "departure" ? 1 - stepProgress : stepProgress}
          />
          <CinematicScene
            step={step}
            phase={phase}
            format={format}
            lineIndex={lineIndex}
          />
        </RecordingFrame>

        {!recording ? (
          <JourneyControls
            playing={playing}
            mode={mode}
            stepIndex={stepIndex}
            stepCount={journey.steps.length}
            progress={totalProgress}
            onPlayPause={() => setPlaying((p) => !p)}
            onRestart={restart}
            onPrev={goPrev}
            onNext={goNext}
            onExit={onClose}
            onModeChange={setMode}
            hidden={!controlsVisible}
          />
        ) : null}

        {process.env.NODE_ENV !== "production" ? (
          <div className="pointer-events-none absolute top-14 left-4 z-40 rounded border border-line/40 bg-ink/70 p-2 font-mono text-[10px] text-muted">
            <div>step {stepIndex + 1}/{journey.steps.length}</div>
            <div>phase {phase}</div>
            <div>type {step.type}</div>
            <div>canon {step.canonStatus}</div>
            <div>content {step.contentType}</div>
          </div>
        ) : null}
      </FullscreenContent>
    </Dialog>
  );
}
