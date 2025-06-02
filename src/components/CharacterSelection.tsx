import React from "react";
import { Code, Sparkles, X } from "lucide-react";
import { CharacterCard } from "./CharacterCard";
import { Character, CharacterWithStats } from "../types/game";

interface CharacterSelectionProps {
  characters: CharacterWithStats<Character>[];
  currentCharacterIndex: number;
  onSelectCharacter: (index: number) => void;
  onAddRandomStatusEffect: () => void;
  onRemoveLastStatusEffect: () => void;
  currentCharacter: CharacterWithStats<Character>;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  characters,
  currentCharacterIndex,
  onSelectCharacter,
  onAddRandomStatusEffect,
  onRemoveLastStatusEffect,
  currentCharacter,
}) => {
  const hasStatusEffects = currentCharacter.statusEffects.length > 0;

  return (
    <section className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Code className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Select Your Character</h2>
        <span className="text-purple-300">(Discriminated Union Types)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            isSelected={currentCharacterIndex === index}
            onSelect={() => onSelectCharacter(index)}
          />
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onAddRandomStatusEffect}
          className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Add Random Status Effect</span>
        </button>

        {hasStatusEffects && (
          <button
            onClick={onRemoveLastStatusEffect}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <X className="w-5 h-5" />
            <span>Remove Last Effect</span>
          </button>
        )}
      </div>

      {hasStatusEffects && (
        <div className="mt-4 text-center">
          <p className="text-purple-200 text-sm">
            Current character has {currentCharacter.statusEffects.length} active
            status effect(s)
          </p>
        </div>
      )}
    </section>
  );
};
