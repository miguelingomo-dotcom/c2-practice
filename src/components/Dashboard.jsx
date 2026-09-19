import { useState } from 'react';
import { PHRASAL_VERBS } from '../data/phrasalVerbs';
import { IDIOMS } from '../data/idioms';
import { VOCABULARY } from '../data/vocabulary';
import { useStats } from '../context/StatsContext';
import { todayStr } from '../utils/helpers';
import { WordCard, MiniQuiz } from './common';
import { SyncPanel } from './SyncPanel';

export function Dashboard() {
  const [pvIndex, setPvIndex] = useState(() => Math.floor(Math.random() * PHRASAL_VERBS.length));
  const [idIndex, setIdIndex] = useState(() => Math.floor(Math.random() * IDIOMS.length));
  const pv = PHRASAL_VERBS[pvIndex];
  const idiom = IDIOMS[idIndex];
  const { streak, stats } = useStats();
  const practisedToday = (stats.activeDays || []).includes(todayStr());

  return (
    <div>
      <SyncPanel />
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gold text-center">
          <span className="font-serif text-2xl text-gold">{streak}</span>
        </span>
        <div>
          <p className="text-sm font-medium">{streak === 1 ? "1 day streak" : streak + "-day streak"}</p>
          <p className="text-xs text-ink/50 dark:text-paper/50">
            {practisedToday ? "You've practised today — keep it up." : "Complete one exercise today to keep your streak alive."}
          </p>
        </div>
      </div>
      <p className="text-sm text-ink/60 dark:text-paper/60 mb-6 max-w-prose">
        Full banks loaded: {PHRASAL_VERBS.length} phrasal verbs, {IDIOMS.length} idioms, {VOCABULARY.length} vocabulary items. Vocabulary is sourced both from dedicated C2 lists and from terms that appear in the app's own Multiple Choice Cloze and Open Cloze texts — new entries note which text they come from.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <WordCard
            eyebrow="Phrasal verb of the day"
            tone="teal"
            term={pv.phrase}
            meaning={pv.meaning}
            quizNode={<MiniQuiz item={pv} pool={PHRASAL_VERBS} labelKey="phrase" meaningKey="meaning" />}
          />
          <button
            onClick={() => setPvIndex(Math.floor(Math.random() * PHRASAL_VERBS.length))}
            className="mt-2 text-xs font-medium text-ink/50 dark:text-paper/50 hover:underline"
          >
            Shuffle
          </button>
        </div>
        <div>
          <WordCard
            eyebrow="Idiom of the day"
            tone="gold"
            term={idiom.expression}
            meaning={idiom.meaning}
            quizNode={<MiniQuiz item={idiom} pool={IDIOMS} labelKey="expression" meaningKey="meaning" />}
          />
          <button
            onClick={() => setIdIndex(Math.floor(Math.random() * IDIOMS.length))}
            className="mt-2 text-xs font-medium text-ink/50 dark:text-paper/50 hover:underline"
          >
            Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}

