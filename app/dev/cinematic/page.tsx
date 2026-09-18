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
import { AATROX_RECORD_INTRO_TIMING, AATROX_RECORD_OUTRO_TIMING } from "@/lib/cinematic-v3/aatrox-cinematic-direction";
import { totalIntroMs, totalOutroMs } from "@/lib/cinematic-v3/intro-outro";
import type { CinematicAspectMode, CinematicDirectorPreview, CinematicPlayerOptions } from "@/types";

const AATROX_SCENES = [
  { label: "Intro", preview: "intro" as const },
  { label: "Scene 1 — Ascension", index: 1 },
  { label: "Scene 2 — Void War", index: 2 },
  { label: "Scene 3 — Darkin Turn", index: 3 },
  { label: "Scene 4 — Darkin War", index: 4 },
  { label: "Scene 5 — Imprisonment", index: 5 },
  { label: "Scene 6 — Return", index: 6 },
  { label: "Scene 7 — Pantheon", index: 7 },
  { label: "Outro", preview: "outro" as const },
];

export default function CinematicDevPage() {
  const [selected, setSelected] = React.useState<string>("aatrox");
  const [connectionPair, setConnectionPair] = React.useState<string>("yasuo-yone");
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"character" | "connection">("character");
  const [aspectMode, setAspectMode] = React.useState<CinematicAspectMode>("AUTO");
  const [recordMode, setRecordMode] = React.useState(false);
  const [noText, setNoText] = React.useState(false);
  const [noImages, setNoImages] = React.useState(false);
  const [environmentOnly, setEnvironmentOnly] = React.useState(false);
  const [directorPreview, setDirectorPreview] = React.useState<CinematicDirectorPreview>("full");
  const [directorSceneIndex, setDirectorSceneIndex] = React.useState(0);

  const playerOptions = React.useMemo<CinematicPlayerOptions>(
    () => ({
      aspectMode: recordMode ? "16:9" : aspectMode,
      recordMode,
      showText: !noText,
      showImages: !noImages,
      environmentOnly,
      deterministic: recordMode,
      directorPreview,
      directorSceneIndex,
    }),
    [aspectMode, recordMode, noText, noImages, environmentOnly, directorPreview, directorSceneIndex],
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

  const aatroxJourney = selected === "aatrox" ? journey : null;
  const introMs = aatroxJourney?.introSequence
    ? totalIntroMs(aatroxJourney.introSequence.recordTiming ?? AATROX_RECORD_INTRO_TIMING)
    : 0;
  const outroMs = aatroxJourney?.outroSequence
    ? totalOutroMs(aatroxJourney.outroSequence.recordTiming ?? AATROX_RECORD_OUTRO_TIMING)
    : 0;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-monument text-parchment text-4xl">Cinematic Journey V3</h1>
      <p className="text-muted mt-2 text-sm">
        QA route — toggle aspect ratio, record mode, and layer visibility before launching.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["AUTO", "16:9"] as CinematicAspectMode[]).map((a) => (
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
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-xs ${environmentOnly ? "border-gold text-gold" : "border-line text-muted"}`}
          onClick={() => setEnvironmentOnly((e) => !e)}
        >
          ENV ONLY
        </button>
      </div>

      {selected === "aatrox" && mode === "character" && aatroxJourney ? (
        <section className="mt-10 rounded border border-gold/30 bg-gold/5 p-4">
          <h2 className="text-eyebrow text-gold tracking-[0.2em] uppercase">
            Aatrox Director QA
          </h2>
          <p className="text-muted mt-2 text-xs">
            Record intro ~{(introMs / 1000).toFixed(1)}s · outro ~{(outroMs / 1000).toFixed(1)}s ·
            anchors {aatroxJourney.introSequence?.constellationId}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {AATROX_SCENES.map((item) => (
              <button
                key={item.label}
                type="button"
                className="rounded-full border border-line px-3 py-1.5 text-xs text-parchment hover:border-gold/50"
                onClick={() => {
                  if ("preview" in item && item.preview === "intro") {
                    launchDirector("intro");
                  } else if ("preview" in item && item.preview === "outro") {
                    launchDirector("outro");
                  } else if ("index" in item) {
                    launchDirector("scene", item.index);
                  }
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="rounded-full border border-gold/60 px-3 py-1.5 text-xs text-gold"
              onClick={() => {
                setRecordMode(true);
                launchDirector("full");
              }}
            >
              Full Record Mode
            </button>
          </div>
          {aatroxJourney.scenes.map((scene) => (
            <p key={scene.id} className="text-muted mt-1 font-mono text-[10px]">
              {scene.id} · {scene.shotType} · {scene.worldNodeArchetype ?? "—"} ·{" "}
              {scene.image?.url ? "CURATED_IMAGE" : "CURATED_ABSTRACT"}
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
                    {j.scenes.length} scenes · lore {ready ? "✓" : "—"} · visual{" "}
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
