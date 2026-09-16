/**
 * Claim-level knowledge layer.
 * Core reviewed claims are preserved; pack v1 claims merged via import pipeline.
 */
export { mergedClaims as claims, claimById } from "./generated/claims-merged";
