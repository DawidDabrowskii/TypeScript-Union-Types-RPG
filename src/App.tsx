import React, { useState } from "react";
import { CharacterCard } from "./components/CharacterCard";
import { 
  Character, 
  CharacterWithStats, 
  GameState, 
  BaseStats, 
  AbilityForClass, 
  StatusEffect,
  Element,
  SpellName 
} from "./types/game";
import { addStatsToCharacter, generateSpellName } from "./utils/typeGuards";

// Sample characters for demonstration using advanced Union Types
const createSampleCharacters = (): CharacterWithStats<Character>[] => {
  // Base stats for all characters
  const baseStats: BaseStats = {
    health: 100,
    level: 5,
    experience: 75,
  };

  // Create warrior character
  const warrior: Character = {
    type: "warrior",
    strength: 18,
    armor: 12,
    weaponType: "sword",
    battleCry: "For honor and glory!",
  };

  const warriorAbilities: AbilityForClass<'warrior'>[] = [
    { type: "charge" },
    { type: "defend" },
    { type: "berserk" },
  ];

  // Create mage character
  const mage: Character = {
    type: "mage",
    intelligence: 20,
    mana: 150,
    element: "fire",
    spells: [generateSpellName("fire"), generateSpellName("lightning")],
  };

  const mageAbilities: AbilityForClass<'mage'>[] = [
    { type: "fireball" },
    { type: "heal" },
    { type: "teleport" },
  ];

  const mageStatusEffects: StatusEffect[] = [
    { type: "blessed", healAmount: 15, duration: 3 },
  ];

  // Create archer character
  const archer: Character = {
    type: "archer",
    dexterity: 19,
    accuracy: 95,
    arrowType: "fire",
    rangeBonus: 8,
  };

  const archerAbilities: AbilityForClass<'archer'>[] = [
    { type: "multishot" },
    { type: "aimshot" },
    { type: "trap" },
  ];

  // Create rogue character
  const rogue: Character = {
    type: "rogue",
    stealth: 17,
    criticalChance: 25,
    poisonDamage: 12,
    backstabMultiplier: 3.0,
  };

  const rogueAbilities: AbilityForClass<'rogue'>[] = [
    { type: "backstab" },
    { type: "vanish" },
    { type: "poison_dart" },
  ];

  const rogueStatusEffects: StatusEffect[] = [
    { type: "poisoned", damage: 8, duration: 3 },
  ];

  // Create characters with stats
  const charactersWithStats: CharacterWithStats<Character>[] = [
    addStatsToCharacter(warrior, baseStats, warriorAbilities),
    addStatsToCharacter(mage, { ...baseStats, health: 80 }, mageAbilities, mageStatusEffects),
    addStatsToCharacter(archer, { ...baseStats, health: 90, level: 6 }, archerAbilities),
    addStatsToCharacter(rogue, { ...baseStats, health: 85, level: 4 }, rogueAbilities, rogueStatusEffects),
  ];

  return charactersWithStats;
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    characters: createSampleCharacters(),
    currentCharacter: 0,
    inventory: [],
    gamePhase: 'setup',
  });

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number | null>(null);

  const handleCharacterSelect = (character: CharacterWithStats<Character>) => {
    const index = gameState.characters.findIndex(c => c.type === character.type);
    setSelectedCharacterIndex(selectedCharacterIndex === index ? null : index);
  };

  const selectedCharacter = selectedCharacterIndex !== null ? gameState.characters[selectedCharacterIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            TypeScript Union RPG
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Advanced TypeScript Union Types, Template Literals & Conditional Types
          </p>
          <p className="text-lg text-white/60">
            Game Phase: {gameState.gamePhase} • Current Character: {gameState.currentCharacter + 1} • Inventory: {gameState.inventory.length} items
          </p>
        </div>

        {/* Selected Character Info */}
        {gameState.selectedCharacter && (
          <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Selected Character
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div>
                <p className="font-semibold">Type:</p>
                <p className="capitalize">{gameState.selectedCharacter.type}</p>
              </div>
              <div>
                <p className="font-semibold">Total Power:</p>
                <p>{gameState.selectedCharacter.totalPower}</p>
              </div>
              <div>
                <p className="font-semibold">Primary Stat:</p>
                <p>{gameState.selectedCharacter.primaryStat}</p>
              </div>
            </div>
          </div>
        )}

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameState.characters.map((character, index) => (
            <CharacterCard
              key={`${character.type}-${index}`}
              character={character}
              isSelected={gameState.selectedCharacter?.type === character.type}
              onSelect={() => handleCharacterSelect(character)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            Click on character cards to select them and see TypeScript union
            types in action!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
