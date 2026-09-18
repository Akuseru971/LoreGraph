"use client";

import * as React from "react";
import { characters } from "@/data/characters";
import { CinematicJourneyLazy } from "@/components/cinematic-v3/cinematic-journey-lazy";
import {
  buildChampionJourneyV3,
  buildConnectionJourneyV3,
  isCinematicReady,
  SHOWCASE_CHAMPION_SLUGS,
  SHOWCASE_CONNECTION_PAIRS,
} from "@/lib/cinematic-v3";

export default function CinematicDevPage() {
  const [selected, setSelected] = React.useState<string>("aatrox");
  const [connectionPair, setConnectionPair] = React.useState<string>("yasuo-yone");
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"character" | "connection">("character");

  const journey = React.useMemo(() => {
    if (mode === "connection") {
      const [a, b] = connectionPair.split("-");
      const source = characters.find((c) => c.slug === a);
      const target = characters.find((c) => c.slug === b);
      if (!source || !target) return null;
      return buildConnectionJourneyV3(source, target);
    }
    const c = characters.find((ch) => ch.slug === selected);
    if (!c) return null;
    return buildChampionJourneyV3(c);
  }, [mode, selected, connectionPair]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-monument text-parchment text-4xl">Cinematic Journey V3</h1>
      <p className="text-muted mt-2 text-sm">
        Development showcase — not indexed. Open a journey, then use the debug panel scene
        buttons to jump between beats.
      </p>

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm ${mode === "character" ? "border-gold text-gold" : "border-line text-muted"}`}
          onClick={() => setMode("character")}
        >
          Champion
        </button>
        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm ${mode === "connection" ? "border-gold text-gold" : "border-line text-muted"}`}
          onClick={() => setMode("connection")}
        >
          Connection
        </button>
      </div>

      {mode === "character" ? (
        <ul className="mt-6 space-y-2">
          {SHOWCASE_CHAMPION_SLUGS.map((slug) => {
            const c = characters.find((ch) => ch.slug === slug);
            if (!c) return null;
            const ready = isCinematicReady(c);
            const j = buildChampionJourneyV3(c);
            return (
              <li key={slug}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(slug);
                    setOpen(true);
                  }}
                  className="w-full rounded border border-line px-4 py-3 text-left hover:border-gold/40"
                >
                  <span className="text-parchment">{c.name}</span>
                  <span className="text-muted ml-2 text-xs">
                    {j.scenes.length} scenes · {ready ? "ready" : "not ready"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-6 space-y-2">
          {SHOWCASE_CONNECTION_PAIRS.map(([a, b]) => (
            <li key={`${a}-${b}`}>
              <button
                type="button"
                onClick={() => {
                  setConnectionPair(`${a}-${b}`);
                  setOpen(true);
                }}
                className="w-full rounded border border-line px-4 py-3 text-left hover:border-gold/40"
              >
                <span className="text-parchment">{a} ↔ {b}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <CinematicJourneyLazy journey={journey} open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
