// Advanced Union Types for RPG Game

// Template Literal Types for generating names
export type CharacterClass = "warrior" | "mage" | "archer" | "rogue";
export type Element = "fire" | "ice" | "lightning" | "dark";
export type SpellName<T extends Element> = `${T}_spell`;

// Discriminated Union for different character classes
export type Character =
  | {
      type: "warrior";
      strength: number;
      armor: number;
      weaponType: "sword" | "axe" | "hammer";
      battleCry: string;
    }
  | {
      type: "mage";
      intelligence: number;
      mana: number;
      element: Element;
      spells: SpellName<Element>[];
    }
  | {
      type: "archer";
      dexterity: number;
      accuracy: number;
      arrowType: "normal" | "fire" | "ice" | "poison";
      rangeBonus: number;
    }
  | {
      type: "rogue";
      stealth: number;
      criticalChance: number;
      poisonDamage: number;
      backstabMultiplier: number;
    };

// Union type for status effects
export type StatusEffect =
  | { type: "poisoned"; damage: number; duration: number }
  | { type: "burning"; damage: number; duration: number }
  | { type: "frozen"; duration: number }
  | { type: "blessed"; healAmount: number; duration: number }
  | { type: "cursed"; damageReduction: number; duration: number };

// Conditional Types for abilities
export type AbilityForClass<T extends CharacterClass> = T extends "warrior"
  ? { type: "charge" | "defend" | "berserk" }
  : T extends "mage"
  ? { type: "fireball" | "heal" | "teleport" }
  : T extends "archer"
  ? { type: "multishot" | "aimshot" | "trap" }
  : T extends "rogue"
  ? { type: "backstab" | "vanish" | "poison_dart" }
  : never;

// Mapped Types for statistics
export type BaseStats = {
  health: number;
  level: number;
  experience: number;
};

export type CharacterWithStats<T extends Character> = T &
  BaseStats & {
    abilities: AbilityForClass<T["type"]>[];
    statusEffects: StatusEffect[];
  };

// Union type for items
export type Item =
  | {
      type: "weapon";
      name: string;
      damage: number;
      rarity: "common" | "rare" | "epic" | "legendary";
    }
  | { type: "armor"; name: string; defense: number; durability: number }
  | {
      type: "potion";
      name: string;
      effect: "heal" | "mana" | "strength";
      amount: number;
    }
  | { type: "scroll"; name: string; spell: SpellName<Element> };

// Utility types
export type CharacterType = Character["type"];
export type WeaponTypes = Extract<Character, { type: "warrior" }>["weaponType"];
export type ElementalSpells = SpellName<Element>;

// Game state
export interface GameState {
  characters: CharacterWithStats<Character>[];
  currentCharacter: number;
  inventory: Item[];
  gamePhase: "setup" | "battle" | "victory" | "defeat";
}
