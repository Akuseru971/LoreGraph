import type { CharacterSeed } from "../build";
import { ioniaBatch1Seeds } from "./ionia-batch1";
import { skarnerRemediatedSeed } from "./skarner";

/** Curated remediation overrides — take precedence over roster-expansion stubs. */
export const remediatedSeeds: CharacterSeed[] = [
  skarnerRemediatedSeed,
  ...ioniaBatch1Seeds,
];

export const remediatedSlugs = new Set(remediatedSeeds.map((s) => s.slug));
