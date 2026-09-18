import { flagshipAssetBySceneId } from "@/data/cinematic/flagship-assets";
import type { CinematicScene, CinematicSceneAsset } from "@/types";

export interface ImageLoadState {
  url: string;
  loaded: boolean;
  error: boolean;
  naturalWidth: number;
  naturalHeight: number;
  fallbackUsed: boolean;
  fallbackUrl?: string;
}

const cache = new Map<string, Promise<ImageLoadState>>();
const objectUrls = new Map<string, ImageLoadState>();

function resolveUrl(scene: CinematicScene): string | undefined {
  if (scene.image?.url) return scene.image.url;
  const manifest = flagshipAssetBySceneId.get(scene.id);
  return manifest?.officialAsset?.url;
}

function fallbackChain(scene: CinematicScene): string[] {
  const urls: string[] = [];
  const primary = resolveUrl(scene);
  if (primary) urls.push(primary);
  const manifest = flagshipAssetBySceneId.get(scene.id);
  if (manifest?.officialAsset?.url && !urls.includes(manifest.officialAsset.url)) {
    urls.push(manifest.officialAsset.url);
  }
  if (scene.primaryCharacterId) {
    const slug = scene.primaryCharacterId.replace(/^char:/, "");
    urls.push(`/assets/champions/generated/${slug}-hero-16x9.webp`);
  }
  return urls;
}

function loadOne(url: string): Promise<ImageLoadState> {
  const cached = objectUrls.get(url);
  if (cached?.loaded) return Promise.resolve(cached);

  const pending = cache.get(url);
  if (pending) return pending;

  const promise = new Promise<ImageLoadState>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const state: ImageLoadState = {
        url,
        loaded: true,
        error: false,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        fallbackUsed: false,
      };
      objectUrls.set(url, state);
      resolve(state);
    };
    img.onerror = () => {
      const state: ImageLoadState = {
        url,
        loaded: false,
        error: true,
        naturalWidth: 0,
        naturalHeight: 0,
        fallbackUsed: false,
      };
      objectUrls.set(url, state);
      resolve(state);
    };
    img.src = url;
  });

  cache.set(url, promise);
  return promise;
}

/** Preload scene background with automatic fallback chain. */
export async function preloadSceneImage(scene: CinematicScene): Promise<ImageLoadState> {
  const chain = fallbackChain(scene);
  for (let i = 0; i < chain.length; i++) {
    const result = await loadOne(chain[i]);
    if (result.loaded) {
      return {
        ...result,
        fallbackUsed: i > 0,
        fallbackUrl: i > 0 ? chain[0] : undefined,
      };
    }
  }
  return {
    url: chain[0] ?? "",
    loaded: false,
    error: true,
    naturalWidth: 0,
    naturalHeight: 0,
    fallbackUsed: false,
  };
}

export function preloadSceneImages(scenes: CinematicScene[]): void {
  for (const scene of scenes) {
    void preloadSceneImage(scene);
  }
}

export function getImageLoadState(url: string): ImageLoadState | undefined {
  return objectUrls.get(url);
}

export function assetForScene(scene: CinematicScene): CinematicSceneAsset | undefined {
  if (scene.image?.url) return scene.image;
  const manifest = flagshipAssetBySceneId.get(scene.id);
  if (!manifest?.officialAsset) return undefined;
  return {
    url: manifest.officialAsset.url,
    sourceEntityId: manifest.officialAsset.sourceEntityId,
    relevance: manifest.officialAsset.relevance,
    confidence: "HIGH",
    focalPoint: manifest.officialAsset.focalPoint,
    aspectRatio: manifest.officialAsset.aspectRatio,
    assetType: manifest.officialAsset.assetType,
  };
}
