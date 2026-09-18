"use client";

import { cn } from "@/lib/utils";
import type { JourneyFormat } from "@/types";

const FRAME: Record<JourneyFormat, string> = {
  landscape: "aspect-video w-full max-h-full",
  portrait: "aspect-[9/16] h-[min(100vh,960px)] w-auto max-w-[min(100vw,540px)]",
  square: "aspect-square h-[min(88vh,720px)] w-auto max-w-[min(100vw,720px)]",
};

export function RecordingFrame({
  format,
  recording,
  children,
  className,
}: {
  format: JourneyFormat;
  recording: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto overflow-hidden bg-ink",
        recording ? FRAME[format] : "h-full w-full",
        recording && format === "portrait" && "rounded-lg border border-line/40 shadow-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
