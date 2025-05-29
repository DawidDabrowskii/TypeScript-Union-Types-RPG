import { Character, StatusEffect, Item, Element } from "../types/game";

export function isWarrior(
  character: Character
): character is Extract<Character, { type: "warrior" }> {
  return character.type === "warrior";
}

export function isMage(
  character: Character
): character is Extract<Character, { type: "mage" }> {
  return character.type === "mage";
}

export function isArcher(
  character: Character
): character is Extract<Character, { type: "archer" }> {
  return character.type === "archer";
}

export function isRogue(
  character: Character
): character is Extract<Character, { type: "rogue" }> {
  return character.type === "rogue";
}

// Type guard for statuses
export function isPoisoned(
  effect: StatusEffect
): effect is Extract<StatusEffect, { type: "poisoned" }> {
  return effect.type === "poisoned";
}

export function isBurning(
  effect: StatusEffect
): effect is Extract<StatusEffect, { type: "burning" }> {
  return effect.type === "burning";
}

export function isFrozen(
  effect: StatusEffect
): effect is Extract<StatusEffect, { type: "frozen" }> {
  return effect.type === "frozen";
}

// Type guard for items
export function isWeapon(
  item: Item
): item is Extract<Item, { type: "weapon" }> {
  return item.type === "weapon";
}

export function isArmor(item: Item): item is Extract<Item, { type: "armor" }> {
  return item.type === "armor";
}

export function isPotion(
  item: Item
): item is Extract<Item, { type: "potion" }> {
  return item.type === "potion";
}

// Utility function using type guards
export function getCharacterPrimaryStats(character: Character): string {
  if (isWarrior(character)) {
    return `Strength: ${character.strength}, Armor: ${character.armor}`;
  }
  if (isMage(character)) {
    return `Intelligence: ${character.intelligence}, Mana: ${character.mana}`;
  }
  if (isArcher(character)) {
    return `Dexterity: ${character.dexterity}, Accuracy: ${character.accuracy}`;
  }
  if (isRogue(character)) {
    return `Stealth: ${character.stealth}, Crit Chance: ${character.criticalChance}%`;
  }

  // TypeScript knows that this will never happen
  const exhaustiveCheck: never = character;
  return exhaustiveCheck;
}

// Template literal type functions
export function createSpellName<T extends Element>(element: T): `${T}_spell` {
  return `${element}_spell` as const;
}

export function getSpellDescription(spell: `${Element}_spell`): string {
  const element = spell.split("_")[0] as Element;

  switch (element) {
    case "fire":
      return "🔥 Deals fire damage over time";
    case "ice":
      return "❄️ Slows and deals ice damage";
    case "lightning":
      return "⚡ Quick strike with chain damage";
    case "dark":
      return "🌑 Drains life and curses enemy";
    default:
      const exhaustiveCheck: never = element;
      return exhaustiveCheck;
  }
}
