"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import * as React from "react";
import { relationshipById } from "@/data";
import { CanonBadge } from "@/components/ui/badge";
import { RELATIONSHIP_LABEL, edgeStroke } from "@/lib/graph/style";
import { cn, hexToRgba } from "@/lib/utils";
import type { PathStep } from "@/types";

/** One hop, explained. The graph is the hook; these cards are the payoff. */
export function ConnectionStep({
  step,
  index,
  active,
  onFocus,
}: {
  step: PathStep;
  index: number;
  active?: boolean;
  onFocus?: (index: number | null) => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const color = edgeStroke(step.edge);
  const relationship = step.edge.relationshipId
    ? relationshipById.get(step.edge.relationshipId)
    : undefined;

  const label =
    step.edge.connectionKind === "direct"
      ? (relationship?.label ?? RELATIONSHIP_LABEL[step.edge.relationship])
      : step.edge.label;

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduceMotion ? 0 : 0.15 + index * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => onFocus?.(index)}
      onMouseLeave={() => onFocus?.(null)}
      className={cn(
        "relative rounded-[var(--radius-card)] border p-4 transition-colors sm:p-5",
        active ? "border-gold/40 bg-white/[0.05]" : "border-line bg-white/[0.02]",
      )}
    >
      <span
        aria-hidden
        className="absolute top-4 bottom-4 left-0 w-[2px] rounded-full"
        style={{ background: `linear-gradient(180deg, ${color}, transparent)` }}
      />

      <div className="flex items-start gap-3.5 sm:gap-4">
        <span
          className="text-eyebrow grid size-7 shrink-0 place-items-center rounded-full border tabular-nums"
          style={{
            borderColor: hexToRgba(color, 0.45),
            backgroundColor: hexToRgba(color, 0.12),
            color,
          }}
        >
          {index + 1}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-parchment flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] font-medium tracking-wide uppercase">
            {step.from.name}
            <ArrowRight className="text-muted size-3.5 shrink-0" aria-hidden />
            {step.to.name}
          </h3>

          <p className="text-muted mt-2 text-sm leading-relaxed">
            {relationship?.shortExplanation ?? step.edge.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className="text-eyebrow rounded-full border px-2 py-1"
              style={{
                borderColor: hexToRgba(color, 0.35),
                backgroundColor: hexToRgba(color, 0.1),
                color,
              }}
            >
              {label}
            </span>
            <span className="text-eyebrow text-muted-dim rounded-full border border-line px-2 py-1">
              {step.edge.connectionKind === "direct" ? "Direct" : "Indirect"}
            </span>
            <CanonBadge status={step.edge.canonStatus} />
          </div>

          {relationship?.longExplanation ? (
            <>
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                className="text-eyebrow text-muted hover:text-gold mt-3 inline-flex items-center gap-1.5 transition-colors"
              >
                Why it matters
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-3 transition-transform",
                    expanded && "rotate-180",
                  )}
                />
              </button>
              {expanded ? (
                <p className="text-parchment/80 mt-2 border-l border-line pl-3 text-sm leading-relaxed">
                  {relationship.longExplanation}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}
