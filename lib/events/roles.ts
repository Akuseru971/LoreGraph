import type { EventRelationRole } from "@/types";

/** Pathfinding weight multiplier — lower is stronger for Connect. */
export const EVENT_ROLE_PATH_WEIGHT: Record<EventRelationRole, number> = {
  PARTICIPANT: 1,
  CAUSE: 1.1,
  COMMANDER: 1.2,
  TARGET: 1.2,
  INSTIGATOR: 1.3,
  VICTIM: 1.5,
  AFFECTED_BY: 2.5,
  CONSEQUENCE: 2.5,
  BENEFICIARY: 3,
  OBSERVER: 4,
  ACTIVE_DURING: 5,
  ASSOCIATED_WITH: 6,
  MENTIONED_IN: 8,
  EDITORIAL_CONTEXT: 100,
};

/** Roles that must never appear in Daily factual content. */
export const DAILY_INELIGIBLE_EVENT_ROLES = new Set<EventRelationRole>([
  "EDITORIAL_CONTEXT",
  "MENTIONED_IN",
  "ASSOCIATED_WITH",
]);

/** Roles eligible as strong Connect bridges. */
export const STRONG_EVENT_ROLES = new Set<EventRelationRole>([
  "PARTICIPANT",
  "CAUSE",
  "COMMANDER",
  "TARGET",
  "INSTIGATOR",
]);

export const EVENT_ROLE_LABEL: Record<EventRelationRole, string> = {
  PARTICIPANT: "documented participant",
  CAUSE: "helped trigger",
  INSTIGATOR: "instigated",
  COMMANDER: "commanded forces in",
  TARGET: "was targeted in",
  VICTIM: "was victimized by",
  OBSERVER: "observed",
  AFFECTED_BY: "was shaped by",
  BENEFICIARY: "benefited from",
  CONSEQUENCE: "was a consequence of",
  ACTIVE_DURING: "was active during",
  ASSOCIATED_WITH: "is associated with",
  MENTIONED_IN: "is mentioned in context of",
  EDITORIAL_CONTEXT: "editorial context for",
};

export function eventRoleExplanation(
  characterName: string,
  eventTitle: string,
  role: EventRelationRole,
): string {
  switch (role) {
    case "PARTICIPANT":
      return `${characterName} fought in or directly participated in ${eventTitle}.`;
    case "CAUSE":
      return `${characterName} helped trigger ${eventTitle}.`;
    case "COMMANDER":
      return `${characterName} commanded forces during ${eventTitle}.`;
    case "TARGET":
      return `${characterName} was targeted during ${eventTitle}.`;
    case "AFFECTED_BY":
      return `${characterName}'s story was shaped by ${eventTitle}.`;
    case "CONSEQUENCE":
      return `${characterName} is a documented consequence of ${eventTitle}.`;
    case "ACTIVE_DURING":
      return `${characterName} was active during ${eventTitle} — not necessarily a direct participant.`;
    case "ASSOCIATED_WITH":
      return `LoreGraph connects ${characterName} to ${eventTitle} through historical context.`;
    case "EDITORIAL_CONTEXT":
      return `${characterName} is editorially linked to ${eventTitle} — not a documented participant.`;
    default:
      return `${characterName} ${EVENT_ROLE_LABEL[role]} ${eventTitle}.`;
  }
}

/** Per-event role overrides from lore audit. */
export const EVENT_ROLE_OVERRIDES: Record<string, Record<string, EventRelationRole>> = {
  "void-incursion": {
    aatrox: "PARTICIPANT",
    nasus: "PARTICIPANT",
    varus: "PARTICIPANT",
    renekton: "PARTICIPANT",
    jax: "PARTICIPANT",
    zilean: "ASSOCIATED_WITH",
  },
  "ascension-ritual": {
    aatrox: "PARTICIPANT",
    nasus: "PARTICIPANT",
    azir: "PARTICIPANT",
    renekton: "PARTICIPANT",
  },
  "darkin-corruption": {
    aatrox: "AFFECTED_BY",
    varus: "AFFECTED_BY",
  },
  "darkin-war": {
    aatrox: "PARTICIPANT",
    varus: "PARTICIPANT",
    nasus: "PARTICIPANT",
    naafiri: "ASSOCIATED_WITH",
    zaahen: "ASSOCIATED_WITH",
  },
  "fall-of-shurima": {
    azir: "TARGET",
    xerath: "INSTIGATOR",
    nasus: "OBSERVER",
    renekton: "PARTICIPANT",
  },
  "aatrox-pantheon-duel": {
    aatrox: "PARTICIPANT",
    pantheon: "PARTICIPANT",
  },
  "aatrox-return": {
    aatrox: "PARTICIPANT",
    pantheon: "AFFECTED_BY",
  },
  "pantheon-reborn": {
    pantheon: "CONSEQUENCE",
    aatrox: "CAUSE",
  },
  "noxian-invasion-ionia": {
    swain: "COMMANDER",
    irelia: "PARTICIPANT",
    karma: "PARTICIPANT",
    riven: "PARTICIPANT",
    yasuo: "AFFECTED_BY",
    "master-yi": "PARTICIPANT",
    kayn: "ASSOCIATED_WITH",
    zed: "ASSOCIATED_WITH",
    shen: "ASSOCIATED_WITH",
  },
  "viego-awakening": {
    viego: "INSTIGATOR",
    senna: "TARGET",
    thresh: "PARTICIPANT",
    kalista: "PARTICIPANT",
    lucian: "PARTICIPANT",
  },
  "ruination": {
    viego: "CAUSE",
    kalista: "VICTIM",
    hecarim: "CONSEQUENCE",
    thresh: "CONSEQUENCE",
    maokai: "AFFECTED_BY",
  },
  "sylas-uprising": {
    sylas: "INSTIGATOR",
    lux: "PARTICIPANT",
    garen: "PARTICIPANT",
    "jarvan-iv": "AFFECTED_BY",
  },
  "celestial-age": {
    "aurelion-sol": "ACTIVE_DURING",
    kayle: "ACTIVE_DURING",
    morgana: "ACTIVE_DURING",
  },
  "kinkou-fracture": {
    yunara: "AFFECTED_BY",
    shen: "PARTICIPANT",
    akali: "PARTICIPANT",
    kennen: "OBSERVER",
  },
  "era-hextech": {
    jayce: "ACTIVE_DURING",
    viktor: "ACTIVE_DURING",
    heimerdinger: "ACTIVE_DURING",
    caitlyn: "ACTIVE_DURING",
    vi: "ACTIVE_DURING",
    jinx: "ACTIVE_DURING",
    ekko: "ACTIVE_DURING",
    mel: "ACTIVE_DURING",
    ambessa: "ACTIVE_DURING",
    singed: "ACTIVE_DURING",
    warwick: "ACTIVE_DURING",
  },
};

export function inferEventRole(
  eventSlug: string,
  characterSlug: string,
  isEra: boolean,
): EventRelationRole {
  if (isEra) return "ACTIVE_DURING";

  const overrides = EVENT_ROLE_OVERRIDES[eventSlug];
  if (overrides?.[characterSlug]) return overrides[characterSlug];

  return "ASSOCIATED_WITH";
}
