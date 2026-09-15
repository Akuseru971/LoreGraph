"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Play } from "lucide-react";
import * as React from "react";
import { characterById } from "@/data";
import { useProgress } from "@/components/providers";
import { EntityPortrait } from "@/components/entity-portrait";
import { ProgressMeter } from "@/components/ui/progress-ring";
import { generateRegionArtwork } from "@/lib/assets";
import { cn, hexToRgba } from "@/lib/utils";
import type { StoryPath } from "@/types";

export function StoryPathCard({
  path,
  onOpen,
  size = "md",
}: {
  path: StoryPath;
  onOpen: (path: StoryPath) => void;
  size?: "md" | "sm";
}) {
  const { progress } = useProgress();
  const reduceMotion = useReducedMotion();
  const state = progress.stories[path.slug];
  const done = state?.completedChapterIds.length ?? 0;
  const percent = Math.round((done / path.chapters.length) * 100);

  const artwork = generateRegionArtwork(path.slug, path.accentColor, "#0B0F18");
  const cast = path.characterIds
    .map((id) => characterById.get(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 4);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(path)}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${path.title}: ${path.chapters.length} chapters, ${path.estimatedMinutes} minutes`}
      className={cn(
        "group relative flex shrink-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-line text-left transition-colors hover:border-line-strong",
        size === "md" ? "w-[272px] sm:w-[320px]" : "w-full",
      )}
      style={{ background: artwork.background }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 20%, ${hexToRgba("#05070C", 0.88)} 100%)`,
        }}
      />

      <span className="relative flex aspect-[16/10] flex-col justify-between p-4">
        <span className="flex items-center justify-between">
          <span
            className="text-eyebrow rounded-full border px-2 py-1"
            style={{
              borderColor: hexToRgba(path.accentColor, 0.4),
              backgroundColor: hexToRgba(path.accentColor, 0.14),
              color: path.accentColor,
            }}
          >
            Story path
          </span>
          {state?.completed ? (
            <span className="text-eyebrow flex items-center gap-1 text-[#7FB98A]">
              <Check className="size-3" aria-hidden />
              Complete
            </span>
          ) : null}
        </span>

        <span
          aria-hidden
          className="grid size-11 place-items-center rounded-full border border-gold/40 bg-ink/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
        >
          <Play className="text-gold size-4" />
        </span>
      </span>

      <span className="relative border-t border-line bg-ink/55 p-4 backdrop-blur-sm">
        <span className="text-monument text-parchment block text-xl sm:text-2xl">
          {path.title}
        </span>
        <span className="text-muted mt-1.5 block text-xs">
          {path.chapters.length} chapters · {path.estimatedMinutes} min
        </span>
        <span className="text-muted/80 mt-2.5 line-clamp-2 block text-xs leading-relaxed">
          {path.subtitle}
        </span>

        <span className="mt-3.5 flex items-center gap-3">
          <span className="flex -space-x-2">
            {cast.map((character) => (
              <EntityPortrait
                key={character.id}
                assetKey={character.assetKey}
                name={character.name}
                accentColor={character.accentColor}
                className="size-6 ring-1 ring-ink"
                sizes="24px"
              />
            ))}
          </span>
          {done > 0 ? (
            <span className="flex flex-1 items-center gap-2">
              <ProgressMeter value={percent} color={path.accentColor} />
              <span className="text-eyebrow text-muted shrink-0 tabular-nums">
                {percent}%
              </span>
            </span>
          ) : null}
        </span>
      </span>
    </motion.button>
  );
}
