"use client";

import * as React from "react";
import { NAME_CONSTELLATIONS } from "@/data/cinematic/name-constellations";
import { NameConstellation } from "./name-constellation";

export type TypographyQaVariant = "stars" | "lines" | "full" | "no-glow" | "final";

export function NameTypographyQa({
  variant = "final",
  nameId,
}: {
  variant?: TypographyQaVariant;
  nameId?: string;
}) {
  const [selected, setSelected] = React.useState(nameId ?? "name:aatrox");
  const constellation = NAME_CONSTELLATIONS.find((c) => c.id === selected);

  const showStars = variant !== "lines";
  const showLines = variant !== "stars";
  const glow = variant === "final";

  return (
    <div className="rounded border border-line p-4">
      <h3 className="text-eyebrow text-parchment tracking-[0.2em] uppercase">
        Typography QA — Instrument Serif
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {NAME_CONSTELLATIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`rounded-full border px-3 py-1 text-xs ${selected === c.id ? "border-gold text-gold" : "border-line text-muted"}`}
            onClick={() => setSelected(c.id)}
          >
            {c.displayName}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {(["stars", "lines", "full", "no-glow", "final"] as TypographyQaVariant[]).map((v) => (
          <span key={v} className="text-muted text-[10px] uppercase">{v}</span>
        ))}
      </div>
      {constellation ? (
        <div
          className="relative mt-4 aspect-video w-full overflow-hidden rounded bg-[#0a0c14]"
          style={{ aspectRatio: "16/9" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_42%,#1a2030,transparent)]" />
          <NameConstellation
            constellation={constellation}
            mode="intro"
            nameOpacity={1}
            heroStarId={constellation.heroStarId}
            heroIntensity={1.2}
            opacity={1}
            className="h-full w-full"
            showStars={showStars}
            showLines={showLines}
            enableGlow={glow}
          />
          <p className="absolute bottom-2 right-2 text-muted text-[10px]">
            {constellation.anchors.length} stars · {constellation.lines?.length ?? 0} lines ·{" "}
            {constellation.typographySource}
          </p>
        </div>
      ) : null}
    </div>
  );
}
