"use client";

import { ArrowRight, ExternalLink, GitFork } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { characterById, eventById, relationshipById, sourceById } from "@/data";
import { useProgress } from "@/components/providers";
import { EntityPortrait } from "@/components/entity-portrait";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DrawerContent,
} from "@/components/ui/dialog";
import { track } from "@/lib/analytics";
import { RELATIONSHIP_LABEL, edgeStroke } from "@/lib/graph/style";
import { edgeEvidencePresentation } from "@/lib/truth/evidence";
import { hexToRgba } from "@/lib/utils";
import type { GraphEdge, GraphNode } from "@/types";

export interface RelationshipSelection {
  node: GraphNode;
  edge: GraphEdge | null;
}

/**
 * The "what connects them?" panel. Bottom sheet on mobile, right drawer on
 * desktop. Everything the graph can show has to be explainable in words here —
 * that is the whole point of the product.
 */
export function RelationshipDrawer({
  fromCharacterId,
  selection,
  onClose,
}: {
  fromCharacterId: string;
  selection: RelationshipSelection | null;
  onClose: () => void;
}) {
  const { recordRelationshipSeen } = useProgress();
  const from = characterById.get(fromCharacterId);
  const edge = selection?.edge ?? null;
  const node = selection?.node ?? null;

  const relationship = edge?.relationshipId
    ? (relationshipById.get(edge.relationshipId) ?? null)
    : null;

  React.useEffect(() => {
    if (!edge || !node) return;
    if (edge.relationshipId) {
      recordRelationshipSeen(fromCharacterId, edge.relationshipId);
      track({
        name: "relationship_open",
        relationshipId: edge.relationshipId,
        from: fromCharacterId,
        to: node.id,
      });
    }
  }, [edge, node, fromCharacterId, recordRelationshipSeen]);

  if (!from) return null;

  const open = selection !== null && node !== null;
  const otherCharacter = node?.type === "character" ? characterById.get(node.id) : null;
  const accent = edge ? edgeStroke(edge) : "#C9A96E";
  const evidence = edge ? edgeEvidencePresentation(edge) : null;

  const headline = edge
    ? edge.connectionKind === "direct"
      ? (relationship?.label ?? RELATIONSHIP_LABEL[edge.relationship])
      : `${edge.label} connection`
    : (node?.metadata.title ?? "Entity");

  const events = (relationship?.eventIds ?? [])
    .map((id) => eventById.get(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const sources = (relationship?.sourceIds ?? [])
    .map((id) => sourceById.get(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : undefined)}>
      {open && node ? (
        <DrawerContent aria-describedby={undefined}>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-6 pb-8 sm:px-6 sm:pt-8">
            {/* ------------------------------------------------ pairing */}
            <div className="flex items-center gap-3">
              <EntityPortrait
                assetKey={from.assetKey}
                name={from.name}
                accentColor={from.accentColor}
                className="size-14 shrink-0"
                sizes="56px"
              />
              <span
                aria-hidden
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, ${hexToRgba(accent, 0.15)}, ${accent}, ${hexToRgba(accent, 0.15)})`,
                }}
              />
              {node.type === "character" && otherCharacter ? (
                <EntityPortrait
                  assetKey={otherCharacter.assetKey}
                  name={otherCharacter.name}
                  accentColor={otherCharacter.accentColor}
                  className="size-14 shrink-0"
                  sizes="56px"
                />
              ) : (
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-full border"
                  style={{
                    borderColor: hexToRgba(node.metadata.accentColor, 0.4),
                    background: hexToRgba(node.metadata.accentColor, 0.12),
                    color: node.metadata.accentColor,
                  }}
                >
                  <GitFork className="size-5" aria-hidden />
                </span>
              )}
            </div>

            <DialogTitle className="text-monument mt-5 text-3xl">
              {from.name}
              <span className="text-muted px-2 align-middle text-xl">↔</span>
              {node.name}
            </DialogTitle>

            <div className="mt-4 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge accentColor={accent}>{headline}</Badge>
                {evidence ? (
                  <Badge className="text-muted border-line">
                    {evidence.connectionLabel}
                  </Badge>
                ) : null}
              </div>
              {evidence ? (
                <>
                  <p className="text-muted text-xs">{evidence.evidenceLine}</p>
                  <p className="text-muted-dim text-xs">{evidence.sourceLine}</p>
                </>
              ) : null}
            </div>

            {relationship && relationship.importanceScore >= 80 ? (
              <p className="text-eyebrow text-gold mt-3">
                Major thread · importance {relationship.importanceScore}
              </p>
            ) : null}

            {/* --------------------------------------------- explanation */}
            <Section title="What connects them?">
              <DialogDescription className="text-parchment/85 text-[0.9375rem] leading-relaxed">
                {relationship?.shortExplanation ??
                  edge?.description ??
                  node.metadata.description ??
                  "No explanation recorded yet."}
              </DialogDescription>
            </Section>

            {relationship?.longExplanation ? (
              <Section title="Why it matters">
                <p className="text-muted text-sm leading-relaxed">
                  {relationship.longExplanation}
                </p>
              </Section>
            ) : null}

            {events.length > 0 ? (
              <Section title="Related events">
                <ul className="space-y-2.5">
                  {events.map((event) => (
                    <li key={event.id} className="border-l border-line pl-3">
                      <p className="text-parchment text-sm font-medium">{event.title}</p>
                      <p className="text-muted text-xs">{event.era}</p>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {sources.length > 0 ? (
              <Section title="Sources">
                <ul className="space-y-2">
                  {sources.map((source) => (
                    <li key={source.id}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-muted hover:text-parchment group flex items-start gap-2 text-xs transition-colors"
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
              </Section>
            ) : null}

            {!relationship && edge?.connectionKind === "indirect" ? (
              <p className="text-muted mt-6 rounded-lg border border-line bg-white/[0.02] p-3 text-xs leading-relaxed">
                This is a structural link, not a personal one — the two are tied
                together through {node.name.toLowerCase()} rather than by anything
                that happened between them directly.
              </p>
            ) : null}
          </div>

          {/* ------------------------------------------------- actions */}
          <div className="flex shrink-0 gap-2 border-t border-line bg-ink/60 px-5 py-4 sm:px-6">
            <Button asChild variant="primary" className="flex-1">
              <Link
                href={
                  otherCharacter
                    ? `/connect?a=${from.slug}&b=${otherCharacter.slug}`
                    : `/connect?a=${from.slug}`
                }
              >
                Explore full connection
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            {otherCharacter ? (
              <Button asChild variant="secondary">
                <Link href={`/champion/${otherCharacter.slug}`}>
                  Open {otherCharacter.name}
                </Link>
              </Button>
            ) : null}
          </div>
        </DrawerContent>
      ) : null}
    </Dialog>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="text-eyebrow text-gold mb-2.5">{title}</h3>
      {children}
    </section>
  );
}
