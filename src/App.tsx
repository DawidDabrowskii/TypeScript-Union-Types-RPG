import { Header } from "./components/Header";
import { CharacterSelection } from "./components/CharacterSelection";
import { TypeShowcase } from "./components/TypeShowcase";
import { GameActions } from "./components/GameActions";
import { EducationalNotes } from "./components/EducationalNotes";
import { useGameState } from "./hooks/useGameState";

function App() {
  const {
    gameState,
    selectCharacter,
    performAction,
    addRandomStatusEffect,
    removeLastStatusEffect,
    currentCharacter,
  } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CharacterSelection
          characters={gameState.characters}
          currentCharacterIndex={gameState.currentCharacter}
          onSelectCharacter={selectCharacter}
          onAddRandomStatusEffect={addRandomStatusEffect}
          onRemoveLastStatusEffect={removeLastStatusEffect}
          currentCharacter={currentCharacter}
        />

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

        <EducationalNotes />
      </div>
    </div>
  );
}

export default App;
