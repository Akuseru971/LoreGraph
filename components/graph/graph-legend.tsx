import { GROUP_COLOR } from "@/lib/graph/style";
import { cn } from "@/lib/utils";

const LINES = [
  { label: "Direct relationship", dash: false },
  { label: "Indirect lore link", dash: true },
];

const GROUPS: Array<{ label: string; color: string }> = [
  { label: "Hostile", color: GROUP_COLOR.hostile },
  { label: "Family & bonds", color: GROUP_COLOR.family },
  { label: "Allied", color: GROUP_COLOR.allied },
  { label: "Faction / structural", color: GROUP_COLOR.structural },
];

const SHAPES = [
  { label: "Champion", shape: "rounded-full" },
  { label: "Region", shape: "[clip-path:polygon(50%_0%,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)]" },
  { label: "Faction", shape: "[clip-path:polygon(50%_0%,100%_14%,100%_62%,50%_100%,0%_62%,0%_14%)]" },
  { label: "Event", shape: "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]" },
];

export function GraphLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2.5", className)}>
      {LINES.map((line) => (
        <span key={line.label} className="flex items-center gap-2">
          <svg width="26" height="2" aria-hidden className="shrink-0">
            <line
              x1="0"
              y1="1"
              x2="26"
              y2="1"
              stroke="rgba(245,242,232,0.5)"
              strokeWidth="1.5"
              strokeDasharray={line.dash ? "4 4" : undefined}
            />
          </svg>
          <span className="text-eyebrow text-muted">{line.label}</span>
        </span>
      ))}

      {GROUPS.map((group) => (
        <span key={group.label} className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-[2px] w-4 shrink-0 rounded-full"
            style={{ backgroundColor: group.color }}
          />
          <span className="text-eyebrow text-muted">{group.label}</span>
        </span>
      ))}

      {SHAPES.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span
            aria-hidden
            className={cn("size-3 shrink-0 bg-white/30", item.shape)}
          />
          <span className="text-eyebrow text-muted">{item.label}</span>
        </span>
      ))}
    </div>
  );
}
