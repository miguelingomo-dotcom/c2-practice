export const MOCK_AI_MCQ = [
  { sentence: "The committee's decision was met with widespread ___.", options: ["approval", "acceptance", "agreement", "consent"], answer: "approval" },
  { sentence: "Her argument, though persuasive, ultimately proved ___.", options: ["fallacious", "erroneous", "flawed", "mistaken"], answer: "fallacious" },
  { sentence: "The negotiations reached a(n) ___ that satisfied neither side entirely.", options: ["impasse", "deadlock", "standstill", "stalemate"], answer: "impasse" }
];

export const MOCK_AI_OPEN = [
  { sentence: "It is essential ___ students engage critically with sources.", answer: "that" },
  { sentence: "Few would have guessed, ___ all the warning signs, that the plan would fail.", answer: "despite" },
  { sentence: "The report was compiled ___ a team of independent researchers.", answer: "by" }
];

export const MOCK_AI_KWT = [
  { prompt: "He didn't realise how late it was until the meeting had already started.", keyWord: "AWARE", before: "He ", after: " until the meeting had already started.", answers: ["was not aware of how late it was", "wasn't aware of how late it was", "was unaware of how late it was"] },
  { prompt: "The board approved the merger only after months of negotiation.", keyWord: "UNTIL", before: "It was ", after: " that the board approved the merger.", answers: ["not until months of negotiation had passed"] }
];


export const SYSTEM_PROMPT = `You are an expert Cambridge C2 Proficiency (CPE) item-writer.

Task: generate exactly ONE new Use of English exercise of type "{exerciseType}".

Hard constraints:
- Target level is C2 ONLY. Never use vocabulary, collocations or grammar typical of B2 or C1 (no basic connectors like "but" / "so" / "also" as the tested item; no simple narrative tense as the sole test point).
- Every tested word, collocation or structure must be C2-register, or an advanced structure: inversion, cleft sentences, mixed conditionals, subjunctive, ellipsis, nominalisation.
- Register: formal, academic or literary. No contractions, no colloquialisms in the model answer.
- All content must be 100% original. Never reuse wording from real Cambridge papers or any copyrighted source.
- Return ONLY valid JSON matching this schema:
  { "text_with_gaps": string, "items": [{ "n": number, "capitals"?: string, "options"?: string[], "answer": string | string[] }] }
- If the exercise type allows more than one correct phrasing, return "answer" as an array of accepted forms.
- Include no explanatory text outside the JSON object.`;


export const KIND_LABELS = { mcq: "Multiple Choice Cloze", open: "Open Cloze", wordform: "Word Formation", kwt: "Key Word Transformation" };

