# Fun

A production-ready, frontend-only level game built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, React Context, and browser `localStorage`.

Players receive a link, start the quest, enter their name, complete five dynamic levels from `src/data/levels.ts`, earn 100 points for each correct answer, resume progress after refresh, view results, and unlock a personalized surprise page at 300+ points.

## Features

- Modern glassmorphism UI with animated gradient background
- Dynamic level route: `/level/[id]`
- Five question types: multiple choice, text input, image choice, memory, and riddle
- React Context game state with localStorage persistence
- Route guards to prevent level skipping and invalid access
- Result page with score, percentage, stars, pass/try-again state
- Surprise page with editable letter, embedded video, audio player, confetti, hearts, and fireworks
- No authentication, database, or backend required

## Project structure

```txt
src/app          App Router pages and layouts
src/components   Reusable UI and game components
src/context      React Context game provider
src/data         Editable levels and surprise content
src/hooks        Route guard hooks
src/lib          Game engine and storage helpers
src/styles       Global Tailwind styles
src/types        Shared TypeScript types
public           Static assets
```

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Keep the default Next.js build settings.
4. Deploy. No environment variables are required.

## Editing content

- Update levels in `src/data/levels.ts`.
- Update surprise page copy/media in `src/data/surprise.ts`.

## Dependency installation troubleshooting

If `npm install` returns `403 Forbidden` in a restricted corporate/container environment, confirm that npm is allowed to reach the public registry and that proxy variables are valid:

```bash
npm config get registry
npm config delete proxy
npm config delete https-proxy
npm install
```

This project pins package versions and uses the standard npm registry in `.npmrc` so it can install normally on a developer machine, CI runner, or Vercel project with internet access.
