"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import type { CinematicJourney } from "@/types";
import { CinematicJourneyPlayer } from "./cinematic-journey-player";

export function CinematicJourneyShell({
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
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const t = window.setTimeout(() => setEntered(true), reduceMotion ? 100 : 900);
    return () => window.clearTimeout(t);
  }, [open, reduceMotion]);

  if (!open || !journey) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[90] bg-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.8 }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.6, delay: 0.2 }}
      >
        <div
          className="size-2 rounded-full bg-gold shadow-[0_0_32px_rgba(212,168,92,0.8)]"
          style={{ animation: entered ? "none" : "pulse 2s ease-in-out infinite" }}
        />
      </motion.div>
      {entered ? (
        <CinematicJourneyPlayer
          journey={journey}
          onClose={onClose}
          onExploreNode={onExploreNode}
        />
      ) : null}
    </>
  );
}
