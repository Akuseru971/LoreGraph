import * as React from "react";
import {
  Anchor,
  Eye,
  Flame,
  Gem,
  Ghost,
  Leaf,
  Cog,
  Shield,
  Snowflake,
  Sparkles,
  Sprout,
  Sun,
  Swords,
  type LucideIcon,
} from "lucide-react";
import { factionBySlug, regionBySlug } from "@/data";
import type { RegionIconKind, RegionSlug } from "@/types";
import { cn, hexToRgba } from "@/lib/utils";

const REGION_ICONS: Record<RegionIconKind, LucideIcon> = {
  shield: Shield,
  blade: Swords,
  leaf: Leaf,
  gear: Cog,
  flask: Flame,
  sun: Sun,
  star: Sparkles,
  snowflake: Snowflake,
  ghost: Ghost,
  eye: Eye,
  anchor: Anchor,
  sprout: Sprout,
};

export function regionIconFor(slug: RegionSlug): LucideIcon {
  const region = regionBySlug.get(slug);
  return region ? REGION_ICONS[region.icon] : Gem;
}

/** Renders a region icon without dynamic component assignment (eslint-safe). */
export function RegionIcon({
  slug,
  size,
  className,
}: {
  slug: RegionSlug;
  size?: number;
  className?: string;
}) {
  const region = regionBySlug.get(slug);
  const kind = region?.icon ?? "shield";
  const props = {
    className,
    style: size ? { width: size, height: size } : undefined,
    "aria-hidden": true as const,
  };
  return React.createElement(REGION_ICONS[kind], props);
}

export function RegionBadge({
  slug,
  className,
  showIcon = true,
}: {
  slug: RegionSlug;
  className?: string;
  showIcon?: boolean;
}) {
  const region = regionBySlug.get(slug);
  if (!region) return null;
  const Icon = REGION_ICONS[region.icon];

  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        className,
      )}
      style={{
        borderColor: hexToRgba(region.accentColor, 0.3),
        backgroundColor: hexToRgba(region.accentColor, 0.09),
        color: region.accentColor,
      }}
    >
      {showIcon ? <Icon className="size-3" aria-hidden /> : null}
      {region.name}
    </span>
  );
}

export function FactionBadge({
  id,
  className,
}: {
  /** Faction id (`faction:darkin`) or slug (`darkin`). */
  id: string;
  className?: string;
}) {
  const slug = id.startsWith("faction:") ? id.slice("faction:".length) : id;
  const faction = factionBySlug.get(slug);
  if (!faction) return null;

  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1",
        className,
      )}
      style={{
        borderColor: hexToRgba(faction.accentColor, 0.32),
        backgroundColor: hexToRgba(faction.accentColor, 0.08),
        color: faction.accentColor,
      }}
      title={faction.shortDescription}
    >
      {faction.name}
    </span>
  );
}
