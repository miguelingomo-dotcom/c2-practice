import { useState } from 'react';
import { MOCK_AI_MCQ, MOCK_AI_OPEN, MOCK_AI_KWT, SYSTEM_PROMPT, KIND_LABELS } from '../data/aiMocks';
import { generateWordFormation } from '../data/wordFamilies';
import { normalize, answerMatches } from '../utils/helpers';
import { useStats } from '../context/StatsContext';
import { useTimer } from '../utils/hooks';
import { Badge } from './common';

export function AIGenerator() {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const { record } = useStats();
  const timer = useTimer();

  function generate() {
    setLoading(true);
    setItem(null);
    setValue("");
    setSelected(null);
    setChecked(false);
    timer.reset();
    setTimeout(() => {
      const kinds = ["mcq", "open", "wordform", "kwt"];
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      let data;
      if (kind === "mcq") data = MOCK_AI_MCQ[Math.floor(Math.random() * MOCK_AI_MCQ.length)];
      else if (kind === "open") data = MOCK_AI_OPEN[Math.floor(Math.random() * MOCK_AI_OPEN.length)];
      else if (kind === "kwt") data = MOCK_AI_KWT[Math.floor(Math.random() * MOCK_AI_KWT.length)];
      else data = generateWordFormation();
      setItem({ kind, data });
      setLoading(false);
      timer.reset();
    }, 1200);
  }

  function check() {
    let correct = false;
    if (item.kind === "mcq") correct = selected === item.data.answer;
    else if (item.kind === "open" || item.kind === "wordform") correct = normalize(value) === normalize(item.data.answer);
    else if (item.kind === "kwt") correct = answerMatches(value, item.data.answers);
    record("AI Generator (" + KIND_LABELS[item.kind] + ")", correct ? 1 : 0, correct ? 0 : 1, timer.elapsed());
    setChecked(true);
  }

  const kindLabels = KIND_LABELS;

  let isCorrect = false;
  if (item && checked) {
    if (item.kind === "mcq") isCorrect = selected === item.data.answer;
    else if (item.kind === "open") isCorrect = normalize(value) === normalize(item.data.answer);
    else if (item.kind === "wordform") isCorrect = normalize(value) === normalize(item.data.answer);
    else if (item.kind === "kwt") isCorrect = answerMatches(value, item.data.answers);
  }

  return (
    <div>
      <p className="text-sm text-ink/60 dark:text-paper/60 mb-6 max-w-prose">
        Simulation of the infinite-generation engine: once the manual banks run out, the app will ask an AI for a fresh exercise of a random type, under this strict level contract. You have to attempt it before finding out if you got it right.
      </p>
      <button onClick={generate} disabled={loading} className="px-4 py-2 rounded bg-gold text-ink text-sm font-medium disabled:opacity-50">
        {loading ? "Generating..." : "Generate exercise with AI"}
      </button>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-ink/50 dark:text-paper/50">
          <span className="w-3 h-3 rounded-full border-2 border-gold border-t-transparent animate-spin"></span>
          Querying the model...
        </div>
      )}

      {item && !loading && (
        <div className="mt-4 bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-5 max-w-lg">
          <Badge tone="teal">{kindLabels[item.kind]}</Badge>

          {item.kind === "mcq" && (
            <div className="mt-3">
              <p className="font-serif text-lg mb-3">{item.data.sentence}</p>
              <div className="flex flex-wrap gap-2">
                {item.data.options.map((opt) => {
                  let cls = "px-3 py-1.5 rounded border text-sm ";
                  const isCorrectOpt = opt === item.data.answer;
                  if (!checked) cls += selected === opt ? "border-gold bg-gold/10" : "border-ink/15 dark:border-paper/15 hover:border-gold";
                  else if (isCorrectOpt) cls += "border-teal bg-teal/10 text-teal";
                  else if (selected === opt) cls += "border-coral bg-coral/10 text-coral";
                  else cls += "border-ink/10 dark:border-paper/10 text-ink/40 dark:text-paper/40";
                  return (
                    <button key={opt} disabled={checked} onClick={() => setSelected(opt)} className={cls}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {!checked && (
                <button onClick={check} disabled={selected === null} className="mt-4 px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium disabled:opacity-40">
                  Check
                </button>
              )}
            </div>
          )}

          {(item.kind === "open" || item.kind === "wordform") && (
            <div className="mt-3">
              <p className="font-serif text-lg mb-1">{item.data.sentence || item.data.text}</p>
              {item.kind === "wordform" && <p className="text-xs font-mono text-ink/40 dark:text-paper/40 mb-3">{item.data.capitals}</p>}
              {!checked ? (
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-ink/20 dark:border-paper/20 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <button onClick={check} className="px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
                    Check
                  </button>
                </div>
              ) : (
                <p className={"text-sm font-medium mt-2 " + (isCorrect ? "text-teal" : "text-coral")}>
                  {isCorrect ? "Correct" : "Answer: " + item.data.answer}
                </p>
              )}
            </div>
          )}

          {item.kind === "kwt" && (
            <div className="mt-3">
              <p className="text-sm text-ink/70 dark:text-paper/70 mb-2">{item.data.prompt}</p>
              <p className="text-xs font-mono text-ink/40 dark:text-paper/40 mb-3">key word: {item.data.keyWord}</p>
              <p className="font-serif text-lg mb-3">
                {item.data.before}
                <span className="border-b-2 border-dotted border-ink/30 dark:border-paper/30 px-1">
                  {checked ? value : "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
                </span>
                {item.data.after}
              </p>
              {!checked ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-ink/20 dark:border-paper/20 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <button onClick={check} className="px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium">
                    Check
                  </button>
                </div>
              ) : (
                <p className={"text-sm font-medium " + (isCorrect ? "text-teal" : "text-coral")}>
                  {isCorrect ? "Correct" : "Valid answer: " + item.data.answers[0]}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <button onClick={() => setShowPrompt(!showPrompt)} className="mt-6 text-sm font-medium text-ink/60 dark:text-paper/60 hover:underline">
        {showPrompt ? "Hide" : "Show"} the exact system prompt sent to the backend
      </button>
      {showPrompt && (
        <pre className="mt-3 bg-ink text-paper dark:bg-black/40 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap">{SYSTEM_PROMPT}</pre>
      )}
    </div>
  );
}

