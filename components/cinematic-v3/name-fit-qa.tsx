"use client";

import * as React from "react";
import { NAME_CONSTELLATIONS } from "@/data/cinematic/name-constellations";
import {
  fitConstellationToSafeFrame,
  formatProjectedBounds,
  HUB_HORIZONTAL_MARGIN,
  HUB_VERTICAL_MARGIN,
  validateConstellationHubFit,
} from "@/lib/cinematic-v3/name-fit";
import { NameConstellation } from "./name-constellation";

const READABLE_BREATHING = 1.03;

export function NameFitQa() {
  return (
    <div className="rounded border border-gold/30 bg-gold/5 p-4">
      <h3 className="text-eyebrow text-gold tracking-[0.2em] uppercase">
        Name Fit QA — Inter-Chapter Readable State
      </h3>
      <p className="text-muted mt-2 text-xs">
        Safe margins {HUB_HORIZONTAL_MARGIN * 100}% horizontal · {HUB_VERTICAL_MARGIN * 100}% vertical ·
        plungeZoom=0 · breathing {READABLE_BREATHING}×
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {NAME_CONSTELLATIONS.map((constellation) => {
          const fit = fitConstellationToSafeFrame(constellation);
          const issue = validateConstellationHubFit(constellation);
          const p = fit.projected;
          return (
            <div key={constellation.id} className="rounded border border-line p-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-parchment text-sm font-medium">{constellation.displayName}</span>
                <span
                  className={`text-[10px] uppercase ${issue ? "text-red-400" : "text-emerald-400"}`}
                >
                  {issue ? "FAIL" : "PASS"}
                </span>
              </div>
              <div
                className="relative aspect-video w-full overflow-hidden rounded bg-[#0a0c14]"
                style={{ aspectRatio: "16/9" }}
              >
                <div
                  className="pointer-events-none absolute border border-dashed border-gold/40"
                  style={{
                    left: `${HUB_HORIZONTAL_MARGIN * 100}%`,
                    right: `${HUB_HORIZONTAL_MARGIN * 100}%`,
                    top: `${HUB_VERTICAL_MARGIN * 100}%`,
                    bottom: `${HUB_VERTICAL_MARGIN * 100}%`,
                  }}
                />
                <div
                  className="pointer-events-none absolute border border-cyan-400/60"
                  style={{
                    left: `${p.minX * 100}%`,
                    top: `${p.minY * 100}%`,
                    width: `${p.width * 100}%`,
                    height: `${p.height * 100}%`,
                  }}
                />
                <NameConstellation
                  constellation={constellation}
                  mode="inter-chapter"
                  nameOpacity={1}
                  heroStarId={constellation.heroStarId}
                  heroIntensity={1.35}
                  plungeZoom={0}
                  nameBreathing={READABLE_BREATHING}
                  softenNonHero={0.2}
                  className="h-full w-full"
                />
              </div>
              <p className="text-muted mt-1 font-mono text-[9px]">
                target {Math.round(fit.targetWidthPct * 100)}% · {formatProjectedBounds(fit)}
              </p>
              {issue ? (
                <p className="mt-0.5 text-[9px] text-red-400">{issue.message}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
