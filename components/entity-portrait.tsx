"use client";

import Image from "next/image";
import * as React from "react";
import {
  championArtPosition,
  generateArtwork,
  getChampionAsset,
  type ChampionAssetType,
} from "@/lib/assets";
import { cn, initials } from "@/lib/utils";

const VARIANT_MAP: Record<"portrait" | "splash" | "card", ChampionAssetType> = {
  portrait: "portrait",
  splash: "hero",
  card: "card",
};

export function EntityPortrait({
  assetKey,
  name,
  accentColor,
  variant = "portrait",
  className,
  rounded = "rounded-full",
  showMonogram = true,
  priority = false,
  sizes,
}: {
  assetKey: string;
  name: string;
  accentColor: string;
  variant?: "portrait" | "splash" | "card";
  className?: string;
  rounded?: string;
  showMonogram?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  const remote = getChampionAsset({ slug: assetKey, assetKey }, VARIANT_MAP[variant]);
  const artwork = generateArtwork(assetKey, accentColor, variant);
  const focalMode =
    variant === "splash" ? "HERO" : variant === "card" ? "CARD" : "MOBILE";
  const objectPosition = championArtPosition(assetKey, focalMode);

  return (
    <div
      className={cn("relative overflow-hidden", rounded, className)}
      style={{ background: artwork.background }}
    >
      {!failed ? (
        <Image
          src={remote}
          alt={name}
          fill
          sizes={sizes ?? "(max-width: 768px) 40vw, 20vw"}
          className="object-cover"
          style={{ objectPosition }}
          priority={priority}
          onError={() => setFailed(true)}
        />
      ) : showMonogram ? (
        <span
          aria-hidden
          className="font-display absolute inset-0 flex items-center justify-center text-[min(38%,4rem)] leading-none tracking-tight"
          style={{ color: accentColor, opacity: 0.55 }}
        >
          {initials(name)}
        </span>
      ) : null}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: artwork.overlay }}
      />
    </div>
  );
}
