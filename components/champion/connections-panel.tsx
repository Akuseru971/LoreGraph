"use client";

import { Network } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as React from "react";
import { GraphLegend } from "@/components/graph/graph-legend";
import { RelationshipDrawer, type RelationshipSelection } from "@/components/graph/relationship-drawer";
import { RelationshipList } from "@/components/graph/relationship-list";
import { characterById } from "@/data";
import { OnboardingHint } from "@/components/onboarding-hint";
import { EmptyState } from "@/components/ui/empty-state";
import { GraphSkeleton } from "@/components/ui/screen-skeletons";
import { track } from "@/lib/analytics";
import { edgeCategory } from "@/lib/truth/layer";
import type { Neighbor } from "@/lib/graph";
import { cn } from "@/lib/utils";
import type { Character, ConnectionCategory, GraphEdge, GraphNode } from "@/types";

// The graph is the heaviest thing on the page and never needed above the fold.
const KnowledgeGraph = dynamic(
  () => import("@/components/graph/knowledge-graph").then((m) => m.KnowledgeGraph),
  {
    ssr: false,
    loading: () => <GraphSkeleton className="rounded-none border-0" />,
  },
);

type FilterId = "all" | "direct" | "events" | "factions" | "lore";

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All" },
  { id: "direct", label: "Direct" },
  { id: "events", label: "Events" },
  { id: "factions", label: "Factions" },
  { id: "lore", label: "Lore" },
];

const LORE_CATEGORIES = new Set<ConnectionCategory>([
  "STRUCTURAL_LORE",
  "THEMATIC_PARALLEL",
  "AMBIGUOUS",
  "LEGACY_CONNECTION",
]);

function matches(filter: FilterId, neighbor: Neighbor): boolean {
  const { edge, node } = neighbor;
  const category = edgeCategory(edge);
  switch (filter) {
    case "all":
      return true;
    case "direct":
      return category === "DIRECT_CANON" && edge.connectionKind === "direct";
    case "events":
      return node.type === "event" || category === "SHARED_EVENT";
    case "factions":
      return node.type === "faction" || category === "SHARED_FACTION";
    case "lore":
      return node.type === "concept" || LORE_CATEGORIES.has(category);
    default:
      return true;
  }
}

export function ConnectionsPanel({
  character,
  center,
  neighbors,
  crossEdges,
}: {
  character: Character;
  center: GraphNode;
  neighbors: Neighbor[];
  crossEdges: GraphEdge[];
}) {
  const router = useRouter();
  const [filter, setFilter] = React.useState<FilterId>("all");
  const [selection, setSelection] = React.useState<RelationshipSelection | null>(null);

  React.useEffect(() => {
    track({ name: "graph_open", characterSlug: character.slug });
  }, [character.slug]);

  const visible = React.useMemo(
    () => neighbors.filter((neighbor) => matches(filter, neighbor)),
    [neighbors, filter],
  );

  const counts = React.useMemo(() => {
    const result = {} as Record<FilterId, number>;
    for (const option of FILTERS) {
      result[option.id] = neighbors.filter((n) => matches(option.id, n)).length;
    }
    return result;
  }, [neighbors]);

  const select = React.useCallback(
    (node: GraphNode, edge: GraphEdge | null) => {
      if (node.id === center.id) {
        setSelection(null);
        return;
      }
      const resolved =
        edge ?? neighbors.find((n) => n.node.id === node.id)?.edge ?? null;
      setSelection({ node, edge: resolved });
      track({
        name: "graph_node_click",
        nodeId: node.id,
        nodeType: node.type,
        depth: 1,
      });
    },
    [center.id, neighbors],
  );

  const open = React.useCallback(
    (node: GraphNode) => {
      const target = characterById.get(node.id);
      if (target) router.push(`/champion/${target.slug}`);
    },
    [router],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-parchment text-2xl">
            {character.name}&apos;s network
          </h2>
          <p className="text-muted mt-1 text-sm">
            Tap a node to see what connects them. Double-tap to open a champion.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter connections"
          className="scrollbar-none -mx-4 flex max-w-full gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {FILTERS.filter((option) => counts[option.id] > 0 || option.id === "all").map(
            (option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={filter === option.id}
                className={cn(
                  "text-label shrink-0 rounded-full border px-3 py-1.5 transition-colors",
                  filter === option.id
                    ? "border-gold/50 bg-gold/12 text-gold"
                    : "text-muted hover:text-parchment border-line",
                )}
              >
                {option.label}
                <span className="text-muted-dim ml-1.5 tabular-nums">
                  {counts[option.id]}
                </span>
              </button>
            ),
          )}
        </div>
      </div>

      <OnboardingHint
        id="graphExplore"
        className="mt-6"
        title="Follow the threads"
        body="Select any connected character to follow their story through the graph."
      />

      {visible.length === 0 ? (
        <div className="panel mt-6">
          <EmptyState
            icon={Network}
            title="Nothing matches that filter."
            description="Try 'All' to see every connection we have recorded for this champion."
          />
        </div>
      ) : (
        <>
          <div className="panel mt-6 h-[clamp(380px,60vh,620px)] overflow-hidden">
            <KnowledgeGraph
              center={center}
              neighbors={visible}
              crossEdges={crossEdges}
              selectedNodeId={selection?.node.id ?? null}
              onSelectNode={select}
              onOpenNode={open}
              className="size-full"
            />
          </div>

          <GraphLegend className="mt-4" />

          <div className="mt-10">
            <h3 className="sr-only">Connection list</h3>
            <RelationshipList
              neighbors={visible}
              selectedId={selection?.node.id ?? null}
              onSelect={(node, edge) => select(node, edge)}
            />
          </div>
        </>
      )}

      <RelationshipDrawer
        fromCharacterId={character.id}
        selection={selection}
        onClose={() => setSelection(null)}
      />
    </div>
  );
}
