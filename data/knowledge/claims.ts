/**
 * Claim-level knowledge layer.
 * Core reviewed claims are preserved; pack v1 claims merged via import pipeline.
 */
import { mergedClaims } from "./generated/claims-merged";
import { applyClaimPatches } from "./claim-patches";
import type { Claim } from "@/types";

export const claims: Claim[] = applyClaimPatches(mergedClaims);
export const claimById = new Map(claims.map((c) => [c.id, c]));
