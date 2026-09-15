"use client";

import { ArrowRight, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  characters,
  factionBySlug,
  featuredRegionSlugs,
  regionBySlug,
  storyPaths,
  trendingCharacterSlugs,
} from "@/data";
import { CharacterCard } from "@/components/character-card";
import { ConnectHeroDemo } from "@/components/discover/connect-hero-demo";
import { HeroConstellation } from "@/components/discover/hero-constellation";
import { useSearchDialog } from "@/components/providers";
import { StoryPathCard } from "@/components/story/story-path-card";
import { StoryPathPlayer } from "@/components/story/story-path-player";
import { RegionIcon } from "@/components/region-badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { track } from "@/lib/analytics";
import { countConnections } from "@/lib/graph";
import { cn, hexToRgba } from "@/lib/utils";
import type { RegionSlug, StoryPath } from "@/types";

type SortMode = "trending" | "alphabetical" | "complexity";

export function DiscoverScreen({
  initialRegion,
  initialFaction,
}: {
  initialRegion?: RegionSlug | null;
  initialFaction?: string | null;
}) {
  const { openSearch } = useSearchDialog();
  const [region, setRegion] = React.useState<RegionSlug | null>(
    initialRegion ?? null,
  );
  const [faction, setFaction] = React.useState<string | null>(
    initialFaction ?? null,
  );
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortMode>("trending");
  const [story, setStory] = React.useState<StoryPath | null>(null);

  const trending = React.useMemo(
    () =>
      trendingCharacterSlugs
        .map((slug) => characters.find((c) => c.slug === slug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c)),
    [],
  );

  const featuredStories = React.useMemo(
    () => storyPaths.filter((p) => p.featured).slice(0, 8),
    [],
  );

  const filtered = React.useMemo(() => {
    let list = [...characters];
    const needle = query.trim().toLowerCase();

    if (region) list = list.filter((c) => c.region === region);
    if (faction) list = list.filter((c) => c.factions.includes(faction));
    if (needle) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(needle) ||
          c.title.toLowerCase().includes(needle) ||
          c.aliases.some((a) => a.toLowerCase().includes(needle)),
      );
    }

    switch (sort) {
      case "alphabetical":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "complexity":
        list.sort((a, b) => b.loreComplexity - a.loreComplexity);
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [region, faction, query, sort]);

  const selectRegion = (slug: RegionSlug | null) => {
    setRegion(slug);
    if (slug) track({ name: "region_filter", region: slug });
  };

  const factionOptions = React.useMemo(() => {
    const ids = new Set<string>();
    for (const character of characters) {
      for (const id of character.factions) ids.add(id);
    }
    return Array.from(ids)
      .map((id) => factionBySlug.get(id.replace("faction:", "")))
      .filter((f): f is NonNullable<typeof f> => Boolean(f))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <HeroConstellation className="pointer-events-none absolute inset-0 hidden opacity-70 md:block" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink md:via-ink/60"
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
          <p className="text-eyebrow text-gold animate-fade-up">Runeterra</p>
          <h1 className="text-monument mt-4 max-w-3xl animate-fade-up text-[clamp(2.75rem,9vw,5.5rem)] [animation-delay:60ms]">
            Understand Runeterra.
          </h1>
          <p className="text-muted mt-5 max-w-xl animate-fade-up text-base leading-relaxed sm:text-lg [animation-delay:120ms]">
            Every character. Every conflict. Every connection.
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row [animation-delay:180ms]">
            <button
              type="button"
              onClick={() => openSearch("click")}
              className="text-muted hover:text-parchment flex h-12 w-full max-w-md items-center gap-3 rounded-full border border-line-strong bg-white/[0.04] px-5 text-left transition-colors hover:border-gold/35 sm:flex-1"
            >
              <Search className="size-4 shrink-0" aria-hidden />
              <span className="truncate text-sm">
                Search a champion, faction or event…
              </span>
              <kbd className="text-eyebrow ml-auto hidden rounded border border-line px-1.5 py-0.5 sm:inline">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="mt-6 flex animate-fade-up flex-wrap gap-2.5 [animation-delay:240ms]">
            <Button asChild variant="primary" size="lg">
              <Link href="/connect">
                Connect champions
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/me">Daily Lore</Link>
            </Button>
          </div>
        </div>

        <ConnectHeroDemo />
      </section>

      {/* --------------------------------------------------------- trending */}
      <section
        aria-labelledby="trending-heading"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="trending-heading" className="font-display text-parchment text-2xl sm:text-3xl">
            Featured champions
          </h2>
          <span className="text-eyebrow text-muted-dim hidden sm:inline">
            Start here
          </span>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((character, index) => (
            <li key={character.id} className={index >= 4 ? "hidden lg:block" : ""}>
              <CharacterCard
                character={character}
                connections={countConnections(character.id)}
                size="lg"
                priority={index < 2}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------------- regions */}
      <section
        aria-labelledby="regions-heading"
        className="mx-auto mt-20 w-full max-w-6xl px-4 sm:px-6"
      >
        <h2 id="regions-heading" className="font-display text-parchment text-2xl sm:text-3xl">
          Explore by region
        </h2>
        <p className="text-muted mt-2 text-sm">
          Filter the champion grid below — no separate region pages.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectRegion(null)}
            aria-pressed={region === null}
            className={cn(
              "text-label rounded-full border px-3.5 py-2 transition-colors",
              region === null
                ? "border-gold/50 bg-gold/12 text-gold"
                : "text-muted hover:text-parchment border-line",
            )}
          >
            All regions
          </button>
          {featuredRegionSlugs.map((slug) => {
            const meta = regionBySlug.get(slug);
            if (!meta) return null;
            const active = region === slug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => selectRegion(slug)}
                aria-pressed={active}
                className={cn(
                  "text-label inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 transition-colors",
                  active
                    ? "text-parchment"
                    : "text-muted hover:text-parchment border-line",
                )}
                style={
                  active
                    ? {
                        borderColor: hexToRgba(meta.accentColor, 0.5),
                        backgroundColor: hexToRgba(meta.accentColor, 0.12),
                        color: meta.accentColor,
                      }
                    : undefined
                }
              >
                <RegionIcon slug={slug} className="size-3" />
                {meta.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- story paths */}
      <section
        aria-labelledby="stories-heading"
        className="mx-auto mt-20 w-full max-w-6xl px-4 sm:px-6"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="stories-heading" className="font-display text-parchment text-2xl sm:text-3xl">
            Story paths
          </h2>
          <span className="text-eyebrow text-muted-dim flex items-center gap-1.5">
            <Sparkles className="size-3" aria-hidden />
            Guided reads
          </span>
        </div>

        <div className="scrollbar-none -mx-4 mt-6 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {featuredStories.map((path) => (
            <StoryPathCard key={path.id} path={path} onOpen={setStory} />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- all champions */}
      <section
        aria-labelledby="champions-heading"
        className="mx-auto mt-20 w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28"
      >
        <h2 id="champions-heading" className="font-display text-parchment text-2xl sm:text-3xl">
          Explore all champions
        </h2>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search champions</span>
            <Search
              className="text-muted pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter by name…"
              className="text-parchment placeholder:text-muted h-11 w-full rounded-full border border-line bg-white/[0.03] pr-4 pl-10 text-sm outline-none focus:border-gold/40"
            />
          </label>

          <select
            value={faction ?? ""}
            onChange={(event) => setFaction(event.target.value || null)}
            aria-label="Filter by faction"
            className="text-muted h-11 rounded-full border border-line bg-white/[0.03] px-4 text-sm outline-none focus:border-gold/40"
          >
            <option value="">All factions</option>
            {factionOptions.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
            aria-label="Sort champions"
            className="text-muted h-11 rounded-full border border-line bg-white/[0.03] px-4 text-sm outline-none focus:border-gold/40"
          >
            <option value="trending">Trending</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="complexity">Lore complexity</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="panel mt-8">
            <EmptyState
              title="No story begins with that name."
              description="Try clearing your filters or search for a region instead."
            />
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((character) => (
              <li key={character.id}>
                <CharacterCard
                  character={character}
                  connections={countConnections(character.id)}
                />
              </li>
            ))}
          </ul>
        )}

        <p className="text-eyebrow text-muted-dim mt-6 text-center">
          {filtered.length} of {characters.length} champions
          {region ? ` · ${regionBySlug.get(region)?.name}` : ""}
        </p>
      </section>

      <StoryPathPlayer path={story} onClose={() => setStory(null)} />
    </>
  );
}
