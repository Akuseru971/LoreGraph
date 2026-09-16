import type { Character, CompletenessTier } from "@/types";
import { computeQuality, type QualityResult } from "./quality-matrix";

export interface CompletenessResult {
  tier: CompletenessTier;
  score: number;
  missingFields: string[];
  needsResearch: boolean;
  dimensions?: QualityResult["dimensions"];
  tierReasons?: string[];
}

/**
 * Derives profile completeness from multi-dimensional quality matrix.
 * Explicit seed tier overrides auto-detection when provided, but cannot bypass integrity.
 */
export function computeCompleteness(
  character: Character,
  explicitTier?: CompletenessTier,
): CompletenessResult {
  const quality = computeQuality(character, explicitTier);
  return {
    tier: quality.tier,
    score: quality.score,
    missingFields: quality.missingFields,
    needsResearch: quality.needsResearch,
    dimensions: quality.dimensions,
    tierReasons: quality.tierReasons,
  };
}
