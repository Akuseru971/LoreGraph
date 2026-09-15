import {
  BookOpen,
  Crown,
  Flame,
  Footprints,
  Ghost,
  GitFork,
  Leaf,
  Library,
  Map,
  Shield,
  Sparkles,
  Sun,
  Swords,
  Wind,
  Cog,
  type LucideIcon,
} from "lucide-react";
import { achievementById } from "@/data";
import { cn, hexToRgba } from "@/lib/utils";
import type { AchievementDefinition } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  swords: Swords,
  wind: Wind,
  shield: Shield,
  flame: Flame,
  cog: Cog,
  crown: Crown,
  sparkles: Sparkles,
  "git-fork": GitFork,
  library: Library,
  footprints: Footprints,
  map: Map,
  sun: Sun,
  leaf: Leaf,
  ghost: Ghost,
  book: BookOpen,
};

const RARITY_COLOR = {
  common: "#8F9AAD",
  rare: "#8B7FC7",
  epic: "#C9A96E",
  legendary: "#D8B978",
} as const;

export function AchievementCard({
  achievement,
  unlocked,
  compact,
}: {
  achievement: AchievementDefinition;
  unlocked: boolean;
  compact?: boolean;
}) {
  const Icon = ICONS[achievement.icon] ?? Sparkles;
  const color = RARITY_COLOR[achievement.rarity];

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border transition-colors",
        unlocked
          ? "border-line-strong bg-white/[0.04]"
          : "border-line bg-white/[0.02] opacity-55",
        compact ? "p-3" : "p-4",
      )}
    >
      <span
        aria-hidden
        className="absolute -top-6 -right-6 size-24 rounded-full blur-2xl"
        style={{ background: hexToRgba(color, unlocked ? 0.18 : 0.06) }}
      />
      <div className="relative flex items-start gap-3">
        <span
          className="grid shrink-0 place-items-center rounded-lg border"
          style={{
            width: compact ? 36 : 40,
            height: compact ? 36 : 40,
            borderColor: hexToRgba(color, 0.35),
            backgroundColor: hexToRgba(color, 0.1),
            color,
          }}
        >
          <Icon className={compact ? "size-4" : "size-5"} aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-eyebrow text-parchment">{achievement.name}</h3>
          <p className="text-muted mt-1 text-xs leading-relaxed">
            {achievement.description}
          </p>
          {unlocked ? (
            <p className="text-eyebrow mt-2 text-[#7FB98A]">Unlocked</p>
          ) : (
            <p className="text-eyebrow text-muted-dim mt-2">+{achievement.xp} XP</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function AchievementList({
  unlockedIds,
  limit,
}: {
  unlockedIds: string[];
  limit?: number;
}) {
  const unlocked = new Set(unlockedIds);
  const all = Array.from(achievementById.values());
  const sorted = [
    ...all.filter((a) => unlocked.has(a.id)),
    ...all.filter((a) => !unlocked.has(a.id)),
  ].slice(0, limit ?? all.length);

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {sorted.map((achievement) => (
        <li key={achievement.id}>
          <AchievementCard
            achievement={achievement}
            unlocked={unlocked.has(achievement.id)}
          />
        </li>
      ))}
    </ul>
  );
}
