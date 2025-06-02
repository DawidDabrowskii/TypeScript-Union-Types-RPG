# TypeScript Union Types RPG 🎮⚔️

A comprehensive interactive application demonstrating advanced TypeScript union types, discriminated unions, and conditional types through an engaging RPG-style interface.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🌟 Features

### Advanced TypeScript Concepts Demonstrated

- **🔗 Discriminated Union Types** - Character types with type-safe narrowing
- **🛡️ Type Guards** - Runtime type checking with compile-time safety
- **🎯 Conditional Types** - Dynamic type generation based on conditions
- **📝 Template Literal Types** - Dynamic string type creation
- **🗺️ Mapped Types** - Type transformations and utility types
- **⚡ Type Narrowing** - Automatic type inference and narrowing

### Interactive Components

- **Character Selection** - Choose from 4 unique character classes
- **Dynamic Actions** - Class-specific abilities with type safety
- **Status Effects** - Add/remove effects with union type validation
- **Live Code Examples** - Real-time TypeScript code generation
- **Educational Showcase** - Interactive type demonstrations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd TypeScript-Union-Types-RPG

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── CharacterCard.tsx    # Individual character display
│   ├── CharacterSelection.tsx # Character grid & controls
│   ├── GameActions.tsx      # Class-specific actions
│   ├── Header.tsx           # App header
│   ├── TypeShowcase.tsx     # Live TypeScript examples
│   └── EducationalNotes.tsx # Learning content
├── hooks/
│   └── useGameState.ts      # Game state management
├── types/
│   └── game.ts              # Core TypeScript definitions
├── utils/
│   └── typeGuards.ts        # Type guard utilities
├── App.tsx              # Main application
└── main.tsx            # Application entry point
```

## 🎭 Character Classes

### 🗡️ Warrior
```typescript
type Warrior = {
  type: 'warrior';
  strength: number;
  armor: number;
  weaponType: 'sword' | 'axe' | 'hammer';
  battleCry: string;
}
```

### 🔮 Mage
```typescript
type Mage = {
  type: 'mage';
  intelligence: number;
  mana: number;
  element: Element;
  spells: SpellName<Element>[];
}
```

### 🏹 Archer
```typescript
type Archer = {
  type: 'archer';
  dexterity: number;
  accuracy: number;
  arrowType: 'normal' | 'fire' | 'ice' | 'poison';
  rangeBonus: number;
}
```

### 🗡️ Rogue
```typescript
type Rogue = {
  type: 'rogue';
  stealth: number;
  criticalChance: number;
  poisonDamage: number;
  backstabMultiplier: number;
}
```

## 🔧 Advanced TypeScript Features

### Discriminated Unions
```typescript
type Character = Warrior | Mage | Archer | Rogue;

// Type narrowing with discriminant property
function getCharacterInfo(character: Character) {
  switch (character.type) {
    case 'warrior':
      return `Strength: ${character.strength}`; // ✅ TypeScript knows it's a Warrior
    case 'mage':
      return `Mana: ${character.mana}`; // ✅ TypeScript knows it's a Mage
    // ...
  }
}
```

### Template Literal Types
```typescript
type Element = 'fire' | 'ice' | 'lightning' | 'dark';
type SpellName<T extends Element> = `${T}_spell`;

// Usage: 'fire_spell' | 'ice_spell' | 'lightning_spell' | 'dark_spell'
```

### Conditional Types
```typescript
type AbilityForClass<T extends CharacterClass> =
  T extends 'warrior' ? { type: 'charge' | 'defend' | 'berserk' } :
  T extends 'mage' ? { type: 'fireball' | 'heal' | 'teleport' } :
  T extends 'archer' ? { type: 'multishot' | 'aimshot' | 'trap' } :
  T extends 'rogue' ? { type: 'backstab' | 'vanish' | 'poison_dart' } :
  never;
```

### Type Guards
```typescript
const isWarrior = (character: Character): character is Warrior => {
  return character.type === 'warrior';
};

// Usage with type narrowing
if (isWarrior(character)) {
  console.log(character.strength); // ✅ TypeScript knows it's a Warrior
}
```

## 🎮 Interactive Features

### Status Effects System
- **Add Random Effects** - Poisoned, Burning, Frozen, Blessed, Cursed
- **Remove Effects** - Type-safe removal with validation
- **Visual Indicators** - Icons and descriptions for each effect

### Dynamic Actions
- **Class-Specific** - Each character class has unique abilities
- **Type-Safe** - Actions are validated at compile time
- **Interactive** - Click to perform actions with visual feedback

### Live Code Generation
- **Real-Time Updates** - Code examples update based on selected character
- **Syntax Highlighting** - Proper TypeScript syntax display
- **Educational** - Shows actual implementation patterns

## 📚 Learning Objectives

This project teaches:

1. **Union Type Design** - Creating robust type systems
2. **Type Safety** - Preventing runtime errors through types
3. **Code Organization** - Structuring TypeScript projects
4. **React Integration** - Using TypeScript with React hooks
5. **Advanced Patterns** - Template literals, conditional types, mapped types

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Tech Stack

- **React 19** - UI library with latest features
- **TypeScript 5.6** - Advanced type system
- **Tailwind CSS 3.4** - Utility-first styling
- **Vite 5.4** - Fast build tool
- **Lucide React** - Beautiful icons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TypeScript team for amazing type system features
- React team for excellent developer experience
- Tailwind CSS for beautiful styling utilities
- Lucide for clean, modern icons

---

**Built with ❤️ and advanced TypeScript patterns**
