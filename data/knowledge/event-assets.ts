import type { EventAsset } from "@/types";
import { packEventAssets } from "./generated/event-assets-pack";

/**
 * Official artwork and focal points for major lore events.
 * Images resolved via lib/assets when assetKey is set.
 */
const coreEventAssets: EventAsset[] = [
  {
    eventId: "event:void-incursion",
    assetKey: "void-incursion",
    focalPointX: 0.5,
    focalPointY: 0.35,
    focalPointMobileX: 0.5,
    focalPointMobileY: 0.4,
    sourceType: "Cinematic",
    copyrightOwner: "Riot Games",
    attribution: "Riot Games — Void War imagery",
  },
  {
    eventId: "event:the-ruination",
    assetKey: "ruination",
    focalPointX: 0.55,
    focalPointY: 0.3,
    focalPointMobileX: 0.5,
    focalPointMobileY: 0.35,
    sourceType: "Cinematic",
    copyrightOwner: "Riot Games",
    attribution: "Riot Games — Ruination",
  },
  {
    eventId: "event:darkin-war",
    assetKey: "darkin-war",
    focalPointX: 0.6,
    focalPointY: 0.28,
    sourceType: "Short Story",
    copyrightOwner: "Riot Games",
    attribution: "Twilight of the Gods",
  },
  {
    eventId: "event:noxian-invasion-ionia",
    assetKey: "ionian-war",
    focalPointX: 0.5,
    focalPointY: 0.32,
    sourceType: "Cinematic",
    copyrightOwner: "Riot Games",
    attribution: "Riot Games — Warriors",
  },
  {
    eventId: "event:ascension-ritual",
    assetKey: "shurima-ascension",
    focalPointX: 0.5,
    focalPointY: 0.25,
    sourceType: "Champion Biography",
    copyrightOwner: "Riot Games",
  },
  {
    eventId: "event:swain-coup",
    assetKey: "noxus-rise",
    focalPointX: 0.45,
    focalPointY: 0.3,
    sourceType: "Champion Biography",
    copyrightOwner: "Riot Games",
  },
];

/** Core assets win over pack imports when both define the same event. */
export const eventAssets: EventAsset[] = [
  ...coreEventAssets,
  ...packEventAssets.filter(
    (p) => !coreEventAssets.some((c) => c.eventId === p.eventId),
  ),
];

export const eventAssetByEventId = new Map(
  eventAssets.map((a) => [a.eventId, a]),
);
