"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { regionBySlug } from "@/data";
import { useProgress } from "@/components/providers";
import { EntityPortrait } from "@/components/entity-portrait";
import { ProgressRing } from "@/components/ui/progress-ring";
import { characterKnowledge, progressLevelFor } from "@/lib/progress/model";
import { cn, hexToRgba } from "@/lib/utils";
import type { Character } from "@/types";

export function CharacterCard({
  character,
  connections,
  size = "md",
  priority,
  className,
}: {
  character: Character;
  connections: number;
  size?: "md" | "lg";
  priority?: boolean;
  className?: string;
}) {
  const { progress } = useProgress();
  const reduceMotion = useReducedMotion();
  const knowledge = characterKnowledge(character.id, progress);
  const level = progressLevelFor(knowledge);

  const region = regionBySlug.get(character.region);
  const regionLabel = region?.name ?? character.region;

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group relative", className)}
    >
      <Link
        href={`/champion/${character.slug}`}
        className="block overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-colors duration-300 focus-visible:outline-none"
        style={{ borderColor: undefined }}
        aria-label={`${character.name}, ${character.title}`}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            size === "lg" ? "aspect-[3/4]" : "aspect-[4/5]",
          )}
        >
          <EntityPortrait
            assetKey={character.assetKey}
            name={character.name}
            accentColor={character.accentColor}
            variant={size === "lg" ? "splash" : "card"}
            rounded="rounded-none"
            className="absolute inset-0 size-full transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
            sizes={
              size === "lg"
                ? "(max-width: 768px) 80vw, 33vw"
                : "(max-width: 640px) 45vw, 20vw"
            }
          />

          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent"
          />

          {/* Accent sweep appears on hover — subtle, once, no loop. */}
          <span
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(90% 70% at 50% 110%, ${hexToRgba(
                character.accentColor,
                0.32,
              )} 0%, transparent 70%)`,
            }}
          />

          {knowledge > 0 ? (
            <div className="absolute top-3 right-3">
              <ProgressRing
                value={knowledge}
                size={34}
                thickness={2.5}
                color={character.accentColor}
                label={`${character.name} knowledge ${knowledge}%`}
              >
                <span className="text-[9px] font-medium tabular-nums">
                  {knowledge}
                </span>
              </ProgressRing>
            </div>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3
              className={cn(
                "text-monument text-parchment",
                size === "lg" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
              )}
            >
              {character.name}
            </h3>
            <p className="text-muted mt-1 line-clamp-1 text-[0.8125rem] italic">
              {character.title}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-line px-4 py-3">
          <span
            className="text-eyebrow truncate capitalize"
            style={{ color: hexToRgba(character.accentColor, 0.85) }}
          >
            {regionLabel}
          </span>
          <span className="text-eyebrow text-muted shrink-0">
            {connections} {connections === 1 ? "connection" : "connections"}
          </span>
        </div>

        {level !== "unknown" ? (
          <span
            aria-hidden
            className="absolute top-0 left-0 h-[3px] w-full origin-left"
            style={{
              background: `linear-gradient(90deg, ${character.accentColor}, transparent)`,
              transform: `scaleX(${Math.max(0.08, knowledge / 100)})`,
            }}
          />
        ) : null}
      </Link>
    </motion.div>
  );
}

/** Compact row used in collections, search results and related lists. */
export function CharacterRow({
  character,
  subtitle,
  trailing,
  onClick,
  href,
}: {
  character: Character;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <>
      <EntityPortrait
        assetKey={character.assetKey}
        name={character.name}
        accentColor={character.accentColor}
        className="size-10 shrink-0"
        sizes="40px"
      />
      <span className="min-w-0 flex-1 text-left">
        <span className="text-parchment block truncate text-sm font-medium">
          {character.name}
        </span>
        <span className="text-muted block truncate text-xs">
          {subtitle ?? character.title}
        </span>
      </span>
      {trailing}
    </>
  );

  const shared =
    "flex w-full items-center gap-3 rounded-xl border border-transparent px-2.5 py-2 text-left transition-colors hover:border-line hover:bg-white/[0.04]";

  if (href) {
    return (
      <Link href={href} className={shared}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={shared}>
      {content}
    </button>
  );
}
