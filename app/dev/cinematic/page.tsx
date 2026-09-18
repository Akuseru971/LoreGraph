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
import { validateStoryPanelJourney } from "@/lib/cinematic-v3/validate-story-panels";
import type { CinematicAspectMode, CinematicDirectorPreview, CinematicPlayerOptions } from "@/types";

const AATROX_PANEL_SCENES = [
  { label: "Beat 1 — God-Warrior", index: 0 },
  { label: "Beat 2 — Ascension", index: 1 },
  { label: "Beat 3 — Void War", index: 2 },
  { label: "Beat 4 — Darkin", index: 3 },
  { label: "Beat 5 — Darkin War", index: 4 },
  { label: "Beat 6 — Blade", index: 5 },
  { label: "Beat 7 — Return", index: 6 },
  { label: "Beat 8 — Atreus", index: 7 },
];

const YASUO_PANEL_SCENES = [
  { label: "Beat 1 — The Prodigy", index: 0 },
  { label: "Beat 2 — Master Souma", index: 1 },
  { label: "Beat 3 — Ionian War", index: 2 },
  { label: "Beat 4 — Accusation", index: 3 },
  { label: "Beat 5 — Exile", index: 4 },
  { label: "Beat 6 — Duel", index: 5 },
  { label: "Beat 7 — Truth", index: 6 },
  { label: "Beat 8 — Wanderer", index: 7 },
];

const PANEL_QA_TOOLS = [
  { label: "Transition Loop", preview: "transition-loop" as const, index: 2 },
  { label: "Background Only", preview: "background-only" as const, index: 0 },
  { label: "Text Layout", preview: "text-layout" as const, index: 1 },
];

export default function CinematicDevPage() {
  const [selected, setSelected] = React.useState<string>("aatrox");
  const [connectionPair, setConnectionPair] = React.useState<string>("yasuo-yone");
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"character" | "connection">("character");
  const [aspectMode, setAspectMode] = React.useState<CinematicAspectMode>("16:9");
  const [recordMode, setRecordMode] = React.useState(false);
  const [noText, setNoText] = React.useState(false);
  const [noImages, setNoImages] = React.useState(false);
  const [directorPreview, setDirectorPreview] = React.useState<CinematicDirectorPreview>("full");
  const [directorSceneIndex, setDirectorSceneIndex] = React.useState(0);

  const playerOptions = React.useMemo<CinematicPlayerOptions>(
    () => ({
      aspectMode: recordMode ? "16:9" : aspectMode,
      recordMode,
      showText: directorPreview !== "background-only" && !noText,
      showImages: directorPreview !== "text-layout" && !noImages,
      deterministic: recordMode,
      directorPreview,
      directorSceneIndex,
      backgroundOnly: directorPreview === "background-only",
      showBackgroundDiagnostics: directorPreview === "background-only",
    }),
    [aspectMode, recordMode, noText, noImages, directorPreview, directorSceneIndex],
  );

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

  const launchDirector = (preview: CinematicDirectorPreview, sceneIndex = 0) => {
    setDirectorPreview(preview);
    setDirectorSceneIndex(sceneIndex);
    setOpen(true);
  };

  const panelValidation =
    journey && mode === "character" ? validateStoryPanelJourney(journey) : [];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-monument text-parchment text-4xl">Cinematic Story Panels</h1>
      <p className="text-muted mt-2 text-sm">
        Image-led lore storytelling — 16:9 and 9:16 record modes, official art per beat.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["16:9", "9:16", "AUTO"] as CinematicAspectMode[]).map((a) => (
          <button
            key={a}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-xs ${aspectMode === a && !recordMode ? "border-gold text-gold" : "border-line text-muted"}`}
            onClick={() => {
              setAspectMode(a);
              setRecordMode(false);
            }}
          >
            {a}
          </button>
        ))}
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-xs ${recordMode ? "border-gold text-gold" : "border-line text-muted"}`}
          onClick={() => setRecordMode((r) => !r)}
        >
          RECORD MODE
        </button>
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-xs ${noText ? "border-gold text-gold" : "border-line text-muted"}`}
          onClick={() => setNoText((t) => !t)}
        >
          NO TEXT
        </button>
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-xs ${noImages ? "border-gold text-gold" : "border-line text-muted"}`}
          onClick={() => setNoImages((i) => !i)}
        >
          NO IMAGES
        </button>
      </div>

      {(selected === "aatrox" || selected === "yasuo") && mode === "character" && journey ? (
        <section className="mt-10 rounded border border-gold/30 bg-gold/5 p-4">
          <h2 className="text-eyebrow text-gold tracking-[0.2em] uppercase">
            {selected === "aatrox" ? "Aatrox" : "Yasuo"} Story Panel QA
          </h2>
          <p className="text-muted mt-2 text-xs">
            {panelValidation.filter((i) => i.level === "ERROR").length} errors ·{" "}
            {panelValidation.filter((i) => i.level === "WARNING").length} warnings ·{" "}
            {journey.scenes.filter((s) => s.type !== "ENDING").length} beats
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(selected === "yasuo" ? YASUO_PANEL_SCENES : AATROX_PANEL_SCENES).map((item) => (
              <button
                key={item.label}
                type="button"
                className="rounded-full border border-line px-3 py-1.5 text-xs text-parchment hover:border-gold/50"
                onClick={() => launchDirector("scene", item.index)}
              >
                {item.label}
              </button>
            ))}
            {PANEL_QA_TOOLS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="rounded-full border border-line px-3 py-1.5 text-xs text-parchment hover:border-gold/50"
                onClick={() => launchDirector(item.preview, item.index)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="rounded-full border border-gold/60 px-3 py-1.5 text-xs text-gold"
              onClick={() => {
                setRecordMode(true);
                launchDirector(selected === "aatrox" ? "full-aatrox" : "full-yasuo");
              }}
            >
              Record Full Journey
            </button>
          </div>
          {journey.scenes.map((scene) => (
            <p key={scene.id} className="text-muted mt-1 font-mono text-[10px]">
              {scene.eyebrow ?? "—"} · {scene.title} · {scene.image?.url?.split("/").pop() ?? "NO IMAGE"}
            </p>
          ))}
        </section>
      ) : null}

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
                    setDirectorPreview("full");
                    setOpen(true);
                  }}
                  className="w-full rounded border border-line px-4 py-3 text-left hover:border-gold/40"
                >
                  <span className="text-parchment">{c.name}</span>
                  <span className="text-muted ml-2 text-xs">
                    {j.scenes.length} panels · lore {ready ? "✓" : "—"} · visual{" "}
                    {j.visualReady ? "✓" : "—"} · record {j.recordReady ? "✓" : "—"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-6 space-y-2">
          {SHOWCASE_CONNECTION_PAIRS.map(([a, b]) => {
            const j = buildConnectionJourneyV3(
              characters.find((c) => c.slug === a)!,
              characters.find((c) => c.slug === b)!,
            );
            return (
              <li key={`${a}-${b}`}>
                <button
                  type="button"
                  onClick={() => {
                    setConnectionPair(`${a}-${b}`);
                    setDirectorPreview("full");
                    setOpen(true);
                  }}
                  className="w-full rounded border border-line px-4 py-3 text-left hover:border-gold/40"
                >
                  <span className="text-parchment">{a} ↔ {b}</span>
                  {j ? (
                    <span className="text-muted ml-2 text-xs">
                      record {j.recordReady ? "✓" : "—"}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <CinematicJourneyLazy
        journey={journey}
        open={open}
        onClose={() => {
          setOpen(false);
          setDirectorPreview("full");
        }}
        playerOptions={playerOptions}
      />
    </main>
  );
}
