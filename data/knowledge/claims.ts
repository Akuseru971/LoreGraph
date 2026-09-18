/**
 * Claim-level knowledge layer.
 * Core reviewed claims are preserved; pack v1 claims merged via import pipeline.
 */
import { mergedClaims } from "./generated/claims-merged";
import { applyClaimPatches } from "./claim-patches";
import { claimExtensions } from "./claim-extensions";
import type { Claim } from "@/types";

const mergedById = new Map(
  applyClaimPatches(mergedClaims).map((c) => [c.id, c]),
);
for (const ext of claimExtensions) {
  mergedById.set(ext.id, ext);
}
export const claims: Claim[] = [...mergedById.values()];
export const claimById = new Map(claims.map((c) => [c.id, c]));
