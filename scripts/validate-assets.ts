/**
 * Champion asset validation. Run with `npm run validate:assets`.
 */
import { characters } from "../data";
import {
  ddragonChampionKey,
  getChampionAssetUrl,
} from "../lib/assets/champion-assets";

const TIMEOUT_MS = 8000;

async function checkUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function main() {
  let portraitOk = 0;
  let splashOk = 0;
  const problems: string[] = [];

  console.log("\nChampion asset validation");
  console.log("-----------------------");

  for (const character of characters) {
    const slug = character.slug;
    try {
      ddragonChampionKey(slug);
    } catch {
      problems.push(`${slug}: missing Data Dragon key mapping`);
      continue;
    }

    const portraitUrl = getChampionAssetUrl(slug, "portrait");
    const splashUrl = getChampionAssetUrl(slug, "splash");
    const portraitValid = await checkUrl(portraitUrl);
    const splashValid = await checkUrl(splashUrl);

    if (portraitValid) portraitOk++;
    else problems.push(`${slug}: portrait failed (${portraitUrl})`);

    if (splashValid) splashOk++;
    else problems.push(`${slug}: splash failed (${splashUrl})`);

    console.log(
      `${character.name}\n  portrait ${portraitValid ? "✓" : "✗"}\n  splash ${splashValid ? "✓" : "✗"}`,
    );
  }

  console.log("\nSummary");
  console.log(`Portrait: ${portraitOk}/${characters.length}`);
  console.log(`Splash: ${splashOk}/${characters.length}`);
  console.log(`Issues: ${problems.length}`);

  if (problems.length > 0) {
    console.log("\nFailures:");
    for (const p of problems.slice(0, 20)) console.log(` - ${p}`);
    if (problems.length > 20) console.log(` ... and ${problems.length - 20} more`);
    process.exit(1);
  }

  console.log("\nAsset validation complete ✓\n");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
