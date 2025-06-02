import React from "react";
import { Gamepad2 } from "lucide-react";

export const Header: React.FC = () => {
  return (
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
  );
};
