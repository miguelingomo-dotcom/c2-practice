import { useState, useMemo } from 'react';
import { VOCABULARY } from '../data/vocabulary';
import { IDIOMS } from '../data/idioms';
import { PHRASAL_VERBS } from '../data/phrasalVerbs';
import { Badge } from './common';

export function Dictionary() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (q.length < 2) return [];
    const vocab = VOCABULARY.filter((v) => v.word.toLowerCase().includes(q)).map((v) => ({ term: v.word, meaning: v.meaning, tag: "Vocabulary" }));
    const idioms = IDIOMS.filter((i) => i.expression.toLowerCase().includes(q)).map((i) => ({ term: i.expression, meaning: i.meaning, tag: "Idiom" }));
    const pv = PHRASAL_VERBS.filter((p) => p.phrase.toLowerCase().includes(q)).map((p) => ({ term: p.phrase, meaning: p.meaning, tag: "Phrasal verb" }));
    return [...vocab, ...idioms, ...pv].slice(0, 50);
  }, [q]);

  return (
    <div>
      <p className="text-sm text-ink/60 dark:text-paper/60 mb-2 max-w-prose">
        Search across the app's own banks — {VOCABULARY.length} vocabulary items, {IDIOMS.length} idioms and {PHRASAL_VERBS.length} phrasal verbs.
      </p>
      <p className="text-xs text-ink/40 dark:text-paper/40 mb-6 max-w-prose">
        Note: this searches only the content already loaded in the app. A published page can't call an external dictionary API (WordReference, etc.) directly — the browser blocks requests to domains outside a short allow-list. A live lookup against an outside dictionary would need the real backend we build in Phase 2 to proxy the request.
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a word, idiom or phrasal verb…"
        className="w-full max-w-md px-3 py-2 rounded border border-ink/20 dark:border-paper/20 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-gold mb-6"
      />
      {q.length >= 2 && results.length === 0 && <p className="text-sm text-ink/50 dark:text-paper/50">No matches found.</p>}
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

