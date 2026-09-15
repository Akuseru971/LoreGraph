/**
 * Pushes the /data seed into Supabase. Requires SUPABASE_SERVICE_ROLE_KEY.
 *
 *   npm run db:seed
 *
 * The app ships with the seed baked into the bundle for demo mode; this script
 * is for when you want the database to be the source of truth instead.
 */
import { createClient } from "@supabase/supabase-js";
import {
  characters,
  events,
  factions,
  quizQuestions,
  regions,
  relationships,
  sources,
  storyPaths,
  universes,
} from "../data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function upsert(table: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const { error } = await supabase.from(table).upsert(rows);
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`  ${table}: ${rows.length}`);
}

async function main() {
  console.log("Seeding LoreGraph into Supabase…\n");

  await upsert(
    "universes",
    universes.map((u) => ({
      id: u.id,
      slug: u.slug,
      name: u.name,
      display_name: u.displayName,
      tagline: u.tagline,
      description: u.description,
      accent_color: u.accentColor,
      active: u.active,
    })),
  );

  await upsert(
    "regions",
    regions.map((r) => ({
      id: r.id,
      universe_id: r.universeId,
      slug: r.slug,
      name: r.name,
      short_description: r.shortDescription,
      long_description: r.longDescription,
      accent_color: r.accentColor,
      secondary_color: r.secondaryColor,
      icon: r.icon,
      importance: r.importance,
      verified: r.verified,
    })),
  );

  await upsert(
    "factions",
    factions.map((f) => ({
      id: f.id,
      universe_id: f.universeId,
      slug: f.slug,
      name: f.name,
      short_description: f.shortDescription,
      region_slug: f.regionSlug,
      accent_color: f.accentColor,
      importance: f.importance,
      verified: f.verified,
    })),
  );

  await upsert(
    "sources",
    sources.map((s) => ({
      id: s.id,
      title: s.title,
      type: s.type,
      url: s.url,
      publisher: s.publisher,
      publication_date: s.publicationDate,
      canon_status: s.canonStatus,
    })),
  );

  await upsert(
    "characters",
    characters.map((c) => ({
      id: c.id,
      universe_id: c.universeId,
      slug: c.slug,
      name: c.name,
      title: c.title,
      short_description: c.shortDescription,
      long_description: c.longDescription,
      region_slug: c.region,
      factions: c.factions,
      roles: c.roles,
      status: c.status,
      species: c.species,
      aliases: c.aliases,
      accent_color: c.accentColor,
      release_year: c.releaseYear,
      difficulty: c.difficulty,
      lore_complexity: c.loreComplexity,
      featured: c.featured,
      canon_status: c.canonStatus,
      related_character_ids: c.relatedCharacterIds,
      event_ids: c.eventIds,
      source_ids: c.sourceIds,
      timeline: c.timeline,
      tags: c.tags,
      asset_key: c.assetKey,
      popularity: c.popularity,
      importance: c.importance,
      verified: c.verified,
    })),
  );

  await upsert(
    "events",
    events.map((e) => ({
      id: e.id,
      universe_id: e.universeId,
      slug: e.slug,
      title: e.title,
      description: e.description,
      era: e.era,
      sort_order: e.order,
      character_ids: e.characterIds,
      region_slugs: e.regionSlugs,
      importance: e.importance,
      canon_status: e.canonStatus,
      verified: e.verified,
    })),
  );

  await upsert(
    "relationships",
    relationships.map((r) => ({
      id: r.id,
      universe_id: r.universeId,
      source_character_id: r.sourceCharacterId,
      target_character_id: r.targetCharacterId,
      type: r.type,
      label: r.label,
      short_explanation: r.shortExplanation,
      long_explanation: r.longExplanation,
      importance_score: r.importanceScore,
      canon_status: r.canonStatus,
      source_ids: r.sourceIds,
      event_ids: r.eventIds,
      verified: r.verified,
    })),
  );

  await upsert(
    "story_paths",
    storyPaths.map((p) => ({
      id: p.id,
      universe_id: p.universeId,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      accent_color: p.accentColor,
      character_ids: p.characterIds,
      estimated_minutes: p.estimatedMinutes,
      featured: p.featured,
      verified: p.verified,
    })),
  );

  const steps = storyPaths.flatMap((p) =>
    p.chapters.map((c) => ({
      id: c.id,
      story_path_id: p.id,
      sort_order: c.order,
      title: c.title,
      subtitle: c.subtitle,
      body: c.body,
      character_ids: c.characterIds,
      event_ids: c.eventIds,
      estimated_minutes: c.estimatedMinutes,
      asset_key: c.assetKey,
    })),
  );
  await upsert("story_path_steps", steps);

  await upsert(
    "quiz_questions",
    quizQuestions.map((q) => ({
      id: q.id,
      universe_id: q.universeId,
      kind: q.kind,
      prompt: q.prompt,
      clues: q.clues,
      options: q.options,
      correct_index: q.correctIndex,
      explanation: q.explanation,
      character_ids: q.characterIds,
      region_slugs: q.regionSlugs,
      difficulty: q.difficulty,
      xp: q.xp,
      verified: q.verified,
    })),
  );

  console.log("\nSeed complete.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
