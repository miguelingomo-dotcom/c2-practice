import { useState } from 'react';

export function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 text-sm font-medium border-b-2 transition-colors " +
        (active
          ? "border-gold text-ink dark:text-paper"
          : "border-transparent text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper")
      }
    >
      {children}
    </button>
  );
}


export function Badge({ children, tone }) {
  const tones = {
    gold: "bg-gold/10 text-gold border-gold/30",
    teal: "bg-teal/10 text-teal border-teal/30",
    coral: "bg-coral/10 text-coral border-coral/30"
  };
  return (
    <span className={"inline-block text-xs font-medium px-2 py-0.5 rounded border " + (tones[tone] || tones.gold)}>
      {children}
    </span>
  );
}


export function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="mb-4 text-sm font-medium text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper">
      ← Back to list
    </button>
  );
}


export function ExerciseListRow({ index, title, tag, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between text-left px-4 py-3 rounded-lg border border-ink/10 dark:border-paper/10 hover:border-gold transition-colors mb-2"
    >
      <span className="text-sm">
        <span className="text-ink/40 dark:text-paper/40 font-mono text-xs mr-2">{String(index + 1).padStart(2, "0")}</span>
        {title}
      </span>
      {tag && <Badge tone="gold">{tag}</Badge>}
    </button>
  );
}


export function WordCard({ eyebrow, tone, term, meaning, quizNode }) {
  return (
    <div className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <Badge tone={tone}>{eyebrow}</Badge>
      </div>
      <p className="font-serif text-2xl mb-2">{term}</p>
      <p className="text-sm text-ink/70 dark:text-paper/70">{meaning}</p>
      {quizNode}
    </div>
  );
}


export function MiniQuiz({ item, pool, labelKey, meaningKey }) {
  const [options, setOptions] = useState(null);
  const [selected, setSelected] = useState(null);

  function start() {
    const distractors = pool
      .filter((p) => p[labelKey] !== item[labelKey])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p[meaningKey]);
    const opts = [item[meaningKey], ...distractors].sort(() => Math.random() - 0.5);
    setOptions(opts);
    setSelected(null);
  }

  if (!options) {
    return (
      <button onClick={start} className="mt-3 text-sm font-medium text-teal hover:underline">
        Take a mini-quiz
      </button>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      <p className="text-sm text-ink/70 dark:text-paper/70">What does <span className="font-serif italic">"{item[labelKey]}"</span> mean?</p>
      {options.map((opt, i) => {
        const isCorrect = opt === item[meaningKey];
        const isSelected = selected === opt;
        let cls = "block w-full text-left px-3 py-2 rounded border text-sm transition-colors ";
        if (selected === null) {
          cls += "border-ink/15 dark:border-paper/15 hover:border-gold";
        } else if (isCorrect) {
          cls += "border-teal bg-teal/10 text-teal";
        } else if (isSelected) {
          cls += "border-coral bg-coral/10 text-coral";
        } else {
          cls += "border-ink/10 dark:border-paper/10 text-ink/40 dark:text-paper/40";
        }
        return (
          <button key={i} disabled={selected !== null} onClick={() => setSelected(opt)} className={cls}>
            {opt}
          </button>
        );
      })}
      {selected !== null && (
        <button onClick={start} className="text-xs font-medium text-ink/50 dark:text-paper/50 hover:underline">
          Another word →
        </button>
      )}
    </div>
  );
}

