"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GoldenTrail({
  active,
  progress,
  className,
}: {
  active: boolean;
  /** 0–1 travel progress within current transition */
  progress: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gold/30",
          className,
        )}
      />
    );
  }

  const x = `${Math.min(100, progress * 100)}%`;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lg-trail-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(201,169,110,0)" />
            <stop offset="40%" stopColor="rgba(201,169,110,0.35)" />
            <stop offset="100%" stopColor="rgba(201,169,110,0.85)" />
          </linearGradient>
        </defs>
        <motion.line
          x1="8%"
          y1="52%"
          x2={active ? x : "8%"}
          y2="48%"
          stroke="url(#lg-trail-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: active ? 1 : 0.2 }}
          transition={{ duration: 0.4 }}
        />
      </svg>

      <motion.div
        className="absolute top-[48%] size-2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_24px_8px_rgba(201,169,110,0.55)]"
        style={{ left: active ? x : "8%" }}
        animate={{
          opacity: active ? [0.7, 1, 0.85] : 0.3,
          scale: active ? [1, 1.35, 1] : 1,
        }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
      />

      {active ? (
        <motion.div
          className="absolute top-[48%] h-px w-24 -translate-y-1/2 bg-gradient-to-r from-gold/60 to-transparent"
          style={{ left: `calc(${x} - 3rem)` }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      ) : null}
    </div>
  );
}
