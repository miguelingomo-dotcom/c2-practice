import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStats } from '../context/StatsContext';

export function SyncPanel() {
  const { user, loading, signInWithEmail, signOut, syncEnabled } = useAuth();
  const { syncStatus } = useStats();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  if (!syncEnabled) return null; // no Supabase env vars configured — stay silent, app still works locally
  if (loading) return null;

  async function submit(e) {
    e.preventDefault();
    setError(null);
    const { error } = await signInWithEmail(email);
    if (error) setError(error);
    else setSent(true);
  }

  if (user) {
    return (
      <div className="mb-6 flex items-center justify-between bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg px-4 py-2.5 max-w-lg">
        <p className="text-xs text-ink/60 dark:text-paper/60">
          Synced as <span className="font-medium">{user.email}</span>
          {syncStatus === "pulling" && " — pulling progress…"}
          {syncStatus === "error" && " — sync error, retrying"}
        </p>
        <button onClick={signOut} className="text-xs font-medium text-ink/50 dark:text-paper/50 hover:underline">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg px-4 py-3 max-w-lg">
      {sent ? (
        <p className="text-sm text-teal">Check your inbox — click the link to sign in and sync this device.</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email — sync progress across devices"
            className="flex-1 px-3 py-1.5 rounded border border-ink/20 dark:border-paper/20 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button type="submit" className="px-4 py-1.5 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium whitespace-nowrap">
            Send sign-in link
          </button>
        </form>
      )}
      {error && <p className="text-xs text-coral mt-2">{error}</p>}
    </div>
  );
}
