"use client";

import * as React from "react";
import { NAME_CONSTELLATIONS } from "@/data/cinematic/name-constellations";
import { NameConstellation } from "./name-constellation";

export type TypographyQaVariant =
  | "bw-full"
  | "stars-only"
  | "lines-only"
  | "full"
  | "no-glow";

export function NameTypographyQa({
  variant = "bw-full",
  nameId,
}: {
  variant?: TypographyQaVariant;
  nameId?: string;
}) {
  const [selected, setSelected] = React.useState(nameId ?? "name:aatrox");
  const [activeVariant, setActiveVariant] = React.useState<TypographyQaVariant>(variant);
  const constellation = NAME_CONSTELLATIONS.find((c) => c.id === selected);

  const showStars = activeVariant !== "lines-only";
  const showLines = activeVariant !== "stars-only";
  const minimalStyle = activeVariant === "bw-full" || activeVariant === "stars-only" || activeVariant === "lines-only";
  const glow = activeVariant === "full";

  const perLetter =
    constellation?.contourGroups?.filter((g) => g.id.startsWith("letter-")).length ?? 0;
  const perLetterStars = perLetter ? Math.round((constellation?.anchors.length ?? 0) / perLetter) : 0;

  return (
    <div className="rounded border border-line p-4">
      <h3 className="text-eyebrow text-parchment tracking-[0.2em] uppercase">
        Typography QA — Simplified Constellation
      </h3>
      <p className="text-muted mt-1 text-xs">
        Read the word first. Black-and-white modes must show distinct letters immediately.
      </p>
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
      <div className="mt-3 flex flex-wrap gap-2">
        {(
          [
            ["bw-full", "B&W Full"],
            ["stars-only", "Stars Only"],
            ["lines-only", "Lines Only"],
            ["full", "Cinematic Glow"],
            ["no-glow", "No Glow"],
          ] as [TypographyQaVariant, string][]
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            className={`rounded-full border px-3 py-1 text-xs ${activeVariant === v ? "border-gold text-gold" : "border-line text-muted"}`}
            onClick={() => setActiveVariant(v)}
          >
            {label}
          </button>
        ))}
      </div>
      {constellation ? (
        <div
          className="relative mt-4 aspect-video w-full overflow-hidden rounded"
          style={{
            aspectRatio: "16/9",
            background: minimalStyle ? "#000000" : "#0a0c14",
          }}
        >
          {!minimalStyle ? (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_42%,#1a2030,transparent)]" />
          ) : null}
          <NameConstellation
            constellation={constellation}
            mode="inter-chapter"
            nameOpacity={1}
            heroStarId={activeVariant === "stars-only" || activeVariant === "lines-only" ? undefined : constellation.heroStarId}
            heroIntensity={1.15}
            plungeZoom={0}
            opacity={1}
            className="h-full w-full"
            showStars={showStars}
            showLines={showLines}
            enableGlow={glow}
            minimalStyle={minimalStyle}
          />
          <p className="absolute bottom-2 right-2 text-muted text-[10px]">
            {constellation.anchors.length} stars · {constellation.lines?.length ?? 0} lines · ~
            {perLetterStars}/letter · {constellation.typographySource}
          </p>
        </div>
      ) : null}
    </div>
  );
}
