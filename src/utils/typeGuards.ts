import {
  Character,
  CharacterWithStats,
  CharacterClass,
  Element,
  SpellName,
  StatusEffect,
  BaseStats,
  AbilityForClass,
} from "../types/game";

// Type guard functions to check character types
export const isWarrior = (
  character: Character
): character is Extract<Character, { type: "warrior" }> => {
  return character.type === "warrior";
};

export const isMage = (
  character: Character
): character is Extract<Character, { type: "mage" }> => {
  return character.type === "mage";
};

export const isArcher = (
  character: Character
): character is Extract<Character, { type: "archer" }> => {
  return character.type === "archer";
};

export const isRogue = (
  character: Character
): character is Extract<Character, { type: "rogue" }> => {
  return character.type === "rogue";
};

// Get primary stat based on character type
export const getPrimaryStat = (character: Character): number => {
  if (isWarrior(character)) return character.strength;
  if (isMage(character)) return character.intelligence;
  if (isArcher(character)) return character.dexterity;
  if (isRogue(character)) return character.stealth;
  return 0;
};

// Get character primary stats description
export const getCharacterPrimaryStats = (character: Character): string => {
  if (isWarrior(character)) {
    return `Strength: ${character.strength} | Armor: ${character.armor}`;
  }
  if (isMage(character)) {
    return `Intelligence: ${character.intelligence} | Mana: ${character.mana}`;
  }
  if (isArcher(character)) {
    return `Dexterity: ${character.dexterity} | Accuracy: ${character.accuracy}`;
  }
  if (isRogue(character)) {
    return `Stealth: ${character.stealth} | Critical: ${character.criticalChance}%`;
  }
  return "";
};

// Get special attributes for each character type
export const getSpecialAttribute = (character: Character): string => {
  if (isWarrior(character)) {
    return `Weapon: ${character.weaponType} | Battle Cry: "${character.battleCry}"`;
  }
  if (isMage(character)) {
    return `Element: ${character.element} | Spells: ${character.spells.join(
      ", "
    )}`;
  }
  if (isArcher(character)) {
    return `Arrow Type: ${character.arrowType} | Range Bonus: +${character.rangeBonus}`;
  }
  if (isRogue(character)) {
    return `Backstab: x${character.backstabMultiplier} | Poison: ${character.poisonDamage}`;
  }
  return "";
};

// Calculate total power for a character
export const calculateTotalPower = (
  character: CharacterWithStats<Character>
): number => {
  const primaryStat = getPrimaryStat(character);
  const healthBonus = character.health * 0.1;
  const levelBonus = character.level * 5;
  const experienceBonus = character.experience * 0.05;

  return Math.round(primaryStat + healthBonus + levelBonus + experienceBonus);
};

// Add stats to character
export const addStatsToCharacter = <T extends Character>(
  character: T,
  baseStats: BaseStats,
  abilities: AbilityForClass<T["type"]>[],
  statusEffects: StatusEffect[] = []
): CharacterWithStats<T> => {
  const characterWithStats = {
    ...character,
    ...baseStats,
    abilities,
    statusEffects,
  } as CharacterWithStats<T>;

  return characterWithStats;
};

// Utility function to generate spell names
export const generateSpellName = <T extends Element>(
  element: T
): SpellName<T> => {
  return `${element}_spell` as SpellName<T>;
};

// Alias for createSpellName (for compatibility)
export const createSpellName = generateSpellName;

// Status effect utility functions
export const getDamageFromStatusEffect = (effect: StatusEffect): number => {
  switch (effect.type) {
    case "poisoned":
    case "burning":
      return effect.damage;
    case "cursed":
      return effect.damageReduction;
    default:
      return 0;
  }
};

export const getHealingFromStatusEffect = (effect: StatusEffect): number => {
  if (effect.type === "blessed") {
    return effect.healAmount;
  }
  return 0;
};

// Character class validation
export const isValidCharacterClass = (
  value: string
): value is CharacterClass => {
  return ["warrior", "mage", "archer", "rogue"].includes(value);
};

// Element validation
export const isValidElement = (value: string): value is Element => {
  return ["fire", "ice", "lightning", "dark"].includes(value);
};
