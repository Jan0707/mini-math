# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 application built with TypeScript and Vite. It uses Vue Router for routing and includes Vue DevTools integration for development.

## Common Commands

### Development
```sh
npm run dev
```
Start the development server with hot reload.

### Build
```sh
npm run build
```
Type-check, compile and minify for production. This runs both `type-check` and `build-only` in parallel.

```sh
npm run build-only
```
Build without type-checking (faster for quick builds).

### Type Checking
```sh
npm run type-check
```
Run TypeScript type checking using `vue-tsc`.

### Linting
```sh
npm run lint
```
Run all linters (oxlint and eslint) with auto-fix. This executes:
- `npm run lint:oxlint` - Fast Rust-based linter
- `npm run lint:eslint` - ESLint with TypeScript and Vue support

### Formatting
```sh
npm run format
```
Format source files using Prettier.

### Preview
```sh
npm run preview
```
Preview the production build locally.

## Architecture

### Entry Point
- `src/main.ts` - Application entry point that creates the Vue app, installs the router plugin, and mounts to `#app`

### Routing
- `src/router/index.ts` - Vue Router configuration using `createWebHistory`
- Routes use a mix of eager loading (HomeView) and lazy loading (AboutView via dynamic import)

### Component Structure
- `src/App.vue` - Root component with header navigation and `<RouterView>`
- `src/views/` - Route-level components (page components)
- `src/components/` - Reusable components
- `src/components/icons/` - SVG icon components

### Styling
- `src/assets/main.css` - Main CSS entry point
- `src/assets/base.css` - Base styles and CSS variables
- Components use scoped styles with `<style scoped>`
- CSS custom properties (e.g., `--color-text`, `--color-border`) are defined in base.css

### Path Aliases
The `@` alias is configured to point to the `src/` directory:
```typescript
import Component from '@/components/Component.vue'
```

## Tooling

### Linters
- **oxlint**: Fast Rust-based linter (runs first)
- **ESLint**: Configured with Vue, TypeScript, and Prettier compatibility
- ESLint uses flat config format (`eslint.config.ts`)

### TypeScript
- Uses project references with separate configs:
  - `tsconfig.app.json` - Application code
  - `tsconfig.node.json` - Build tooling (Vite config)
- Type checking is done via `vue-tsc` (not `tsc`) to handle `.vue` files

### Node Version
Requires Node.js `^20.19.0` or `>=22.12.0`
