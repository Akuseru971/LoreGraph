"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProgressMeter } from "@/components/ui/progress-ring";
import { loreDna } from "@/lib/progress/model";
import { hexToRgba } from "@/lib/utils";
import type { UserProgress } from "@/types";

/** Premium Lore DNA bars — not generic progress bars. */
export function LoreDNA({ progress }: { progress: UserProgress }) {
  const reduceMotion = useReducedMotion();
  const entries = loreDna(progress).filter((e) => e.percent > 0).slice(0, 8);

  if (entries.length === 0) {
    return (
      <p className="text-muted text-sm leading-relaxed">
        Explore champions to build your Lore DNA. Every profile you read shifts
        the balance.
      </p>
    );
  }

  const max = Math.max(...entries.map((e) => e.percent), 1);

  return (
    <div>
      <p className="text-muted mb-5 text-sm leading-relaxed">
        Based on the stories and characters you&apos;ve explored.
      </p>
    <ul className="space-y-4">
      {entries.map((entry, index) => (
        <motion.li
          key={entry.key}
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-parchment text-sm font-medium">{entry.label}</span>
            <span
              className="font-mono text-xs tabular-nums"
              style={{ color: entry.accentColor }}
            >
              {entry.percent}%
            </span>
          </div>
          <div className="relative mt-2">
            <ProgressMeter value={(entry.percent / max) * 100} color={entry.accentColor} height={4} />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 rounded-full opacity-40 blur-sm"
              style={{
                width: `${(entry.percent / max) * 100}%`,
                background: hexToRgba(entry.accentColor, 0.6),
              }}
            />
          </div>
        </motion.li>
      ))}
    </ul>
    </div>
  );
}
