import type { FocalPoint } from "../../lib/assets/types";

export interface CropRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Compute a focal-aware crop rectangle for a target aspect ratio. */
export function computeFocalCrop(
  srcWidth: number,
  srcHeight: number,
  targetWidth: number,
  targetHeight: number,
  focal: FocalPoint,
): CropRect {
  const targetAspect = targetWidth / targetHeight;
  const srcAspect = srcWidth / srcHeight;

  let cropW: number;
  let cropH: number;

  if (srcAspect > targetAspect) {
    cropH = srcHeight;
    cropW = Math.round(cropH * targetAspect);
  } else {
    cropW = srcWidth;
    cropH = Math.round(cropW / targetAspect);
  }

  const focalX = focal.x * srcWidth;
  const focalY = focal.y * srcHeight;

  let left = Math.round(focalX - cropW / 2);
  let top = Math.round(focalY - cropH / 2);

  left = Math.max(0, Math.min(left, srcWidth - cropW));
  top = Math.max(0, Math.min(top, srcHeight - cropH));

  return { left, top, width: cropW, height: cropH };
}

export const VARIANT_SPECS = {
  portrait: { width: 512, height: 512, mode: "CARD" as const },
  card: { width: 800, height: 1000, mode: "CARD" as const },
  hero: { width: 1600, height: 900, mode: "HERO" as const },
  cinematic: { width: 1080, height: 1920, mode: "CINEMATIC" as const },
} as const;
