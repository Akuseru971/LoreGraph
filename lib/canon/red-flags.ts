/**
 * Canon red-flag patterns for build-time validation.
 * Catches epistemic errors that structural validators miss.
 */

export interface CanonRedFlag {
  pattern: RegExp;
  message: string;
  severity: "error" | "warn";
}

export const CANON_RED_FLAGS: CanonRedFlag[] = [
  {
    pattern: /forged specifically to stop the Void|created to fight the Void|manufactured gods to survive the Void|weapons programme.*Void/i,
    message: "Ascension causality: do not claim Ascended were created specifically for the Void",
    severity: "error",
  },
  {
    pattern: /raised (by|through).*to fight the Void/i,
    message: "Ascension causality: prefer 'defended Shurima against the Void' over 'raised to fight the Void'",
    severity: "warn",
  },
  {
    pattern: /kills the (mortal )?host|killed Atreus|Aatrox killed the host/i,
    message: "Pantheon duel: Aatrox destroyed the Aspect; Atreus survived",
    severity: "error",
  },
  {
    pattern: /fragment of the dead Aspect still lodged/i,
    message: "Pantheon: avoid unsupported literal celestial fragment unless sourced",
    severity: "warn",
  },
  {
    pattern: /is documented as a participant in/i,
    message: "Edge copy: 'documented participant' requires verified PARTICIPANT evidence",
    severity: "warn",
  },
];

export function scanTextForRedFlags(
  text: string,
  context: string,
): { context: string; message: string; severity: "error" | "warn" }[] {
  const hits: { context: string; message: string; severity: "error" | "warn" }[] = [];
  for (const flag of CANON_RED_FLAGS) {
    if (flag.pattern.test(text)) {
      hits.push({ context, message: flag.message, severity: flag.severity });
    }
  }
  return hits;
}
