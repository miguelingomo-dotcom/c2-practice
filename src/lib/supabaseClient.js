import { createClient } from '@supabase/supabase-js';

// These come from Vercel env vars (or a local .env file) — see SYNC-SETUP.md.
// If they're not set, `supabase` stays null and the app just runs on
// localStorage only, with no sync and no crash.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const syncEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = syncEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
