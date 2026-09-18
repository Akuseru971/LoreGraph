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

  const veilOpacity = 0.35 + hubState.dezoomStrength * 0.45 + hubState.nameOpacity * 0.15;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[55]"
      style={{ opacity: hubState.nameOpacity > 0.02 ? 1 : 0 }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          opacity: veilOpacity,
          background: `radial-gradient(ellipse 95% 80% at 50% 42%, ${atmosphere.background}ee 0%, ${atmosphere.background} 75%)`,
        }}
      />
      <div
        className="absolute inset-[-1%]"
        style={{
          opacity: 0.5 + hubState.nameOpacity * 0.5,
        }}
      >
        <NameConstellation
          constellation={constellation}
          mode="inter-chapter"
          nameOpacity={hubState.nameOpacity}
          heroStarId={hubState.destinationStarId}
          heroIntensity={hubState.heroIntensity}
          zoomProgress={hubState.zoomProgress}
          softenNonHero={hubState.softenNonHero}
          className="h-full w-full"
        />
      </div>
      {hubState.heroIntensity > 1.4 ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 42%, rgba(255,245,220,${(hubState.heroIntensity - 1) * 0.08}) 0%, transparent 55%)`,
          }}
        />
      ) : null}
    </div>
  );
}
