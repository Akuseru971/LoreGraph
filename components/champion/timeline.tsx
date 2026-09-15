"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { characterById } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { hexToRgba } from "@/lib/utils";
import type { Character, TimelineBeat } from "@/types";

/** Vertical timeline for a champion. One beat per row, era rail on the left. */
export function Timeline({
  character,
  beats,
}: {
  character: Character;
  beats: TimelineBeat[];
}) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px sm:left-[9px]"
        style={{
          background: `linear-gradient(180deg, ${hexToRgba(character.accentColor, 0.55)}, ${hexToRgba(character.accentColor, 0.08)})`,
        }}
      />
      <ol className="space-y-7 sm:space-y-9">
        {beats.map((beat, index) => (
          <TimelineEvent
            key={beat.id}
            beat={beat}
            index={index}
            accentColor={character.accentColor}
            selfId={character.id}
          />
        ))}
      </ol>
    </div>
  );
}

export function TimelineEvent({
  beat,
  index,
  accentColor,
  selfId,
}: {
  beat: TimelineBeat;
  index: number;
  accentColor: string;
  selfId: string;
}) {
  const reduceMotion = useReducedMotion();
  const others = beat.characterIds
    .filter((id) => id !== selfId)
    .map((id) => characterById.get(id))
    .filter((c): c is Character => Boolean(c))
    .slice(0, 5);

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-9 sm:pl-12"
    >
      <span
        aria-hidden
        className="absolute top-1.5 left-0 grid size-4 place-items-center sm:size-5"
      >
        <span
          className="size-2.5 rotate-45 sm:size-3"
          style={{
            background: hexToRgba(accentColor, 0.9),
            boxShadow: `0 0 12px ${hexToRgba(accentColor, 0.5)}`,
          }}
        />
      </span>

      <p className="text-eyebrow text-muted-dim flex items-center gap-2">
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-3 bg-line-strong" aria-hidden />
        {beat.era}
      </p>

      <h3 className="font-display text-parchment mt-2 text-xl sm:text-2xl">
        {beat.title}
      </h3>
      <p className="text-muted mt-2 max-w-2xl text-sm leading-relaxed">
        {beat.description}
      </p>

      {others.length > 0 ? (
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="text-eyebrow text-muted-dim">With</span>
          {others.map((other) => (
            <Link
              key={other.id}
              href={`/champion/${other.slug}`}
              className="text-muted hover:text-parchment flex items-center gap-1.5 rounded-full border border-line py-1 pr-2.5 pl-1 text-xs transition-colors hover:border-line-strong"
            >
              <EntityPortrait
                assetKey={other.assetKey}
                name={other.name}
                accentColor={other.accentColor}
                className="size-5"
                sizes="20px"
              />
              {other.name}
            </Link>
          ))}
        </div>
      ) : null}
    </motion.li>
  );
}
