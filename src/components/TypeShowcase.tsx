import React from "react";
import { Character, CharacterWithStats } from "../types/game";
import { isWarrior, isMage, isArcher, isRogue } from "../utils/typeGuards";
import { Code2, FileType, Zap, CheckCircle } from "lucide-react";

interface TypeShowcaseProps {
  character: CharacterWithStats<Character>;
}

export const TypeShowcase: React.FC<TypeShowcaseProps> = ({ character }) => {
  // Generate type-specific code examples
  const getTypeGuardExample = () => {
    if (isWarrior(character)) {
      return `if (isWarrior(character)) {
  // TypeScript knows this is a Warrior
  console.log(character.strength); // ✓ Valid
  console.log(character.weaponType); // ✓ Valid
  console.log(character.battleCry); // ✓ Valid
  // console.log(character.mana); // ✗ Error!
}`;
    }
    if (isMage(character)) {
      return `if (isMage(character)) {
  // TypeScript knows this is a Mage
  console.log(character.intelligence); // ✓ Valid
  console.log(character.mana); // ✓ Valid
  console.log(character.element); // ✓ Valid
  // console.log(character.strength); // ✗ Error!
}`;
    }
    if (isArcher(character)) {
      return `if (isArcher(character)) {
  // TypeScript knows this is an Archer
  console.log(character.dexterity); // ✓ Valid
  console.log(character.accuracy); // ✓ Valid
  console.log(character.arrowType); // ✓ Valid
  // console.log(character.stealth); // ✗ Error!
}`;
    }
    if (isRogue(character)) {
      return `if (isRogue(character)) {
  // TypeScript knows this is a Rogue
  console.log(character.stealth); // ✓ Valid
  console.log(character.criticalChance); // ✓ Valid
  console.log(character.backstabMultiplier); // ✓ Valid
  // console.log(character.intelligence); // ✗ Error!
}`;
    }
    return "";
  };

  const getConditionalTypeExample = () => {
    return `type ClassSpecificActions<T extends Character['type']> = 
  T extends 'warrior' ? 'charge' | 'defend' | 'battlecry' :
  T extends 'mage' ? 'cast_spell' | 'meditate' | 'enchant' :
  T extends 'archer' ? 'aimed_shot' | 'multishot' | 'set_trap' :
  T extends 'rogue' ? 'backstab' | 'stealth' | 'poison_dart' :
  never;

// Usage:
type WarriorActions = ClassSpecificActions<'warrior'>; 
// Result: 'charge' | 'defend' | 'battlecry'`;
  };

  const getTemplateTypeExample = () => {
    return `type Element = 'fire' | 'ice' | 'lightning' | 'dark';
type SpellName<T extends Element> = \`\${T}_spell\`;

// Usage:
type FireSpell = SpellName<'fire'>;     // 'fire_spell'
type IceSpell = SpellName<'ice'>;       // 'ice_spell'
type AllSpells = SpellName<Element>;    // 'fire_spell' | 'ice_spell' | ...`;
  };

  const getCurrentCharacterType = () => {
    return `// Current character type:
type CurrentCharacter = ${
      character.type === "warrior"
        ? "Warrior"
        : character.type === "mage"
        ? "Mage"
        : character.type === "archer"
        ? "Archer"
        : "Rogue"
    };

interface ${
      character.type === "warrior"
        ? "Warrior"
        : character.type === "mage"
        ? "Mage"
        : character.type === "archer"
        ? "Archer"
        : "Rogue"
    } {
  type: '${character.type}';
  ${
    character.type === "warrior"
      ? `strength: ${character.strength};
  armor: ${character.armor};
  weaponType: '${character.weaponType}';
  battleCry: '${character.battleCry}';`
      : character.type === "mage"
      ? `intelligence: ${character.intelligence};
  mana: ${character.mana};
  element: '${character.element}';
  spells: string[];`
      : character.type === "archer"
      ? `dexterity: ${character.dexterity};
  accuracy: ${character.accuracy};
  arrowType: '${character.arrowType}';
  rangeBonus: ${character.rangeBonus};`
      : `stealth: ${character.stealth};
  criticalChance: ${character.criticalChance};
  poisonDamage: ${character.poisonDamage};
  backstabMultiplier: ${character.backstabMultiplier};`
  }
}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <FileType className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">
          TypeScript Type System in Action
        </h2>
      </div>

      {/* Current Character Type */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Code2 className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">
            Current Character Interface
          </h3>
        </div>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm text-green-400 overflow-x-auto">
          <code>{getCurrentCharacterType()}</code>
        </pre>
      </div>

      {/* Type Guards Demo */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">
            Type Guards & Type Narrowing
          </h3>
        </div>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm text-blue-400 overflow-x-auto">
          <code>{getTypeGuardExample()}</code>
        </pre>
      </div>

      {/* Conditional Types */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">
            Conditional Types
          </h3>
        </div>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm text-purple-400 overflow-x-auto">
          <code>{getConditionalTypeExample()}</code>
        </pre>
      </div>

      {/* Template Literal Types */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Code2 className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">
            Template Literal Types
          </h3>
        </div>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm text-yellow-400 overflow-x-auto">
          <code>{getTemplateTypeExample()}</code>
        </pre>
      </div>

      {/* Character Statistics */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Runtime Character Data
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-gray-400">Type</div>
            <div className="text-white font-semibold capitalize">
              {character.type}
            </div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-gray-400">Level</div>
            <div className="text-white font-semibold">{character.level}</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-gray-400">Health</div>
            <div className="text-white font-semibold">{character.health}</div>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <div className="text-gray-400">Abilities</div>
            <div className="text-white font-semibold">
              {character.abilities.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
