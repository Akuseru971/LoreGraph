"use client";

import dynamic from "next/dynamic";
import type { CinematicJourney } from "@/types";

const Shell = dynamic(
  () =>
    import("./cinematic-journey-shell").then((m) => ({
      default: m.CinematicJourneyShell,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink">
        <div className="size-2 animate-pulse rounded-full bg-gold shadow-[0_0_24px_rgba(212,168,92,0.6)]" />
      </div>
    ),
  },
);

export function CinematicJourneyLazy({
  journey,
  open,
  onClose,
  onExploreNode,
}: {
  journey: CinematicJourney | null;
  open: boolean;
  onClose: () => void;
  onExploreNode?: (entityId: string) => void;
}) {
  return (
    <Shell
      journey={journey}
      open={open}
      onClose={onClose}
      onExploreNode={onExploreNode}
    />
  );
}

/** Begin preloading the cinematic bundle on user intent (hover/focus). */
export function preloadCinematicJourney(): void {
  void import("./cinematic-journey-shell");
}
