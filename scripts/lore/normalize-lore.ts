/**
 * Normalizes raw research into structured claims (stub — extend for full ingestion).
 * Run: npx tsx scripts/lore/normalize-lore.ts
 */
import { claims } from "../../data/knowledge/claims";
import { characters } from "../../data/characters";

function main() {
  const claimSubjects = new Set(claims.map((c) => c.subjectId));
  const charsWithClaims = characters.filter((c) => claimSubjects.has(c.id)).length;

  console.log(`Claims: ${claims.length}`);
  console.log(`Champions with claims: ${charsWithClaims}/${characters.length}`);
  console.log("Normalization pipeline ready — extend to process cached source fetches.");
}

main();
