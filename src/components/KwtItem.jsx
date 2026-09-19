import { useState } from 'react';
import { normalize } from '../utils/helpers';
import { useStats } from '../context/StatsContext';
import { useTimer } from '../utils/hooks';

export function KwtItem({ exercise }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const { record, addMistake } = useStats();
  const timer = useTimer();

  const isCorrect = checked && exercise.answers.includes(normalize(value));

  function check() {
    if (value.trim() === "") {
      setError("Write an answer before checking.");
      return;
    }
    setError("");
    const correct = exercise.answers.includes(normalize(value));
    if (!correct) addMistake({ key: "kwt:" + exercise.id, term: exercise.before + "___" + exercise.after, meaning: exercise.answers[0], category: "Key Word Transformation" });
    record("Key Word Transformation", correct ? 1 : 0, correct ? 0 : 1, timer.elapsed());
    setChecked(true);
  }

  function reset() {
    setValue("");
    setChecked(false);
    setError("");
    timer.reset();
  }

  return (
    <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-5 mb-4">
      <div className="flex items-center justify-end mb-3">
        <span className="text-xs font-mono text-ink/40 dark:text-paper/40">key word: {exercise.keyWord}</span>
      </div>
      <p className="mb-2 text-sm text-ink/70 dark:text-paper/70">{exercise.prompt}</p>
      <p className="font-serif text-lg mb-3">
        {exercise.before}
        <span className="border-b-2 border-dotted border-ink/30 dark:border-paper/30 px-1">
          {checked ? value : "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
        </span>
        {exercise.after}
      </p>
      {!checked && (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write only the part that fills the gap"
            className="flex-1 px-3 py-2 rounded border border-ink/20 dark:border-paper/20 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button onClick={check} className="px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
            Check
          </button>
        </div>
      )}
      {error && <p className="text-xs text-coral mt-2">{error}</p>}
      {checked && (
        <div className={"mt-2 p-3 rounded border text-sm " + (isCorrect ? "border-teal bg-teal/10 text-teal" : "border-coral bg-coral/10 text-coral")}>
          <p className="font-medium mb-1">{isCorrect ? "Correct" : "Not quite"}</p>
          {!isCorrect && <p className="mb-1">Valid answer: "{exercise.answers[0]}"</p>}
          <p className="text-ink/70 dark:text-paper/70">{exercise.explanation}</p>
          <button onClick={reset} className="mt-2 text-xs font-medium underline">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

