# Mini Math

A fun math learning game for first-graders built with Vue 3 and TypeScript.

## Features

- **Addition & Subtraction** - Practice plus, minus, or both operations
- **Two Difficulty Levels** - Numbers 0-10 or 0-20
- **Flexible Sessions** - Choose 5, 10, or 20 questions per game
- **Instant Feedback** - See correct answers when you make mistakes
- **Progress Tracking** - Session history saved locally
- **Kid-Friendly Design** - Large touch targets, simple interface
- **Dark Mode** - Automatic support based on system preference

## Game Flow

```
Splash → Settings → Play → Results
                            ↓
                      Play Again
```

## Getting Started

```sh
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linters with auto-fix |
| `npm run type-check` | Run TypeScript type checking |

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Vue Router
- Vite
- ESLint + oxlint + Prettier
