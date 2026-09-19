import { useState } from 'react';
import { shuffle } from '../utils/helpers';
import { useStats } from '../context/StatsContext';
import { useTimer } from '../utils/hooks';
import { Badge } from './common';

export function PoolGame({ pool, tagLabel, tone }) {
  const ROUNDS = 8;
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [order, setOrder] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const { record, addMistake } = useStats();
  const timer = useTimer();

  function start() {
    const picked = shuffle(pool).slice(0, ROUNDS);
    setOrder(picked);
    setRound(0);
    setScore(0);
    setStarted(true);
    loadOptions(picked, 0);
    timer.reset();
  }

  function loadOptions(picked, idx) {
    const current = picked[idx];
    const distractors = shuffle(pool.filter((p) => p.term !== current.term)).slice(0, 3).map((p) => p.meaning);
    setOptions(shuffle([current.meaning, ...distractors]));
    setSelected(null);
    timer.reset();
  }

  function choose(opt) {
    if (selected !== null) return;
    setSelected(opt);
    const correct = opt === order[round].meaning;
    if (correct) setScore((s) => s + 1);
    else addMistake({ key: tagLabel + ":" + order[round].term, term: order[round].term, meaning: order[round].meaning, category: tagLabel });
    record(tagLabel + " (game)", correct ? 1 : 0, correct ? 0 : 1, timer.elapsed());
  }

  function next() {
    const nextRound = round + 1;
    setRound(nextRound);
    if (nextRound < ROUNDS) loadOptions(order, nextRound);
  }

  if (!started) {
    return (
      <div>
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-6 max-w-prose">
          {ROUNDS} rounds of {tagLabel.toLowerCase()}. Each round gives you 4 possible meanings — pick the right one.
        </p>
        <button onClick={start} className="px-4 py-2 rounded text-paper text-sm font-medium" style={{ backgroundColor: tone === "gold" ? "#C98A2C" : "#0F6E56" }}>
          Start game
        </button>
      </div>
    );
  }

  if (round >= ROUNDS) {
    return (
      <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-6 max-w-md">
        <p className="font-serif text-2xl mb-2">{score} / {ROUNDS}</p>
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-4">
          {score === ROUNDS ? "Perfect round." : score >= ROUNDS * 0.7 ? "Solid result." : "Play again to consolidate these items."}
        </p>
        <button onClick={start} className="px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
          Play another round
        </button>
      </div>
    );
  }

  const current = order[round];
  return (
    <div className="max-w-md">
      <div className="flex items-center justify-between mb-3 text-xs text-ink/50 dark:text-paper/50">
        <span>Round {round + 1} / {ROUNDS}</span>
        <span>Correct: {score}</span>
      </div>
      <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-5 mb-4">
        <Badge tone={tone}>{tagLabel}</Badge>
        <p className="font-serif text-2xl mt-3">{current.term}</p>
      </div>
      <div className="space-y-2">
        {options.map((opt, i) => {
          const isCorrect = opt === current.meaning;
          const isSelected = selected === opt;
          let cls = "block w-full text-left px-3 py-2 rounded border text-sm transition-colors ";
          if (selected === null) cls += "border-ink/15 dark:border-paper/15 hover:border-gold";
          else if (isCorrect) cls += "border-teal bg-teal/10 text-teal";
          else if (isSelected) cls += "border-coral bg-coral/10 text-coral";
          else cls += "border-ink/10 dark:border-paper/10 text-ink/40 dark:text-paper/40";
          return (
            <button key={i} disabled={selected !== null} onClick={() => choose(opt)} className={cls}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <button onClick={next} className="mt-4 px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
          {round + 1 >= ROUNDS ? "See result" : "Next"}
        </button>
      )}
    </div>
  );
}

