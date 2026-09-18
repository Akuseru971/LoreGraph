"use client";

import Image from "next/image";
import * as React from "react";
import {
  evaluatePanelDeparture,
  evaluatePanelTransition,
  type PanelTransitionState,
} from "@/lib/cinematic-v3/panel-transition";
import { focalForAspect } from "@/lib/cinematic-v3/story-panel-layout";
import {
  assetForScene,
  getImageLoadState,
  preloadSceneImage,
} from "@/lib/cinematic-v3/scene-image-preload";
import type { CinematicAspectMode, CinematicScene } from "@/types";

function focalObjectPosition(
  focal?: { x: number; y: number },
  portraitFocal?: { x: number; y: number },
  aspectMode: CinematicAspectMode = "AUTO",
): string {
  const fp = focalForAspect(focal, portraitFocal, aspectMode);
  return `${fp.x * 100}% ${fp.y * 100}%`;
}

function BackgroundImage({
  scene,
  opacity,
  blur = 0,
  scale = 1,
  panX = 0,
  panY = 0,
  zIndex = 0,
  aspectMode = "AUTO",
}: {
  scene: CinematicScene;
  opacity: number;
  blur?: number;
  scale?: number;
  panX?: number;
  panY?: number;
  zIndex?: number;
  aspectMode?: CinematicAspectMode;
}) {
  const asset = assetForScene(scene);
  const url = asset?.url;
  const [resolvedUrl, setResolvedUrl] = React.useState(url);
  const [loadError, setLoadError] = React.useState(false);
  const objectPosition = focalObjectPosition(
    asset?.focalPoint,
    asset?.portraitFocalPoint,
    aspectMode,
  );

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
        transform: `translate(${panX * 100}%, ${panY * 100}%) scale(${scale})`,
        transformOrigin: objectPosition,
      }}
    >
      <Image
        src={resolvedUrl}
        alt=""
        fill
        priority
        className="object-cover"
        style={{ objectPosition }}
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
  panelTransition,
  travelProgress = 0,
  holdProgress = 0,
  departureProgress = 0,
  sceneIndex = 0,
  arrived,
  traveling,
  showImages = true,
  showDiagnostics = false,
  aspectMode = "AUTO",
  storyPanelMode = false,
}: {
  scene: CinematicScene;
  prevScene?: CinematicScene;
  nextScene?: CinematicScene;
  panelTransition?: PanelTransitionState;
  travelProgress?: number;
  holdProgress?: number;
  departureProgress?: number;
  sceneIndex?: number;
  arrived: boolean;
  traveling: boolean;
  showImages?: boolean;
  showDiagnostics?: boolean;
  aspectMode?: CinematicAspectMode;
  storyPanelMode?: boolean;
}) {
  React.useEffect(() => {
    preloadSceneImage(scene);
    if (nextScene) preloadSceneImage(nextScene);
    if (prevScene) preloadSceneImage(prevScene);
  }, [scene.id, nextScene?.id, prevScene?.id]);

  if (!showImages || !assetForScene(scene)?.url) {
    return null;
  }

  const settledOpacity = 0.98;
  const panel =
    panelTransition ??
    (storyPanelMode
      ? evaluatePanelTransition(traveling ? travelProgress : 1, holdProgress, sceneIndex)
      : undefined);
  const departure = departureProgress > 0 ? evaluatePanelDeparture(departureProgress) : null;

  let currentOpacity = arrived ? settledOpacity : 0;
  let currentBlur = 0;
  let currentScale = 1;
  let currentPanX = 0;
  let currentPanY = 0;
  let prevOpacity = 0;
  let prevBlur = 0;
  let prevScale = 1;

  if (storyPanelMode && panel) {
    if (traveling && prevScene) {
      prevOpacity = panel.outgoingOpacity;
      prevBlur = panel.t * 4;
      prevScale = panel.outgoingScale;
      currentOpacity = panel.incomingOpacity;
      currentBlur = panel.incomingBlur;
      currentScale = panel.incomingScale;
    } else if (arrived) {
      currentOpacity = settledOpacity * (departure?.opacity ?? 1);
      currentBlur = departure?.blur ?? 0;
      currentScale = (departure?.scale ?? 1) * panel.kenBurnsScale;
      currentPanX = panel.kenBurnsPanX;
      currentPanY = panel.kenBurnsPanY;
    }
  } else if (arrived) {
    currentOpacity = settledOpacity;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
      {traveling && prevScene && storyPanelMode ? (
        <BackgroundImage
          scene={prevScene}
          opacity={prevOpacity}
          blur={prevBlur}
          scale={prevScale}
          zIndex={0}
          aspectMode={aspectMode}
        />
      ) : null}
      <BackgroundImage
        scene={scene}
        opacity={traveling && storyPanelMode ? currentOpacity : settledOpacity * (departure?.opacity ?? 1)}
        blur={currentBlur}
        scale={currentScale}
        panX={currentPanX}
        panY={currentPanY}
        zIndex={1}
        aspectMode={aspectMode}
      />
      {showDiagnostics && process.env.NODE_ENV !== "production" ? (
        <div className="absolute bottom-2 left-2 z-[3] rounded bg-black/70 px-2 py-1 font-mono text-[9px] text-gold/80">
          PANEL · {scene.id} · {assetForScene(scene)?.url?.split("/").pop()}
        </div>
      ) : null}
    </div>
  );
}
