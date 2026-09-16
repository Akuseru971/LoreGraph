import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { characters, claims, events, relationships, sources } from "@/data";
import { CONNECTION_EVIDENCE_LABEL } from "@/lib/truth/evidence";
import { deriveNeedsReview, reviewReason } from "@/lib/truth/review";

const CONSERVATIVE = /LoreGraph keeps this profile conservative/i;
const TRUNCATED = /\.{3}|…\s*$/;

export default function LoreReviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const tierA = characters.filter((c) => c.completenessTier === "A").length;
  const tierB = characters.filter((c) => c.completenessTier === "B").length;
  const tierC = characters.filter((c) => c.completenessTier === "C").length;

  const flagged = relationships
    .filter((r) => deriveNeedsReview(r))
    .map((r) => {
      const a = characters.find((c) => c.id === r.sourceCharacterId);
      const b = characters.find((c) => c.id === r.targetCharacterId);
      return {
        id: r.id,
        from: a?.name ?? r.sourceCharacterId,
        to: b?.name ?? r.targetCharacterId,
        type: CONNECTION_EVIDENCE_LABEL[r.connectionType],
        verified: r.verified,
        reviewed: r.reviewed,
        reviewStatus: r.reviewStatus,
        confidence: r.confidence,
        sources: r.sourceIds.length,
        reason: reviewReason(r),
      };
    });

  const profileIssues = characters
    .filter(
      (c) =>
        c.needsResearch ||
        CONSERVATIVE.test(c.longDescription.join(" ")) ||
        TRUNCATED.test(c.shortDescription) ||
        (c.releaseYear === 2010 && c.slug !== "singed"),
    )
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      tier: c.completenessTier ?? "?",
      score: c.completenessScore ?? 0,
      missing: (c.missingFields ?? []).join(", "),
      releaseYear: c.releaseYear,
    }))
    .slice(0, 50);

  let packResearchCount = 0;
  const packQueuePath = join(process.cwd(), "reports/research-queue-pack.json");
  if (existsSync(packQueuePath)) {
    try {
      packResearchCount = JSON.parse(readFileSync(packQueuePath, "utf8")).length;
    } catch {
      packResearchCount = 0;
    }
  }

  const riotPrimary = sources.filter((s) => s.authorityTier === "PRIMARY_OFFICIAL").length;
  const wikiSources = sources.filter(
    (s) => s.authorityTier === "OFFICIAL_COMMUNITY_REFERENCE",
  ).length;
  const eventsWithAssets = events.filter((e) => e.asset).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-monument text-3xl">Lore review (dev only)</h1>
      <p className="text-muted mt-2 text-sm">
        Knowledge engine QA dashboard — not exposed in production navigation.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Champions" value={String(characters.length)} />
        <StatCard label="Tier A / B / C" value={`${tierA} / ${tierB} / ${tierC}`} />
        <StatCard label="Claims" value={String(claims.length)} />
        <StatCard label="Events w/ images" value={`${eventsWithAssets}/${events.length}`} />
        <StatCard label="Riot primary sources" value={String(riotPrimary)} />
        <StatCard label="Wiki sources" value={String(wikiSources)} />
        <StatCard label="Relationships flagged" value={String(flagged.length)} />
        <StatCard label="Pack research queue" value={String(packResearchCount)} />
        <StatCard label="Profiles needing work" value={String(profileIssues.length)} />
      </div>

      <h2 className="mt-12 text-xl font-medium">Profile quality issues</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="text-eyebrow text-muted border-b border-line">
            <th className="py-2 pr-4">Champion</th>
            <th className="py-2 pr-4">Tier</th>
            <th className="py-2 pr-4">Score</th>
            <th className="py-2 pr-4">Release</th>
            <th className="py-2">Missing</th>
          </tr>
        </thead>
        <tbody>
          {profileIssues.map((row) => (
            <tr key={row.slug} className="border-b border-line/60">
              <td className="py-3 pr-4">{row.name}</td>
              <td className="py-3 pr-4">{row.tier}</td>
              <td className="py-3 pr-4">{row.score}</td>
              <td className="py-3 pr-4">{row.releaseYear ?? "—"}</td>
              <td className="text-muted py-3">{row.missing || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-12 text-xl font-medium">Relationships flagged for review</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="text-eyebrow text-muted border-b border-line">
            <th className="py-2 pr-4">From</th>
            <th className="py-2 pr-4">To</th>
            <th className="py-2 pr-4">Type</th>
            <th className="py-2 pr-4">Verified</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Sources</th>
            <th className="py-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {flagged.map((row) => (
            <tr key={row.id} className="border-b border-line/60">
              <td className="py-3 pr-4">{row.from}</td>
              <td className="py-3 pr-4">{row.to}</td>
              <td className="py-3 pr-4">{row.type}</td>
              <td className="py-3 pr-4">{row.verified ? "yes" : "no"}</td>
              <td className="py-3 pr-4">{row.reviewStatus}</td>
              <td className="py-3 pr-4">{row.sources}</td>
              <td className="text-muted py-3">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface/40 p-4">
      <p className="text-eyebrow text-muted text-xs uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-2xl font-medium">{value}</p>
    </div>
  );
}
