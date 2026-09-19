import { useState } from 'react';
import { PRECISION_BANK } from '../data/precisionBank';
import { useShuffleBag } from '../utils/hooks';
import { BackButton, ExerciseListRow, Badge } from './common';

export function PrecisionPractice() {
  const nextIdx = useShuffleBag(PRECISION_BANK.length);
  const [index, setIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);

  function open(i) {
    setIndex(i);
    setRevealed(false);
  }

  if (index === null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-ink/60 dark:text-paper/60">Spelling, punctuation and grammar precision drills — {PRECISION_BANK.length} exercises.</p>
          <button onClick={() => open(nextIdx())} className="px-3 py-1 rounded text-xs border border-teal/40 text-teal">
            🎲 Random
          </button>
        </div>
        {PRECISION_BANK.map((p, i) => (
          <ExerciseListRow key={i} index={i} title={p.title} tag={p.type} onClick={() => open(i)} />
        ))}
      </div>
    );
  }

  const item = PRECISION_BANK[index];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <BackButton onClick={() => setIndex(null)} />
        <button onClick={() => open(nextIdx())} className="mb-4 px-3 py-1 rounded text-xs border border-teal/40 text-teal">
          🎲 Next random
        </button>
      </div>
      <Badge tone="coral">{item.type}</Badge>
      <p className="font-serif text-lg mt-3 mb-4">{item.title}</p>
      <p className="text-sm leading-relaxed mb-4 text-ink/80 dark:text-paper/80">{item.text}</p>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
          Reveal correction
        </button>
      ) : (
        <div className="p-3 rounded border border-teal bg-teal/10 text-sm text-teal">{item.reveal}</div>
      )}
    </div>
  );
}

