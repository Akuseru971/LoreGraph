import * as React from "react";
import { cn } from "@/lib/utils";
import { hexToRgba } from "@/lib/utils";

export function Badge({
  className,
  children,
  accentColor,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { accentColor?: string }) {
  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        className,
      )}
      style={
        accentColor
          ? {
              borderColor: hexToRgba(accentColor, 0.34),
              backgroundColor: hexToRgba(accentColor, 0.1),
              color: accentColor,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </span>
  );
}

const CANON_COPY: Record<string, { label: string; color: string; hint: string }> = {
  CANON: { label: "Canon", color: "#7FB98A", hint: "Established in current lore" },
  AMBIGUOUS: {
    label: "Ambiguous",
    color: "#C9A96E",
    hint: "Strongly implied, not stated outright",
  },
  OLD_LORE: {
    label: "Old lore",
    color: "#9A8A6A",
    hint: "From an earlier continuity, since replaced",
  },
  RETCONNED: { label: "Retconned", color: "#A0707A", hint: "No longer canonical" },
  ALTERNATE_UNIVERSE: {
    label: "Alternate",
    color: "#8B7FC7",
    hint: "From material outside the main timeline",
  },
};

export function CanonBadge({
  status,
  className,
  showHint = false,
}: {
  status: string;
  className?: string;
  showHint?: boolean;
}) {
  const meta = CANON_COPY[status] ?? CANON_COPY.CANON;
  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        className,
      )}
      style={{
        borderColor: hexToRgba(meta.color, 0.32),
        backgroundColor: hexToRgba(meta.color, 0.09),
        color: meta.color,
      }}
      title={meta.hint}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      {meta.label}
      {showHint ? <span className="text-muted normal-case tracking-normal"> · {meta.hint}</span> : null}
    </span>
  );
}

export function canonMeta(status: string) {
  return CANON_COPY[status] ?? CANON_COPY.CANON;
}
