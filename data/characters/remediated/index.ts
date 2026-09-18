import type { CharacterSeed } from "../build";
import { skarnerRemediatedSeed } from "./skarner";

/** Curated remediation overrides — take precedence over roster-expansion stubs. */
export const remediatedSeeds: CharacterSeed[] = [skarnerRemediatedSeed];

export const remediatedSlugs = new Set(remediatedSeeds.map((s) => s.slug));
