/**
 * LoreGraph domain model.
 *
 * Everything here is universe-agnostic on purpose: Runeterra is the first
 * universe we ship, but characters, factions, regions and relationships are
 * modelled generically so another universe can be added as pure data.
 */

/* -------------------------------------------------------------------------- */
/* Primitives                                                                 */
/* -------------------------------------------------------------------------- */

export type EntityType =
  | "character"
  | "faction"
  | "region"
  | "location"
  | "event"
  | "concept";

export type RelationshipType =
  | "ally"
  | "enemy"
  | "rival"
  | "family"
  | "mentor"
  | "student"
  | "lover"
  | "formerAlly"
  | "faction"
  | "fought"
  | "killed"
  | "killedBy"
  | "related"
  | "political"
  | "creator"
  | "createdBy"
  | "imprisoned"
  | "betrayed"
  | "served"
  | "unknown";

export type CanonStatus =
  | "CANON"
  | "AMBIGUOUS"
  | "OLD_LORE"
  | "RETCONNED"
  | "ALTERNATE_UNIVERSE";

export type SourceType =
  | "Champion Biography"
  | "Short Story"
  | "Cinematic"
  | "Comic"
  | "Game"
  | "Developer Post"
  | "Series"
  | "Novel";

export type RegionSlug =
  | "demacia"
  | "noxus"
  | "ionia"
  | "piltover"
  | "zaun"
  | "shurima"
  | "targon"
  | "freljord"
  | "shadow-isles"
  | "void"
  | "bandle-city"
  | "ixtal"
  | "bilgewater"
  | "runeterra";

export type ProgressLevel = "unknown" | "discovered" | "studied" | "mastered";

export type CharacterStatus =
  | "Alive"
  | "Deceased"
  | "Undead"
  | "Ascended"
  | "Unknown"
  | "Imprisoned"
  | "Celestial";

export type LoreComplexity = 1 | 2 | 3 | 4 | 5;

/** Truth Layer — how a connection should be interpreted in UI and pathfinding. */
export type ConnectionCategory =
  | "DIRECT_CANON"
  | "SHARED_EVENT"
  | "SHARED_FACTION"
  | "SHARED_REGION"
  | "STRUCTURAL_LORE"
  | "THEMATIC_PARALLEL"
  | "AMBIGUOUS"
  | "LEGACY_LORE";

export type ConnectionConfidence =
  | "DOCUMENTED"
  | "STRONG"
  | "DERIVED"
  | "INTERPRETIVE"
  | "UNCERTAIN";

/* -------------------------------------------------------------------------- */
/* Lore content                                                               */
/* -------------------------------------------------------------------------- */

export interface Universe {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  accentColor: string;
  active: boolean;
}

/** Base shape shared by every graph-addressable lore entity. */
export interface Entity {
  id: string;
  universeId: string;
  type: EntityType;
  slug: string;
  name: string;
  /** 0–100, drives node sizing and path scoring. */
  importance: number;
  verified: boolean;
}

export interface Region extends Entity {
  type: "region";
  slug: RegionSlug;
  shortDescription: string;
  longDescription: string;
  accentColor: string;
  /** Secondary tone used for gradients. */
  secondaryColor: string;
  icon: RegionIconKind;
}

export type RegionIconKind =
  | "shield"
  | "blade"
  | "leaf"
  | "gear"
  | "flask"
  | "sun"
  | "star"
  | "snowflake"
  | "ghost"
  | "eye"
  | "anchor"
  | "sprout";

export interface Faction extends Entity {
  type: "faction";
  shortDescription: string;
  regionSlug: RegionSlug | null;
  accentColor: string;
}

export interface Location extends Entity {
  type: "location";
  regionSlug: RegionSlug;
  shortDescription: string;
}

export interface TimelineBeat {
  id: string;
  era: string;
  title: string;
  description: string;
  /** Ordering within the character's personal timeline. */
  order: number;
  characterIds: string[];
  eventId?: string;
}

export interface Character extends Entity {
  type: "character";
  title: string;
  shortDescription: string;
  longDescription: string[];
  /** Region of origin / primary association. */
  region: RegionSlug;
  factions: string[];
  roles: string[];
  status: CharacterStatus;
  species: string;
  aliases: string[];
  accentColor: string;
  releaseYear: number;
  difficulty: LoreComplexity;
  loreComplexity: LoreComplexity;
  featured: boolean;
  canonStatus: CanonStatus;
  relatedCharacterIds: string[];
  eventIds: string[];
  sourceIds: string[];
  timeline: TimelineBeat[];
  tags: string[];
  /** Portrait/splash are resolved through lib/assets so the UI never hardcodes URLs. */
  assetKey: string;
  popularity: number;
}

export interface Relationship {
  id: string;
  universeId: string;
  sourceCharacterId: string;
  targetCharacterId: string;
  type: RelationshipType;
  /** Truth Layer category — never present direct canon without documentation. */
  connectionType: ConnectionCategory;
  confidence: ConnectionConfidence;
  label: string;
  shortExplanation: string;
  longExplanation: string;
  /** 0–100. Drives edge weight, node sizing and narrative path scoring. */
  importanceScore: number;
  canonStatus: CanonStatus;
  sourceIds: string[];
  eventIds: string[];
  factionIds: string[];
  regionIds: string[];
  verified: boolean;
  needsReview: boolean;
  editorialNote?: string;
}

export interface LoreEvent extends Entity {
  type: "event";
  title: string;
  description: string;
  era: string;
  order: number;
  characterIds: string[];
  regionSlugs: RegionSlug[];
  canonStatus: CanonStatus;
}

export interface Source {
  id: string;
  title: string;
  type: SourceType;
  url: string;
  publisher: string;
  publicationDate: string | null;
  canonStatus: CanonStatus;
}

export interface StoryPathChapter {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  body: string[];
  characterIds: string[];
  eventIds: string[];
  estimatedMinutes: number;
  assetKey: string;
}

export interface StoryPath {
  id: string;
  universeId: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  characterIds: string[];
  chapters: StoryPathChapter[];
  estimatedMinutes: number;
  featured: boolean;
  verified: boolean;
}

/* -------------------------------------------------------------------------- */
/* Daily Lore                                                                 */
/* -------------------------------------------------------------------------- */

export type QuizQuestionKind =
  | "WHO_AM_I"
  | "TRUE_OR_FALSE"
  | "WHO_IS_CONNECTED"
  | "TIMELINE"
  | "FACTION"
  | "CANON_OR_NOT";

export interface QuizQuestion {
  id: string;
  universeId: string;
  kind: QuizQuestionKind;
  prompt: string;
  /** Progressive hints for WHO_AM_I style questions. */
  clues: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
  /** Characters this question teaches about — used for Lore DNA attribution. */
  characterIds: string[];
  regionSlugs: RegionSlug[];
  difficulty: LoreComplexity;
  xp: number;
  verified: boolean;
}

/* -------------------------------------------------------------------------- */
/* Progression                                                                */
/* -------------------------------------------------------------------------- */

export interface AchievementDefinition {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  /** Machine-checkable rule evaluated against UserProgress. */
  rule: AchievementRule;
  xp: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export type AchievementRule =
  | { kind: "charactersExplored"; characterIds: string[] }
  | { kind: "charactersExploredCount"; count: number }
  | { kind: "tagExplored"; tag: string }
  | { kind: "regionExplored"; region: RegionSlug }
  | { kind: "storyCompleted"; storySlug: string }
  | { kind: "characterMastered"; characterId: string }
  | { kind: "connectionsFound"; count: number }
  | { kind: "knowledgePercent"; percent: number }
  | { kind: "streak"; days: number };

export interface CharacterProgress {
  characterId: string;
  /** Page/graph views. */
  views: number;
  relationshipsSeen: string[];
  timelineViewed: boolean;
  storiesCompleted: number;
  quizCorrect: number;
  collected: boolean;
  updatedAt: string;
}

export interface StoryProgress {
  storySlug: string;
  completedChapterIds: string[];
  completed: boolean;
  updatedAt: string;
}

export interface DailyAttempt {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  questionIds: string[];
  correctCount: number;
  totalCount: number;
  perfect: boolean;
  completedAt: string;
}

export interface UserProgress {
  version: number;
  xp: number;
  characters: Record<string, CharacterProgress>;
  stories: Record<string, StoryProgress>;
  relationshipsDiscovered: string[];
  connectionsFound: number;
  connectSearches: number;
  achievements: string[];
  dailyAttempts: DailyAttempt[];
  streak: number;
  longestStreak: number;
  lastDailyDate: string | null;
  quizAnswered: number;
  quizCorrect: number;
  firstSeenAt: string;
  lastSeenAt: string;
  onboarding: {
    pickedFirstCharacter: boolean;
    openedFirstGraph: boolean;
    ranFirstConnection: boolean;
  };
}

export interface LevelDefinition {
  level: number;
  name: string;
  minXp: number;
}

/* -------------------------------------------------------------------------- */
/* Graph engine                                                               */
/* -------------------------------------------------------------------------- */

export interface GraphNode {
  id: string;
  type: EntityType;
  name: string;
  slug: string;
  importance: number;
  metadata: {
    title?: string;
    region?: RegionSlug;
    accentColor: string;
    assetKey?: string;
    factions?: string[];
    era?: string;
    description?: string;
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: RelationshipType;
  connectionCategory: ConnectionCategory;
  confidence: ConnectionConfidence;
  /** Lower = closer. Derived from importance. */
  weight: number;
  importance: number;
  description: string;
  /** Direct = explicit character-to-character relationship. */
  connectionKind: ConnectionKind;
  label: string;
  canonStatus: CanonStatus;
  relationshipId?: string;
  verified: boolean;
  sourceIds?: string[];
}

export type ConnectionKind = "direct" | "indirect";

export interface LoreGraph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  adjacency: Map<string, GraphEdge[]>;
}

export interface PathStep {
  from: GraphNode;
  to: GraphNode;
  edge: GraphEdge;
}

export type PathStrategy = "shortest" | "narrative" | "alternative";

export interface GraphPath {
  strategy: PathStrategy;
  nodes: GraphNode[];
  steps: PathStep[];
  /** Number of hops. */
  length: number;
  /** Narrative quality, 0–100. Higher is better. */
  score: number;
  directOnly: boolean;
}

export interface GraphQueryOptions {
  includeIndirect?: boolean;
  relationshipTypes?: RelationshipType[];
  maxDepth?: number;
  nodeTypes?: EntityType[];
}

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

export interface SearchResult {
  id: string;
  type: EntityType;
  name: string;
  slug: string;
  subtitle: string;
  accentColor: string;
  href: string;
  assetKey?: string;
  score: number;
}
