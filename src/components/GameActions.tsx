import React from "react";
import { Character, CharacterWithStats } from "../types/game";
import { isWarrior, isMage, isArcher, isRogue } from "../utils/typeGuards";
import { Sword, Heart, Zap, Shield, Target, Eye } from "lucide-react";

interface GameActionsProps {
  character: CharacterWithStats<Character>;
  onAction: (actionType: string) => void;
}

// Conditional type for class-specific actions
type ClassSpecificActions<T extends Character["type"]> = T extends "warrior"
  ? "charge" | "defend" | "battlecry"
  : T extends "mage"
  ? "cast_spell" | "meditate" | "enchant"
  : T extends "archer"
  ? "aimed_shot" | "multishot" | "set_trap"
  : T extends "rogue"
  ? "backstab" | "stealth" | "poison_dart"
  : never;

const getAvailableActions = (character: Character) => {
  // Type narrowing using type guards
  if (isWarrior(character)) {
    return [
      {
        type: "charge" as ClassSpecificActions<"warrior">,
        icon: Sword,
        label: "Charge Attack",
        color: "bg-red-600",
      },
      {
        type: "defend" as ClassSpecificActions<"warrior">,
        icon: Shield,
        label: "Defend",
        color: "bg-blue-600",
      },
      {
        type: "battlecry" as ClassSpecificActions<"warrior">,
        icon: Heart,
        label: "Battle Cry",
        color: "bg-orange-600",
      },
    ];
  }

  if (isMage(character)) {
    return [
      {
        type: "cast_spell" as ClassSpecificActions<"mage">,
        icon: Zap,
        label: `Cast ${character.element} Spell`,
        color: "bg-purple-600",
      },
      {
        type: "meditate" as ClassSpecificActions<"mage">,
        icon: Heart,
        label: "Meditate",
        color: "bg-blue-600",
      },
      {
        type: "enchant" as ClassSpecificActions<"mage">,
        icon: Shield,
        label: "Enchant Weapon",
        color: "bg-green-600",
      },
    ];
  }

  if (isArcher(character)) {
    return [
      {
        type: "aimed_shot" as ClassSpecificActions<"archer">,
        icon: Target,
        label: "Aimed Shot",
        color: "bg-green-600",
      },
      {
        type: "multishot" as ClassSpecificActions<"archer">,
        icon: Zap,
        label: "Multishot",
        color: "bg-yellow-600",
      },
      {
        type: "set_trap" as ClassSpecificActions<"archer">,
        icon: Shield,
        label: "Set Trap",
        color: "bg-brown-600",
      },
    ];
  }

  if (isRogue(character)) {
    return [
      {
        type: "backstab" as ClassSpecificActions<"rogue">,
        icon: Sword,
        label: "Backstab",
        color: "bg-purple-600",
      },
      {
        type: "stealth" as ClassSpecificActions<"rogue">,
        icon: Eye,
        label: "Stealth",
        color: "bg-gray-600",
      },
      {
        type: "poison_dart" as ClassSpecificActions<"rogue">,
        icon: Target,
        label: "Poison Dart",
        color: "bg-green-600",
      },
    ];
  }

  return [];
};

const getActionDescription = (
  actionType: string,
  character: Character
): string => {
  if (isWarrior(character)) {
    const descriptions: Record<ClassSpecificActions<"warrior">, string> = {
      charge: `Charges forward with ${character.weaponType}, dealing ${
        character.strength * 1.5
      } damage!`,
      defend: `Raises shield, reducing incoming damage by ${character.armor}!`,
      battlecry: `"${character.battleCry}" - Boosts team morale!`,
    };
    return (
      descriptions[actionType as ClassSpecificActions<"warrior">] ||
      "Unknown action"
    );
  }

  if (isMage(character)) {
    const descriptions: Record<ClassSpecificActions<"mage">, string> = {
      cast_spell: `Casts ${character.element} spell dealing ${
        character.intelligence * 2
      } damage!`,
      meditate: `Restores ${character.mana} mana points through meditation!`,
      enchant: `Enchants weapon with ${character.element} element!`,
    };
    return (
      descriptions[actionType as ClassSpecificActions<"mage">] ||
      "Unknown action"
    );
  }

  if (isArcher(character)) {
    const descriptions: Record<ClassSpecificActions<"archer">, string> = {
      aimed_shot: `Aims carefully, ${character.accuracy}% chance to hit for ${
        character.dexterity * 2
      } damage!`,
      multishot: `Fires multiple ${character.arrowType} arrows!`,
      set_trap: `Sets a trap with +${character.rangeBonus} effectiveness!`,
    };
    return (
      descriptions[actionType as ClassSpecificActions<"archer">] ||
      "Unknown action"
    );
  }

  if (isRogue(character)) {
    const descriptions: Record<ClassSpecificActions<"rogue">, string> = {
      backstab: `Strikes from shadows with x${character.backstabMultiplier} damage multiplier!`,
      stealth: `Becomes invisible (${character.stealth} stealth rating)!`,
      poison_dart: `Throws poison dart dealing ${character.poisonDamage} poison damage!`,
    };
    return (
      descriptions[actionType as ClassSpecificActions<"rogue">] ||
      "Unknown action"
    );
  }

  return "No description available";
};

export const GameActions: React.FC<GameActionsProps> = ({
  character,
  onAction,
}) => {
  const actions = getAvailableActions(character);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Available Actions</h3>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.type}
              onClick={() => onAction(action.type)}
              className={`w-full p-4 rounded-lg ${action.color} hover:opacity-80 transition-all duration-200 transform hover:scale-105`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-6 h-6 text-white" />
                <div className="text-left">
                  <div className="text-white font-semibold">{action.label}</div>
                  <div className="text-white/80 text-sm">
                    {getActionDescription(action.type, character)}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Status Effects Display */}
      {character.statusEffects.length > 0 && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Active Effects:</h4>
          {character.statusEffects.map((effect, index) => (
            <div key={index} className="text-sm text-gray-300">
              • {effect.type} (
              {"duration" in effect ? `${effect.duration} turns` : "permanent"})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
