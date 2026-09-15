-- LoreGraph initial schema
-- Public lore content is readable without auth.
-- User progress is private to the owning profile.

create extension if not exists "pgcrypto";

/* -------------------------------------------------------------------------- */
/* Lore content (mirrors /data seed — editable by a future editorial tool)    */
/* -------------------------------------------------------------------------- */

create table if not exists public.universes (
  id text primary key,
  slug text not null unique,
  name text not null,
  display_name text not null,
  tagline text not null,
  description text not null,
  accent_color text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.regions (
  id text primary key,
  universe_id text not null references public.universes (id) on delete cascade,
  slug text not null,
  name text not null,
  short_description text not null,
  long_description text not null,
  accent_color text not null,
  secondary_color text not null,
  icon text not null,
  importance int not null default 50,
  verified boolean not null default false,
  unique (universe_id, slug)
);

create table if not exists public.factions (
  id text primary key,
  universe_id text not null references public.universes (id) on delete cascade,
  slug text not null,
  name text not null,
  short_description text not null,
  region_slug text,
  accent_color text not null,
  importance int not null default 50,
  verified boolean not null default false,
  unique (universe_id, slug)
);

create table if not exists public.characters (
  id text primary key,
  universe_id text not null references public.universes (id) on delete cascade,
  slug text not null,
  name text not null,
  title text not null,
  short_description text not null,
  long_description jsonb not null default '[]',
  region_slug text not null,
  factions jsonb not null default '[]',
  roles jsonb not null default '[]',
  status text not null,
  species text not null,
  aliases jsonb not null default '[]',
  accent_color text not null,
  release_year int not null,
  difficulty int not null,
  lore_complexity int not null,
  featured boolean not null default false,
  canon_status text not null default 'CANON',
  related_character_ids jsonb not null default '[]',
  event_ids jsonb not null default '[]',
  source_ids jsonb not null default '[]',
  timeline jsonb not null default '[]',
  tags jsonb not null default '[]',
  asset_key text not null,
  popularity int not null default 50,
  importance int not null default 50,
  verified boolean not null default false,
  unique (universe_id, slug)
);

create table if not exists public.events (
  id text primary key,
  universe_id text not null references public.universes (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null,
  era text not null,
  sort_order int not null default 0,
  character_ids jsonb not null default '[]',
  region_slugs jsonb not null default '[]',
  importance int not null default 50,
  canon_status text not null default 'CANON',
  verified boolean not null default false,
  unique (universe_id, slug)
);

create table if not exists public.sources (
  id text primary key,
  title text not null,
  type text not null,
  url text not null default '',
  publisher text not null default '',
  publication_date date,
  canon_status text not null default 'CANON'
);

create table if not exists public.relationships (
  id text primary key,
  universe_id text not null references public.universes (id) on delete cascade,
  source_character_id text not null references public.characters (id) on delete cascade,
  target_character_id text not null references public.characters (id) on delete cascade,
  type text not null,
  label text not null,
  short_explanation text not null,
  long_explanation text not null,
  importance_score int not null default 50,
  canon_status text not null default 'CANON',
  source_ids jsonb not null default '[]',
  event_ids jsonb not null default '[]',
  verified boolean not null default false
);

create index if not exists relationships_source_idx on public.relationships (source_character_id);
create index if not exists relationships_target_idx on public.relationships (target_character_id);

create table if not exists public.story_paths (
  id text primary key,
  universe_id text not null references public.universes (id) on delete cascade,
  slug text not null unique,
  title text not null,
  subtitle text not null,
  description text not null,
  accent_color text not null,
  character_ids jsonb not null default '[]',
  estimated_minutes int not null default 0,
  featured boolean not null default false,
  verified boolean not null default false
);

create table if not exists public.story_path_steps (
  id text primary key,
  story_path_id text not null references public.story_paths (id) on delete cascade,
  sort_order int not null,
  title text not null,
  subtitle text not null,
  body jsonb not null default '[]',
  character_ids jsonb not null default '[]',
  event_ids jsonb not null default '[]',
  estimated_minutes int not null default 2,
  asset_key text not null,
  unique (story_path_id, sort_order)
);

create table if not exists public.quiz_questions (
  id text primary key,
  universe_id text not null references public.universes (id) on delete cascade,
  kind text not null,
  prompt text not null,
  clues jsonb not null default '[]',
  options jsonb not null default '[]',
  correct_index int not null,
  explanation text not null,
  character_ids jsonb not null default '[]',
  region_slugs jsonb not null default '[]',
  difficulty int not null default 2,
  xp int not null default 25,
  verified boolean not null default false
);

/* -------------------------------------------------------------------------- */
/* Users & progress                                                           */
/* -------------------------------------------------------------------------- */

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  version int not null default 1,
  xp int not null default 0,
  payload jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.user_character_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  character_id text not null references public.characters (id) on delete cascade,
  views int not null default 0,
  relationships_seen jsonb not null default '[]',
  timeline_viewed boolean not null default false,
  stories_completed int not null default 0,
  quiz_correct int not null default 0,
  collected boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, character_id)
);

create table if not exists public.user_story_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  story_slug text not null,
  completed_chapter_ids jsonb not null default '[]',
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, story_slug)
);

create table if not exists public.user_achievements (
  user_id uuid not null references public.profiles (id) on delete cascade,
  achievement_id text not null,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

create table if not exists public.daily_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  date date not null,
  question_ids jsonb not null default '[]',
  correct_count int not null default 0,
  total_count int not null default 0,
  perfect boolean not null default false,
  completed_at timestamptz not null default now(),
  unique (user_id, date)
);

create index if not exists daily_attempts_user_date_idx on public.daily_attempts (user_id, date desc);

/* -------------------------------------------------------------------------- */
/* RLS                                                                        */
/* -------------------------------------------------------------------------- */

alter table public.universes enable row level security;
alter table public.regions enable row level security;
alter table public.factions enable row level security;
alter table public.characters enable row level security;
alter table public.events enable row level security;
alter table public.sources enable row level security;
alter table public.relationships enable row level security;
alter table public.story_paths enable row level security;
alter table public.story_path_steps enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_character_progress enable row level security;
alter table public.user_story_progress enable row level security;
alter table public.user_achievements enable row level security;
alter table public.daily_attempts enable row level security;

-- Public lore: read-only for everyone
create policy "Public read universes" on public.universes for select using (true);
create policy "Public read regions" on public.regions for select using (true);
create policy "Public read factions" on public.factions for select using (true);
create policy "Public read characters" on public.characters for select using (true);
create policy "Public read events" on public.events for select using (true);
create policy "Public read sources" on public.sources for select using (true);
create policy "Public read relationships" on public.relationships for select using (true);
create policy "Public read story_paths" on public.story_paths for select using (true);
create policy "Public read story_path_steps" on public.story_path_steps for select using (true);
create policy "Public read quiz_questions" on public.quiz_questions for select using (true);

-- Profiles
create policy "Users read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Progress: private to owner
create policy "Users read own progress" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "Users upsert own progress" on public.user_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users read own character progress" on public.user_character_progress
  for select using (auth.uid() = user_id);
create policy "Users write own character progress" on public.user_character_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users read own story progress" on public.user_story_progress
  for select using (auth.uid() = user_id);
create policy "Users write own story progress" on public.user_story_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users read own achievements" on public.user_achievements
  for select using (auth.uid() = user_id);
create policy "Users write own achievements" on public.user_achievements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users read own daily attempts" on public.daily_attempts
  for select using (auth.uid() = user_id);
create policy "Users write own daily attempts" on public.daily_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

/* -------------------------------------------------------------------------- */
/* Auth hook: create profile on signup                                        */
/* -------------------------------------------------------------------------- */

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
