"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { regionBySlug, sourceById } from "@/data";
import { EntityPortrait } from "@/components/entity-portrait";
import { FactionBadge } from "@/components/region-badge";
import { CanonBadge } from "@/components/ui/badge";
import { CONNECTION_CATEGORY_LABEL } from "@/lib/truth/layer";
import { GROUP_COLOR, RELATIONSHIP_LABEL, relationshipGroup } from "@/lib/graph/style";
import { hexToRgba } from "@/lib/utils";
import type { Character, Relationship } from "@/types";

export interface CoreRelationship {
  relationship: Relationship;
  other: Character;
}

export function OverviewPanel({
  character,
  core,
  onSelect,
}: {
  character: Character;
  core: CoreRelationship[];
  onSelect: (characterId: string) => void;
}) {
  const region = regionBySlug.get(character.region);
  const sources = character.sourceIds
    .map((id) => sourceById.get(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const facts: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Origin", value: region?.name ?? "Unknown" },
    {
      label: "Faction",
      value:
        character.factions.length > 0 ? (
          <span className="flex flex-wrap gap-1.5">
            {character.factions.map((id) => (
              <FactionBadge key={id} id={id} />
            ))}
          </span>
        ) : (
          "Unaffiliated"
        ),
    },
    { label: "Species", value: character.species },
    { label: "Status", value: character.status },
    { label: "Roles", value: character.roles.join(", ") },
    {
      label: "Aliases",
      value: character.aliases.length > 0 ? character.aliases.join(", ") : "—",
    },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
      <div>
        <section aria-labelledby="who-is-heading">
          <h2 id="who-is-heading" className="font-display text-parchment text-2xl sm:text-3xl">
            Who is {character.name}?
          </h2>
          <div className="mt-5 space-y-4">
            {character.longDescription.map((paragraph, index) => (
              <p
                key={index}
                className="text-parchment/85 text-[0.9375rem] leading-[1.75] sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {core.length > 0 ? (
          <section aria-labelledby="core-relationships-heading" className="mt-12">
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="core-relationships-heading"
                className="font-display text-parchment text-2xl"
              >
                Core relationships
              </h2>
              <span className="text-eyebrow text-muted-dim">
                {core.length} of the most important
              </span>
            </div>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {core.map(({ relationship, other }) => (
                <li key={relationship.id}>
                  <CoreRelationshipCard
                    relationship={relationship}
                    other={other}
                    onSelect={() => onSelect(other.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {/* ------------------------------------------------------ key facts */}
      <aside className="space-y-8">
        <section aria-labelledby="key-facts-heading" className="panel-flat p-5">
          <h2 id="key-facts-heading" className="text-eyebrow text-gold">
            Key facts
          </h2>
          <dl className="mt-4 space-y-3.5">
            {facts.map((fact) => (
              <div key={fact.label} className="border-b border-line pb-3.5 last:border-0 last:pb-0">
                <dt className="text-eyebrow text-muted-dim">{fact.label}</dt>
                <dd className="text-parchment mt-1.5 text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {character.tags.length > 0 ? (
          <section aria-labelledby="threads-heading">
            <h2 id="threads-heading" className="text-eyebrow text-gold mb-3">
              Threads
            </h2>
            <ul className="flex flex-wrap gap-1.5">
              {character.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-eyebrow text-muted rounded-full border border-line px-2.5 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {sources.length > 0 ? (
          <section aria-labelledby="sources-heading">
            <h2 id="sources-heading" className="text-eyebrow text-gold mb-3">
              Sources
            </h2>
            <ul className="space-y-2.5">
              {sources.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-muted hover:text-parchment flex items-start gap-2 text-xs transition-colors"
                  >
                    <ExternalLink className="mt-0.5 size-3 shrink-0" aria-hidden />
                    <span>
                      {source.title}
                      <span className="text-muted-dim block">{source.type}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-muted-dim mt-4 text-[0.6875rem] leading-relaxed">
              Lore summaries are written for LoreGraph and link back to the
              official material they describe.
            </p>
          </section>
        ) : null}
      </aside>
    </div>
  );
}

function CoreRelationshipCard({
  relationship,
  other,
  onSelect,
}: {
  relationship: Relationship;
  other: Character;
  onSelect: () => void;
}) {
  const color = GROUP_COLOR[relationshipGroup(relationship.type)];

  return (
    <div className="group relative flex items-start gap-3 rounded-[var(--radius-card)] border border-line bg-white/[0.02] p-3.5 transition-colors hover:border-line-strong hover:bg-white/[0.05]">
      <EntityPortrait
        assetKey={other.assetKey}
        name={other.name}
        accentColor={other.accentColor}
        className="size-11 shrink-0"
        sizes="44px"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2">
          <span className="text-parchment truncate text-sm font-medium">
            {other.name}
          </span>
          <span
            className="text-eyebrow shrink-0 rounded-full border px-1.5 py-0.5"
            style={{
              borderColor: hexToRgba(color, 0.35),
              backgroundColor: hexToRgba(color, 0.1),
              color,
            }}
          >
            {CONNECTION_CATEGORY_LABEL[relationship.connectionType]}
          </span>
          <span className="text-muted-dim text-[0.625rem]">
            {relationship.label || RELATIONSHIP_LABEL[relationship.type]}
          </span>
        </p>
        <p className="text-muted mt-1.5 line-clamp-2 text-xs leading-relaxed">
          {relationship.shortExplanation}
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={onSelect}
            className="text-eyebrow text-gold/80 hover:text-gold transition-colors"
          >
            What connects them?
          </button>
          <CanonBadge status={relationship.canonStatus} className="scale-90" />
        </div>
      </div>
      <Link
        href={`/champion/${other.slug}`}
        aria-label={`Open ${other.name}`}
        className="text-muted-dim hover:text-gold shrink-0 transition-colors"
      >
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
