# LoreGraph

**Explore. Connect. Understand.**

LoreGraph is an interactive platform for discovering fictional universes through characters, relationships, timelines, factions, events, and guided story paths.

The first supported universe is **Runeterra** (League of Legends lore). LoreGraph is an independent fan project and is not endorsed by Riot Games.

## What it does

- **Discover** — browse 50 seeded champions, regions, story paths and trending characters
- **Champion** — cinematic profiles with overview, connection graph, timeline and stories
- **Connect** — find the shortest and most narratively meaningful path between any two champions
- **Daily / Profile** — Daily Lore quiz, Lore DNA, collection, XP, levels and achievements

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, Radix UI primitives, Framer Motion
- React Flow (`@xyflow/react`) for knowledge graphs
- Supabase for auth and optional cloud progress (demo mode uses seed data + `localStorage`)

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — works without Supabase
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check:seed` | Validate seed data and graph paths |
| `npm run db:seed` | Push seed data to Supabase (requires service role key) |

## Environment variables

See `.env.example`. The app **must** run without Supabase:

- No env vars → seed data from `/data`, progress in `localStorage`
- With `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` → auth and cloud progress sync

Never commit real secrets.

## Supabase setup

1. Create a Supabase project.
2. Run the migration in `supabase/migrations/001_initial.sql` (SQL editor or CLI).
3. Enable Email and/or Google auth in the Supabase dashboard.
4. Add redirect URL: `http://localhost:3000/auth/callback` (and your production URL).
5. Set env vars in `.env.local`.
6. Optionally seed lore tables: `npm run db:seed`

Progress is stored as a JSON payload in `user_progress` for simplicity; normalized tables exist for future expansion.

## Architecture

```
app/                  # Four page types: /, /champion/[slug], /connect, /me
components/           # UI by domain (champion, connect, daily, discover, graph, story)
data/                 # Runeterra seed (source of truth in demo mode)
lib/
  graph/              # Graph build, Dijkstra pathfinding, layouts
  data/               # Lore + progress repositories
  progress/           # XP, achievements, Lore DNA
  analytics/          # Provider-agnostic event tracking
  share/              # Share card canvas renderer
supabase/migrations/  # SQL schema + RLS
```

Components never import seed files directly for UI logic — they use `loreRepository` and `useProgress()`.

## Graph algorithm

`lib/graph/build.ts` constructs an undirected graph:

- **Direct edges** — character-to-character relationships (cheap, importance-weighted)
- **Indirect edges** — faction, region and event links (expensive, so paths prefer real relationships)

`findShortestPath` minimises hops (with importance tie-break).

`findNarrativePath` minimises a story-quality cost that rewards direct, high-importance, canonical edges and penalises generic region hops.

`findPaths` returns up to three routes: narrative, shortest, and one alternative.

Run `npm run check:seed` to see sample paths.

## Adding a champion

1. Add a `CharacterSeed` in `data/characters/<region>.ts`
2. Register it in `data/characters/index.ts`
3. Add relationships in `data/relationships.ts`
4. Optionally add timeline beats, quiz questions and story path references
5. Run `npm run check:seed`

## Adding another universe

1. Add a `Universe` in `data/universes.ts`
2. Create a new folder `data/universes/<slug>/` with regions, characters, etc.
3. Scope all entities with `universeId`
4. Extend routing when you are ready to expose a universe switcher

## Deployment (Vercel)

1. Push to GitHub and import in Vercel.
2. Set environment variables (at minimum `NEXT_PUBLIC_SITE_URL`).
3. Add Supabase vars if you want auth.
4. Deploy — champion pages are statically generated.

## Legal

LoreGraph is a fan project. Riot Games and Runeterra are trademarks of Riot Games, Inc. See the site footer for the full disclaimer.
