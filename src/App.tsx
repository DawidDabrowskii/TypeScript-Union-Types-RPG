import React from "react";
import { CharacterCard } from "./components/CharacterCard";
import { GameActions } from "./components/GameActions";
import { useGameState } from "./hooks/useGameState";

function App() {
  const { gameState, selectCharacter, performAction, addRandomStatusEffect, currentCharacter } = useGameState();

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

        {/* Current Character Info */}
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">
            Current Character: {currentCharacter.type}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white">
            <div>
              <p className="font-semibold">Level:</p>
              <p>{currentCharacter.level}</p>
            </div>
            <div>
              <p className="font-semibold">Health:</p>
              <p>{currentCharacter.health}</p>
            </div>
            <div>
              <p className="font-semibold">Experience:</p>
              <p>{currentCharacter.experience}/100</p>
            </div>
            <div>
              <p className="font-semibold">Abilities:</p>
              <p>{currentCharacter.abilities.length}</p>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {gameState.characters.map((character, index) => (
            <CharacterCard
              key={`${character.type}-${index}`}
              character={character}
              isSelected={gameState.currentCharacter === index}
              onSelect={() => selectCharacter(index)}
            />
          ))}
        </div>

        {/* Game Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GameActions
            character={currentCharacter}
            onAction={performAction}
          />
          
          {/* Additional Actions */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Game Controls</h3>
            <div className="space-y-3">
              <button
                onClick={addRandomStatusEffect}
                className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
              >
                Add Random Status Effect
              </button>
              <button
                onClick={() => selectCharacter((gameState.currentCharacter + 1) % gameState.characters.length)}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
              >
                Switch to Next Character
              </button>
            </div>
            
            {/* Inventory Display */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">Inventory ({gameState.inventory.length} items):</h4>
              <div className="space-y-2">
                {gameState.inventory.map((item, index) => (
                  <div key={index} className="text-sm text-gray-300 bg-gray-700 p-2 rounded">
                    <span className="font-medium">{item.name}</span> ({item.type})
                    {item.type === 'weapon' && ` - ${item.damage} damage`}
                    {item.type === 'armor' && ` - ${item.defense} defense`}
                    {item.type === 'potion' && ` - ${item.amount} ${item.effect}`}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
