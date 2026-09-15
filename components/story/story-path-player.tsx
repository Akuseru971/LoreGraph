"use client";

import { ArrowLeft, ArrowRight, Check, Sparkles, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { characterById, eventById } from "@/data";
import { useProgress } from "@/components/providers";
import { EntityPortrait } from "@/components/entity-portrait";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  FullscreenContent,
} from "@/components/ui/dialog";
import { generateArtwork } from "@/lib/assets";
import { track } from "@/lib/analytics";
import { cn, hexToRgba } from "@/lib/utils";
import type { StoryPath } from "@/types";

/**
 * Story paths are the "lesson" format: one chapter per screen, entities you can
 * jump to, and a progress rail. Implemented as a fullscreen overlay so reading
 * a path never costs you your place in the app.
 */
export function StoryPathPlayer({
  path,
  onClose,
}: {
  path: StoryPath | null;
  onClose: () => void;
}) {
  if (!path) return null;
  return <StoryPathPlayerInner key={path.slug} path={path} onClose={onClose} />;
}

function StoryPathPlayerInner({
  path,
  onClose,
}: {
  path: StoryPath;
  onClose: () => void;
}) {
  const { progress, completeChapter } = useProgress();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const state = progress.stories[path.slug];
  const completed = state?.completedChapterIds ?? [];
  const resumeIndex = path.chapters.findIndex((c) => !completed.includes(c.id));
  const [index, setIndex] = React.useState(resumeIndex === -1 ? 0 : resumeIndex);

  React.useEffect(() => {
    track({ name: "story_start", slug: path.slug });
  }, [path.slug]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const chapter = path.chapters[index];
  const isLast = index === path.chapters.length - 1;
  const artwork = generateArtwork(chapter.assetKey, path.accentColor, "story");

  const cast = chapter.characterIds
    .map((id) => characterById.get(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const events = chapter.eventIds
    .map((id) => eventById.get(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const advance = () => {
    completeChapter(path.slug, chapter.id);
    if (!isLast) setIndex((value) => value + 1);
  };

  return (
    <Dialog open onOpenChange={(next) => (!next ? onClose() : undefined)}>
      <FullscreenContent aria-describedby={undefined}>
        {/* ------------------------------------------------------- header */}
        <header className="relative z-10 shrink-0 border-b border-line bg-ink/80 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 py-3.5 sm:px-6">
            <div className="min-w-0 flex-1">
              <p
                className="text-eyebrow truncate"
                style={{ color: path.accentColor }}
              >
                {path.title}
              </p>
              <p className="text-muted mt-1 text-xs">
                Chapter {index + 1} of {path.chapters.length} ·{" "}
                {chapter.estimatedMinutes} min
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close story path"
            >
              <X aria-hidden />
            </Button>
          </div>

          {/* Chapter rail doubles as navigation. */}
          <div className="mx-auto flex w-full max-w-4xl gap-1 px-4 pb-3 sm:px-6">
            {path.chapters.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Chapter ${i + 1}: ${item.title}`}
                aria-current={i === index}
                className="group h-1.5 flex-1 rounded-full transition-colors"
                style={{
                  backgroundColor:
                    i === index
                      ? path.accentColor
                      : completed.includes(item.id)
                        ? hexToRgba(path.accentColor, 0.5)
                        : "rgba(245,242,232,0.12)",
                }}
              />
            ))}
          </div>
        </header>

        {/* -------------------------------------------------------- body */}
        <div ref={scrollRef} className="relative flex-1 overflow-y-auto">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[42vh]"
            style={{ background: artwork.background }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[42vh] bg-gradient-to-b from-transparent via-ink/40 to-ink"
          />

          <article className="relative mx-auto w-full max-w-3xl px-4 pt-[18vh] pb-36 sm:px-6">
            <p className="text-eyebrow text-muted">
              Chapter {String(index + 1).padStart(2, "0")}
            </p>
            <DialogTitle className="text-monument mt-3 text-[clamp(2rem,8vw,4rem)]">
              {chapter.title}
            </DialogTitle>
            <p className="font-display text-gold mt-2 text-lg italic sm:text-xl">
              {chapter.subtitle}
            </p>

            <div className="mt-8 space-y-5">
              {chapter.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={cn(
                    "text-parchment/90 leading-[1.8]",
                    i === 0 ? "text-[1.0625rem] sm:text-lg" : "text-[0.9375rem] sm:text-base",
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {cast.length > 0 ? (
              <section className="mt-10">
                <h3 className="text-eyebrow text-gold mb-3">In this chapter</h3>
                <ul className="flex flex-wrap gap-2">
                  {cast.map((character) => (
                    <li key={character.id}>
                      <Link
                        href={`/champion/${character.slug}`}
                        className="text-muted hover:text-parchment flex items-center gap-2 rounded-full border border-line py-1 pr-3 pl-1 text-xs transition-colors hover:border-line-strong"
                      >
                        <EntityPortrait
                          assetKey={character.assetKey}
                          name={character.name}
                          accentColor={character.accentColor}
                          className="size-6"
                          sizes="24px"
                        />
                        {character.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {events.length > 0 ? (
              <section className="mt-8">
                <h3 className="text-eyebrow text-gold mb-3">Events</h3>
                <ul className="space-y-2">
                  {events.map((event) => (
                    <li key={event.id} className="border-l border-line pl-3">
                      <p className="text-parchment text-sm">{event.title}</p>
                      <p className="text-muted text-xs">{event.era}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {isLast && state?.completed ? (
              <div className="panel mt-10 flex items-center gap-3 p-4">
                <Sparkles className="text-gold size-4 shrink-0" aria-hidden />
                <p className="text-muted text-sm">
                  Path complete. {path.title} is now part of your archive.
                </p>
              </div>
            ) : null}
          </article>
        </div>

        {/* ------------------------------------------------------ footer */}
        <footer className="shrink-0 border-t border-line bg-ink/85 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <Button
              variant="ghost"
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              disabled={index === 0}
            >
              <ArrowLeft aria-hidden />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <span className="text-eyebrow text-muted-dim hidden sm:block">
              {completed.length}/{path.chapters.length} read
            </span>

            <Button variant="primary" onClick={advance}>
              {isLast ? (
                <>
                  <Check aria-hidden />
                  Finish path
                </>
              ) : (
                <>
                  Next chapter
                  <ArrowRight aria-hidden />
                </>
              )}
            </Button>
          </div>
        </footer>
      </FullscreenContent>
    </Dialog>
  );
}
