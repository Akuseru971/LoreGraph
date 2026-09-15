"use client";

import { BookOpen, Bookmark, BookmarkCheck, GitFork } from "lucide-react";
import * as React from "react";
import { factionBySlug, regionBySlug } from "@/data";
import { useProgress } from "@/components/providers";
import { EntityPortrait } from "@/components/entity-portrait";
import { Badge, CanonBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { generateArtwork } from "@/lib/assets";
import { characterKnowledge, PROGRESS_LEVEL_LABEL, progressLevelFor } from "@/lib/progress/model";
import { hexToRgba } from "@/lib/utils";
import type { Character } from "@/types";

const COMPLEXITY_LABEL = ["", "Entry point", "Approachable", "Layered", "Deep", "Labyrinthine"];

export function CharacterHero({
  character,
  connections,
  onExploreConnections,
  onStartStory,
  hasStory,
}: {
  character: Character;
  connections: number;
  onExploreConnections: () => void;
  onStartStory: () => void;
  hasStory: boolean;
}) {
  const { progress, toggleCollected } = useProgress();
  const knowledge = characterKnowledge(character.id, progress);
  const collected = progress.characters[character.id]?.collected ?? false;
  const region = regionBySlug.get(character.region);
  const artwork = generateArtwork(character.assetKey, character.accentColor, "splash");

  const factionNames = character.factions
    .map((id) => factionBySlug.get(id.replace("faction:", ""))?.name)
    .filter(Boolean);

  const lineage = [region?.name, ...factionNames].filter(Boolean).join(" · ");

  return (
    <header className="relative overflow-hidden">
      {/* --------------------------------------------------------- artwork */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: artwork.background }} />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(85% 70% at 78% 30%, ${hexToRgba(character.accentColor, 0.34)} 0%, transparent 65%)`,
          }}
        />
        <div className="vignette absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-16 sm:pb-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {region ? (
                <Badge accentColor={region.accentColor}>{region.name}</Badge>
              ) : null}
              <CanonBadge status={character.canonStatus} />
              <Badge className="text-muted border-line">
                {COMPLEXITY_LABEL[character.loreComplexity]} · complexity{" "}
                {character.loreComplexity}/5
              </Badge>
            </div>

            <h1 className="text-monument mt-5 text-[clamp(3rem,13vw,7rem)]">
              {character.name}
            </h1>
            <p className="font-display text-gold mt-1 text-[clamp(1.125rem,3.5vw,1.75rem)] italic">
              {character.title}
            </p>
            {lineage ? (
              <p className="text-eyebrow text-muted mt-4">{lineage}</p>
            ) : null}

            <p className="text-parchment/85 mt-5 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
              {character.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <Button variant="primary" size="lg" onClick={onExploreConnections}>
                <GitFork aria-hidden />
                Explore connections
                <span className="text-ink/60 ml-1 tabular-nums">{connections}</span>
              </Button>
              {hasStory ? (
                <Button variant="secondary" size="lg" onClick={onStartStory}>
                  <BookOpen aria-hidden />
                  Start story
                </Button>
              ) : null}
              <Button
                variant={collected ? "outline" : "ghost"}
                size="lg"
                onClick={() => toggleCollected(character.id)}
                aria-pressed={collected}
              >
                {collected ? <BookmarkCheck aria-hidden /> : <Bookmark aria-hidden />}
                {collected ? "In collection" : "Add to collection"}
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------- portrait */}
          <div className="flex shrink-0 items-center gap-5">
            <div className="flex flex-col gap-3">
              <Stat
                label="Knowledge"
                value={
                  <ProgressRing
                    value={knowledge}
                    size={56}
                    thickness={3}
                    color={character.accentColor}
                    label={`${character.name} knowledge ${knowledge} percent`}
                  >
                    <span className="text-xs font-medium tabular-nums">
                      {knowledge}%
                    </span>
                  </ProgressRing>
                }
                hint={PROGRESS_LEVEL_LABEL[progressLevelFor(knowledge)]}
              />
            </div>

            <EntityPortrait
              assetKey={character.assetKey}
              name={character.name}
              accentColor={character.accentColor}
              variant="splash"
              priority
              rounded="rounded-[var(--radius-card)]"
              className="hidden aspect-[3/4] w-52 shrink-0 border border-line lg:block"
              sizes="208px"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {value}
      <div>
        <p className="text-eyebrow text-muted">{label}</p>
        {hint ? <p className="text-eyebrow text-gold mt-1">{hint}</p> : null}
      </div>
    </div>
  );
}
