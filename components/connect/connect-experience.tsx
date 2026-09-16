"use client";

import {
  ArrowRight,
  Play,
  Route,
  Search,
  Share2,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { CinematicPlayer } from "@/components/cinematic/cinematic-player";
import { characterBySlug, characters, regionBySlug } from "@/data";
import { useProgress } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ConnectResultSkeleton } from "@/components/ui/screen-skeletons";
import { GraphLegend } from "@/components/graph/graph-legend";
import { INSPIRATION_PAIRS } from "@/lib/connect/inspiration";
import { EntityPortrait } from "@/components/entity-portrait";
import { ChampionSelect } from "./champion-select";
import { ConnectionGraph } from "./connection-graph";
import { ConnectionStep } from "./connection-step";
import { DailyConnection } from "./daily-connection";
import { ShareCardDialog } from "./share-card";
import { track } from "@/lib/analytics";
import { findPaths, pathNarrative } from "@/lib/graph";
import { buildConnectionJourney } from "@/lib/journey";
import {
  connectionDepthLabel,
  indirectPathDisclaimer,
} from "@/lib/truth/layer";
import { absoluteUrl } from "@/lib/seo";
import { cn, hexToRgba } from "@/lib/utils";
import type { Character, GraphPath, PathStrategy } from "@/types";

const STRATEGY_COPY: Record<PathStrategy, { label: string; hint: string }> = {
  narrative: {
    label: "Best story",
    hint: "Favours major, well-documented relationships",
  },
  shortest: { label: "Shortest", hint: "Fewest connections" },
  alternative: { label: "Alternative", hint: "A different route through the graph" },
};

const STRATEGY_ORDER: PathStrategy[] = ["narrative", "shortest", "alternative"];

const REVEAL_MS = 520;

export function ConnectExperience({
  initialA,
  initialB,
  initialPaths,
  daily,
}: {
  initialA: string | null;
  initialB: string | null;
  initialPaths: GraphPath[];
  daily: { date: string; aSlug: string; bSlug: string; path: GraphPath | null };
}) {
  const searchParams = useSearchParams();
  const { recordConnectionSearch, recordConnectionFound, markOnboarding, progress } =
    useProgress();
  const reduceMotion = useReducedMotion();
  const [cinematicOpen, setCinematicOpen] = React.useState(false);

  const [a, setA] = React.useState<Character | null>(
    () => (initialA ? characterBySlug.get(initialA) : null) ?? null,
  );
  const [b, setB] = React.useState<Character | null>(
    () => (initialB ? characterBySlug.get(initialB) : null) ?? null,
  );
  const [paths, setPaths] = React.useState<GraphPath[]>(initialPaths);
  const [resultFor, setResultFor] = React.useState<string | null>(
    initialPaths.length > 0 && initialA && initialB ? `${initialA}:${initialB}` : null,
  );
  const [strategy, setStrategy] = React.useState<PathStrategy>("narrative");
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [revealedSteps, setRevealedSteps] = React.useState(
    initialPaths.length > 0 ? Infinity : 0,
  );
  const revealInstant = reduceMotion ?? false;
  const resultsRef = React.useRef<HTMLDivElement | null>(null);

  const pairKey = a && b ? `${a.slug}:${b.slug}` : null;
  const stale = pairKey !== resultFor;

  const available = React.useMemo(() => {
    const map = new Map<PathStrategy, GraphPath>();
    for (const path of paths) map.set(path.strategy, path);
    return map;
  }, [paths]);

  const active = available.get(strategy) ?? paths[0] ?? null;

  const partialPath = React.useMemo(() => {
    if (!active || revealedSteps === Infinity) return active;
    if (revealedSteps <= 0) return null;
    const nodes = active.nodes.slice(0, revealedSteps + 1);
    const steps = active.steps.slice(0, revealedSteps);
    return { ...active, nodes, steps, length: steps.length };
  }, [active, revealedSteps]);

  const run = React.useCallback(
    (from: Character, to: Character, options: { scroll?: boolean } = {}) => {
      setSearching(true);
      const found = findPaths(from.id, to.id);
      setRevealedSteps(revealInstant ? Infinity : 0);
      setPaths(found);
      setResultFor(`${from.slug}:${to.slug}`);
      setStrategy(found.some((p) => p.strategy === "narrative") ? "narrative" : "shortest");
      setActiveStep(null);
      setSearching(false);

      window.history.replaceState(
        null,
        "",
        `/connect?from=${from.slug}&to=${to.slug}`,
      );

      recordConnectionSearch();
      markOnboarding("ranFirstConnection");
      if (found.length > 0) recordConnectionFound();
      track({
        name: "connection_search",
        from: from.slug,
        to: to.slug,
        strategy: "all",
        hops: found[0]?.length ?? null,
        found: found.length > 0,
      });

      if (options.scroll) {
        window.setTimeout(
          () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          80,
        );
      }
    },
    [markOnboarding, recordConnectionFound, recordConnectionSearch, revealInstant],
  );

  // Progressive reveal: one hop at a time (skipped when prefers-reduced-motion).
  React.useEffect(() => {
    if (!active || stale || revealInstant) return;
    if (revealedSteps >= active.steps.length) return;
    const timer = window.setTimeout(() => {
      setRevealedSteps((n) => n + 1);
    }, REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, stale, revealedSteps, revealInstant]);

  const completedRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!active || stale || revealedSteps < active.steps.length) return;
    const key = `${active.nodes[0]?.slug}:${active.nodes.at(-1)?.slug}:${active.strategy}`;
    if (completedRef.current === key) return;
    completedRef.current = key;
    track({
      name: "connection_complete",
      from: active.nodes[0]?.slug ?? "",
      to: active.nodes.at(-1)?.slug ?? "",
      strategy: active.strategy,
      hops: active.length,
      found: true,
    });
  }, [active, stale, revealedSteps]);

  const tryAnother = () => {
    const pick = () => characters[Math.floor(Math.random() * characters.length)];
    const from = pick();
    let to = pick();
    while (to.id === from.id) to = pick();
    setA(from);
    setB(to);
    run(from, to, { scroll: true });
  };

  const openPair = (fromSlug: string, toSlug: string) => {
    const from = characterBySlug.get(fromSlug);
    const to = characterBySlug.get(toSlug);
    if (!from || !to) return;
    setA(from);
    setB(to);
    run(from, to, { scroll: true });
  };

  const dailyA = characterBySlug.get(daily.aSlug);
  const dailyB = characterBySlug.get(daily.bSlug);
  const showFirstRunHint = !progress.onboarding.ranFirstConnection && !active;
  const revealing = active && !stale && revealedSteps < (active.steps.length ?? 0);
  const narrative = active ? pathNarrative(active.steps) : [];

  const connectionJourney = React.useMemo(() => {
    if (!a || !b || !active) return null;
    return buildConnectionJourney(a, b, active);
  }, [a, b, active]);

  const cinematicReady =
    Boolean(connectionJourney) &&
    active &&
    !stale &&
    revealedSteps >= (active?.steps.length ?? 0);

  React.useEffect(() => {
    if (searchParams.get("cinematic") !== "1" || !cinematicReady) return;
    const timer = window.setTimeout(() => setCinematicOpen(true), revealInstant ? 0 : 400);
    return () => window.clearTimeout(timer);
  }, [searchParams, cinematicReady, revealInstant]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <header className="max-w-2xl">
        <p className="text-eyebrow text-gold">Connect</p>
        <h1 className="text-monument mt-3 text-[clamp(2.25rem,7vw,3.5rem)]">
          Connect two champions.
        </h1>
        <p className="text-muted mt-3 text-base leading-relaxed">
          Find how their stories link — through allies, rivals, factions and the
          events that shaped Runeterra.
        </p>
      </header>

      <div className="panel mt-8 p-4 sm:mt-10 sm:p-6">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-6">
          <ChampionSlot label="From" character={a} />
          <ChampionSlot label="To" character={b} />
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:gap-4">
          <ChampionSelect
            label="From"
            value={a}
            onChange={setA}
            exclude={b?.id ?? null}
            accent={a?.accentColor}
          />
          <div
            aria-hidden
            className="text-muted-dim flex shrink-0 items-center justify-center pb-0 sm:pb-6"
          >
            <ArrowRight className="size-5 rotate-90 sm:rotate-0" />
          </div>
          <ChampionSelect
            label="To"
            value={b}
            onChange={setB}
            exclude={a?.id ?? null}
            accent={b?.accentColor}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="primary"
            size="lg"
            disabled={!a || !b || searching}
            onClick={() => a && b && run(a, b, { scroll: true })}
            className="w-full sm:min-w-56 sm:w-auto"
          >
            <Search aria-hidden />
            Find their connection
          </Button>
          <Button variant="ghost" size="lg" onClick={tryAnother} className="w-full sm:w-auto">
            <Shuffle aria-hidden />
            Surprise me
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-eyebrow text-muted-dim">Try</span>
          {INSPIRATION_PAIRS.map((pair) => {
            const from = characterBySlug.get(pair.from);
            const to = characterBySlug.get(pair.to);
            if (!from || !to) return null;
            return (
              <button
                key={`${pair.from}-${pair.to}`}
                type="button"
                onClick={() => openPair(pair.from, pair.to)}
                className="text-eyebrow rounded-full border border-line px-3 py-1.5 text-parchment/90 transition-colors hover:border-gold/40 hover:text-gold"
              >
                {from.name} → {to.name}
              </button>
            );
          })}
        </div>

        {showFirstRunHint ? (
          <p className="text-muted mt-4 flex items-start gap-2 text-sm">
            <Sparkles className="text-gold mt-0.5 size-3.5 shrink-0" aria-hidden />
            Pick two champions — the graph finds the story between them.
          </p>
        ) : null}
      </div>

      <div ref={resultsRef} className="scroll-mt-24">
        {searching ? <ConnectResultSkeleton /> : null}

        {partialPath && !stale && !searching ? (
          <motion.section
            className="mt-10 sm:mt-14"
            aria-live="polite"
            initial={false}
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-eyebrow text-muted">Connection</p>
                <h2 className="text-monument mt-2 text-[clamp(1.75rem,5vw,2.75rem)]">
                  {a?.name}
                  <span className="text-muted mx-2 font-sans text-lg">→</span>
                  {b?.name}
                </h2>
              </div>

              <div
                role="group"
                aria-label="Path strategy"
                className="flex flex-wrap gap-1.5"
              >
                {STRATEGY_ORDER.filter((key) => available.has(key)).map((key) => {
                  const path = available.get(key)!;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setStrategy(key);
                        setRevealedSteps(revealInstant ? Infinity : 0);
                      }}
                      aria-pressed={strategy === key}
                      title={STRATEGY_COPY[key].hint}
                      className={cn(
                        "text-label rounded-full border px-3.5 py-2 transition-colors",
                        strategy === key
                          ? "border-gold/50 bg-gold/12 text-gold"
                          : "text-muted hover:text-parchment border-line",
                      )}
                    >
                      {STRATEGY_COPY[key].label}
                      <span className="text-muted-dim ml-1.5 tabular-nums">
                        {path.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-muted mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span>
                <strong className="text-parchment font-medium">{active!.length}</strong>{" "}
                {active!.length === 1 ? "step" : "steps"}
              </span>
              <span>
                {active!.directOnly ? "Direct relationship" : "Indirect connection"}
              </span>
              <span>{connectionDepthLabel(active!.length, active!.directOnly)}</span>
              {revealing ? (
                <span className="text-gold">Mapping route…</span>
              ) : null}
            </div>

            <div className="panel mt-6 px-2 py-6 sm:px-6 sm:py-10">
              <ConnectionGraph
                path={partialPath}
                activeStep={activeStep}
                onStepFocus={setActiveStep}
              />
            </div>

            <GraphLegend className="mt-4" />

            {!revealing && active && a && b ? (
              (() => {
                const disclaimer = indirectPathDisclaimer(
                  a.name,
                  b.name,
                  active.steps.map((s) => s.edge),
                );
                return disclaimer ? (
                  <p className="text-muted mt-6 rounded-[var(--radius-card)] border border-line bg-white/[0.02] p-4 text-sm leading-relaxed">
                    <span className="text-eyebrow text-gold block mb-1">
                      Indirect lore connection
                    </span>
                    {disclaimer}
                  </p>
                ) : null;
              })()
            ) : null}

            <ol className="mt-8 space-y-2.5">
              {partialPath.steps.map((step, index) => (
                <ConnectionStep
                  key={`${step.edge.id}-${index}`}
                  step={step}
                  index={index}
                  active={activeStep === index}
                  onFocus={setActiveStep}
                />
              ))}
            </ol>

            {!revealing && narrative.length > 0 ? (
              <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-parchment text-xl">
                    Can you find a shorter path?
                  </p>
                  <p className="text-muted mt-1 text-sm">
                    Share this connection or try another pair.
                  </p>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
                  <Button
                    variant="primary"
                    onClick={() => setCinematicOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    <Play aria-hidden />
                    Play connection
                  </Button>
                  <Button variant="secondary" onClick={tryAnother} className="w-full sm:w-auto">
                    <Shuffle aria-hidden />
                    Try another
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShareOpen(true);
                      track({
                        name: "connection_share",
                        from: active!.nodes[0].slug,
                        to: active!.nodes[active!.nodes.length - 1].slug,
                        format: "dialog",
                      });
                    }}
                    className="w-full sm:w-auto"
                  >
                    <Share2 aria-hidden />
                    Share result
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.section>
        ) : !searching && a && b && stale ? null : !searching && !partialPath ? (
          <section className="panel mt-10">
            <EmptyState
              icon={Route}
              title="Pick two champions to begin."
              description="Every path is built from documented relationships, factions, regions and events — with an explanation at every step."
              action={
                <Button variant="outline" onClick={tryAnother}>
                  Surprise me
                  <ArrowRight aria-hidden />
                </Button>
              }
            />
          </section>
        ) : null}

        {a && b && !stale && paths.length === 0 && !searching ? (
          <section className="panel mt-10">
            <EmptyState
              icon={Route}
              title="No meaningful path has been mapped yet."
              description={`Nothing in the current archive connects ${a.name} and ${b.name}. Try another pair.`}
              action={
                <Button variant="outline" onClick={tryAnother}>
                  Try another pair
                </Button>
              }
            />
          </section>
        ) : null}
      </div>

      {dailyA && dailyB ? (
        <div className="mt-14 sm:mt-20">
          <DailyConnection
            date={daily.date}
            a={dailyA}
            b={dailyB}
            path={daily.path}
            onOpenInConnect={(from, to) => {
              setA(from);
              setB(to);
              run(from, to, { scroll: true });
            }}
          />
        </div>
      ) : null}

      {active && !revealing ? (
        <ShareCardDialog
          open={shareOpen}
          onOpenChange={setShareOpen}
          path={active}
          shareUrl={absoluteUrl(
            `/connect?from=${active.nodes[0].slug}&to=${active.nodes[active.nodes.length - 1].slug}`,
          )}
          accentFrom={active.nodes[0].metadata.accentColor}
          accentTo={active.nodes[active.nodes.length - 1].metadata.accentColor}
        />
      ) : null}

      <CinematicPlayer
        journey={connectionJourney}
        open={cinematicOpen}
        onClose={() => setCinematicOpen(false)}
        initialFormat={
          searchParams.get("format") === "vertical" ? "portrait" : "landscape"
        }
        initialRecording={searchParams.get("recording") === "1"}
      />
    </div>
  );
}

function ChampionSlot({
  label,
  character,
}: {
  label: string;
  character: Character | null;
}) {
  const region = character ? regionBySlug.get(character.region) : undefined;

  return (
    <div
      className={cn(
        "flex min-h-[9.5rem] flex-col items-center justify-center rounded-[var(--radius-card)] border p-4 text-center transition-colors sm:min-h-[11rem]",
        character
          ? "border-line-strong bg-white/[0.03]"
          : "border-dashed border-line bg-white/[0.02]",
      )}
      style={
        character
          ? {
              background: `linear-gradient(180deg, ${hexToRgba(character.accentColor, 0.12)} 0%, rgba(16,21,33,0.5) 100%)`,
            }
          : undefined
      }
    >
      <span className="text-eyebrow text-muted">{label}</span>
      {character ? (
        <>
          <EntityPortrait
            assetKey={character.assetKey}
            name={character.name}
            accentColor={character.accentColor}
            className="mt-3 size-20 sm:size-24"
            sizes="96px"
          />
          <p className="text-monument text-parchment mt-3 truncate text-xl sm:text-2xl">
            {character.name}
          </p>
          <p className="text-muted mt-1 truncate text-xs">
            {region?.name ?? character.title}
          </p>
        </>
      ) : (
        <p className="text-muted mt-4 text-sm">Select champion</p>
      )}
    </div>
  );
}
