"use client";

import * as React from "react";
import { getAtmosphereConfig } from "@/lib/cinematic-v3/atmosphere";
import type { ChapterHubState } from "@/lib/cinematic-v3/chapter-hub";
import type { ChampionConstellation } from "@/types";
import { NameConstellation } from "./name-constellation";

export function ChapterHubOverlay({
  constellation,
  hubState,
  visible = true,
}: {
  constellation: ChampionConstellation;
  hubState: ChapterHubState;
  visible?: boolean;
}) {
  const atmosphere = getAtmosphereConfig("CELESTIAL");
  if (!visible || !hubState.showName) return null;

  const depth = hubState.nameDepth;
  const scale = hubState.nameScale * (1 + hubState.cameraPullback * 0.08);
  const starCx = 50;
  const starCy = 44;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[55]"
      style={{
        opacity: 1,
        perspective: "900px",
        perspectiveOrigin: "50% 42%",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.25 + hubState.cameraPullback * 0.35,
          background: `radial-gradient(ellipse 100% 85% at 50% 42%, ${atmosphere.background}f0 0%, transparent 72%)`,
        }}
      />
      <div
        className="absolute inset-[-2%]"
        style={{
          opacity: hubState.nameOpacity,
          transform: `translateZ(${depth}px) scale(${scale})`,
          transformOrigin: `${starCx}% ${starCy}%`,
          transformStyle: "preserve-3d",
        }}
      >
        <NameConstellation
          constellation={constellation}
          mode="inter-chapter"
          nameOpacity={1}
          heroStarId={hubState.destinationStarId}
          heroIntensity={hubState.heroIntensity}
          zoomProgress={hubState.zoomProgress}
          softenNonHero={hubState.softenNonHero}
          className="h-full w-full"
        />
      </div>
      {hubState.starIntensity > 1.3 ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 42%, rgba(255,245,220,${(hubState.starIntensity - 1) * 0.1}) 0%, transparent 50%)`,
            opacity: hubState.nameOpacity,
          }}
        />
      ) : null}
    </div>
  );
}
