import { notFound } from "next/navigation";
import { characters, relationships } from "@/data";
import { CONNECTION_EVIDENCE_LABEL } from "@/lib/truth/evidence";
import { deriveNeedsReview, reviewReason } from "@/lib/truth/review";

export default function LoreReviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-monument text-3xl">Lore review (dev only)</h1>
      <p className="text-muted mt-2 text-sm">
        {flagged.length} relationships flagged for review.
      </p>
      <table className="mt-8 w-full text-left text-sm">
        <thead>
          <tr className="text-eyebrow text-muted border-b border-line">
            <th className="py-2 pr-4">From</th>
            <th className="py-2 pr-4">To</th>
            <th className="py-2 pr-4">Type</th>
            <th className="py-2 pr-4">Verified</th>
            <th className="py-2 pr-4">Reviewed</th>
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
              <td className="py-3 pr-4">{row.reviewed ? "yes" : "no"}</td>
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
