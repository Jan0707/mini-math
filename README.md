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
- **Progressive Web App** - Install on your device for native-like experience

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

## Progressive Web App (PWA)

Mini Math can be installed on your device for a native app experience:

### iOS (iPhone/iPad)
1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### Android
1. Open the app in Chrome
2. Tap the three-dot menu
3. Tap "Install app" or "Add to Home Screen"

Once installed, the app will:
- Launch without browser chrome
- Work offline with cached content
- Appear on your home screen like a native app

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run linters with auto-fix |
| `npm run type-check` | Run TypeScript type checking |
| `npm run generate-icons` | Generate PWA icons |

## Deployment

This app is configured to deploy to GitHub Pages automatically on push to the `main` branch.

### Setup GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**, set:
   - **Source**: GitHub Actions
4. Push to the `main` branch and the workflow will run automatically

The app will be available at: `https://[username].github.io/mini-math/`

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Vue Router
- Vite
- ESLint + oxlint + Prettier
