import { useState } from 'react';
import { MC_CLOZE_BANK } from '../data/mcClozeBank';
import { useShuffleBag } from '../utils/hooks';
import { useStats } from '../context/StatsContext';
import { useTimer } from '../utils/hooks';
import { BackButton, ExerciseListRow } from './common';

export function McClozePractice() {
  const nextIdx = useShuffleBag(MC_CLOZE_BANK.length);
  const [exIndex, setExIndex] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const { record } = useStats();
  const timer = useTimer();

  if (exIndex === null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-ink/60 dark:text-paper/60">{MC_CLOZE_BANK.length} exercises — pick one, or try a random one.</p>
          <button onClick={() => open(nextIdx())} className="px-3 py-1 rounded text-xs border border-teal/40 text-teal">
            🎲 Random
          </button>
        </div>
        {MC_CLOZE_BANK.map((ex, i) => (
          <ExerciseListRow key={i} index={i} title={ex.title} onClick={() => open(i)} />
        ))}
      </div>
    );
  }

  const data = MC_CLOZE_BANK[exIndex];

  function open(i) {
    setExIndex(i);
    setAnswers({});
    setChecked(false);
    timer.reset();
  }
  function select(idx, opt) {
    if (checked) return;
    setAnswers((a) => ({ ...a, [idx]: opt }));
  }
  function retry() {
    setAnswers({});
    setChecked(false);
    timer.reset();
  }
  function check() {
    const s = data.items.filter((it, i) => answers[i] === it.answer).length;
    record("Multiple Choice Cloze", s, data.items.length - s, timer.elapsed());
    setChecked(true);
  }
  const allAnswered = data.items.every((_, i) => answers[i] !== undefined);
  const score = data.items.filter((it, i) => answers[i] === it.answer).length;

  return (
    <div>
      <BackButton onClick={() => setExIndex(null)} />
      <p className="font-serif text-xl mb-3">{data.title}</p>
      <p className="text-sm leading-relaxed mb-6 text-ink/80 dark:text-paper/80">{data.text}</p>
      <div className="space-y-4">
        {data.items.map((it, i) => (
          <div key={i}>
            <p className="text-xs text-ink/50 dark:text-paper/50 mb-2">Gap ({i + 1})</p>
            <div className="flex flex-wrap gap-2">
              {it.options.map((opt) => {
                const isSelected = answers[i] === opt;
                const isCorrect = opt === it.answer;
                let cls = "px-3 py-1.5 rounded border text-sm ";
                if (!checked) cls += isSelected ? "border-gold bg-gold/10" : "border-ink/15 dark:border-paper/15 hover:border-gold";
                else if (isCorrect) cls += "border-teal bg-teal/10 text-teal";
                else if (isSelected) cls += "border-coral bg-coral/10 text-coral";
                else cls += "border-ink/10 dark:border-paper/10 text-ink/40 dark:text-paper/40";
                return (
                  <button key={opt} onClick={() => select(i, opt)} className={cls}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && it.note && <p className="text-xs text-ink/50 dark:text-paper/50 mt-1.5">{it.note}</p>}
          </div>
        ))}
      </div>
      {!checked ? (
        <button
          onClick={check}
          disabled={!allAnswered}
          className="mt-6 px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium disabled:opacity-40"
        >
          Check
        </button>
      ) : (
        <div className="mt-6 flex items-center gap-3">
          <p className="text-sm font-medium">{score} / {data.items.length}</p>
          <button onClick={retry} className="text-sm font-medium text-ink/60 dark:text-paper/60 hover:underline">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

