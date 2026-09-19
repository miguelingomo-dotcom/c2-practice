import { useState } from 'react';
import { McClozePractice } from './McClozePractice';
import { OpenClozePractice } from './OpenClozePractice';
import { WordFormationPractice } from './WordFormationPractice';
import { PrecisionPractice } from './PrecisionPractice';
import { KwtPractice } from './KwtPractice';

export function Practice() {
  const [sub, setSub] = useState("mcq");
  const subs = [
    { id: "mcq", label: "MC Cloze" },
    { id: "open", label: "Open Cloze" },
    { id: "wordform", label: "Word Formation" },
    { id: "kwt", label: "Key Word Transf." },
    { id: "precision", label: "Precision" }
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {subs.map((s) => (
          <button
            key={s.id}
            onClick={() => setSub(s.id)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium border " +
              (sub === s.id ? "border-gold bg-gold/10 text-gold" : "border-ink/15 dark:border-paper/15 text-ink/60 dark:text-paper/60")
            }
          >
            {s.label}
          </button>
        ))}
      </div>
      {sub === "mcq" && <McClozePractice key="mcq" />}
      {sub === "open" && <OpenClozePractice key="open" />}
      {sub === "wordform" && <WordFormationPractice key="wordform" />}
      {sub === "precision" && <PrecisionPractice key="precision" />}
      {sub === "kwt" && <KwtPractice key="kwt" />}
    </div>
  );
}

