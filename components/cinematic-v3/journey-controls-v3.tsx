"use client";

import { Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function JourneyControlsV3({
  sceneIndex,
  sceneCount,
  era,
  playing,
  soundEnabled,
  onPlayPause,
  onPrev,
  onNext,
  onRestart,
  onExit,
  onToggleSound,
  onExploreNode,
  canExplore,
  hidden,
}: {
  sceneIndex: number;
  sceneCount: number;
  era?: string;
  playing: boolean;
  soundEnabled: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRestart: () => void;
  onExit: () => void;
  onToggleSound: () => void;
  onExploreNode?: () => void;
  canExplore?: boolean;
  hidden?: boolean;
}) {
  const progress = sceneCount > 1 ? sceneIndex / (sceneCount - 1) : 1;

  return (
    <footer
      className={cn(
        "absolute inset-x-0 bottom-0 z-40 px-4 pb-4 transition-opacity duration-300 sm:px-6",
        hidden ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 h-px w-full overflow-hidden rounded-full bg-line/40">
          <div
            className="h-full bg-gold/60 transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-eyebrow text-muted tabular-nums">
              {String(sceneIndex + 1).padStart(2, "0")} / {String(sceneCount).padStart(2, "0")}
            </p>
            {era ? (
              <p className="text-eyebrow text-gold/70 mt-0.5 truncate uppercase tracking-widest">
                {era}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleSound}
              className="rounded-full border border-line/60 p-2 text-muted hover:text-parchment"
              aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            >
              <Volume2 className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onPrev}
              className="rounded-full border border-line/60 p-2 text-muted hover:text-parchment"
              aria-label="Previous scene"
            >
              <SkipBack className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onPlayPause}
              className="rounded-full border border-gold/40 p-2 text-gold"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full border border-line/60 p-2 text-muted hover:text-parchment"
              aria-label="Next scene"
            >
              <SkipForward className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="rounded-full border border-line/60 p-2 text-muted hover:text-parchment"
              aria-label="Restart journey"
            >
              <RotateCcw className="size-4" aria-hidden />
            </button>
            {canExplore && onExploreNode ? (
              <button
                type="button"
                onClick={onExploreNode}
                className="text-eyebrow hidden rounded-full border border-gold/40 px-3 py-2 text-gold sm:inline"
              >
                Explore node
              </button>
            ) : null}
            <button
              type="button"
              onClick={onExit}
              className="rounded-full border border-line/60 p-2 text-muted hover:text-parchment"
              aria-label="Exit journey"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
