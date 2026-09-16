import * as React from "react";
import {
  CANON_STATUS_HINT,
  CANON_STATUS_LABEL,
  normalizeCanonStatus,
} from "@/lib/canon/model";
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

const CANON_COLORS: Record<string, string> = {
  CURRENT_CANON: "#7FB98A",
  AMBIGUOUS: "#C9A96E",
  RECONCILIATION_PENDING: "#C9A96E",
  LEGACY_LORE: "#9A8A6A",
  ALTERNATE_UNIVERSE: "#8B7FC7",
  THEMATIC_ONLY: "#8B7FC7",
  UNKNOWN: "#8A8F9C",
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
  const normalized = normalizeCanonStatus(status);
  const label = CANON_STATUS_LABEL[normalized];
  const hint = CANON_STATUS_HINT[normalized];
  const color = CANON_COLORS[normalized] ?? CANON_COLORS.CURRENT_CANON;

  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        className,
      )}
      style={{
        borderColor: hexToRgba(color, 0.32),
        backgroundColor: hexToRgba(color, 0.09),
        color,
      }}
      title={hint}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
      {showHint ? (
        <span className="text-muted normal-case tracking-normal"> · {hint}</span>
      ) : null}
    </span>
  );
}

export function canonMeta(status: string) {
  const normalized = normalizeCanonStatus(status);
  return {
    label: CANON_STATUS_LABEL[normalized],
    color: CANON_COLORS[normalized] ?? CANON_COLORS.CURRENT_CANON,
    hint: CANON_STATUS_HINT[normalized],
  };
}
