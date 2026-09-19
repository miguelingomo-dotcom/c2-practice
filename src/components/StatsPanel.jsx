import { useStats } from '../context/StatsContext';
import { fmtTime } from '../utils/helpers';

export function StatsPanel() {
  const { stats, reset } = useStats();
  const total = stats.correct + stats.incorrect;
  const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
  const types = Object.keys(stats.byType);

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
        <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-4 text-center">
          <p className="font-serif text-2xl text-teal">{stats.correct}</p>
          <p className="text-xs text-ink/50 dark:text-paper/50">correct</p>
        </div>
        <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-4 text-center">
          <p className="font-serif text-2xl text-coral">{stats.incorrect}</p>
          <p className="text-xs text-ink/50 dark:text-paper/50">incorrect</p>
        </div>
        <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-4 text-center">
          <p className="font-serif text-2xl text-gold">{accuracy}%</p>
          <p className="text-xs text-ink/50 dark:text-paper/50">accuracy</p>
        </div>
      </div>
      <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">Total time practised: {fmtTime(stats.timeMs)}</p>

      {types.length > 0 ? (
        <div className="space-y-2 max-w-lg">
          {types.map((t) => {
            const d = stats.byType[t];
            const tTotal = d.correct + d.incorrect;
            const tAcc = tTotal > 0 ? Math.round((d.correct / tTotal) * 100) : 0;
            return (
              <div key={t} className="flex items-center justify-between border-b border-ink/10 dark:border-paper/10 pb-2">
                <span className="text-sm">{t}</span>
                <span className="text-xs text-ink/50 dark:text-paper/50">
                  {d.correct}/{tTotal} · {tAcc}% · {fmtTime(d.timeMs)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-ink/50 dark:text-paper/50">You haven't completed any exercises yet.</p>
      )}

      {total > 0 && (
        <button onClick={reset} className="mt-6 text-sm font-medium text-ink/50 dark:text-paper/50 hover:underline">
          Reset statistics
        </button>
      )}
    </div>
  );
}

