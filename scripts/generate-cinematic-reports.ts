import { writeFileSync } from "fs";
import { join } from "path";
import {
  generateAssetCoverageReport,
  generateFlagshipSceneCoverageReport,
  generateVisualQaReport,
} from "../lib/cinematic-v3/generate-reports";

const root = process.cwd();
writeFileSync(
  join(root, "reports/cinematic-asset-coverage.md"),
  generateAssetCoverageReport(),
);
writeFileSync(
  join(root, "reports/cinematic-visual-qa.md"),
  generateVisualQaReport(),
);
writeFileSync(
  join(root, "reports/cinematic-flagship-scene-coverage.md"),
  generateFlagshipSceneCoverageReport(),
);
console.log("Wrote reports/cinematic-asset-coverage.md");
console.log("Wrote reports/cinematic-visual-qa.md");
console.log("Wrote reports/cinematic-flagship-scene-coverage.md");
