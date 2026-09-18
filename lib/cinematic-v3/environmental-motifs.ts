import type { AtmospherePreset, EnvironmentalMotifType } from "@/types";

export interface MotifLayerConfig {
  type: EnvironmentalMotifType;
  depth: "background" | "midground" | "foreground";
  intensity: number;
}

const REGION_MOTIFS: Partial<Record<AtmospherePreset, EnvironmentalMotifType[]>> = {
  SHURIMA: ["SUN_DISC", "SHURIMA_ARCHES"],
  IONIA: ["IONIAN_SPIRIT_ARCS", "IONIAN_FLOATING_LIGHTS"],
  VOID: ["VOID_RIFT", "VOID_FILAMENTS"],
  SHADOW_ISLES: ["SHADOW_WISPS", "SHADOW_ARCHES"],
  CELESTIAL: ["CELESTIAL_ORBITS", "TARGON_CONSTELLATIONS"],
  NOXUS: ["NOXIAN_ASH", "NOXIAN_MONOLITHS"],
  PILTOVER: ["PILTOVER_GEOMETRY"],
  ZAUN: ["ZAUN_SMOKE"],
  FRELJORD: ["FRELJORD_ICE_DUST"],
  BILGEWATER: ["BILGEWATER_MIST"],
};

export function defaultMotifsForAtmosphere(
  atmosphere: AtmospherePreset,
): EnvironmentalMotifType[] {
  return REGION_MOTIFS[atmosphere] ?? ["CELESTIAL_ORBITS"];
}

export function motifLayers(
  motifs: EnvironmentalMotifType[],
): MotifLayerConfig[] {
  return motifs.map((type) => ({
    type,
    depth: motifDepth(type),
    intensity: 1,
  }));
}

function motifDepth(type: EnvironmentalMotifType): MotifLayerConfig["depth"] {
  switch (type) {
    case "NOXIAN_ASH":
    case "FRELJORD_ICE_DUST":
    case "BILGEWATER_MIST":
    case "ZAUN_SMOKE":
      return "foreground";
    case "IONIAN_FLOATING_LIGHTS":
    case "VOID_FILAMENTS":
    case "SHADOW_WISPS":
      return "midground";
    default:
      return "background";
  }
}
