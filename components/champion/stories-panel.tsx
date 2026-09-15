"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { StoryPathCard } from "@/components/story/story-path-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import type { Character, StoryPath } from "@/types";

export function StoriesPanel({
  character,
  stories,
  onOpen,
}: {
  character: Character;
  stories: StoryPath[];
  onOpen: (path: StoryPath) => void;
}) {
  if (stories.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No story path features this champion yet."
        description="Story paths are added as clusters of lore get filled in. In the meantime, the connections tab is the fastest way in."
        action={
          <Button asChild variant="outline">
            <Link href="/">Browse all story paths</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <h2 className="font-display text-parchment text-2xl">
        Recommended for {character.name}
      </h2>
      <p className="text-muted mt-1 text-sm">
        Guided reads that place this champion in the wider story.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((path) => (
          <li key={path.id}>
            <StoryPathCard path={path} onOpen={onOpen} size="sm" />
          </li>
        ))}
      </ul>
    </div>
  );
}
