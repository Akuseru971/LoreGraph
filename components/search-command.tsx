"use client";

import { Command } from "cmdk";
import { CornerDownLeft, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { trendingCharacterSlugs, characterBySlug } from "@/data";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { EntityPortrait } from "@/components/entity-portrait";
import { useSearchDialog } from "@/components/providers";
import { track } from "@/lib/analytics";
import { searchLore } from "@/lib/data/lore-repository";
import { hexToRgba } from "@/lib/utils";
import type { EntityType, SearchResult } from "@/types";

const TYPE_LABEL: Record<EntityType, string> = {
  character: "Champion",
  region: "Region",
  faction: "Faction",
  event: "Event",
  location: "Location",
  concept: "Concept",
};

export function SearchCommand() {
  const { open, setOpen } = useSearchDialog();
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const results = React.useMemo<SearchResult[]>(
    () => (query.trim().length > 0 ? searchLore(query, 14) : []),
    [query],
  );

  const suggestions = React.useMemo(
    () =>
      trendingCharacterSlugs
        .map((slug) => characterBySlug.get(slug))
        .filter((c): c is NonNullable<typeof c> => Boolean(c)),
    [],
  );

  const onSelect = (result: { href: string; id: string }) => {
    track({ name: "search_result_click", query, resultId: result.id });
    setQuery("");
    setOpen(false);
    router.push(result.href);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setQuery("");
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink-deep/80 backdrop-blur-md" />
        <DialogPrimitive.Content className="fixed top-[12vh] left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-xl -translate-x-1/2 focus:outline-none">
          <DialogTitle className="sr-only">Search Runeterra</DialogTitle>
          <Command
            loop
            className="panel overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="text-muted size-4 shrink-0" aria-hidden />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                autoFocus
                placeholder="Search a champion, faction or event…"
                className="text-parchment placeholder:text-muted h-14 w-full bg-transparent text-[0.9375rem] outline-none"
              />
              <kbd className="text-eyebrow text-muted hidden shrink-0 rounded border border-line px-1.5 py-1 sm:block">
                ESC
              </kbd>
            </div>

            <Command.List className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-4 py-10 text-center">
                <p className="font-display text-parchment text-lg">
                  No story begins with that name.
                </p>
                <p className="text-muted mt-1 text-sm">
                  Try a region, a faction, or part of a title.
                </p>
              </Command.Empty>

              {query.trim().length === 0 ? (
                <Command.Group
                  heading="Start here"
                  className="[&_[cmdk-group-heading]]:text-eyebrow [&_[cmdk-group-heading]]:text-muted [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-2"
                >
                  {suggestions.map((character) => (
                    <Command.Item
                      key={character.id}
                      value={`${character.name} ${character.title}`}
                      onSelect={() =>
                        onSelect({
                          href: `/champion/${character.slug}`,
                          id: character.id,
                        })
                      }
                      className="data-[selected=true]:bg-white/[0.06] flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2"
                    >
                      <EntityPortrait
                        assetKey={character.assetKey}
                        name={character.name}
                        accentColor={character.accentColor}
                        className="size-9 shrink-0"
                        sizes="36px"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="text-parchment block truncate text-sm">
                          {character.name}
                        </span>
                        <span className="text-muted block truncate text-xs">
                          {character.title}
                        </span>
                      </span>
                      <Sparkles className="text-gold/60 size-3.5" aria-hidden />
                    </Command.Item>
                  ))}
                </Command.Group>
              ) : (
                <Command.Group
                  heading={`${results.length} result${results.length === 1 ? "" : "s"}`}
                  className="[&_[cmdk-group-heading]]:text-eyebrow [&_[cmdk-group-heading]]:text-muted [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-2"
                >
                  {results.map((result) => (
                    <Command.Item
                      key={result.id}
                      value={`${result.name} ${result.subtitle} ${result.type}`}
                      onSelect={() => onSelect(result)}
                      className="data-[selected=true]:bg-white/[0.06] group flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2"
                    >
                      {result.assetKey ? (
                        <EntityPortrait
                          assetKey={result.assetKey}
                          name={result.name}
                          accentColor={result.accentColor}
                          className="size-9 shrink-0"
                          sizes="36px"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="grid size-9 shrink-0 place-items-center rounded-md border text-[10px] font-semibold"
                          style={{
                            borderColor: hexToRgba(result.accentColor, 0.35),
                            backgroundColor: hexToRgba(result.accentColor, 0.1),
                            color: result.accentColor,
                          }}
                        >
                          {TYPE_LABEL[result.type].slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="text-parchment block truncate text-sm">
                          {result.name}
                        </span>
                        <span className="text-muted block truncate text-xs">
                          {TYPE_LABEL[result.type]} · {result.subtitle}
                        </span>
                      </span>
                      <CornerDownLeft
                        className="text-muted size-3.5 opacity-0 group-data-[selected=true]:opacity-100"
                        aria-hidden
                      />
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>

            <div className="text-eyebrow text-muted flex items-center justify-between border-t border-line px-4 py-2.5">
              <span>↑ ↓ to navigate · ⏎ to open</span>
              <span className="hidden sm:inline">RUNETERRA</span>
            </div>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}
