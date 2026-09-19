import { useState, useMemo } from 'react';
import { VOCABULARY } from '../data/vocabulary';
import { IDIOMS } from '../data/idioms';
import { PHRASAL_VERBS } from '../data/phrasalVerbs';
import { Badge } from './common';

export function Dictionary() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const [lookup, setLookup] = useState(null); // { loading, error, data, word }

  const results = useMemo(() => {
    if (q.length < 2) return [];
    const vocab = VOCABULARY.filter((v) => v.word.toLowerCase().includes(q)).map((v) => ({ term: v.word, meaning: v.meaning, tag: "Vocabulary" }));
    const idioms = IDIOMS.filter((i) => i.expression.toLowerCase().includes(q)).map((i) => ({ term: i.expression, meaning: i.meaning, tag: "Idiom" }));
    const pv = PHRASAL_VERBS.filter((p) => p.phrase.toLowerCase().includes(q)).map((p) => ({ term: p.phrase, meaning: p.meaning, tag: "Phrasal verb" }));
    return [...vocab, ...idioms, ...pv].slice(0, 50);
  }, [q]);

  async function lookupWord() {
    const word = query.trim();
    if (!word) return;
    setLookup({ loading: true, error: null, data: null, word });
    try {
      const res = await fetch(`/api/dictionary?word=${encodeURIComponent(word)}`);
      const body = await res.json();
      if (!res.ok) {
        setLookup({ loading: false, error: body.error || "Lookup failed.", data: null, word });
        return;
      }
      setLookup({ loading: false, error: null, data: body, word });
    } catch (err) {
      setLookup({ loading: false, error: "Couldn't reach the dictionary service. This only works on the deployed Vercel site, not in local `vite dev`.", data: null, word });
    }
  }

  return (
    <div>
      <p className="text-sm text-ink/60 dark:text-paper/60 mb-2 max-w-prose">
        Search across the app's own banks — {VOCABULARY.length} vocabulary items, {IDIOMS.length} idioms and {PHRASAL_VERBS.length} phrasal verbs.
      </p>
      <p className="text-xs text-ink/40 dark:text-paper/40 mb-6 max-w-prose">
        Not in the app's banks? Use "Look up full definition" below for a live, monolingual English dictionary lookup (definitions, phonetics, examples) via a serverless function — this only works on the deployed site, not in local `vite dev`.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 mb-2 max-w-lg">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word, idiom or phrasal verb…"
          className="flex-1 px-3 py-2 rounded border border-ink/20 dark:border-paper/20 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button
          onClick={lookupWord}
          disabled={q.length < 2}
          className="px-4 py-2 rounded bg-ink dark:bg-paper text-paper dark:text-ink text-sm font-medium disabled:opacity-40 whitespace-nowrap"
        >
          Look up full definition
        </button>
      </div>

      {lookup && (
        <div className="mb-6 max-w-lg">
          {lookup.loading && <p className="text-sm text-ink/50 dark:text-paper/50">Looking up "{lookup.word}"…</p>}
          {lookup.error && <p className="text-sm text-coral">{lookup.error}</p>}
          {lookup.data && (
            <div className="bg-papercard dark:bg-white/5 border border-gold/40 rounded-lg p-4">
              <div className="flex items-baseline gap-2 mb-3">
                <p className="font-serif text-2xl">{lookup.data.word}</p>
                {lookup.data.phonetic && <span className="text-sm text-ink/50 dark:text-paper/50 font-mono">{lookup.data.phonetic}</span>}
              </div>
              {lookup.data.meanings.map((m, i) => (
                <div key={i} className="mb-3">
                  <Badge tone="gold">{m.partOfSpeech}</Badge>
                  <ol className="mt-2 space-y-1.5 list-decimal list-inside">
                    {m.definitions.map((d, j) => (
                      <li key={j} className="text-sm text-ink/80 dark:text-paper/80">
                        {d.definition}
                        {d.example && <span className="block text-xs text-ink/50 dark:text-paper/50 italic mt-0.5 ml-4">"{d.example}"</span>}
                      </li>
                    ))}
                  </ol>
                  {m.synonyms.length > 0 && (
                    <p className="text-xs text-ink/50 dark:text-paper/50 mt-1.5">Synonyms: {m.synonyms.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {q.length >= 2 && results.length === 0 && <p className="text-sm text-ink/50 dark:text-paper/50">No matches in the app's banks — try "Look up full definition" above.</p>}
      <div className="space-y-2 max-w-lg">
        {results.map((r, i) => (
          <div key={i} className="bg-papercard dark:bg-white/5 border border-ink/10 dark:border-paper/10 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="font-serif text-lg">{r.term}</p>
              <Badge tone={r.tag === "Idiom" ? "gold" : r.tag === "Phrasal verb" ? "teal" : "coral"}>{r.tag}</Badge>
            </div>
            <p className="text-sm text-ink/70 dark:text-paper/70">{r.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

