import React from "react";

export const EducationalNotes: React.FC = () => {
  return (
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
              • <strong>Type Narrowing</strong> - automatic type narrowing by
              TypeScript
            </li>
            <li>
              • <strong>Exhaustive Checking</strong> - ensuring all cases are
              handled
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-purple-300 mb-2">
            Advanced patterns:
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              • <strong>Template Literal Types</strong> - dynamic string type
              generation
            </li>
            <li>
              • <strong>Conditional Types</strong> - types dependent on
              conditions
            </li>
            <li>
              • <strong>Mapped Types</strong> - transformation of existing types
            </li>
            <li>
              • <strong>Utility Types</strong> - Extract, Exclude, Pick, Omit
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
