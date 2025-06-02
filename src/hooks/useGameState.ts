import { useState, useCallback } from "react";
import {
  Character,
  CharacterWithStats,
  GameState,
  StatusEffect,
  Element,
} from "../types/game";
import { createSpellName } from "../utils/typeGuards";

// Utility type for creating initial characters
type CharacterFactory<T extends Character["type"]> = () => CharacterWithStats<
  Extract<Character, { type: T }>
>;

const createWarrior: CharacterFactory<"warrior"> = () => ({
  type: "warrior",
  strength: 85,
  armor: 75,
  weaponType: "sword",
  battleCry: "For honor!",
  health: 100,
  level: 3,
  experience: 45,
  abilities: [{ type: "charge" }, { type: "defend" }, { type: "berserk" }],
  statusEffects: [],
});

const createMage: CharacterFactory<"mage"> = () => ({
  type: "mage",
  intelligence: 90,
  mana: 120,
  element: "fire" as Element,
  spells: [createSpellName("fire"), createSpellName("ice")],
  health: 70,
  level: 4,
  experience: 67,
  abilities: [{ type: "fireball" }, { type: "heal" }, { type: "teleport" }],
  statusEffects: [{ type: "blessed", healAmount: 5, duration: 3 }],
});

const createArcher: CharacterFactory<"archer"> = () => ({
  type: "archer",
  dexterity: 95,
  accuracy: 88,
  arrowType: "fire",
  rangeBonus: 25,
  health: 85,
  level: 3,
  experience: 32,
  abilities: [{ type: "multishot" }, { type: "aimshot" }, { type: "trap" }],
  statusEffects: [],
});

const createRogue: CharacterFactory<"rogue"> = () => ({
  type: "rogue",
  stealth: 92,
  criticalChance: 35,
  poisonDamage: 15,
  backstabMultiplier: 2.5,
  health: 75,
  level: 5,
  experience: 89,
  abilities: [
    { type: "backstab" },
    { type: "vanish" },
    { type: "poison_dart" },
  ],
  statusEffects: [{ type: "poisoned", damage: 3, duration: 2 }],
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    characters: [createWarrior(), createMage(), createArcher(), createRogue()],
    currentCharacter: 0,
    inventory: [
      { type: "weapon", name: "Flaming Sword", damage: 45, rarity: "epic" },
      { type: "armor", name: "Chain Mail", defense: 25, durability: 80 },
      { type: "potion", name: "Health Potion", effect: "heal", amount: 50 },
      {
        type: "scroll",
        name: "Lightning Scroll",
        spell: createSpellName("lightning"),
      },
    ],
    gamePhase: "setup",
  }));

  const selectCharacter = useCallback((index: number) => {
    setGameState((prev) => ({
      ...prev,
      currentCharacter: index,
    }));
  }, []);

  const performAction = useCallback((actionType: string) => {
    setGameState((prev) => {
      const character = prev.characters[prev.currentCharacter];
      const updatedCharacters = [...prev.characters];

      // Type-safe action handling based on character type
      if (character.type === "warrior" && actionType === "battlecry") {
        // Add blessing status effect
        const newStatus: StatusEffect = {
          type: "blessed",
          healAmount: 10,
          duration: 3,
        };
        updatedCharacters[prev.currentCharacter] = {
          ...character,
          statusEffects: [...character.statusEffects, newStatus],
        };
      } else if (character.type === "mage" && actionType === "cast_spell") {
        // Use mana and add burning effect to enemy (simulated)
        updatedCharacters[prev.currentCharacter] = {
          ...character,
          experience: Math.min(character.experience + 15, 100),
        };
      } else if (character.type === "rogue" && actionType === "poison_dart") {
        // Add poisoned status effect
        const newStatus: StatusEffect = {
          type: "poisoned",
          damage: character.poisonDamage,
          duration: 4,
        };
        updatedCharacters[prev.currentCharacter] = {
          ...character,
          statusEffects: [...character.statusEffects, newStatus],
        };
      } else {
        // Generic action - gain experience
        updatedCharacters[prev.currentCharacter] = {
          ...character,
          experience: Math.min(character.experience + 10, 100),
        };
      }

      return {
        ...prev,
        characters: updatedCharacters,
      };
    });
  }, []);

  const addRandomStatusEffect = useCallback(() => {
    const effects: StatusEffect[] = [
      { type: "burning", damage: 5, duration: 3 },
      { type: "frozen", duration: 2 },
      { type: "cursed", damageReduction: 10, duration: 4 },
    ];

    const randomEffect = effects[Math.floor(Math.random() * effects.length)];

    setGameState((prev) => {
      const updatedCharacters = [...prev.characters];
      updatedCharacters[prev.currentCharacter] = {
        ...updatedCharacters[prev.currentCharacter],
        statusEffects: [
          ...updatedCharacters[prev.currentCharacter].statusEffects,
          randomEffect,
        ],
      };

      return {
        ...prev,
        characters: updatedCharacters,
      };
    });
  }, []);

  const removeLastStatusEffect = useCallback(() => {
    setGameState((prev) => {
      const updatedCharacters = [...prev.characters];
      const currentCharacter = updatedCharacters[prev.currentCharacter];

      if (currentCharacter.statusEffects.length > 0) {
        updatedCharacters[prev.currentCharacter] = {
          ...currentCharacter,
          statusEffects: currentCharacter.statusEffects.slice(0, -1),
        };
      }

      return {
        ...prev,
        characters: updatedCharacters,
      };
    });
  }, []);

  return {
    gameState,
    selectCharacter,
    performAction,
    addRandomStatusEffect,
    removeLastStatusEffect,
    currentCharacter: gameState.characters[gameState.currentCharacter],
  };
};
