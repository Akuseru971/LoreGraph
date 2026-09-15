"use client";

import { ArrowRight, Route, Search, Share2, Shuffle, Sparkles } from "lucide-react";
import * as React from "react";
import { characterBySlug, characters } from "@/data";
import { useProgress } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { GraphLegend } from "@/components/graph/graph-legend";
import { ChampionSelect } from "./champion-select";
import { ConnectionGraph } from "./connection-graph";
import { ConnectionStep } from "./connection-step";
import { DailyConnection } from "./daily-connection";
import { ShareCardDialog } from "./share-card";
import { track } from "@/lib/analytics";
import { findPaths } from "@/lib/graph";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Character, GraphPath, PathStrategy } from "@/types";

const STRATEGY_COPY: Record<PathStrategy, { label: string; hint: string }> = {
  narrative: {
    label: "Best story",
    hint: "Favours major, well-documented relationships",
  },
  shortest: { label: "Shortest", hint: "Fewest connections, whatever they are" },
  alternative: { label: "Alternative", hint: "A different route through the graph" },
};

const STRATEGY_ORDER: PathStrategy[] = ["narrative", "shortest", "alternative"];

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
  const { recordConnectionSearch, recordConnectionFound, markOnboarding, progress } =
    useProgress();

  const [a, setA] = React.useState<Character | null>(
    () => (initialA ? characterBySlug.get(initialA) : null) ?? null,
  );
  const [b, setB] = React.useState<Character | null>(
    () => (initialB ? characterBySlug.get(initialB) : null) ?? null,
  );
  const [paths, setPaths] = React.useState<GraphPath[]>(initialPaths);
  /** The pair the current result belongs to, so stale results never linger. */
  const [resultFor, setResultFor] = React.useState<string | null>(
    initialPaths.length > 0 && initialA && initialB ? `${initialA}:${initialB}` : null,
  );
  const [strategy, setStrategy] = React.useState<PathStrategy>("narrative");
  const [activeStep, setActiveStep] = React.useState<number | null>(null);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const resultsRef = React.useRef<HTMLDivElement | null>(null);

  const pairKey = a && b ? `${a.slug}:${b.slug}` : null;
  const stale = pairKey !== resultFor;

  const available = React.useMemo(() => {
    const map = new Map<PathStrategy, GraphPath>();
    for (const path of paths) map.set(path.strategy, path);
    return map;
  }, [paths]);

  const active = available.get(strategy) ?? paths[0] ?? null;

  const run = React.useCallback(
    (from: Character, to: Character, options: { scroll?: boolean } = {}) => {
      setSearching(true);
      const found = findPaths(from.id, to.id);
      setPaths(found);
      setResultFor(`${from.slug}:${to.slug}`);
      setStrategy(found.some((p) => p.strategy === "narrative") ? "narrative" : "shortest");
      setActiveStep(null);
      setSearching(false);

      // Shareable without a navigation: the URL always describes what is shown.
      window.history.replaceState(
        null,
        "",
        `/connect?a=${from.slug}&b=${to.slug}`,
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
    [markOnboarding, recordConnectionFound, recordConnectionSearch],
  );

  const tryAnother = () => {
    const pick = () => characters[Math.floor(Math.random() * characters.length)];
    const from = pick();
    let to = pick();
    while (to.id === from.id) to = pick();
    setA(from);
    setB(to);
    run(from, to, { scroll: true });
  };

  const openPair = (from: Character, to: Character) => {
    setA(from);
    setB(to);
    run(from, to, { scroll: true });
  };

  const dailyA = characterBySlug.get(daily.aSlug);
  const dailyB = characterBySlug.get(daily.bSlug);
  const showFirstRunHint = !progress.onboarding.ranFirstConnection && !active;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <header className="max-w-2xl">
        <p className="text-eyebrow text-gold">Connect</p>
        <h1 className="text-monument mt-3 text-[clamp(2.25rem,7vw,4rem)]">
          Connect any two champions.
        </h1>
        <p className="text-muted mt-4 text-base leading-relaxed sm:text-lg">
          Discover the shortest path between their stories — and the one that
          actually reads like a story.
        </p>
      </header>

      {/* ------------------------------------------------------- pickers */}
      <div className="panel mt-8 p-4 sm:mt-10 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
          <ChampionSelect
            label="Champion A"
            value={a}
            onChange={setA}
            exclude={b?.id ?? null}
            accent={a?.accentColor}
          />
          <span
            aria-hidden
            className="text-muted-dim hidden shrink-0 pb-6 text-sm sm:block"
          >
            ↔
          </span>
          <ChampionSelect
            label="Champion B"
            value={b}
            onChange={setB}
            exclude={a?.id ?? null}
            accent={b?.accentColor}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <Button
            variant="primary"
            size="lg"
            disabled={!a || !b || searching}
            onClick={() => a && b && run(a, b, { scroll: true })}
            className="sm:min-w-56"
          >
            <Search aria-hidden />
            {stale || !active ? "Find connection" : "Recalculate"}
          </Button>
          <Button variant="ghost" size="lg" onClick={tryAnother}>
            <Shuffle aria-hidden />
            Surprise me
          </Button>
        </div>

        {showFirstRunHint ? (
          <p className="text-muted mt-4 flex items-start gap-2 text-sm">
            <Sparkles className="text-gold mt-0.5 size-3.5 shrink-0" aria-hidden />
            Pick someone you know — the graph does the rest.
          </p>
        ) : null}
      </div>

      {/* ------------------------------------------------------- results */}
      <div ref={resultsRef} className="scroll-mt-24">
        {active && !stale ? (
          <section className="mt-10 sm:mt-14" aria-live="polite">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-eyebrow text-muted">Result</p>
                <h2 className="text-monument mt-2 text-[clamp(1.75rem,5vw,2.75rem)]">
                  {active.length} {active.length === 1 ? "connection" : "connections"}
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
                      onClick={() => setStrategy(key)}
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

            <p className="text-muted mt-2 text-sm">
              {STRATEGY_COPY[active.strategy].hint} · story score {active.score}/100
              {active.directOnly ? " · every hop is a direct relationship" : ""}
            </p>

            <div className="panel mt-6 px-2 py-6 sm:px-6 sm:py-10">
              <ConnectionGraph
                path={active}
                activeStep={activeStep}
                onStepFocus={setActiveStep}
              />
            </div>

            <GraphLegend className="mt-4" />

            <ol className="mt-8 space-y-2.5">
              {active.steps.map((step, index) => (
                <ConnectionStep
                  key={`${step.edge.id}-${index}`}
                  step={step}
                  index={index}
                  active={activeStep === index}
                  onFocus={setActiveStep}
                />
              ))}
            </ol>

            <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-parchment text-xl">
                  Can you find a shorter path?
                </p>
                <p className="text-muted mt-1 text-sm">
                  Try a different pair, or send this one to someone who thinks
                  they know the lore.
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="secondary" onClick={tryAnother}>
                  <Shuffle aria-hidden />
                  Try another
                </Button>
                <Button variant="primary" onClick={() => setShareOpen(true)}>
                  <Share2 aria-hidden />
                  Share result
                </Button>
              </div>
            </div>
          </section>
        ) : a && b && stale ? null : !active ? (
          <section className="panel mt-10">
            <EmptyState
              icon={Route}
              title="Pick two champions to begin."
              description="Every path is built from documented relationships, shared factions, regions and events — and each step is explained."
              action={
                <Button variant="outline" onClick={tryAnother}>
                  Surprise me
                  <ArrowRight aria-hidden />
                </Button>
              }
            />
          </section>
        ) : null}

        {a && b && !stale && paths.length === 0 ? (
          <section className="panel mt-10">
            <EmptyState
              icon={Route}
              title="The archives couldn't find a meaningful path yet."
              description={`Nothing in the current seed links ${a.name} and ${b.name}. Try another pair — most of Runeterra is closer than it looks.`}
              action={
                <Button variant="outline" onClick={tryAnother}>
                  Try another pair
                </Button>
              }
            />
          </section>
        ) : null}
      </div>

      {/* --------------------------------------------------------- daily */}
      {dailyA && dailyB ? (
        <div className="mt-14 sm:mt-20">
          <DailyConnection
            date={daily.date}
            a={dailyA}
            b={dailyB}
            path={daily.path}
            onOpenInConnect={openPair}
          />
        </div>
      ) : null}

      {active ? (
        <ShareCardDialog
          open={shareOpen}
          onOpenChange={setShareOpen}
          path={active}
          shareUrl={absoluteUrl(
            `/connect?a=${active.nodes[0].slug}&b=${active.nodes[active.nodes.length - 1].slug}`,
          )}
          accentFrom={active.nodes[0].metadata.accentColor}
          accentTo={active.nodes[active.nodes.length - 1].metadata.accentColor}
        />
      ) : null}
    </div>
  );
}
