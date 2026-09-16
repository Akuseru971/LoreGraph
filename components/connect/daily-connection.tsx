"use client";

import { Sparkles, Target } from "lucide-react";
import * as React from "react";
import { EntityPortrait } from "@/components/entity-portrait";
import { Button } from "@/components/ui/button";
import { ConnectionGraph } from "./connection-graph";
import { cn } from "@/lib/utils";
import type { Character, GraphPath } from "@/types";

const GUESSES = [1, 2, 3, 4, 5] as const;

/**
 * Daily Connection. The guess-before-reveal loop is the point: committing to a
 * number makes the answer land, and it is the same pair for everyone that day.
 */
export function DailyConnection({
  date,
  a,
  b,
  path,
  onOpenInConnect,
}: {
  date: string;
  a: Character;
  b: Character;
  path: GraphPath | null;
  onOpenInConnect: (a: Character, b: Character) => void;
}) {
  const storageKey = `loregraph.daily-connection.${date}`;
  const savedGuess = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return null;
      return (JSON.parse(raw) as { guess: number }).guess;
    } catch {
      return null;
    }
  }, [storageKey]);
  const [guess, setGuess] = React.useState<number | null>(savedGuess);
  const [revealed, setRevealed] = React.useState(savedGuess !== null);

  const submit = (value: number) => {
    setGuess(value);
    setRevealed(true);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ guess: value }));
    } catch {
      // Storage unavailable; the attempt stays in memory.
    }
  };

  const actual = path?.length ?? null;
  const correct = revealed && actual !== null && guess === actual;

  return (
    <section
      aria-labelledby="daily-connection-heading"
      className="panel overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <h2
          id="daily-connection-heading"
          className="text-eyebrow text-gold flex items-center gap-2"
        >
          <Target className="size-3.5" aria-hidden />
          Daily connection
        </h2>
        <span className="text-eyebrow text-muted-dim">{date}</span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3">
          <Pair character={a} />
          <span aria-hidden className="text-muted shrink-0 text-lg">
            →
          </span>
          <Pair character={b} align="right" />
        </div>

        {!revealed ? (
          <>
            <p className="text-muted mt-5 text-sm leading-relaxed">
              How many connections separate them? Commit to a guess, then reveal
              the path.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {GUESSES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => submit(value)}
                  className="text-label hover:border-gold/50 hover:text-gold min-w-11 rounded-full border border-line px-3.5 py-2 transition-colors"
                >
                  {value === 5 ? "5+" : value}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 flex items-center gap-2.5">
              <span
                className={cn(
                  "text-eyebrow rounded-full border px-2.5 py-1",
                  correct
                    ? "border-[#7FB98A]/40 bg-[#7FB98A]/10 text-[#7FB98A]"
                    : "border-line text-muted",
                )}
              >
                {correct ? "Exactly right" : `You guessed ${guess === 5 ? "5+" : guess}`}
              </span>
              {actual !== null ? (
                <span className="text-eyebrow text-gold">
                  {actual} {actual === 1 ? "connection" : "connections"}
                </span>
              ) : null}
            </div>

            {path ? (
              <>
                <ConnectionGraph path={path} className="mt-4" />
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  {path.steps[0]?.edge.description}
                </p>
              </>
            ) : (
              <p className="text-muted mt-4 text-sm">
                The archives couldn&apos;t find a meaningful path for this pair.
              </p>
            )}

            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => onOpenInConnect(a, b)}
            >
              <Sparkles aria-hidden />
              Open in Connect
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

function Pair({
  character,
  align = "left",
}: {
  character: Character;
  align?: "left" | "right";
}) {
  return (
    <span
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2.5",
        align === "right" && "flex-row-reverse text-right",
      )}
    >
      <EntityPortrait
        assetKey={character.assetKey}
        name={character.name}
        accentColor={character.accentColor}
        className="size-11 shrink-0"
        sizes="44px"
      />
      <span className="min-w-0">
        <span className="text-parchment block truncate text-sm font-medium">
          {character.name}
        </span>
        <span className="text-muted block truncate text-xs">{character.title}</span>
      </span>
    </span>
  );
}
