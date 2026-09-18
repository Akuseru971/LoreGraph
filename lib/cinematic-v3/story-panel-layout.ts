import type { CinematicAspectMode, CinematicComposition } from "@/types";
import { CAPTION_SAFE_BOTTOM, CINEMATIC_SAFE_AREA } from "./cinematic-frame";

export interface StoryPanelPlacement {
  positionClass: string;
  textAlign: "left" | "center" | "right";
  maxWidth: string;
  panelPadding: string;
  eyebrowSize: string;
  titleSize: string;
  bodySize: string;
  safePadding: {
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;
  };
}

const PORTRAIT_SAFE = {
  top: 0.1,
  bottom: 0.22,
  left: 0.08,
  right: 0.08,
};

export function storyPanelPlacement(
  aspectMode: CinematicAspectMode,
  composition: CinematicComposition,
  recordMode = false,
): StoryPanelPlacement {
  const isPortrait = aspectMode === "9:16";
  const is169 = aspectMode === "16:9" || recordMode;
  const safe = isPortrait ? PORTRAIT_SAFE : CINEMATIC_SAFE_AREA;
  const bottomPad = isPortrait
    ? safe.bottom
    : CINEMATIC_SAFE_AREA.bottom + (is169 ? CAPTION_SAFE_BOTTOM : 0);

  const safePadding = {
    paddingLeft: `${safe.left * 100}%`,
    paddingRight: `${safe.right * 100}%`,
    paddingTop: `${safe.top * 100}%`,
    paddingBottom: `${bottomPad * 100}%`,
  };

  if (isPortrait) {
    return {
      positionClass: "items-stretch justify-end",
      textAlign: "left",
      maxWidth: "100%",
      panelPadding: "px-5 py-5 sm:px-6 sm:py-6",
      eyebrowSize: "text-[0.65rem] tracking-[0.28em]",
      titleSize: "text-[clamp(1.75rem,8vw,2.75rem)]",
      bodySize: "text-[clamp(0.9rem,3.8vw,1.05rem)]",
      safePadding,
    };
  }

  const textOnRight =
    composition === "LEFT_SUBJECT" ||
    composition === "BACKGROUND_MEMORY" ||
    composition === "DISTANT_WORLD";

  return {
    positionClass: textOnRight
      ? "items-start justify-center"
      : "items-start justify-end",
    textAlign: "left",
    maxWidth: is169 ? "min(42%, 36rem)" : "min(88%, 28rem)",
    panelPadding: is169 ? "px-8 py-7 sm:px-10 sm:py-8" : "px-5 py-5 sm:px-6",
    eyebrowSize: is169
      ? "text-[clamp(0.7rem,1.1vw,0.95rem)] tracking-[0.24em]"
      : "text-eyebrow",
    titleSize: is169
      ? "text-[clamp(2.25rem,4.5vw,4.5rem)]"
      : "text-[clamp(1.75rem,5vw,3rem)]",
    bodySize: is169
      ? "text-[clamp(1rem,1.5vw,1.35rem)]"
      : "text-[0.9375rem] sm:text-base",
    safePadding,
  };
}

export function focalForAspect(
  focalPoint?: { x: number; y: number },
  portraitFocal?: { x: number; y: number },
  aspectMode: CinematicAspectMode = "AUTO",
): { x: number; y: number } {
  if (aspectMode === "9:16" && portraitFocal) return portraitFocal;
  if (aspectMode === "9:16" && focalPoint) {
    return { x: focalPoint.x, y: Math.min(0.42, focalPoint.y * 0.85) };
  }
  return focalPoint ?? { x: 0.5, y: 0.4 };
}
