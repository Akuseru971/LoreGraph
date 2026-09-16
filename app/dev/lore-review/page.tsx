import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { characters, claims, events, relationships, sources, storyPaths } from "@/data";
import { validateEvents } from "@/lib/events/validate";
import { computeQuality } from "@/lib/knowledge/quality-matrix";
import { absoluteUrl, getSiteUrl, isProductionIndexable } from "@/lib/seo";
import { validateStoryPaths } from "@/lib/story-path/validate";
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

  const storyValidation = validateStoryPaths();
  const eventValidation = validateEvents();
  const unsupportedFacts = storyValidation.factsWithoutEvidence;

  const tierACandidatesFailing = characters
    .filter((c) => c.completenessTier === "A")
    .map((c) => ({ c, q: computeQuality(c, "A") }))
    .filter(({ q }) => q.tier !== "A")
    .map(({ c, q }) => ({
      name: c.name,
      reasons: q.tierReasons?.join(", ") ?? "integrity thresholds",
    }));

  const nearTierA = characters
    .map((c) => ({ c, q: computeQuality(c) }))
    .filter(({ q }) => q.tier === "B" && q.dimensions.reviewCoverage >= 60)
    .slice(0, 15)
    .map(({ c, q }) => ({
      name: c.name,
      review: q.dimensions.reviewCoverage,
      canon: q.dimensions.canonConfidence,
    }));

  const unresolvedContinuity = characters.filter((c) => !c.continuity).length;

  const eventRolesNeedingReview = (events.flatMap((e) => e.characterLinks ?? []) ?? []).filter(
    (l) => l.needsReview,
  ).length;

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
        <StatCard label="Story FACT gaps" value={String(unsupportedFacts)} />
        <StatCard label="Event roles pending" value={String(eventRolesNeedingReview)} />
        <StatCard label="Unresolved continuity" value={String(unresolvedContinuity)} />
      </div>

      <h2 className="mt-12 text-xl font-medium">Canon hardening</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface/40 p-4 text-sm">
          <p className="text-eyebrow text-muted text-xs">SEO origin</p>
          <p className="mt-1 font-mono text-xs">{getSiteUrl()}</p>
          <p className="text-muted mt-2 text-xs">
            Indexable: {isProductionIndexable() ? "yes" : "no (preview/dev)"}
          </p>
          <p className="text-muted mt-1 font-mono text-xs">{absoluteUrl("/champion/aatrox")}</p>
        </div>
        <div className="rounded-lg border border-line bg-surface/40 p-4 text-sm">
          <p className="text-eyebrow text-muted text-xs">Story path blocks</p>
          <ul className="text-muted mt-2 space-y-1 text-xs">
            {Object.entries(storyValidation.blockCounts).map(([k, v]) => (
              <li key={k}>{k}: {v}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-surface/40 p-4 text-sm">
          <p className="text-eyebrow text-muted text-xs">Event role breakdown</p>
          <ul className="text-muted mt-2 space-y-1 text-xs">
            {Object.entries(eventValidation.roleCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => (
                <li key={k}>{k}: {v}</li>
              ))}
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-surface/40 p-4 text-sm">
          <p className="text-eyebrow text-muted text-xs">Tier A integrity failures</p>
          <ul className="text-muted mt-2 space-y-1 text-xs">
            {tierACandidatesFailing.length === 0 ? (
              <li>None — all explicit Tier A pass thresholds</li>
            ) : (
              tierACandidatesFailing.map((r) => (
                <li key={r.name}>{r.name}: {r.reasons}</li>
              ))
            )}
          </ul>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-medium">Closest to Tier A</h2>
      <ul className="text-muted mt-4 space-y-1 text-sm">
        {nearTierA.map((r) => (
          <li key={r.name}>
            {r.name} — review {r.review}%, canon {r.canon}%
          </li>
        ))}
      </ul>

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
