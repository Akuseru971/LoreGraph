"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  VolumeX,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { JourneyPlaybackMode } from "@/types";

export function JourneyControls({
  playing,
  mode,
  stepIndex,
  stepCount,
  progress,
  onPlayPause,
  onRestart,
  onPrev,
  onNext,
  onExit,
  onModeChange,
  hidden,
}: {
  playing: boolean;
  mode: JourneyPlaybackMode;
  stepIndex: number;
  stepCount: number;
  progress: number;
  onPlayPause: () => void;
  onRestart: () => void;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
  onModeChange: (mode: JourneyPlaybackMode) => void;
  hidden?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-30 transition-opacity duration-500",
        hidden ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="pointer-events-auto bg-gradient-to-t from-ink via-ink/90 to-transparent px-4 pb-5 pt-10 sm:px-6">
        <div
          className="mb-4 h-0.5 overflow-hidden rounded-full bg-line/60"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-gold/80 transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous scene"
              onClick={onPrev}
              disabled={stepIndex <= 0}
              className="rounded-full border border-line p-2.5 text-parchment disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={onPlayPause}
              className="rounded-full border border-gold/40 bg-gold/10 p-3 text-gold"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              type="button"
              aria-label="Next scene"
              onClick={onNext}
              disabled={stepIndex >= stepCount - 1}
              className="rounded-full border border-line p-2.5 text-parchment disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Restart journey"
              onClick={onRestart}
              className="rounded-full border border-line p-2.5 text-muted"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onModeChange(mode === "auto" ? "manual" : "auto")}
              className="text-eyebrow rounded-full border border-line px-3 py-1.5 text-muted"
            >
              {mode === "auto" ? "Auto" : "Manual"}
            </button>
            <button
              type="button"
              aria-label="Mute (placeholder)"
              className="rounded-full border border-line p-2.5 text-muted"
            >
              <VolumeX className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Exit cinematic"
              onClick={onExit}
              className="rounded-full border border-line p-2.5 text-parchment"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <p className="text-eyebrow text-muted-dim mt-3 text-center tabular-nums">
          {stepIndex + 1} / {stepCount}
        </p>
      </div>
    </div>
  );
}
