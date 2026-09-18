"use client";

import Image from "next/image";
import * as React from "react";
import type { ChapterHubState } from "@/lib/cinematic-v3/chapter-hub";
import {
  assetForScene,
  getImageLoadState,
  preloadSceneImage,
} from "@/lib/cinematic-v3/scene-image-preload";
import type { CinematicScene } from "@/types";

function focalObjectPosition(focal?: { x: number; y: number }): string {
  const fp = focal ?? { x: 0.5, y: 0.4 };
  return `${fp.x * 100}% ${fp.y * 100}%`;
}

function BackgroundImage({
  scene,
  opacity,
  blur = 0,
  scale = 1,
  zIndex = 0,
}: {
  scene: CinematicScene;
  opacity: number;
  blur?: number;
  scale?: number;
  zIndex?: number;
}) {
  const asset = assetForScene(scene);
  const url = asset?.url;
  const [resolvedUrl, setResolvedUrl] = React.useState(url);
  const [loadError, setLoadError] = React.useState(false);

  React.useEffect(() => {
    if (!scene) return;
    let cancelled = false;
    preloadSceneImage(scene).then((state) => {
      if (cancelled) return;
      if (state.loaded) {
        setResolvedUrl(state.url);
        setLoadError(false);
      } else {
        setLoadError(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [scene.id, url]);

  if (!resolvedUrl || opacity < 0.01) return null;

  const loadState = getImageLoadState(resolvedUrl);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        opacity,
        zIndex,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        transform: `scale(${scale})`,
        transformOrigin: focalObjectPosition(asset?.focalPoint),
      }}
    >
      <Image
        src={resolvedUrl}
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition: focalObjectPosition(asset?.focalPoint) }}
        sizes="100vw"
        onError={() => setLoadError(true)}
      />
      {process.env.NODE_ENV !== "production" && loadError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-red-950/40 text-red-200 text-xs">
          Failed: {resolvedUrl}
        </div>
      ) : null}
      {process.env.NODE_ENV !== "production" && loadState ? (
        <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-1 font-mono text-[9px] text-parchment/70">
          {scene.id.split(":").pop()} · {loadState.naturalWidth}×{loadState.naturalHeight} ·{" "}
          {(opacity * 100).toFixed(0)}%
        </div>
      ) : null}
    </div>
  );
}

export function SceneBackgroundLayer({
  scene,
  prevScene,
  nextScene,
  hubState,
  arrived,
  traveling,
  showImages = true,
  showDiagnostics = false,
}: {
  scene: CinematicScene;
  prevScene?: CinematicScene;
  nextScene?: CinematicScene;
  hubState?: ChapterHubState;
  arrived: boolean;
  traveling: boolean;
  showImages?: boolean;
  showDiagnostics?: boolean;
}) {
  React.useEffect(() => {
    preloadSceneImage(scene);
    if (nextScene) preloadSceneImage(nextScene);
    if (prevScene) preloadSceneImage(prevScene);
  }, [scene.id, nextScene?.id, prevScene?.id]);

  if (!showImages || !assetForScene(scene)?.url) {
    return null;
  }

  const hub = hubState;
  const settledOpacity = 0.96;

  let currentOpacity = arrived ? settledOpacity : 0;
  let currentBlur = 0;
  let currentScale = 1;
  let prevOpacity = 0;
  let prevBlur = 0;
  let prevScale = 1;

  if (traveling && hub) {
    prevOpacity = Math.max(0, (1 - hub.sceneDissolve) * settledOpacity);
    prevBlur = hub.sceneDissolve * 6;
    prevScale = 1 + hub.sceneDissolve * 0.06;

    const plungePreview = hub.plunge * 0.18;
    currentOpacity = Math.min(settledOpacity, (hub.nextBackground * 0.88 + plungePreview) * settledOpacity);
    currentBlur = Math.max(0, (1 - hub.nextBackground) * 10 - hub.plunge * 2);
    currentScale = 1.04 + hub.plunge * 0.1 - hub.arrivalSettle * 0.06;
  } else if (arrived) {
    currentOpacity = settledOpacity;
  }

  const textGradientSide =
    scene.composition === "LEFT_SUBJECT" || (scene.image?.focalPoint?.x ?? 0.5) > 0.55
      ? "left"
      : "bottom";

  return (
    <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
      {traveling && prevScene ? (
        <BackgroundImage
          scene={prevScene}
          opacity={prevOpacity}
          blur={prevBlur}
          scale={prevScale}
          zIndex={0}
        />
      ) : null}
      <BackgroundImage
        scene={scene}
        opacity={traveling ? currentOpacity : settledOpacity}
        blur={currentBlur}
        scale={currentScale}
        zIndex={1}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            textGradientSide === "left"
              ? "linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.18) 32%, transparent 58%)"
              : "linear-gradient(180deg, transparent 52%, rgba(0,0,0,0.32) 100%)",
          opacity: arrived ? 0.5 : 0.22 + (hub?.nextBackground ?? 0) * 0.18,
        }}
      />
      {showDiagnostics && process.env.NODE_ENV !== "production" ? (
        <div className="absolute bottom-2 left-2 z-[3] rounded bg-black/70 px-2 py-1 font-mono text-[9px] text-gold/80">
          2D_BG · {scene.id} · {assetForScene(scene)?.url?.split("/").pop()}
        </div>
      ) : null}
    </div>
  );
}
