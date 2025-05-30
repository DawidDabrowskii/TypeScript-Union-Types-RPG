import { CharacterCard } from "./components/CharacterCard";
import { TypeShowcase } from "./components/TypeShowcase";
import { GameActions } from "./components/GameActions";
import { useGameState } from "./hooks/useGameState";
import { Gamepad2, Code, Sparkles } from "lucide-react";

function App() {
  const {
    gameState,
    selectCharacter,
    performAction,
    addRandomStatusEffect,
    currentCharacter,
  } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                TypeScript Union Types RPG
              </h1>
              <p className="text-purple-200 mt-1">
                Advanced union types in practice
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Character Selection */}
        <section className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Code className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">
              Select Your Character
            </h2>
            <span className="text-purple-300">(Discriminated Union Types)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {gameState.characters.map((character, index) => (
              <CharacterCard
                key={index}
                character={character}
                isSelected={gameState.currentCharacter === index}
                onSelect={() => selectCharacter(index)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={addRandomStatusEffect}
              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Add Random Status Effect</span>
            </button>
          </div>
        </section>

        {/* Game Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions Panel */}
          <div className="lg:col-span-1">
            <GameActions
              character={currentCharacter}
              onAction={performAction}
            />
          </div>

          {/* Type Showcase */}
          <div className="lg:col-span-2">
            <TypeShowcase character={currentCharacter} />
          </div>
        </div>

        {/* Educational Notes */}
        <section className="mt-12 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            What this application demonstrates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
            <div>
              <h4 className="text-lg font-semibold text-blue-300 mb-2">
                Union Types in practice:
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Discriminated Unions</strong> - different character
                  types with common 'type' field
                </li>
                <li>
                  • <strong>Type Guards</strong> - safe type checking at runtime
                </li>
                <li>
                  • <strong>Type Narrowing</strong> - automatic type narrowing
                  by TypeScript
                </li>
                <li>
                  • <strong>Exhaustive Checking</strong> - ensuring all cases
                  are handled
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-2">
                Advanced patterns:
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Template Literal Types</strong> - dynamic string
                  type generation
                </li>
                <li>
                  • <strong>Conditional Types</strong> - types dependent on
                  conditions
                </li>
                <li>
                  • <strong>Mapped Types</strong> - transformation of existing
                  types
                </li>
                <li>
                  • <strong>Utility Types</strong> - Extract, Exclude, Pick,
                  Omit
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
