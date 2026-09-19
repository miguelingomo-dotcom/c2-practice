import { useState } from 'react';
import { KWT_EXERCISES } from '../data/kwtExercises';
import { useShuffleBag } from '../utils/hooks';
import { KwtItem } from './KwtItem';
import { BackButton, ExerciseListRow } from './common';

export function KwtPractice() {
  const nextIdx = useShuffleBag(KWT_EXERCISES.length);
  const [index, setIndex] = useState(null);

  if (index === null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-ink/60 dark:text-paper/60">{KWT_EXERCISES.length} exercises. Each accepts several valid phrasings.</p>
          <button onClick={() => setIndex(nextIdx())} className="px-3 py-1 rounded text-xs border border-teal/40 text-teal">
            🎲 Random
          </button>
        </div>
        {KWT_EXERCISES.map((ex, i) => (
          <ExerciseListRow key={i} index={i} title={ex.prompt} onClick={() => setIndex(i)} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <BackButton onClick={() => setIndex(null)} />
        <button onClick={() => setIndex(nextIdx())} className="mb-4 px-3 py-1 rounded text-xs border border-teal/40 text-teal">
          🎲 Next random
        </button>
      </div>
      <KwtItem key={index} exercise={KWT_EXERCISES[index]} />
    </div>
  );
}

