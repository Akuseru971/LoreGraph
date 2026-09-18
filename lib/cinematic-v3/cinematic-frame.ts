import type { CinematicAspectMode, CinematicSafeArea } from "@/types";

/** Logical 16:9 composition reference (record / staging). */
export const CINEMATIC_LOGICAL_WIDTH = 1920;
export const CINEMATIC_LOGICAL_HEIGHT = 1080;
export const CINEMATIC_ASPECT = 16 / 9;

/** Safe zones as fraction of logical frame (0–1). */
export const CINEMATIC_SAFE_AREA: CinematicSafeArea = {
  top: 0.08,
  bottom: 0.18,
  left: 0.06,
  right: 0.06,
};

export const CAPTION_SAFE_BOTTOM = 0.15;

export function frameDimensions(aspectMode: CinematicAspectMode, viewport: {
  width: number;
  height: number;
}): { width: number; height: number; letterbox: boolean; pillarbox: boolean } {
  if (aspectMode === "AUTO") {
    return { width: viewport.width, height: viewport.height, letterbox: false, pillarbox: false };
  }

  const targetAspect = aspectMode === "16:9" ? CINEMATIC_ASPECT : 9 / 16;
  const viewportAspect = viewport.width / viewport.height;

  if (viewportAspect > targetAspect) {
    const height = viewport.height;
    const width = height * targetAspect;
    return { width, height, letterbox: false, pillarbox: true };
  }

  const width = viewport.width;
  const height = width / targetAspect;
  return { width, height, letterbox: true, pillarbox: false };
}

export function safeAreaPx(
  frameWidth: number,
  frameHeight: number,
  safe = CINEMATIC_SAFE_AREA,
): {
  contentLeft: number;
  contentTop: number;
  contentWidth: number;
  contentHeight: number;
} {
  return {
    contentLeft: frameWidth * safe.left,
    contentTop: frameHeight * safe.top,
    contentWidth: frameWidth * (1 - safe.left - safe.right),
    contentHeight: frameHeight * (1 - safe.top - safe.bottom),
  };
}
