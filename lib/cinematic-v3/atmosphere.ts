import type { AtmospherePreset, RegionSlug } from "@/types";

export interface AtmosphereConfig {
  preset: AtmospherePreset;
  background: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  particleColor: string;
  particleDensity: number;
  lightTemperature: number;
  ambientIntensity: number;
  starWarmth: number;
}

export const ATMOSPHERE_CONFIG: Record<AtmospherePreset, AtmosphereConfig> = {
  CELESTIAL: {
    preset: "CELESTIAL",
    background: "#020408",
    fogColor: "#0a1020",
    fogNear: 12,
    fogFar: 80,
    particleColor: "#c8d8ff",
    particleDensity: 0.35,
    lightTemperature: 0.85,
    ambientIntensity: 0.25,
    starWarmth: 1.0,
  },
  SHURIMA: {
    preset: "SHURIMA",
    background: "#0a0604",
    fogColor: "#1a1008",
    fogNear: 10,
    fogFar: 70,
    particleColor: "#d4a85c",
    particleDensity: 0.45,
    lightTemperature: 1.2,
    ambientIntensity: 0.3,
    starWarmth: 1.15,
  },
  VOID: {
    preset: "VOID",
    background: "#06040a",
    fogColor: "#120818",
    fogNear: 8,
    fogFar: 55,
    particleColor: "#8b5cf6",
    particleDensity: 0.5,
    lightTemperature: 0.6,
    ambientIntensity: 0.15,
    starWarmth: 0.7,
  },
  DARKIN: {
    preset: "DARKIN",
    background: "#080404",
    fogColor: "#1a0808",
    fogNear: 10,
    fogFar: 65,
    particleColor: "#c44a4a",
    particleDensity: 0.4,
    lightTemperature: 0.9,
    ambientIntensity: 0.2,
    starWarmth: 0.85,
  },
  IONIA: {
    preset: "IONIA",
    background: "#04080a",
    fogColor: "#0a1418",
    fogNear: 14,
    fogFar: 75,
    particleColor: "#7ec8b8",
    particleDensity: 0.38,
    lightTemperature: 0.95,
    ambientIntensity: 0.28,
    starWarmth: 1.05,
  },
  NOXUS: {
    preset: "NOXUS",
    background: "#080606",
    fogColor: "#141010",
    fogNear: 12,
    fogFar: 68,
    particleColor: "#b04040",
    particleDensity: 0.32,
    lightTemperature: 0.95,
    ambientIntensity: 0.22,
    starWarmth: 0.9,
  },
  DEMACIA: {
    preset: "DEMACIA",
    background: "#06080c",
    fogColor: "#101418",
    fogNear: 14,
    fogFar: 72,
    particleColor: "#a8c0e8",
    particleDensity: 0.3,
    lightTemperature: 1.0,
    ambientIntensity: 0.3,
    starWarmth: 1.1,
  },
  FRELJORD: {
    preset: "FRELJORD",
    background: "#040608",
    fogColor: "#0c1218",
    fogNear: 16,
    fogFar: 78,
    particleColor: "#9ec8e0",
    particleDensity: 0.42,
    lightTemperature: 0.75,
    ambientIntensity: 0.25,
    starWarmth: 0.8,
  },
  SHADOW_ISLES: {
    preset: "SHADOW_ISLES",
    background: "#040608",
    fogColor: "#0a1014",
    fogNear: 6,
    fogFar: 45,
    particleColor: "#6a9a8c",
    particleDensity: 0.55,
    lightTemperature: 0.65,
    ambientIntensity: 0.18,
    starWarmth: 0.75,
  },
  BILGEWATER: {
    preset: "BILGEWATER",
    background: "#060608",
    fogColor: "#101018",
    fogNear: 10,
    fogFar: 60,
    particleColor: "#6a8a9a",
    particleDensity: 0.35,
    lightTemperature: 0.85,
    ambientIntensity: 0.22,
    starWarmth: 0.9,
  },
  PILTOVER: {
    preset: "PILTOVER",
    background: "#06080a",
    fogColor: "#101418",
    fogNear: 14,
    fogFar: 70,
    particleColor: "#c8b060",
    particleDensity: 0.28,
    lightTemperature: 1.05,
    ambientIntensity: 0.32,
    starWarmth: 1.0,
  },
  ZAUN: {
    preset: "ZAUN",
    background: "#040406",
    fogColor: "#0c0c10",
    fogNear: 5,
    fogFar: 40,
    particleColor: "#5a8a5a",
    particleDensity: 0.48,
    lightTemperature: 0.7,
    ambientIntensity: 0.15,
    starWarmth: 0.8,
  },
  IXTAL: {
    preset: "IXTAL",
    background: "#040806",
    fogColor: "#0a100c",
    fogNear: 12,
    fogFar: 68,
    particleColor: "#5ac878",
    particleDensity: 0.36,
    lightTemperature: 0.9,
    ambientIntensity: 0.24,
    starWarmth: 0.95,
  },
  BANDLE: {
    preset: "BANDLE",
    background: "#080604",
    fogColor: "#141008",
    fogNear: 16,
    fogFar: 80,
    particleColor: "#e8c878",
    particleDensity: 0.4,
    lightTemperature: 1.1,
    ambientIntensity: 0.35,
    starWarmth: 1.2,
  },
  NEUTRAL: {
    preset: "NEUTRAL",
    background: "#020408",
    fogColor: "#0a0c14",
    fogNear: 12,
    fogFar: 75,
    particleColor: "#b8c8e0",
    particleDensity: 0.3,
    lightTemperature: 1.0,
    ambientIntensity: 0.25,
    starWarmth: 1.0,
  },
};

const REGION_ATMOSPHERE: Partial<Record<RegionSlug, AtmospherePreset>> = {
  shurima: "SHURIMA",
  void: "VOID",
  ionia: "IONIA",
  noxus: "NOXUS",
  demacia: "DEMACIA",
  freljord: "FRELJORD",
  "shadow-isles": "SHADOW_ISLES",
  bilgewater: "BILGEWATER",
  piltover: "PILTOVER",
  zaun: "ZAUN",
  ixtal: "IXTAL",
  "bandle-city": "BANDLE",
  targon: "CELESTIAL",
  runeterra: "NEUTRAL",
};

export function atmosphereForRegion(region?: RegionSlug): AtmospherePreset {
  if (!region) return "NEUTRAL";
  return REGION_ATMOSPHERE[region] ?? "NEUTRAL";
}

export function getAtmosphereConfig(preset: AtmospherePreset): AtmosphereConfig {
  return ATMOSPHERE_CONFIG[preset];
}
