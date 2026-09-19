# Setting up cross-device sync (Supabase)

Without this, the app still works fully — progress just stays in each
device's own browser storage. This is what makes it follow you between
your phone and your PC instead.

## 1. Create a free Supabase project

1. Go to https://supabase.com and sign up (free tier is enough for this).
2. "New project" → give it any name (e.g. `c2-practice`) → pick a region
   close to you → set a database password (you won't need it day to day,
   just save it somewhere).
3. Wait ~2 minutes for it to provision.

## 2. Create the table

In the Supabase dashboard, go to **SQL Editor → New query**, paste this, and
run it:

```sql
create table user_progress (
  user_id uuid references auth.users not null primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table user_progress enable row level security;

create policy "Users can view own progress"
  on user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on user_progress for update
  using (auth.uid() = user_id);
```

This creates one row per user, storing your entire stats/streak/mistakes
object as JSON, and locks it down so you can only ever read or write your
own row (Row Level Security).

## 3. Turn on email sign-in

Supabase → **Authentication → Providers**: "Email" is on by default, that's
all you need — no password, the app uses a magic-link (click the link in
your email to sign in).

Also go to **Authentication → URL Configuration** and add your Vercel URL
(e.g. `https://c2-practice-six.vercel.app`) to "Redirect URLs", so the
magic-link email sends you back to the right place.

## 4. Get your API keys

Supabase → **Settings → API**. You need two values:
- `Project URL`
- `anon` `public` key (NOT the `service_role` key — that one must never go
  into frontend code)

## 5. Add them to Vercel

Vercel → your project → **Settings → Environment Variables**, add:
- `VITE_SUPABASE_URL` = your Project URL
- `VITE_SUPABASE_ANON_KEY` = your anon public key

Redeploy (Vercel → Deployments → click the three dots on the latest one →
Redeploy) so the new env vars take effect.

## 6. Try it

1. Open the deployed app, go to **Dashboard**, enter your email in the new
   sync box, click "Send sign-in link".
2. Check your inbox, click the link — it'll open the app and sign you in.
3. Do a couple of exercises so there's something to sync.
4. Open the app on your other device (or just another browser), sign in
   with the same email — your progress should appear within a couple of
   seconds.

## How it works, briefly

- Every device keeps a full local copy in `localStorage` (so the app still
  works instantly and offline).
- Once you're signed in, any change (finishing an exercise, a new mistake,
  etc.) is pushed to Supabase about 1.2 seconds after it happens.
- When you open the app on a *different* device and sign in, it pulls your
  latest saved progress from Supabase and uses that from then on.
- This is "last write wins" — it's not built for using two devices
  *at the same time*, only for switching between them, which is how you
  actually use it.

## Local development with sync

`npm run dev` works fine without any of this — sync just stays off. If you
want to test sync locally too, copy `.env.example` to `.env` and fill in
the same two values; Vite picks up `.env` automatically.
