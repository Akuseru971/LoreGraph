"use client";

import Link from "next/link";
import * as React from "react";
import { characters } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  characterKnowledge,
  PROGRESS_LEVEL_LABEL,
  progressLevelFor,
} from "@/lib/progress/model";
import { cn, hexToRgba } from "@/lib/utils";
import type { UserProgress } from "@/types";

export function CollectionGrid({ progress }: { progress: UserProgress }) {
  const sorted = React.useMemo(
    () =>
      [...characters].sort((a, b) => {
        const ka = characterKnowledge(a.id, progress);
        const kb = characterKnowledge(b.id, progress);
        if (kb !== ka) return kb - ka;
        return a.name.localeCompare(b.name);
      }),
    [progress],
  );

  return (
    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {sorted.map((character) => {
        const knowledge = characterKnowledge(character.id, progress);
        const level = progressLevelFor(knowledge);
        const unknown = level === "unknown";

        return (
          <li key={character.id}>
            <Link
              href={`/champion/${character.slug}`}
              className={cn(
                "group relative flex flex-col items-center rounded-xl border p-2.5 text-center transition-colors",
                unknown
                  ? "border-line bg-white/[0.02] opacity-45 hover:opacity-70"
                  : "border-line hover:border-line-strong bg-white/[0.03]",
              )}
              aria-label={`${character.name}, ${PROGRESS_LEVEL_LABEL[level]}`}
            >
              <div className="relative">
                <EntityPortrait
                  assetKey={character.assetKey}
                  name={character.name}
                  accentColor={character.accentColor}
                  className={cn("size-12 sm:size-14", unknown && "grayscale")}
                  sizes="56px"
                />
                {!unknown ? (
                  <ProgressRing
                    value={knowledge}
                    size={22}
                    thickness={2}
                    color={character.accentColor}
                    className="absolute -right-1 -bottom-1 bg-ink rounded-full"
                    label={`${knowledge}%`}
                  >
                    <span className="text-[7px] tabular-nums">{knowledge}</span>
                  </ProgressRing>
                ) : null}
              </div>

              <span className="text-parchment mt-2 line-clamp-1 w-full text-[0.6875rem] font-medium">
                {unknown ? "???" : character.name}
              </span>
              <span
                className="text-eyebrow mt-0.5 scale-[0.85]"
                style={{
                  color: unknown
                    ? undefined
                    : hexToRgba(character.accentColor, 0.85),
                }}
              >
                {PROGRESS_LEVEL_LABEL[level]}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
