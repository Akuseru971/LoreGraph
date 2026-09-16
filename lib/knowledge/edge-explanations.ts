import { characterById, eventById, loreEntityById } from "@/data";
import type { GraphEdge, GraphNode } from "@/types";

/**
 * Character-specific explanations for structural graph edges.
 * Prevents repeated generic copy (e.g. the same Void paragraph on every hop).
 */
export function characterEventExplanation(
  characterId: string,
  eventId: string,
  fallback: string,
): string {
  const character = characterById.get(characterId);
  const event = eventById.get(eventId);
  if (!character || !event) return fallback;

  const slug = event.slug;
  const name = character.name;

  const templates: Record<string, string> = {
    "void-incursion": `${name} fought during the ancient Void War as one of Shurima's Ascended, when Icathia's breach forced the empire to answer with god-warriors.`,
    "ascension-ritual": `${name} was raised through Shurima's Rite of Ascension — elevated by the Sun Disc into a being meant to defend the world.`,
    "darkin-corruption": `${name} was among the Ascended who curdled into Darkin after centuries of war against the Void.`,
    "darkin-war": `${name} fought in the Great Darkin War — the rebellion that turned Shurima's protectors into its greatest threat.`,
    "noxian-invasion-ionia": `${name} was caught up in Noxus's invasion of Ionia, when a nation with no standing army was forced to invent one under fire.`,
    "ruination": `${name} was present during or shaped by the Ruination — the catastrophe that turned the Blessed Isles into the Shadow Isles.`,
    "swain-coup": `${name} was involved in the power shift that brought Jericho Swain to Noxus's throne.`,
    "void-breach-icathia": `${name}'s story intersects with Icathia's fateful decision to weaponize the Void against Shurima.`,
  };

  return templates[slug] ?? `${name} is documented as a participant in ${event.title}.`;
}

export function characterConceptExplanation(
  characterId: string,
  conceptId: string,
  fallback: string,
): string {
  const character = characterById.get(characterId);
  const concept = loreEntityById.get(conceptId);
  if (!character || !concept) return fallback;

  const name = character.name;
  const slug = concept.slug;

  const templates: Record<string, string> = {
    void: slug === "void" && character.slug === "aatrox"
      ? "As an Ascended, Aatrox fought the Void during ancient Shurima's greatest war — thousands of years before modern incursions."
      : slug === "void" && character.slug === "kaisa"
        ? "Kai'Sa survived a Void incursion beneath modern Shurima and bonded with a Voidborn carapace to stay alive."
        : `${name}'s story is structurally tied to the Void — not through meeting other Void-linked champions, but through documented survival or warfare.`,
    ascended: `${name} belongs to the lineage of Shurima's Ascended — mortals elevated by the Sun Disc to fight threats mortal armies could not.`,
    darkin: `${name} shares the Darkin origin: Ascended who broke during endless war and were sealed inside their own weapons.`,
    "aspect-of-war": `${name}'s path intersects with Targon's Aspect of War and the warriors who carry it.`,
    "mage-rebellion": `${name}'s story connects to Demacia's Mage Rebellion and the kingdom's persecution of magic users.`,
  };

  return templates[slug] ?? `${name} has a documented structural link to ${concept.name}.`;
}

export function contextualEdgeDescription(
  edge: GraphEdge,
  from: GraphNode,
  to: GraphNode,
): string {
  if (edge.connectionKind === "direct") return edge.description;

  if (from.type === "character" && to.type === "event") {
    return characterEventExplanation(from.id, to.id, edge.description);
  }
  if (to.type === "character" && from.type === "event") {
    return characterEventExplanation(to.id, from.id, edge.description);
  }
  if (from.type === "character" && to.type === "concept") {
    return characterConceptExplanation(from.id, to.id, edge.description);
  }
  if (to.type === "character" && from.type === "concept") {
    return characterConceptExplanation(to.id, from.id, edge.description);
  }

  if (from.type === "character" && to.type === "region") {
    return `${from.name} is primarily associated with ${to.name} — their origin, allegiance, or the region where their story unfolds.`;
  }

  if (from.type === "character" && to.type === "faction") {
    return `${from.name} has documented ties to ${to.name}, whether through membership, service, or political alignment.`;
  }

  return edge.description;
}
