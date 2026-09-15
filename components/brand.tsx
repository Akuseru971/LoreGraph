import { cn } from "@/lib/utils";

/** Three connected nodes — the LoreGraph mark. */
export function LoreGraphMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={cn("size-6", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M7 9.5 L21 6.5 M7 9.5 L14.5 21.5 M21 6.5 L14.5 21.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="7" cy="9.5" r="3" fill="currentColor" />
      <circle cx="21" cy="6.5" r="2.2" fill="currentColor" opacity="0.8" />
      <circle cx="14.5" cy="21.5" r="2.6" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LoreGraphMark className="text-gold size-6" />
      <span className="font-display text-parchment text-[1.0625rem] tracking-tight">
        LoreGraph
      </span>
    </span>
  );
}
