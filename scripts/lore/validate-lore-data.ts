/**
 * Extended lore quality validation beyond scripts/validate-lore.ts.
 * Run: npm run lore:validate
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { characters, claims, events, relationships, sources } from "../../data";

const CONSERVATIVE = /LoreGraph keeps this profile conservative/i;
const TRUNCATED = /\.{3}|…\s*$/;
const SUSPICIOUS_YEAR = 2010;

interface ResearchItem {
  entity: string;
  issue: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  missing: string[];
  candidateSources?: string[];
}

const items: ResearchItem[] = [];

for (const c of characters) {
  if (c.releaseYear === SUSPICIOUS_YEAR && c.slug !== "singed") {
    items.push({
      entity: c.name,
      issue: "SUSPICIOUS_FALLBACK",
      severity: "HIGH",
      missing: ["releaseYear"],
    });
  }
  if (CONSERVATIVE.test(c.longDescription.join(" "))) {
    items.push({
      entity: c.name,
      issue: "TRUNCATED_IMPORT",
      severity: "MEDIUM",
      missing: ["biography"],
    });
  }
  if (TRUNCATED.test(c.shortDescription)) {
    items.push({
      entity: c.name,
      issue: "TRUNCATED_IMPORT",
      severity: "MEDIUM",
      missing: ["shortDescription"],
    });
  }
  if (c.needsResearch || (c.completenessTier === "C" && !c.verified)) {
    items.push({
      entity: c.name,
      issue: "LOW_COMPLETENESS",
      severity: c.completenessTier === "C" ? "HIGH" : "MEDIUM",
      missing: c.missingFields ?? [],
      candidateSources: c.sourceIds,
    });
  }
}

for (const event of events) {
  if (!event.description) {
    items.push({
      entity: event.title,
      issue: "UNVERIFIED_EVENT",
      severity: "HIGH",
      missing: ["description"],
    });
  }
  if (!event.asset && event.importance >= 80) {
    items.push({
      entity: event.title,
      issue: "MISSING_IMAGE",
      severity: "MEDIUM",
      missing: ["eventAsset"],
    });
  }
}

const outPath = join(process.cwd(), "reports/lore-review.json");
writeFileSync(outPath, JSON.stringify(items, null, 2), "utf8");

const tierA = characters.filter((c) => c.completenessTier === "A").length;
const tierB = characters.filter((c) => c.completenessTier === "B").length;
const tierC = characters.filter((c) => c.completenessTier === "C").length;
const riotPrimary = sources.filter((s) => s.authorityTier === "PRIMARY_OFFICIAL").length;
const wikiSources = sources.filter(
  (s) => s.authorityTier === "OFFICIAL_COMMUNITY_REFERENCE",
).length;

console.log("\nKnowledge engine report");
console.log("-----------------------");
console.log(`Champions: ${characters.length} (A:${tierA} B:${tierB} C:${tierC})`);
console.log(`Claims: ${claims.length}`);
console.log(`Events: ${events.length} (${events.filter((e) => e.asset).length} with assets)`);
console.log(`Relationships: ${relationships.length}`);
console.log(`Riot primary sources: ${riotPrimary}`);
console.log(`Wiki sources: ${wikiSources}`);
console.log(`Research queue: ${items.length} items → ${outPath}`);
