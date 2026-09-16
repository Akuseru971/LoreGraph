"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useProgress } from "@/components/providers";
import { CinematicPlayer } from "@/components/cinematic/cinematic-player";
import { RelationshipDrawer, type RelationshipSelection } from "@/components/graph/relationship-drawer";
import { StoryPathPlayer } from "@/components/story/story-path-player";
import { buildChampionJourney } from "@/lib/journey";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { track } from "@/lib/analytics";
import type { Neighbor } from "@/lib/graph";
import { CharacterHero } from "./character-hero";
import { ConnectionsPanel } from "./connections-panel";
import { OverviewPanel, type CoreRelationship } from "./overview-panel";
import { StoriesPanel } from "./stories-panel";
import { Timeline } from "./timeline";
import type { Character, GraphEdge, GraphNode, StoryPath } from "@/types";

type TabId = "overview" | "connections" | "timeline" | "stories";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "connections", label: "Connections" },
  { id: "timeline", label: "Timeline" },
  { id: "stories", label: "Stories" },
];

export function ChampionScreen({
  character,
  center,
  neighbors,
  crossEdges,
  core,
  stories,
}: {
  character: Character;
  center: GraphNode;
  neighbors: Neighbor[];
  crossEdges: GraphEdge[];
  core: CoreRelationship[];
  stories: StoryPath[];
}) {
  const searchParams = useSearchParams();
  const { recordCharacterView, recordTimelineViewed } = useProgress();
  const [tab, setTab] = React.useState<TabId>("overview");
  const [story, setStory] = React.useState<StoryPath | null>(null);
  const championJourney = React.useMemo(
    () => (character.timeline.length > 0 ? buildChampionJourney(character) : null),
    [character],
  );
  const [cinematicOpen, setCinematicOpen] = React.useState(
    () => searchParams.get("cinematic") === "1" && championJourney !== null,
  );
  const [overviewSelection, setOverviewSelection] =
    React.useState<RelationshipSelection | null>(null);
  const tabsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    recordCharacterView(character.id);
    track({
      name: "champion_view",
      slug: character.slug,
      region: character.region,
    });
  }, [character.id, character.slug, character.region, recordCharacterView]);

  const changeTab = (next: TabId) => {
    setTab(next);
    if (next === "timeline") recordTimelineViewed(character.id);
  };

  const goToTab = (next: TabId) => {
    changeTab(next);
    window.setTimeout(
      () => tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
  };

  const selectFromOverview = (characterId: string) => {
    const match = neighbors.find((n) => n.node.id === characterId);
    if (!match) return;
    setOverviewSelection({ node: match.node, edge: match.edge });
  };

  return (
    <>
      <CharacterHero
        character={character}
        connections={neighbors.length}
        directConnections={neighbors.filter((n) => n.edge.connectionKind === "direct").length}
        onExploreConnections={() => goToTab("connections")}
        onStartStory={() => setStory(stories[0] ?? null)}
        onPlayStory={() => setCinematicOpen(true)}
        hasStory={stories.length > 0}
        hasTimeline={character.timeline.length > 0}
      />

      <div ref={tabsRef} className="scroll-mt-16">
        <Tabs
          value={tab}
          onValueChange={(value) => changeTab(value as TabId)}
          className="mx-auto w-full max-w-6xl px-4 sm:px-6"
        >
          <TabsList className="sticky top-14 z-20 -mx-4 bg-ink/90 px-4 backdrop-blur-xl sm:mx-0 sm:px-0">
            {TABS.map((item) => (
              <TabsTrigger key={item.id} value={item.id}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="py-10 sm:py-12">
            <OverviewPanel
              character={character}
              core={core}
              onSelect={selectFromOverview}
            />
          </TabsContent>

          <TabsContent value="connections" className="py-10 sm:py-12">
            <ConnectionsPanel
              character={character}
              center={center}
              neighbors={neighbors}
              crossEdges={crossEdges}
            />
          </TabsContent>

          <TabsContent value="timeline" className="py-10 sm:py-12">
            <div className="max-w-3xl">
              <h2 className="font-display text-parchment text-2xl">
                {character.name}&apos;s timeline
              </h2>
              <p className="text-muted mt-1 mb-8 text-sm">
                The order events are understood to have happened in, not the
                order they were published.
              </p>
              <Timeline character={character} beats={character.timeline} />
            </div>
          </TabsContent>

          <TabsContent value="stories" className="py-10 sm:py-12">
            <StoriesPanel
              character={character}
              stories={stories}
              onOpen={setStory}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Overview cards open the same panel the graph uses. */}
      <RelationshipDrawer
        fromCharacterId={character.id}
        selection={overviewSelection}
        onClose={() => setOverviewSelection(null)}
      />

      <StoryPathPlayer path={story} onClose={() => setStory(null)} />

      <CinematicPlayer
        journey={championJourney}
        open={cinematicOpen}
        onClose={() => setCinematicOpen(false)}
        initialFormat={
          searchParams.get("format") === "vertical" ? "portrait" : "landscape"
        }
        initialRecording={searchParams.get("recording") === "1"}
      />
    </>
  );
}
