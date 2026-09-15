"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { relationshipById, sourceById } from "@/data";
import { CanonBadge } from "@/components/ui/badge";
import { explainStep } from "@/lib/graph/explanations";
import { edgeStroke } from "@/lib/graph/style";
import { CONFIDENCE_LABEL } from "@/lib/truth/layer";
import { cn, hexToRgba } from "@/lib/utils";
import type { PathStep } from "@/types";
import { ConnectionCategoryBadge, ConfidenceBadge } from "./connection-category-badge";

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
  const narrative = explainStep(step);

  const label =
    step.edge.connectionKind === "direct" && relationship
      ? relationship.label
      : step.edge.label;

  const sources = (step.edge.sourceIds ?? relationship?.sourceIds ?? [])
    .map((id) => sourceById.get(id))
    .filter(Boolean);

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
          <h3 className="text-parchment text-[0.9375rem] font-medium tracking-wide uppercase">
            {narrative.kind === "indirect" && step.to.type !== "character"
              ? step.to.name
              : `${step.from.name} → ${step.to.name}`}
          </h3>

          <p className="text-muted mt-2 text-sm leading-relaxed">{narrative.body}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ConnectionCategoryBadge edge={step.edge} />
            <ConfidenceBadge edge={step.edge} />
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
            <CanonBadge status={step.edge.canonStatus} />
          </div>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="text-eyebrow text-muted hover:text-gold mt-3 inline-flex items-center gap-1.5 transition-colors"
          >
            Why this connection?
            <ChevronDown
              aria-hidden
              className={cn("size-3 transition-transform", expanded && "rotate-180")}
            />
          </button>

          {expanded ? (
            <div className="text-parchment/80 mt-2 space-y-2 border-l border-line pl-3 text-sm leading-relaxed">
              <p>{relationship?.longExplanation ?? step.edge.description}</p>
              <p className="text-muted text-xs">
                Confidence: {CONFIDENCE_LABEL[step.edge.confidence]}
              </p>
              {sources.length > 0 ? (
                <ul className="text-muted text-xs">
                  {sources.map((s) => (
                    <li key={s!.id}>
                      <a
                        href={s!.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-gold underline-offset-2 hover:underline"
                      >
                        {s!.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}
