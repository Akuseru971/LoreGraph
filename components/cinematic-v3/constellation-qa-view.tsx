"use client";

import Image from "next/image";
import * as React from "react";
import { constellationById } from "@/data/cinematic/constellations";
import type { ChampionConstellation, CinematicIntro } from "@/types";
import { ConstellationSilhouette } from "./constellation-silhouette";

export type ConstellationQaMode =
  | "splash-only"
  | "splash-anchors"
  | "constellation-only"
  | "contour-only"
  | "iconic-lines"
  | "full"
  | "morph-progress";

export function ConstellationQaView({
  constellationId,
  intro,
  mode = "constellation-only",
  morphProgress = 1,
}: {
  constellationId: string;
  intro?: CinematicIntro;
  mode?: ConstellationQaMode;
  morphProgress?: number;
}) {
  const constellation = constellationById.get(constellationId);
  const focal = intro?.splashFocal ?? constellation?.splashFocal ?? { x: 0.52, y: 0.3 };
  const splashUrl = intro?.splashAsset.url;

  if (!constellation) return null;

  const showSplash =
    mode === "splash-only" ||
    mode === "splash-anchors" ||
    mode === "morph-progress";
  const showConstellation =
    mode !== "splash-only" &&
    (mode === "constellation-only" ||
      mode === "contour-only" ||
      mode === "iconic-lines" ||
      mode === "full" ||
      mode === "splash-anchors" ||
      mode === "morph-progress");

  const splashOpacity =
    mode === "morph-progress" ? Math.max(0, 1 - morphProgress * 1.1) : 1;
  const starReveal =
    mode === "morph-progress" ? morphProgress : 1;
  const lineFilter: "all" | "contour" | "iconic" | "none" =
    mode === "contour-only"
      ? "contour"
      : mode === "iconic-lines"
        ? "iconic"
        : "all";

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded border border-line bg-black">
      {showSplash && splashUrl ? (
        <div
          className="absolute inset-0"
          style={{
            opacity: splashOpacity,
            WebkitMaskImage:
              mode === "morph-progress"
                ? `radial-gradient(ellipse 45% 58% at ${focal.x * 100}% ${focal.y * 100}%, black 20%, transparent 75%)`
                : undefined,
          }}
        >
          <Image
            src={splashUrl}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: `${focal.x * 100}% ${focal.y * 100}%` }}
            sizes="800px"
          />
        </div>
      ) : null}
      {showConstellation ? (
        <div className="absolute inset-[6%]">
          <ConstellationSilhouette
            constellation={constellation}
            starRevealProgress={starReveal}
            lineProgress={starReveal}
            heroStarId={constellation.heroStarId}
            heroIntensity={0.9}
            lineFilter={lineFilter}
            className="h-full w-full"
          />
        </div>
      ) : null}
      <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 font-mono text-[10px] text-parchment/70">
        {constellation.anchors.length} anchors · {mode}
      </div>
    </div>
  );
}

export function constellationStats(c: ChampionConstellation) {
  const byCategory = (cat: string) =>
    c.anchors.filter((a) => a.category === cat).length;
  return {
    total: c.anchors.length,
    contour: byCategory("CONTOUR"),
    iconic: byCategory("ICONIC"),
    structural: byCategory("STRUCTURAL"),
    detail: byCategory("DETAIL"),
    atmospheric: byCategory("ATMOSPHERIC"),
    groups: c.contourGroups?.length ?? 0,
    lines: c.lines?.length ?? 0,
  };
}
