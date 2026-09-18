"use client";

import Image from "next/image";
import * as React from "react";
import { AATROX_MASK_ASSET } from "@/data/cinematic/constellations/aatrox";
import { constellationById } from "@/data/cinematic/constellations";
import type { ChampionConstellation, CinematicIntro } from "@/types";
import { ConstellationSilhouette } from "./constellation-silhouette";

/** Shared cinematic frame — constellation coords map 1:1 to splash image space. */
const SPLASH_FRAME_CLASS = "absolute inset-0";

export type ConstellationQaMode =
  | "splash-only"
  | "mask-only"
  | "mask-splash"
  | "contour-over-splash"
  | "stars-over-splash"
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
  const maskUrl =
    constellation?.silhouetteSource?.maskAssetPath ??
    (constellationId === "constellation:aatrox" ? AATROX_MASK_ASSET : undefined);

  if (!constellation) return null;

  const showSplash =
    mode === "splash-only" ||
    mode === "mask-splash" ||
    mode === "contour-over-splash" ||
    mode === "stars-over-splash" ||
    mode === "splash-anchors" ||
    mode === "morph-progress";

  const showMask =
    mode === "mask-only" || mode === "mask-splash";

  const showConstellation =
    mode === "constellation-only" ||
    mode === "contour-only" ||
    mode === "iconic-lines" ||
    mode === "full" ||
    mode === "contour-over-splash" ||
    mode === "stars-over-splash" ||
    mode === "splash-anchors" ||
    mode === "morph-progress";

  const splashOpacity =
    mode === "contour-over-splash" || mode === "stars-over-splash"
      ? 0.5
      : mode === "morph-progress"
        ? Math.max(0, 1 - morphProgress * 1.1)
        : mode === "mask-splash"
          ? 0.45
          : 1;

  const maskOpacity = mode === "mask-splash" ? 0.55 : 1;
  const starReveal = mode === "morph-progress" ? morphProgress : 1;

  const lineFilter: "all" | "contour" | "iconic" | "none" =
    mode === "contour-only" || mode === "contour-over-splash"
      ? "contour"
      : mode === "iconic-lines"
        ? "iconic"
        : "all";

  const showLines =
    mode !== "stars-over-splash" && mode !== "splash-anchors";

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded border border-line bg-black">
      {showSplash && splashUrl ? (
        <div className={SPLASH_FRAME_CLASS} style={{ opacity: splashOpacity }}>
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

      {showMask && maskUrl ? (
        <div
          className={SPLASH_FRAME_CLASS}
          style={{
            opacity: maskOpacity,
            mixBlendMode: mode === "mask-splash" ? "screen" : "normal",
          }}
        >
          <Image
            src={maskUrl}
            alt=""
            fill
            className="object-cover object-center"
            style={{ filter: "invert(1) brightness(1.8)" }}
            sizes="800px"
          />
        </div>
      ) : null}

      {showConstellation ? (
        <div className={SPLASH_FRAME_CLASS}>
          <ConstellationSilhouette
            constellation={constellation}
            starRevealProgress={starReveal}
            lineProgress={starReveal}
            heroStarId={constellation.heroStarId}
            heroIntensity={0.9}
            lineFilter={lineFilter}
            showLines={showLines}
            className="h-full w-full"
          />
        </div>
      ) : null}

      <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 font-mono text-[10px] text-parchment/70">
        {constellation.anchors.length} anchors · {mode}
        {constellation.silhouetteSource
          ? ` · ${constellation.silhouetteSource.extractionMethod.slice(0, 24)}…`
          : ""}
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
    hasSilhouetteSource: Boolean(c.silhouetteSource),
    rawContourPoints: c.silhouetteSource?.rawContourPoints ?? 0,
    simplifiedContourPoints: c.silhouetteSource?.simplifiedContourPoints ?? 0,
  };
}
