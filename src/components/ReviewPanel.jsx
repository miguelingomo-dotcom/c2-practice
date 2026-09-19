import { useState } from 'react';
import { useStats } from '../context/StatsContext';
import { Badge } from './common';

export function ReviewPanel() {
  const { stats, removeMistake, reorderMistake } = useStats();
  const mistakes = stats.mistakes || [];
  const [revealed, setRevealed] = useState(false);

  if (mistakes.length === 0) {
    return <p className="text-sm text-ink/60 dark:text-paper/60">No mistakes waiting to be reviewed. As soon as you get something wrong in Word Formation, Key Word Transformation or the Game, it will show up here automatically.</p>;
  }

  const current = mistakes[0];

  function known() {
    removeMistake(current.key);
    setRevealed(false);
  }
  function skip() {
    reorderMistake(current.key);
    setRevealed(false);
  }

  return (
    <div className="max-w-md">
      <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">{mistakes.length} item{mistakes.length === 1 ? "" : "s"} waiting to be reviewed.</p>
      <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-5 mb-4">
        <Badge tone="coral">{current.category}</Badge>
        <p className="font-serif text-xl mt-3">{current.term}</p>
        {revealed && <p className="text-teal text-sm mt-3 font-medium">{current.meaning}</p>}
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
          Reveal answer
        </button>
      ) : (
        <div className="flex gap-3">
          <button onClick={known} className="px-4 py-2 rounded bg-teal text-paper text-sm font-medium">
            I know this — remove
          </button>
          <button onClick={skip} className="px-4 py-2 rounded border border-ink/20 dark:border-paper/20 text-sm font-medium">
            Not yet — skip
          </button>
        </div>
      )}
    </div>
  );
}

