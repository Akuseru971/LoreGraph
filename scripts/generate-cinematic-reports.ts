import { writeFileSync } from "fs";
import { join } from "path";
import {
  generateAssetCoverageReport,
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
console.log("Wrote reports/cinematic-asset-coverage.md");
console.log("Wrote reports/cinematic-visual-qa.md");
