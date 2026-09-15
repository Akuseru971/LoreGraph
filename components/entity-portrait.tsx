import Image from "next/image";
import { generateArtwork, portraitUrl, splashUrl } from "@/lib/assets";
import { cn, initials } from "@/lib/utils";

/**
 * Every champion visual goes through here. With NEXT_PUBLIC_ASSET_BASE_URL set
 * it renders real artwork; without it, a deterministic gradient plus a
 * monogram. Either way there is never a broken image box.
 */
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
  variant?: "portrait" | "splash";
  className?: string;
  rounded?: string;
  showMonogram?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const remote = variant === "splash" ? splashUrl(assetKey) : portraitUrl(assetKey);
  const artwork = generateArtwork(assetKey, accentColor, variant);

  return (
    <div
      className={cn("relative overflow-hidden", rounded, className)}
      style={{ background: artwork.background }}
    >
      {remote ? (
        <Image
          src={remote}
          alt={name}
          fill
          sizes={sizes ?? "(max-width: 768px) 40vw, 20vw"}
          className="object-cover"
          priority={priority}
        />
      ) : showMonogram ? (
        <span
          aria-hidden
          className="font-display absolute inset-0 flex items-center justify-center text-[min(38%,4rem)] leading-none tracking-tight"
          style={{ color: `${accentColor}` , opacity: 0.55 }}
        >
          {initials(name)}
        </span>
      ) : null}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: artwork.overlay }}
      />
    </div>
  );
}
