import { useState } from 'react';
import { OPEN_CLOZE_BANK } from '../data/openClozeBank';
import { useShuffleBag, useTimer } from '../utils/hooks';
import { useStats } from '../context/StatsContext';
import { answerMatches } from '../utils/helpers';
import { BackButton, ExerciseListRow } from './common';

export function OpenClozePractice() {
  const nextIdx = useShuffleBag(OPEN_CLOZE_BANK.length);
  const [exIndex, setExIndex] = useState(null);
  const [values, setValues] = useState([]);
  const [checked, setChecked] = useState(false);
  const { record } = useStats();
  const timer = useTimer();

  if (exIndex === null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-ink/60 dark:text-paper/60">{OPEN_CLOZE_BANK.length} exercises — pick one, or try a random one.</p>
          <button onClick={() => open(nextIdx())} className="px-3 py-1 rounded text-xs border border-teal/40 text-teal">
            🎲 Random
          </button>
        </div>
        {OPEN_CLOZE_BANK.map((ex, i) => (
          <ExerciseListRow key={i} index={i} title={ex.title} onClick={() => open(i)} />
        ))}
      </div>
    );
  }

  const data = OPEN_CLOZE_BANK[exIndex];

  function open(i) {
    setExIndex(i);
    setValues(Array(OPEN_CLOZE_BANK[i].answers.length).fill(""));
    setChecked(false);
    timer.reset();
  }
  function setVal(i, v) {
    const next = [...values];
    next[i] = v;
    setValues(next);
  }
  function retry() {
    setValues(Array(data.answers.length).fill(""));
    setChecked(false);
    timer.reset();
  }
  function check() {
    const s = data.answers.filter((a, i) => answerMatches(values[i], a)).length;
    record("Open Cloze", s, data.answers.length - s, timer.elapsed());
    setChecked(true);
  }
  const score = data.answers.filter((a, i) => answerMatches(values[i], a)).length;

  return (
    <div>
      <BackButton onClick={() => setExIndex(null)} />
      <p className="font-serif text-xl mb-3">{data.title}</p>
      <p className="text-sm leading-relaxed mb-6 text-ink/80 dark:text-paper/80">{data.text}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {data.answers.map((a, i) => {
          const isCorrect = checked && answerMatches(values[i], a);
          const isWrong = checked && values[i] !== "" && !isCorrect;
          return (
            <div key={i}>
              <label className="text-xs text-ink/50 dark:text-paper/50">({i + 1})</label>
              <input
                value={values[i]}
                onChange={(e) => setVal(i, e.target.value)}
                disabled={checked}
                className={
                  "w-full mt-1 px-2 py-1.5 rounded border text-sm bg-transparent focus:outline-none " +
                  (checked ? (isCorrect ? "border-teal text-teal" : "border-coral text-coral") : "border-ink/20 dark:border-paper/20 focus:ring-2 focus:ring-gold")
                }
              />
              {isWrong && <p className="text-xs text-ink/40 dark:text-paper/40 mt-1">{Array.isArray(a) ? a.join(" / ") : a}</p>}
            </div>
          );
        })}
      </div>
      {!checked ? (
        <button onClick={check} className="mt-6 px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
          Check
        </button>
      ) : (
        <div className="mt-6 flex items-center gap-3">
          <p className="text-sm font-medium">{score} / {data.answers.length}</p>
          <button onClick={retry} className="text-sm font-medium text-ink/60 dark:text-paper/60 hover:underline">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

