import type { FocalMode, FocalPoint } from "./types";

/**
 * Manual focal-point overrides take priority over manifest defaults.
 * Migrated from legacy ART_POSITION in champion-assets.ts.
 */
export const FOCAL_OVERRIDES: Record<
  string,
  Partial<Record<FocalMode, FocalPoint>>
> = {
  aatrox: {
    HERO: { x: 0.5, y: 0.2 },
    CARD: { x: 0.5, y: 0.2 },
    CINEMATIC: { x: 0.5, y: 0.35 },
  },
  pantheon: {
    HERO: { x: 0.5, y: 0.25 },
    CARD: { x: 0.5, y: 0.25 },
    CINEMATIC: { x: 0.5, y: 0.38 },
  },
  thresh: {
    HERO: { x: 0.5, y: 0.3 },
    CARD: { x: 0.5, y: 0.3 },
    CINEMATIC: { x: 0.5, y: 0.4 },
  },
  jinx: {
    HERO: { x: 0.5, y: 0.35 },
    CARD: { x: 0.5, y: 0.32 },
    MOBILE: { x: 0.5, y: 0.32 },
    CINEMATIC: { x: 0.5, y: 0.38 },
  },
  yasuo: {
    HERO: { x: 0.5, y: 0.28 },
    CARD: { x: 0.5, y: 0.28 },
    CINEMATIC: { x: 0.5, y: 0.36 },
  },
  yone: {
    HERO: { x: 0.5, y: 0.28 },
    CARD: { x: 0.5, y: 0.28 },
    CINEMATIC: { x: 0.5, y: 0.36 },
  },
  lux: {
    HERO: { x: 0.5, y: 0.3 },
    CARD: { x: 0.5, y: 0.3 },
  },
  mordekaiser: {
    HERO: { x: 0.5, y: 0.22 },
    CARD: { x: 0.5, y: 0.22 },
  },
  "kai-sa": {
    CARD: { x: 0.5, y: 0.32 },
    CINEMATIC: { x: 0.5, y: 0.38 },
    MOBILE: { x: 0.5, y: 0.35 },
  },
  kaisa: {
    CARD: { x: 0.5, y: 0.32 },
    CINEMATIC: { x: 0.5, y: 0.38 },
    MOBILE: { x: 0.5, y: 0.35 },
  },
  viego: {
    CINEMATIC: { x: 0.52, y: 0.35 },
    HERO: { x: 0.52, y: 0.3 },
  },
  vi: {
    MOBILE: { x: 0.5, y: 0.32 },
    CINEMATIC: { x: 0.5, y: 0.36 },
  },
  swain: {
    HERO: { x: 0.45, y: 0.3 },
    CARD: { x: 0.45, y: 0.3 },
  },
  leblanc: {
    HERO: { x: 0.5, y: 0.28 },
    CARD: { x: 0.5, y: 0.28 },
  },
  ambessa: {
    HERO: { x: 0.5, y: 0.3 },
    CINEMATIC: { x: 0.5, y: 0.38 },
  },
  mel: {
    HERO: { x: 0.5, y: 0.3 },
    CINEMATIC: { x: 0.5, y: 0.38 },
  },
  yunara: {
    HERO: { x: 0.5, y: 0.3 },
    CINEMATIC: { x: 0.5, y: 0.38 },
  },
  "aurelion-sol": {
    HERO: { x: 0.5, y: 0.35 },
    CARD: { x: 0.5, y: 0.35 },
    CINEMATIC: { x: 0.5, y: 0.42 },
  },
  sylas: {
    HERO: { x: 0.5, y: 0.28 },
    CINEMATIC: { x: 0.5, y: 0.36 },
  },
};

/** Paths that must not be overwritten on regeneration. */
export const MANUAL_OVERRIDE_PATHS = new Set<string>();
