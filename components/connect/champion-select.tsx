"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { ChevronDown, Search, Shuffle } from "lucide-react";
import * as React from "react";
import { characters, regionBySlug } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { cn, hexToRgba } from "@/lib/utils";
import type { Character } from "@/types";

/**
 * Large champion selector used by Connect. Opens a searchable list rather than
 * a native select so it stays keyboard-first and looks the same everywhere.
 */
export function ChampionSelect({
  label,
  value,
  onChange,
  exclude,
  accent = "#C9A96E",
}: {
  label: string;
  value: Character | null;
  onChange: (character: Character) => void;
  exclude?: string | null;
  accent?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const options = React.useMemo(
    () =>
      characters
        .filter((c) => c.id !== exclude)
        .sort((a, b) => b.popularity - a.popularity),
    [exclude],
  );

  const pickRandom = () => {
    const pool = options.filter((c) => c.id !== value?.id);
    const next = pool[Math.floor(Math.random() * pool.length)];
    if (next) onChange(next);
  };

  const region = value ? regionBySlug.get(value.region) : undefined;

  return (
    <div className="flex-1">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="text-eyebrow text-muted">{label}</span>
        <button
          type="button"
          onClick={pickRandom}
          className="text-eyebrow text-muted-dim hover:text-gold inline-flex items-center gap-1.5 transition-colors"
        >
          <Shuffle className="size-3" aria-hidden />
          Random
        </button>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${label}: ${value ? value.name : "choose a champion"}`}
        className={cn(
          "group flex w-full items-center gap-3.5 rounded-[var(--radius-card)] border p-3 text-left transition-all duration-300 sm:gap-4 sm:p-4",
          value
            ? "border-line-strong bg-white/[0.03] hover:border-gold/40"
            : "border-dashed border-line-strong bg-white/[0.02] hover:border-gold/40",
        )}
        style={
          value
            ? {
                background: `linear-gradient(120deg, ${hexToRgba(value.accentColor, 0.14)} 0%, rgba(16,21,33,0.6) 65%)`,
              }
            : undefined
        }
      >
        {value ? (
          <EntityPortrait
            assetKey={value.assetKey}
            name={value.name}
            accentColor={value.accentColor}
            className="size-14 shrink-0 sm:size-16"
            sizes="64px"
          />
        ) : (
          <span
            aria-hidden
            className="grid size-14 shrink-0 place-items-center rounded-full border border-dashed border-line-strong sm:size-16"
          >
            <Search className="text-muted size-5" />
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span className="text-monument text-parchment block truncate text-2xl sm:text-3xl">
            {value ? value.name : "Choose"}
          </span>
          <span className="text-muted mt-0.5 block truncate text-xs">
            {value ? (region?.name ?? value.title) : "Search 50 champions"}
          </span>
        </span>

        <ChevronDown
          aria-hidden
          className="text-muted group-hover:text-parchment size-4 shrink-0 transition-colors"
          style={{ color: value ? hexToRgba(accent, 0.8) : undefined }}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink-deep/80 backdrop-blur-md" />
          <DialogPrimitive.Content className="fixed top-[10vh] left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-lg -translate-x-1/2 focus:outline-none">
            <DialogTitle className="sr-only">{label}</DialogTitle>
            <Command loop className="panel overflow-hidden">
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="text-muted size-4 shrink-0" aria-hidden />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search a champion…"
                  className="text-parchment placeholder:text-muted h-13 w-full bg-transparent py-4 text-[0.9375rem] outline-none"
                />
              </div>
              <Command.List className="max-h-[56vh] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="text-muted px-4 py-8 text-center text-sm">
                  No champion by that name.
                </Command.Empty>
                {options.map((character) => (
                  <Command.Item
                    key={character.id}
                    value={`${character.name} ${character.title} ${character.region}`}
                    onSelect={() => {
                      onChange(character);
                      setOpen(false);
                      setQuery("");
                    }}
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
                    <span
                      className="text-eyebrow shrink-0"
                      style={{ color: hexToRgba(character.accentColor, 0.75) }}
                    >
                      {regionBySlug.get(character.region)?.name}
                    </span>
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>
    </div>
  );
}
