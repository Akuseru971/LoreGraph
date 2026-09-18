import { characters } from "@/data/characters";
import { FLAGSHIP_SCENE_ASSETS, flagshipAssetBySceneId } from "@/data/cinematic/flagship-assets";
import { buildChampionJourneyV3 } from "./build-champion-journey";
import { buildConnectionJourneyV3 } from "./build-connection-journey";
import { applyFlagshipCurations } from "./apply-flagship";
import { compositionForScene } from "./composition";
import { inferShotType } from "./shot-types";
import { inferWorldNodeArchetype } from "./world-node-archetypes";
import { evaluateJourneyReadiness } from "./visual-readiness";
import { flagshipTimingSummary } from "./validate-flagship-coverage";
import { recordTimingForScene, totalSceneRecordMs } from "./record-mode";
import { totalIntroMs, totalIntroMsForMode } from "./intro-outro";

const FLAGSHIP_SLUGS = ["aatrox", "yasuo", "yone", "viego", "skarner"] as const;

function buildFlagshipJourney(slug: string) {
  if (slug === "yasuo-yone") {
    const yasuo = characters.find((c) => c.slug === "yasuo")!;
    const yone = characters.find((c) => c.slug === "yone")!;
    return applyFlagshipCurations(buildConnectionJourneyV3(yasuo, yone)!);
  }
  const c = characters.find((ch) => ch.slug === slug)!;
  return applyFlagshipCurations(buildChampionJourneyV3(c));
}

export function generateAssetCoverageReport(): string {
  const lines: string[] = [
    "# Cinematic Asset Coverage — Flagship Journeys",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
  ];

  for (const entry of FLAGSHIP_SCENE_ASSETS) {
    lines.push(`## ${entry.sceneId}`);
    lines.push("");
    lines.push(`- **Journey:** ${entry.journeyId}`);
    lines.push(`- **Visual subject:** ${entry.visualSubject}`);
    lines.push(`- **Required:** ${entry.requiredVisualSubject}`);
    lines.push(`- **Shot type:** ${entry.shotType}`);
    lines.push(`- **World node:** ${entry.worldNodeArchetype ?? "—"}`);
    lines.push(`- **Composition:** ${entry.composition}`);
    lines.push(`- **Quality status:** ${entry.qualityStatus}`);
    lines.push(`- **Motifs:** ${entry.environmentalMotifs.join(", ")}`);
    if (entry.officialAsset) {
      lines.push(`- **Asset:** ${entry.officialAsset.url}`);
      lines.push(`- **Relevance:** ${entry.officialAsset.relevance}`);
      lines.push(`- **Source:** ${entry.officialAsset.source ?? "—"}`);
      lines.push(
        `- **Focal point:** ${entry.officialAsset.focalPoint ? `${entry.officialAsset.focalPoint.x}, ${entry.officialAsset.focalPoint.y}` : "—"}`,
      );
    } else {
      lines.push(`- **Asset:** NO_IMAGE / abstract environment`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function generateVisualQaReport(): string {
  const lines: string[] = [
    "# Cinematic Visual QA — Flagship Journeys",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
  ];

  const journeys = [
    ...FLAGSHIP_SLUGS.map((s) => ({ slug: s, journey: buildFlagshipJourney(s) })),
    { slug: "yasuo-yone", journey: buildFlagshipJourney("yasuo-yone") },
  ];

  for (const { slug, journey } of journeys) {
    const readiness = evaluateJourneyReadiness(journey);
    lines.push(`## ${slug}`);
    lines.push("");
    lines.push(`- **loreReady:** ${readiness.loreReady}`);
    lines.push(`- **visualReady:** ${readiness.visualReady}`);
    lines.push(`- **recordReady:** ${readiness.recordReady}`);
    if (readiness.blockers.length) {
      lines.push(`- **Blockers:** ${readiness.blockers.join("; ")}`);
    }
    lines.push("");

    for (const scene of journey.scenes) {
      const manifest = flagshipAssetBySceneId.get(scene.id);
      lines.push(`### ${scene.id} — ${scene.title}`);
      lines.push("");
      lines.push(`| Field | Value |`);
      lines.push(`|-------|-------|`);
      lines.push(`| Type | ${scene.type} |`);
      lines.push(`| Shot | ${scene.shotType ?? inferShotType(scene)} |`);
      lines.push(`| Composition | ${scene.composition ?? compositionForScene(scene, scene.image)} |`);
      lines.push(`| World node | ${scene.worldNodeArchetype ?? inferWorldNodeArchetype(scene) ?? "—"} |`);
      lines.push(`| Motifs | ${scene.environmentalMotifs?.join(", ") ?? "—"} |`);
      lines.push(`| Image | ${scene.image?.url ? "yes" : "NO_IMAGE"} |`);
      lines.push(`| Asset relevance | ${scene.image?.relevance ?? "—"} |`);
      lines.push(`| Quality | ${scene.image?.qualityStatus ?? manifest?.qualityStatus ?? "—"} |`);
      lines.push(`| Curated | ${scene.curated ? "yes" : "no"} |`);
      lines.push(`| Visual issue | ${readiness.blockers.some((b) => b.startsWith(scene.id)) ? "review" : "ok"} |`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

export function generateFlagshipSceneCoverageReport(): string {
  const timing = flagshipTimingSummary();
  const lines: string[] = [
    "# Cinematic Flagship Scene Coverage",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Timing summary",
    "",
    `- Default intro: **${timing.defaultIntroMs}ms**`,
    `- Aatrox record intro: **${timing.aatroxRecordIntroMs}ms**`,
    `- Aatrox record outro: **${timing.aatroxRecordOutroMs}ms**`,
    `- Default scene (record): **${timing.defaultSceneMs}ms**`,
    "",
  ];

  const journeys = [
    ...FLAGSHIP_SLUGS.map((s) => ({ slug: s, journey: buildFlagshipJourney(s) })),
    { slug: "yasuo-yone", journey: buildFlagshipJourney("yasuo-yone") },
  ];

  for (const { slug, journey } of journeys) {
    lines.push(`## Journey: ${slug}`);
    lines.push("");
    const introMs = journey.introSequence
      ? totalIntroMsForMode(journey.introSequence, true)
      : 0;
    lines.push(`- Record intro: ${introMs}ms`);
    lines.push("");

    for (const scene of journey.scenes) {
      const manifest = flagshipAssetBySceneId.get(scene.id);
      const rt = recordTimingForScene(scene);
      const sceneMs = totalSceneRecordMs(scene);
      lines.push(`### ${scene.id}`);
      lines.push("");
      lines.push(`| Field | Value |`);
      lines.push(`|-------|-------|`);
      lines.push(`| Visual subject | ${manifest?.visualSubject ?? scene.visualSubject ?? scene.title} |`);
      lines.push(`| Has background | ${scene.image?.url ? "yes" : "no"} |`);
      lines.push(`| Asset | ${scene.image?.url ?? manifest?.officialAsset?.url ?? "—"} |`);
      lines.push(`| Relevance | ${scene.image?.relevance ?? manifest?.officialAsset?.relevance ?? "—"} |`);
      lines.push(`| Quality | ${scene.image?.qualityStatus ?? manifest?.qualityStatus ?? "—"} |`);
      lines.push(`| Composition | ${scene.composition ?? manifest?.composition ?? "—"} |`);
      lines.push(`| Record scene ms | ${sceneMs} |`);
      lines.push(`| Travel / hold | ${rt.travelMs} / ${rt.readingHoldMs} |`);
      lines.push("");
    }
  }

  return lines.join("\n");
}
