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

  const depth = hubState.nameDepth * 0.6;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[55]"
      style={{
        opacity: 1,
        perspective: "1000px",
        perspectiveOrigin: "50% 44%",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.15 + hubState.cameraPullback * 0.2,
          background: `radial-gradient(ellipse 90% 70% at 50% 44%, ${atmosphere.background}cc 0%, transparent 68%)`,
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: hubState.nameOpacity,
          transform: `translateZ(${depth}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        <NameConstellation
          constellation={constellation}
          mode="inter-chapter"
          nameOpacity={1}
          heroStarId={hubState.destinationStarId}
          heroIntensity={hubState.heroIntensity}
          plungeZoom={hubState.plungeZoom}
          nameBreathing={hubState.nameBreathing}
          softenNonHero={hubState.softenNonHero}
          className="h-full w-full"
        />
      </div>
      {hubState.starIntensity > 1.25 && hubState.plungeZoom < 0.15 ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 44%, rgba(255,245,220,${(hubState.starIntensity - 1) * 0.08}) 0%, transparent 48%)`,
            opacity: hubState.nameOpacity,
          }}
        />
      ) : null}
    </div>
  );
}
