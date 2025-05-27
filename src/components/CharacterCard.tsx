import React from "react";
import { Character, CharacterWithStats, StatusEffect } from "../types/game";
import {
  getCharacterPrimaryStats,
  getSpecialAttribute,
  isWarrior,
  isMage,
  isArcher,
  isRogue,
} from "../utils/typeGuards";
import {
  Sword,
  Wand2,
  Target,
  Eye,
  Heart,
  Shield,
  Zap,
  Skull,
} from "lucide-react";

interface CharacterCardProps {
  character: CharacterWithStats<Character>;
  isSelected: boolean;
  onSelect: () => void;
}

const getCharacterIcon = (character: Character) => {
  if (isWarrior(character)) return <Sword className="w-8 h-8" />;
  if (isMage(character)) return <Wand2 className="w-8 h-8" />;
  if (isArcher(character)) return <Target className="w-8 h-8" />;
  if (isRogue(character)) return <Eye className="w-8 h-8" />;
  return null;
};

const getCharacterColor = (character: Character): string => {
  if (isWarrior(character)) return "from-red-600 to-red-400";
  if (isMage(character)) return "from-blue-600 to-blue-400";
  if (isArcher(character)) return "from-green-600 to-green-400";
  if (isRogue(character)) return "from-purple-600 to-purple-400";
  return "from-gray-600 to-gray-400";
};

const getStatusIcon = (effect: StatusEffect) => {
  switch (effect.type) {
    case "poisoned":
      return <Skull className="w-4 h-4 text-green-400" title={`Poisoned: ${effect.damage} dmg for ${effect.duration} turns`} />;
    case "burning":
      return <Zap className="w-4 h-4 text-red-400" title={`Burning: ${effect.damage} dmg for ${effect.duration} turns`} />;
    case "frozen":
      return <Shield className="w-4 h-4 text-blue-400" title={`Frozen for ${effect.duration} turns`} />;
    case "blessed":
      return <Heart className="w-4 h-4 text-yellow-400" title={`Blessed: +${effect.healAmount} healing for ${effect.duration} turns`} />;
    case "cursed":
      return <Skull className="w-4 h-4 text-purple-400" title={`Cursed: -${effect.damageReduction} damage for ${effect.duration} turns`} />;
    default:
      return null;
  }
};



export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSelected,
  onSelect,
}) => {
  const gradientClass = getCharacterColor(character);

  return (
    <div
      className={`relative p-6 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        isSelected
          ? "ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/25"
          : "hover:shadow-xl hover:shadow-white/10"
      } bg-gradient-to-br ${gradientClass}`}
      onClick={onSelect}
    >
      {/* Character Icon and Type */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
            {getCharacterIcon(character)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white capitalize">
              {character.type}
            </h3>
            <p className="text-sm text-white/80">Level {character.level}</p>
          </div>
        </div>
        {isSelected && (
          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
        )}
      </div>

      {/* Health and Experience */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-sm">Health</span>
          <span className="text-white font-semibold">{character.health}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min((character.health / 100) * 100, 100)}%`,
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white/90 text-sm">Experience</span>
          <span className="text-white font-semibold">
            {character.experience}/100
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${character.experience}%` }}
          />
        </div>
      </div>

      {/* Primary Stats */}
      <div className="bg-black/20 rounded-lg p-3 mb-3">
        <p className="text-white/90 text-sm">
          {getCharacterPrimaryStats(character)}
        </p>
      </div>

      {/* Special Attributes */}
      <div className="bg-black/20 rounded-lg p-3 mb-3">
        <p className="text-white/80 text-xs">
          {getSpecialAttribute(character)}
        </p>
      </div>

      {/* Status Effects */}
      {character.statusEffects.length > 0 && (
        <div className="flex space-x-1 mb-2">
          {character.statusEffects.map((effect, index) => (
            <div key={index} className="flex items-center">
              {getStatusIcon(effect)}
            </div>
          ))}
        </div>
      )}

      {/* Abilities */}
      <div className="flex flex-wrap gap-1">
        {character.abilities.map((ability, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-white/20 rounded text-xs text-white/90 backdrop-blur-sm"
          >
            {ability.type}
          </span>
        ))}
      </div>
    </div>
  );
};
