import { getSourceSnapshot } from "@/data/knowledge/source-snapshots";
import {
  hashContent,
  verifyEvidenceAgainstSnapshot,
} from "@/lib/knowledge/source-snapshot";
import type { SourceEvidence } from "@/types";
import { batch1IoniaEvidenceSeeds } from "./batch1-ionia-seeds";
import { curatedEvidenceSeeds } from "./curated-seeds";
import { phase1EvidenceSeeds } from "./phase1-seeds";

const allEvidenceSeeds = [
  ...phase1EvidenceSeeds,
  ...curatedEvidenceSeeds,
  ...batch1IoniaEvidenceSeeds,
];

function evidenceId(claimId: string, sourceId: string, index: number): string {
  const claimPart = claimId.replace(/^claim:/, "").replace(/:/g, "-");
  const sourcePart = sourceId.replace(/^source:/, "");
  return `evidence:${claimPart}--${sourcePart}--${String(index).padStart(2, "0")}`;
}

function buildEvidenceRegistry(): {
  records: SourceEvidence[];
  bindings: Record<string, string[]>;
} {
  const counter = new Map<string, number>();
  const records: SourceEvidence[] = [];
  const bindings: Record<string, string[]> = {};

  for (const seed of allEvidenceSeeds) {
    const key = `${seed.claimId}::${seed.sourceId}`;
    const idx = (counter.get(key) ?? 0) + 1;
    counter.set(key, idx);

    const id = evidenceId(seed.claimId, seed.sourceId, idx);
    const snapshot = getSourceSnapshot(seed.sourceId);
    const draft: SourceEvidence = {
      id,
      sourceId: seed.sourceId,
      normalizedFact: seed.normalizedFact,
      evidenceType: seed.evidenceType ?? "DIRECT_STATEMENT",
      shortExcerpt: seed.shortExcerpt,
      continuity: "MAIN_RUNETERRA",
      sourceSnapshotHash: snapshot?.contentHash,
      excerptHash: seed.shortExcerpt ? hashContent(seed.shortExcerpt) : undefined,
    };
    const verification = verifyEvidenceAgainstSnapshot(draft, snapshot);
    records.push({
      ...draft,
      reviewStatus: verification.reviewStatus,
      reviewedAt:
        verification.reviewStatus === "VERIFIED"
          ? snapshot?.retrievedAt
          : undefined,
      reviewMethod:
        verification.reviewStatus === "VERIFIED"
          ? "SNAPSHOT_EXCERPT"
          : verification.reviewStatus === "REJECTED"
            ? "SNAPSHOT_MISMATCH"
            : undefined,
    });

    if (!bindings[seed.claimId]) bindings[seed.claimId] = [];
    bindings[seed.claimId].push(id);
  }

  return { records, bindings };
}

const built = buildEvidenceRegistry();

export const sourceEvidence: SourceEvidence[] = built.records;
export const sourceEvidenceById = new Map(sourceEvidence.map((e) => [e.id, e]));
export const claimEvidenceBindings: Record<string, string[]> = built.bindings;
