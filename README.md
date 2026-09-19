# C2 Proficiency Practice

Vite + React + Tailwind app for C2-level Use of English practice (oposición prep).
Same stack as OpoPlanner: plain React + Vite, no TypeScript, no monorepo.

## Local setup

```bash
npm install
npm run dev
```

Opens at http://localhost:5173/c2-practice/ (the `/c2-practice/` base path is set
in `vite.config.js` for GitHub Pages — see below).

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

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In `vite.config.js`, confirm `base: '/c2-practice/'` matches your repo name
   (change it if you name the repo something else).
3. `npm install -g gh-pages` is not needed — it's already a devDependency.
4. Run:
   ```bash
   npm run build
   npm run deploy
   ```
   This pushes the `dist/` folder to a `gh-pages` branch.
5. In the GitHub repo settings → Pages, set the source to the `gh-pages` branch.

## Deploying to Vercel instead

If you'd rather use Vercel (no base-path fuss):
1. Remove or set `base: '/'` in `vite.config.js`.
2. Import the repo in Vercel — it auto-detects Vite, no config needed.

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
