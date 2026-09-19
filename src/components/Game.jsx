import { useState, useMemo } from 'react';
import { VOCABULARY } from '../data/vocabulary';
import { PHRASAL_VERBS } from '../data/phrasalVerbs';
import { PoolGame } from './PoolGame';

export function Game() {
  const [sub, setSub] = useState("vocab");
  const vocabPool = useMemo(() => VOCABULARY.map((v) => ({ term: v.word, meaning: v.meaning })), []);
  const pvPool = useMemo(() => PHRASAL_VERBS.map((p) => ({ term: p.phrase, meaning: p.meaning })), []);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSub("vocab")}
          className={"px-3 py-1.5 rounded-full text-xs font-medium border " + (sub === "vocab" ? "border-gold bg-gold/10 text-gold" : "border-ink/15 dark:border-paper/15 text-ink/60 dark:text-paper/60")}
        >
          Vocabulary
        </button>
        <button
          onClick={() => setSub("pv")}
          className={"px-3 py-1.5 rounded-full text-xs font-medium border " + (sub === "pv" ? "border-teal bg-teal/10 text-teal" : "border-ink/15 dark:border-paper/15 text-ink/60 dark:text-paper/60")}
        >
          Phrasal Verbs
        </button>
      </div>
      {sub === "vocab" ? (
        <PoolGame key="vocab" pool={vocabPool} tagLabel="Vocabulary" tone="gold" />
      ) : (
        <PoolGame key="pv" pool={pvPool} tagLabel="Phrasal verb" tone="teal" />
      )}
    </div>
  );
}

