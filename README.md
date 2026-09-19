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

## Mobile (installable PWA)

The app is a full PWA now: on your phone, open the deployed URL and use
"Add to Home Screen" (Safari) or the install prompt (Chrome/Android) — it
then opens full-screen, with its own icon, like a native app. The app shell
is cached, so it also opens even on a poor connection.

## Cross-device sync (Supabase)

Optional, and off by default. See **SYNC-SETUP.md** for the full walkthrough
(create a free Supabase project, run one SQL snippet, add two env vars in
Vercel). Once set up, signing in with your email on the Dashboard syncs your
stats, streak and mistake queue between your phone and PC. Without it, the
app works exactly as before, just per-device.

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

## Dictionary lookup (live API)

`api/dictionary.js` is a Vercel serverless function that proxies
[api.dictionaryapi.dev](https://dictionaryapi.dev) (free, no key needed) —
this is what lets the browser get a live English definition without hitting
CORS/security restrictions. Vercel auto-detects anything in `/api` as a
function, no extra config needed.

This only works on the deployed Vercel site — `npm run dev` (plain `vite`)
doesn't run serverless functions. If you want to test it locally too, install
the Vercel CLI and run `vercel dev` instead of `npm run dev`.

It's a monolingual English dictionary (definitions in English, not Spanish
translations) — deliberately, since that's the standard way to study
vocabulary at C2 level.

## What's NOT here yet

- **TypeScript**: not used here, to match your other apps and avoid extra
  setup friction. Can be added later with `tsc --init` if you want type
  safety as the codebase grows.
- **Native mobile app**: this is a PWA (installable web app), not a
  React Native app. If you ever want a true native build (App Store /
  Play Store listing), that's a separate, bigger project — Expo would be
  the natural choice, reusing `src/data` as-is.
