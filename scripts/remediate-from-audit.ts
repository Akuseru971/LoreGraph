/**
 * Champion remediation runner — uses tier-a-remediation-master.json as backlog.
 * Usage: npx tsx scripts/remediate-from-audit.ts [--slug ahri] [--state CURATED_PROVENANCE_GAP]
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { characters } from "../data/characters";
import { claims } from "../data/knowledge/claims";
import { computeQuality } from "../lib/knowledge/quality-matrix";
import { isTrustedClaim } from "../lib/knowledge/claim-evidence";
import { resolveClaimEvidenceRefs } from "../lib/knowledge/evidence-registry";

interface AuditChampion {
  slug: string;
  name: string;
  audit_state: string;
  current_tier: string;
  current_blocker: string;
  canonical_information_to_add_or_verify: string[];
  primary_riot_source: string;
}

const auditPath = join(process.cwd(), "data/audit/tier-a-remediation-master.json");
const audit = JSON.parse(readFileSync(auditPath, "utf8")) as {
  champions: AuditChampion[];
};

const slugArg = process.argv.find((a) => a.startsWith("--slug="))?.split("=")[1];
const stateArg = process.argv.find((a) => a.startsWith("--state="))?.split("=")[1];

let queue = audit.champions;
if (slugArg) queue = queue.filter((c) => c.slug === slugArg);
if (stateArg) queue = queue.filter((c) => c.audit_state === stateArg);

let tierA = 0;
let tierB = 0;
let tierC = 0;
const gaps: string[] = [];

for (const entry of queue) {
  const c = characters.find((ch) => ch.slug === entry.slug);
  if (!c) {
    gaps.push(`${entry.slug}: missing character profile`);
    continue;
  }

  const q = computeQuality(c);
  if (q.tier === "A") tierA++;
  else if (q.tier === "B") tierB++;
  else tierC++;

  const charClaims = claims.filter((cl) => cl.subjectId === c.id);
  const trusted = charClaims.filter(isTrustedClaim).length;
  const withEvidence = charClaims.filter((cl) => resolveClaimEvidenceRefs(cl).length > 0).length;

  const status = q.tierAEligible ? "TIER_A" : `BLOCKED: ${q.tierABlockers[0] ?? "unknown"}`;
  console.log(
    `${entry.slug.padEnd(16)} audit=${entry.audit_state.padEnd(22)} now=${q.tier} eligible=${q.tierAEligible} claims=${charClaims.length} trusted=${trusted} evidence=${withEvidence} ${status}`,
  );

  if (!q.tierAEligible && entry.canonical_information_to_add_or_verify.length) {
    gaps.push(
      `${entry.slug}: still needs — ${entry.canonical_information_to_add_or_verify.slice(0, 2).join("; ")}`,
    );
  }
}

console.log("\n--- Summary ---");
console.log(`Processed: ${queue.length}`);
console.log(`Tier A: ${tierA} | Tier B: ${tierB} | Tier C: ${tierC}`);
if (gaps.length) {
  console.log(`\nTop gaps (${Math.min(10, gaps.length)}):`);
  for (const g of gaps.slice(0, 10)) console.log(`  - ${g}`);
}
