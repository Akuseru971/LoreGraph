"use client";

import * as React from "react";
import {
  CINEMATIC_ASPECT,
  frameDimensions,
} from "@/lib/cinematic-v3/cinematic-frame";
import type { CinematicAspectMode } from "@/types";

export function CinematicFrameShell({
  aspectMode = "AUTO",
  children,
  className = "",
}: {
  aspectMode?: CinematicAspectMode;
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const frame = frameDimensions(aspectMode, {
    width: size.width || window.innerWidth,
    height: size.height || window.innerHeight,
  });

  const letterbox =
    aspectMode === "16:9" && (frame.letterbox || frame.pillarbox);

  return (
    <div ref={containerRef} className={`relative h-full w-full bg-black ${className}`}>
      {letterbox ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative overflow-hidden bg-ink"
            style={{
              width: frame.width,
              height: frame.height,
              maxWidth: "100%",
              maxHeight: "100%",
              aspectRatio: String(CINEMATIC_ASPECT),
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0">{children}</div>
      )}
    </div>
  );
}
