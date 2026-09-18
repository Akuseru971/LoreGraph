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
  | "CURRENT_CANON"
  | "AMBIGUOUS"
  | "RECONCILIATION_PENDING"
  | "LEGACY_LORE"
  | "ALTERNATE_UNIVERSE"
  | "THEMATIC_ONLY"
  | "UNKNOWN";

export type SourceType =
  | "Champion Biography"
  | "Short Story"
  | "Cinematic"
  | "Comic"
  | "Game"
  | "Developer Post"
  | "Series"
  | "Novel"
  | "Wiki Universe"
  | "Wiki Reference"
  | "Lore Video"
  | "Region Page"
  | "Faction Page"
  | "Event Page"
  | "Voice Line"
  | "Book"
  | "Card Text"
  | "Other";

/** Authority tier for source provenance hierarchy. */
export type SourceAuthorityTier =
  | "PRIMARY_OFFICIAL"
  | "OFFICIAL_COMMUNITY_REFERENCE"
  | "OFFICIAL_PUBLISHED"
  | "DISCOVERY_ONLY";

export type Continuity =
  | "MAIN_RUNETERRA"
  | "ARCANE"
  | "SKIN_UNIVERSE"
  | "LEGACY"
  | "OTHER";

export type FactConfidence =
  | "DOCUMENTED"
  | "STRONG"
  | "DERIVED"
  | "INTERPRETIVE"
  | "UNCERTAIN";

export type RelationshipCanonical = "DIRECT" | "INDIRECT" | "NONE";

export type CompletenessTier = "A" | "B" | "C";

export type ClaimType =
  | "ATTRIBUTE"
  | "RELATIONSHIP"
  | "PARTICIPATION"
  | "TRANSFORMATION"
  | "LOCATION"
  | "CHRONOLOGY"
  | "OWNERSHIP"
  | "AFFILIATION";

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
  | "LEGACY_CONNECTION";

export type ConnectionConfidence =
  | "DOCUMENTED"
  | "STRONG"
  | "DERIVED"
  | "INTERPRETIVE"
  | "UNCERTAIN";

export type ReviewStatus =
  | "PENDING"
  | "REVIEWED"
  | "APPROVED_EDITORIAL"
  | "VERIFIED_CANON"
  | "REJECTED";

export type StoryContentType = "fact" | "editorial";

/** Beat-level truth classification for Story Path narrative blocks. */
export type NarrativeEvidenceClass =
  | "FACT"
  | "SUPPORTED_SYNTHESIS"
  | "EDITORIAL_FRAMING"
  | "INTERPRETATION"
  | "TRANSITION"
  | "UNRESOLVED";

export type SourceEvidenceType =
  | "DIRECT_STATEMENT"
  | "COMBINED_PRIMARY"
  | "OFFICIAL_REFERENCE"
  | "CONTEXT_ONLY";

export type EvidenceReviewStatus =
  | "VERIFIED"
  | "REVIEWED"
  | "PENDING"
  | "REJECTED"
  | "REVIEW_REQUIRED";

export type ClaimLifecycleStatus = "ACTIVE" | "SUPERSEDED" | "REJECTED";

export interface SourceSnapshot {
  sourceId: string;
  contentHash: string;
  retrievedAt: string;
  sourceUrl: string;
  /** Normalized factual sentences extracted from the source. */
  normalizedText?: string;
  factIndex?: string[];
}

export interface SourceEvidence {
  id: string;
  sourceId: string;
  normalizedFact: string;
  evidenceType: SourceEvidenceType;
  sourceSnapshotHash?: string;
  sourceLocator?: string;
  sourceSection?: string;
  shortExcerpt?: string;
  excerptHash?: string;
  contentHash?: string;
  retrievedAt?: string;
  continuity?: Continuity;
  reviewStatus?: EvidenceReviewStatus;
  reviewedAt?: string;
  reviewMethod?: string;
  /** Optional predicate scope for this evidence record. */
  supportsPredicate?: string;
}

export interface StoryNarrativeBlock {
  text: string;
  evidenceClass: NarrativeEvidenceClass;
  claimIds?: string[];
  sourceIds?: string[];
  evidenceRefs?: string[];
  canonStatus?: CanonStatus;
  reviewStatus?: ReviewStatus;
  continuity?: Continuity;
}

export interface StoryPathQuality {
  reviewCoverage: number;
  factCoverage: number;
  sourceCoverage: number;
  containsInterpretation: boolean;
  containsUnresolved: boolean;
  blockCounts: Record<NarrativeEvidenceClass, number>;
}

/** Role-aware character ↔ event association. */
export type EventRelationRole =
  | "PARTICIPANT"
  | "CAUSE"
  | "INSTIGATOR"
  | "COMMANDER"
  | "TARGET"
  | "VICTIM"
  | "OBSERVER"
  | "AFFECTED_BY"
  | "BENEFICIARY"
  | "CONSEQUENCE"
  | "ACTIVE_DURING"
  | "ASSOCIATED_WITH"
  | "MENTIONED_IN"
  | "EDITORIAL_CONTEXT";

export interface EventCharacterLink {
  characterId: string;
  role: EventRelationRole;
  claimIds?: string[];
  sourceIds?: string[];
  canonStatus?: CanonStatus;
  reviewStatus?: ReviewStatus;
  needsReview?: boolean;
}

export interface ChampionQualityDimensions {
  contentCompleteness: number;
  sourceCoverage: number;
  canonConfidence: number;
  reviewCoverage: number;
  timelineCoverage: number;
  trustedTimelineCoverage: number;
  relationshipCoverage: number;
  directRelationshipReviewCoverage: number;
  eventCoverage: number;
  continuityClassified: boolean;
  criticalMissing: string[];
}

/* -------------------------------------------------------------------------- */
/* Cinematic Journey                                                          */
/* -------------------------------------------------------------------------- */

export type JourneyType =
  | "CHAMPION_STORY"
  | "CONNECTION_STORY"
  | "STORY_PATH";

export type JourneyStepType =
  | "CHARACTER"
  | "EVENT"
  | "REGION"
  | "FACTION"
  | "CONCEPT"
  | "ERA"
  | "TRANSITION"
  | "OPENING"
  | "ENDING";

export type CameraPreset =
  | "wide"
  | "approach"
  | "close"
  | "drift"
  | "pullback";

export type JourneyTransition = "travel" | "era-skip" | "fade" | "cut";

export type JourneyContentType = "fact" | "editorial" | "interpretation";

export type JourneyFormat = "landscape" | "portrait" | "square";

export type JourneyPlaybackMode = "auto" | "manual";

export interface JourneyStep {
  id: string;
  type: JourneyStepType;
  entityId?: string;
  title: string;
  eyebrow?: string;
  narration: string[];
  image?: string;
  assetKey?: string;
  accentColor?: string;
  canonStatus: CanonStatus;
  contentType: JourneyContentType;
  sourceIds?: string[];
  duration: number;
  cameraPreset?: CameraPreset;
  transition?: JourneyTransition;
}

export interface Journey {
  id: string;
  type: JourneyType;
  title: string;
  subtitle?: string;
  sourceChampionId?: string;
  targetChampionId?: string;
  connectionLabel?: string;
  steps: JourneyStep[];
  estimatedDuration: number;
}

/* -------------------------------------------------------------------------- */
/* Cinematic Journey V3 — spatial constellation narrative engine              */
/* -------------------------------------------------------------------------- */

export type CinematicJourneyKind =
  | "CHARACTER"
  | "CONNECTION"
  | "STORY_PATH"
  | "EVENT";

export type CinematicSceneType =
  | "ORIGIN"
  | "EVENT"
  | "RELATIONSHIP"
  | "TRANSFORMATION"
  | "CONFLICT"
  | "LOCATION"
  | "ARTIFACT"
  | "FACTION"
  | "CONSEQUENCE"
  | "ENDING";

export type CinematicCameraPreset =
  | "SLOW_APPROACH"
  | "FAST_APPROACH"
  | "ORBIT"
  | "DESCEND"
  | "ASCEND"
  | "CURVE_LEFT"
  | "CURVE_RIGHT"
  | "PASS_THROUGH"
  | "PULL_BACK"
  | "HOLD";

export type AtmospherePreset =
  | "CELESTIAL"
  | "SHURIMA"
  | "VOID"
  | "DARKIN"
  | "IONIA"
  | "NOXUS"
  | "DEMACIA"
  | "FRELJORD"
  | "SHADOW_ISLES"
  | "BILGEWATER"
  | "PILTOVER"
  | "ZAUN"
  | "IXTAL"
  | "BANDLE"
  | "NEUTRAL";

export type CinematicSceneImportance = "CORE" | "SUPPORTING" | "CONTEXTUAL";

export type CinematicEvidenceClass =
  | "FACT"
  | "SUPPORTED_SYNTHESIS"
  | "EDITORIAL_TRANSITION";

export type RelationshipChoreography =
  | "PARALLEL"
  | "ORBIT"
  | "CONVERGE"
  | "DIVERGE"
  | "FADE"
  | "TRANSFORM"
  | "LEAD";

export type CinematicSceneAssetRelevance =
  | "EXACT_EVENT"
  | "EXACT_STORY"
  | "EXACT_LOCATION"
  | "EXACT_ARTIFACT"
  | "CHARACTER_CONTEXT"
  | "REGION_CONTEXT"
  | "FALLBACK";

export type CinematicSceneAssetConfidence = "HIGH" | "MEDIUM" | "LOW";

export type CinematicComposition =
  | "FULL_BLEED"
  | "LEFT_SUBJECT"
  | "RIGHT_SUBJECT"
  | "CENTER_REVEAL"
  | "DISTANT_WORLD"
  | "BACKGROUND_MEMORY"
  | "DUAL_SUBJECT"
  | "NO_IMAGE";

export interface CinematicSceneAsset {
  url: string;
  assetKey?: string;
  sourceEntityId?: string;
  relevance: CinematicSceneAssetRelevance;
  confidence: CinematicSceneAssetConfidence;
  qualityStatus?: CinematicAssetQualityStatus;
  focalPoint?: { x: number; y: number };
  aspectRatio?: number;
  compositionHint?: CinematicComposition;
  variant?: "splash" | "cinematic" | "hero" | "event";
  source?: string;
  assetType?: "event" | "region" | "artifact" | "story" | "champion";
}

/** @deprecated Use CinematicSceneAsset — kept for gradual migration. */
export type CinematicAsset = Partial<CinematicSceneAsset> & {
  url?: string;
  assetKey?: string;
  focalPoint?: { x: number; y: number };
  variant?: "splash" | "cinematic" | "hero" | "event";
};

export interface CinematicCoordinates {
  x: number;
  y: number;
  z: number;
}

export interface CinematicScene {
  id: string;
  type: CinematicSceneType;
  title: string;
  eyebrow?: string;
  narrative: string;
  entityId?: string;
  era?: string;
  primaryCharacterId?: string;
  secondaryCharacterIds?: string[];
  eventId?: string;
  locationId?: string;
  artifactId?: string;
  factionId?: string;
  image?: CinematicSceneAsset;
  composition?: CinematicComposition;
  atmosphere?: AtmospherePreset;
  cameraPreset?: CinematicCameraPreset;
  coordinates: CinematicCoordinates;
  graphTarget?: CinematicCoordinates;
  importance: CinematicSceneImportance;
  claimIds: string[];
  sourceIds: string[];
  evidenceClass: CinematicEvidenceClass;
  continuity: Continuity;
  relationshipChoreography?: RelationshipChoreography;
  worldScale?: number;
  holdDurationMs?: number;
  transitionDurationMs?: number;
  visualSubject?: string;
  shotType?: CinematicShotType;
  worldNodeArchetype?: WorldNodeArchetype;
  environmentalMotifs?: EnvironmentalMotifType[];
  narrativePhrases?: string[];
  recordTiming?: CinematicRecordTiming;
  curated?: boolean;
}

/** @deprecated Use ConstellationAnchorCategory */
export type ChampionConstellationAnchorImportance =
  | "PRIMARY"
  | "SECONDARY"
  | "MICRO";

export type ConstellationAnchorCategory =
  | "STRUCTURAL"
  | "CONTOUR"
  | "ICONIC"
  | "DETAIL"
  | "ATMOSPHERIC";

export type ConstellationVisualWeight = "LOW" | "MEDIUM" | "HIGH" | "HERO";

export type ConstellationLineWeight = "SUBTLE" | "NORMAL" | "EMPHATIC" | "ICONIC";

export interface ConstellationContourGroup {
  id: string;
  label: string;
  revealPhase: number;
}

export interface ConstellationLine {
  from: string;
  to: string;
  weight: ConstellationLineWeight;
  category?: ConstellationAnchorCategory;
}

export interface ChampionConstellationAnchor {
  id: string;
  x: number;
  y: number;
  category: ConstellationAnchorCategory;
  visualWeight?: ConstellationVisualWeight;
  revealPhase?: number;
  contourGroup?: string;
  connectsTo?: string[];
  lineWeight?: ConstellationLineWeight;
  /** @deprecated Use category */
  importance?: ChampionConstellationAnchorImportance;
}

export interface ChampionConstellation {
  id: string;
  characterId: string;
  anchors: ChampionConstellationAnchor[];
  heroStarId: string;
  lines?: ConstellationLine[];
  contourGroups?: ConstellationContourGroup[];
  splashFocal?: { x: number; y: number };
}

export interface CinematicIntroTiming {
  splashHoldMs: number;
  splashDriftMs: number;
  darkenMs: number;
  starsEmergeMs: number;
  linesFormMs: number;
  heroSelectMs: number;
  zoomStarMs: number;
  handoffMs: number;
}

export interface CinematicOutroTiming {
  pullbackMs: number;
  pathRevealMs: number;
  nodesConnectMs: number;
  constellationReformMs: number;
  splashEchoMs: number;
  holdMs: number;
}

export interface CinematicIntro {
  type: "SPLASH_TO_CONSTELLATION";
  splashAsset: CinematicSceneAsset;
  constellationId: string;
  heroStarId: string;
  timing: CinematicIntroTiming;
  recordTiming?: CinematicIntroTiming;
  atmosphere?: AtmospherePreset;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  showText?: boolean;
  recordShowIntroTitle?: boolean;
  splashFocal?: { x: number; y: number };
}

export interface CinematicOutro {
  type: "CONSTELLATION_REFORM";
  constellationId: string;
  optionalSplashEcho?: CinematicSceneAsset;
  timing: CinematicOutroTiming;
  recordTiming?: CinematicOutroTiming;
  pathToAnchorMapping?: Record<string, string>;
  title?: string;
  subtitle?: string;
  showText?: boolean;
  recordShowOutroTitle?: boolean;
  showSplashEcho?: boolean;
}

export interface CinematicIntroOverride {
  constellationId?: string;
  heroStarId?: string;
  timing?: Partial<CinematicIntroTiming>;
  recordTiming?: Partial<CinematicIntroTiming>;
  atmosphere?: AtmospherePreset;
  splashFocal?: { x: number; y: number };
  showText?: boolean;
  recordShowIntroTitle?: boolean;
}

export interface CinematicOutroOverride {
  constellationId?: string;
  timing?: Partial<CinematicOutroTiming>;
  recordTiming?: Partial<CinematicOutroTiming>;
  pathToAnchorMapping?: Record<string, string>;
  showSplashEcho?: boolean;
  showText?: boolean;
  recordShowOutroTitle?: boolean;
}

export type CinematicVisualStatus =
  | "CURATED_IMAGE"
  | "CURATED_ABSTRACT"
  | "NEEDS_WORK";

export type CinematicJourneyPhase = "intro" | "playing" | "outro";

export interface CinematicJourney {
  id: string;
  kind: CinematicJourneyKind;
  title: string;
  subtitle?: string;
  primaryCharacterId?: string;
  secondaryCharacterId?: string;
  scenes: CinematicScene[];
  sourceClaimIds: string[];
  continuity: Continuity;
  cinematicReady: boolean;
  loreReady?: boolean;
  visualReady?: boolean;
  recordReady?: boolean;
  readiness?: CinematicJourneyReadiness;
  generatedAt: string;
  graphNodeIds: string[];
  introSequence?: CinematicIntro;
  outroSequence?: CinematicOutro;
}

export type CinematicDirectorPreview =
  | "intro"
  | "outro"
  | "scene"
  | "full";

export interface CinematicPlayerOptions {
  aspectMode?: CinematicAspectMode;
  recordMode?: boolean;
  showText?: boolean;
  showImages?: boolean;
  environmentOnly?: boolean;
  showWatermark?: boolean;
  deterministic?: boolean;
  directorPreview?: CinematicDirectorPreview;
  directorSceneIndex?: number;
}

export type CinematicQualityLevel = "high" | "medium" | "low";

export type CinematicAspectMode = "AUTO" | "16:9" | "9:16";

export interface CinematicSafeArea {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export type CinematicShotType =
  | "ESTABLISHING"
  | "FOLLOW"
  | "REVEAL"
  | "PORTRAIT"
  | "WIDE_EVENT"
  | "DUAL_CHARACTER"
  | "IMPACT"
  | "AFTERMATH"
  | "TRANSFORMATION"
  | "PULLBACK";

export type WorldNodeArchetype =
  | "WAR"
  | "INVASION"
  | "CATASTROPHE"
  | "ASCENSION"
  | "MAGICAL_RUPTURE"
  | "POLITICAL_CHANGE"
  | "IMPRISONMENT"
  | "RETURN";

export type EnvironmentalMotifType =
  | "SUN_DISC"
  | "SHURIMA_ARCHES"
  | "VOID_RIFT"
  | "VOID_FILAMENTS"
  | "IONIAN_SPIRIT_ARCS"
  | "IONIAN_FLOATING_LIGHTS"
  | "CELESTIAL_ORBITS"
  | "TARGON_CONSTELLATIONS"
  | "SHADOW_WISPS"
  | "SHADOW_ARCHES"
  | "NOXIAN_ASH"
  | "NOXIAN_MONOLITHS"
  | "PILTOVER_GEOMETRY"
  | "ZAUN_SMOKE"
  | "FRELJORD_ICE_DUST"
  | "BILGEWATER_MIST";

export type CinematicAssetQualityStatus =
  | "CURATED"
  | "ACCEPTABLE"
  | "ABSTRACT_REQUIRED"
  | "MISSING";

export interface CinematicRecordTiming {
  travelMs: number;
  arrivalSettleMs: number;
  eyebrowRevealMs: number;
  titleRevealMs: number;
  narrativeRevealMs: number;
  readingHoldMs: number;
  departurePrepMs: number;
}

export interface CinematicSceneOverride {
  coordinates?: CinematicCoordinates;
  graphTarget?: CinematicCoordinates;
  shotType?: CinematicShotType;
  composition?: CinematicComposition;
  cameraPreset?: CinematicCameraPreset;
  atmosphere?: AtmospherePreset;
  worldNodeArchetype?: WorldNodeArchetype;
  worldScale?: number;
  environmentalMotifs?: EnvironmentalMotifType[];
  visualSubject?: string;
  narrativePhrases?: string[];
  image?: CinematicSceneAsset;
  recordTiming?: CinematicRecordTiming;
  relationshipChoreography?: RelationshipChoreography;
  curated?: boolean;
}

export interface CinematicJourneyReadiness {
  loreReady: boolean;
  visualReady: boolean;
  recordReady: boolean;
  blockers: string[];
}

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
  connectEligible?: boolean;
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
  connectEligible?: boolean;
}

export interface Location extends Entity {
  type: "location";
  regionSlug: RegionSlug;
  shortDescription: string;
}

export type TimelineBeatImportance = "CORE" | "SUPPORTING" | "CONTEXTUAL";

export interface TimelineBeat {
  id: string;
  era: string;
  title: string;
  description: string;
  /** Ordering within the character's personal timeline. */
  order: number;
  characterIds: string[];
  eventId?: string;
  sourceIds?: string[];
  claimIds?: string[];
  /** Explicit lore importance — CORE beats must be trusted for Tier A. */
  importance?: TimelineBeatImportance;
  canonStatus?: CanonStatus;
  continuity?: Continuity;
  reviewStatus?: ReviewStatus;
  confidence?: FactConfidence;
  evidenceClass?: NarrativeEvidenceClass;
}

/** Paragraph-level bio provenance — mirrors Story Path block semantics. */
export type BioNarrativeBlock = StoryNarrativeBlock;

export interface GameplayData {
  classes: string[];
  roles: string[];
  difficulty?: LoreComplexity;
  releaseDate?: string | null;
}

export interface Character extends Entity {
  type: "character";
  title: string;
  shortDescription: string;
  longDescription: string[];
  /** Internal canon/editorial separation for biography paragraphs. */
  bioBlocks?: BioNarrativeBlock[];
  /** Region of origin / primary association. */
  region: RegionSlug;
  factions: string[];
  /** Narrative / occupational roles from lore sources — not gameplay classes. */
  roles: string[];
  gameplayData?: GameplayData;
  status: CharacterStatus;
  species: string;
  aliases: string[];
  accentColor: string;
  /** Champion release year when documented; null when unknown. */
  releaseYear: number | null;
  difficulty: LoreComplexity;
  loreComplexity: LoreComplexity;
  featured: boolean;
  canonStatus: CanonStatus;
  continuity?: Continuity;
  completenessTier?: CompletenessTier;
  completenessScore?: number;
  missingFields?: string[];
  needsResearch?: boolean;
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
  reviewed: boolean;
  reviewStatus: ReviewStatus;
  needsReview: boolean;
  editorialNote?: string;
}

export interface LoreEvent extends Entity {
  type: "event";
  title: string;
  description: string;
  era: string;
  order: number;
  /** Role-aware character associations — always populated on exported events. */
  characterLinks?: EventCharacterLink[];
  characterIds: string[];
  regionSlugs: RegionSlug[];
  canonStatus: CanonStatus;
  continuity?: Continuity;
  connectEligible?: boolean;
  sourceIds?: string[];
  asset?: EventAsset;
  /** When true, this node is an era/period — not a discrete incident. */
  isEra?: boolean;
}

export interface EventAsset {
  eventId: string;
  primaryImageUrl?: string;
  fallbackImageUrl?: string;
  assetKey?: string;
  sourceUrl?: string;
  sourceType?: SourceType;
  copyrightOwner?: string;
  focalPointX?: number;
  focalPointY?: number;
  focalPointMobileX?: number;
  focalPointMobileY?: number;
  objectPosition?: string;
  attribution?: string;
}

export interface Source {
  id: string;
  title: string;
  type: SourceType;
  url: string;
  publisher: string;
  publicationDate: string | null;
  canonStatus: CanonStatus;
  authorityTier?: SourceAuthorityTier;
  domain?: string;
  mediaType?: string;
  continuity?: Continuity;
  retrievedAt?: string;
  lastCheckedAt?: string;
  contentHash?: string;
  originalSourceId?: string;
  archivedUrl?: string;
  notes?: string;
}

export interface Claim {
  id: string;
  subjectId: string;
  predicate: string;
  objectId?: string;
  value?: string;
  claimType: ClaimType;
  certainty: FactConfidence;
  canonStatus: CanonStatus;
  continuity: Continuity;
  sourceIds: string[];
  /** Registry IDs of SourceEvidence records that prove this claim. */
  evidenceRefs?: string[];
  evidenceNote?: string;
  reviewed: boolean;
  needsReview: boolean;
  claimStatus?: ClaimLifecycleStatus;
  supersededBy?: string;
  supersedes?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StoryPathChapter {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  /** @deprecated Prefer `blocks` — kept for backward compatibility. */
  body: string[];
  /** Paragraph-level truth classification. */
  blocks: StoryNarrativeBlock[];
  characterIds: string[];
  eventIds: string[];
  estimatedMinutes: number;
  assetKey: string;
  contentType?: StoryContentType;
  sourceIds?: string[];
  canonStatus?: CanonStatus;
  verified?: boolean;
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
  /** Derived from block-level evidence — not a blanket canon guarantee. */
  verified: boolean;
  quality?: StoryPathQuality;
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
  /** Canon tier for factual Daily quizzes — defaults to current canon. */
  canonStatus?: CanonStatus;
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
    connectEligible?: boolean;
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
  reviewStatus?: ReviewStatus;
  needsReview?: boolean;
  sourceIds?: string[];
  /** Event participation role when edge is character ↔ event. */
  eventRole?: EventRelationRole;
}

export type ConnectionKind = "direct" | "indirect";

export interface LoreGraph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  adjacency: Map<string, GraphEdge[]>;
  /** Structural nodes allowed as Connect path bridges. */
  connectEligible: Map<string, boolean>;
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
