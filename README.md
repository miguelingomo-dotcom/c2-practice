# C2 Proficiency Practice

Vite + React + Tailwind app for C2-level Use of English practice (oposición prep).
Same stack as OpoPlanner: plain React + Vite, no TypeScript, no monorepo.

## Local setup

```bash
npm install
npm run dev
```

Opens at http://localhost:5173/ (base is set to `/` in `vite.config.js`,
correct for Vercel — see below if you switch to GitHub Pages).

## Project structure

```
src/
  data/            All content banks (phrasal verbs, idioms, vocabulary,
                    MC Cloze, Open Cloze, Key Word Transformation, Precision,
                    word families + templates, AI-generator mocks)
  utils/           Pure helpers (normalize, shuffle, streak calc...) + hooks
                    (useTimer, useShuffleBag)
  context/         StatsContext — correct/incorrect counts, time, mistakes
                    queue, daily streak, persisted to localStorage
  components/      One file per screen/component
  App.jsx          Tab navigation
  main.jsx         Entry point, wraps App in StatsProvider
```

Adding more exercises later is just adding objects to the arrays in `src/data/`
— no component code needs to change.

## Deploying to Vercel (current setup)

`base: '/'` in `vite.config.js` is already correct for Vercel — just import
the repo at vercel.com, it auto-detects Vite, no config needed. Every push to
the connected branch redeploys automatically.

## Deploying to GitHub Pages instead

If you switch to GitHub Pages later:
1. In `vite.config.js`, change `base: '/'` to `base: '/c2-practice/'` (or
   whatever your repo is named).
2. Run:
   ```bash
   npm run build
   npm run deploy
   ```
   This pushes the `dist/` folder to a `gh-pages` branch.
3. In the GitHub repo settings → Pages, set the source to the `gh-pages` branch.

## What's NOT here yet (Phase 2 remaining work)

- **Dictionary API**: the in-app Dictionary tab searches only the bundled
  banks. Wiring WordReference (or similar) requires a small serverless
  function (e.g. `api/dictionary.js` on Vercel) to proxy the request, since
  the browser can't call external APIs directly for security reasons.
- **Cross-device sync**: stats/streak/mistakes are in `localStorage`, so they
  don't follow you between your phone and PC yet. That needs a real database
  (Supabase was the earlier recommendation) plus an auth step.
- **TypeScript**: not used here, to match your other apps and avoid extra
  setup friction. Can be added later with `tsc --init` if you want type
  safety as the codebase grows.
