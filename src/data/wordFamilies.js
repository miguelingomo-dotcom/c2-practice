export const WORD_FAMILIES = [
  { base: "ALERT", pos: "noun", answer: "alertness" },
  { base: "EXECUTE", pos: "noun", answer: "executive" },
  { base: "MAXIMUM", pos: "verb", answer: "maximise" },
  { base: "ORIENTATE", pos: "noun", answer: "disorientation" },
  { base: "COMPARE", pos: "adverb", answer: "comparatively" },
  { base: "DESIGN", pos: "verb", answer: "designate" },
  { base: "COMPANY", pos: "verb", answer: "accompany" },
  { base: "DESPAIR", pos: "noun", answer: "desperation" },
  { base: "EQUATOR", pos: "adjective", answer: "equatorial" },
  { base: "OSTENTATION", pos: "adjective", answer: "ostentatious" },
  { base: "ABLE", pos: "verb", answer: "enable" },
  { base: "DEBT", pos: "adjective", answer: "indebted" },
  { base: "MILE", pos: "noun", answer: "mileage" },
  { base: "INQUISITION", pos: "adjective", answer: "inquisitive" },
  { base: "BATH", pos: "verb", answer: "bathe" },
  { base: "DICTATE", pos: "noun", answer: "dictatorship" },
  { base: "EXPRESS", pos: "adjective", answer: "expressive" },
  { base: "CIRCUMSTANCE", pos: "adjective", answer: "circumstantial" },
  { base: "FRUIT", pos: "noun", answer: "fruition" },
  { base: "TOLERATE", pos: "adjective", answer: "tolerable" },
  { base: "SETTLE", pos: "noun", answer: "settlement" },
  { base: "SOCIAL", pos: "adjective", answer: "antisocial" },
  { base: "SUBSIDY", pos: "verb", answer: "subsidize" },
  { base: "NUMERATE", pos: "adjective", answer: "innumerate" },
  { base: "SEVERE", pos: "noun", answer: "severity" },
  { base: "EXTEND", pos: "adjective", answer: "extensive" },
  { base: "REMAIN", pos: "noun", answer: "remnants" },
  { base: "CHARM", pos: "adjective", answer: "charming" },
  { base: "ORGAN", pos: "adjective", answer: "organic" },
  { base: "POTTER", pos: "noun", answer: "pottery" },
  { base: "GAS", pos: "adjective", answer: "gassy" },
  { base: "EXPLAIN", pos: "adjective", answer: "explanatory" },
  { base: "CHOOSE", pos: "adjective", answer: "choosy" },
  { base: "PLAY", pos: "adjective", answer: "playful" },
  { base: "SEASON", pos: "adjective", answer: "seasonal" },
  { base: "ATTAIN", pos: "noun", answer: "attainments" },
  { base: "TIGHT", pos: "verb", answer: "tighten" },
  { base: "CIVIL", pos: "noun", answer: "civilian" },
  { base: "TICKLE", pos: "adjective", answer: "ticklish" },
  { base: "TIME", pos: "adjective", answer: "untimely" },
  { base: "IRRELEVANT", pos: "noun", answer: "irrelevancies" },
  { base: "FRAGRANT", pos: "noun", answer: "fragrance" },
  { base: "REBEL", pos: "adjective", answer: "rebellious" },
  { base: "EXPLODE", pos: "adjective", answer: "explosive" },
  { base: "OPERATE", pos: "noun", answer: "operator" },
  { base: "CHRISTEN", pos: "noun", answer: "christendom" },
  { base: "EXPLOIT", pos: "noun", answer: "exploitation" },
  { base: "PORTRAY", pos: "noun", answer: "portrayal" },
  { base: "LIVE", pos: "verb", answer: "enliven" },
  { base: "RECEIVE", pos: "noun", answer: "receiver" },
  { base: "OPPRESS", pos: "adjective", answer: "oppressive" },
  { base: "EMPHASIS", pos: "adverb", answer: "emphatically" },
  { base: "REPROACH", pos: "adjective", answer: "irreproachable" },
  { base: "PLEASANT", pos: "noun", answer: "pleasantries" },
  { base: "IRRITATE", pos: "noun", answer: "irritant" },
  { base: "RECITE", pos: "noun", answer: "recital" },
  { base: "POSSESS", pos: "noun", answer: "possession" },
  { base: "LABOUR", pos: "adverb", answer: "laboriously" },
  { base: "AFFIRM", pos: "adjective", answer: "affirmative" },
  { base: "EXCEPT", pos: "adverb", answer: "exceptionally" },
  { base: "SOLID", pos: "noun", answer: "solidarity" },
  { base: "SECURE", pos: "noun", answer: "insecurity" },
  { base: "TEND", pos: "noun", answer: "tendency" },
  { base: "FRONT", pos: "verb", answer: "confront" },
  { base: "INTUIT", pos: "noun", answer: "intuition" },
  { base: "PREDICT", pos: "adjective", answer: "unpredictable" },
  { base: "ANXIOUS", pos: "noun", answer: "anxiety" },
  { base: "CONSERVE", pos: "adjective", answer: "conservative" },
  { base: "SYSTEM", pos: "adjective", answer: "systematic" },
  { base: "AVOID", pos: "noun", answer: "unavoidability" },
  { base: "INFORM", pos: "adjective", answer: "informed" },
  { base: "INNOVATE", pos: "adjective", answer: "innovative" },
  { base: "ACCESS", pos: "noun", answer: "accessibility" },
  { base: "EFFECT", pos: "noun", answer: "effectiveness" },
  { base: "DISTRIBUTE", pos: "noun", answer: "distribution" },
  { base: "FUND", pos: "noun", answer: "funding" },
  { base: "DEVELOP", pos: "noun", answer: "development" },
  { base: "INTEGRATE", pos: "adjective", answer: "integral" },
  { base: "PRECEDE", pos: "adjective", answer: "unprecedented" },
  { base: "DISTRACT", pos: "noun", answer: "distractions" },
  { base: "ENGAGE", pos: "noun", answer: "engagement" },
  { base: "SELECT", pos: "noun", answer: "selectivity" },
  { base: "TRANSPARENT", pos: "noun", answer: "transparency" }
];


export const TEMPLATES = {
  noun: [
    "There has been a growing sense of ___ among the staff.",
    "The report drew attention to a serious ___ within the department.",
    "Her ___ was evident to everyone in the room.",
    "The committee raised concerns about the ___ of the proposal.",
    "It took considerable effort to overcome the ___ surrounding the decision."
  ],
  adjective: [
    "The results were remarkably ___.",
    "Few found his explanation particularly ___.",
    "The evidence presented was far from ___.",
    "Critics described the approach as needlessly ___.",
    "Her manner struck colleagues as unusually ___."
  ],
  verb: [
    "The new policy is expected to ___ several long-standing assumptions.",
    "Analysts believe the reforms will ___ the entire industry.",
    "The board ultimately chose to ___ the plan without further debate.",
    "Few expected the announcement to ___ such controversy.",
    "It remains unclear whether the changes will ___ lasting improvement."
  ],
  adverb: [
    "She addressed the panel ___, without a hint of hesitation.",
    "The results came in ___ higher than anticipated.",
    "He responded ___, choosing his words with care.",
    "They approached the negotiation ___, aware of what was at stake.",
    "The figures had risen ___ since the previous quarter."
  ]
};


export function pickWordFormation(idx) {
  const wf = WORD_FAMILIES[idx];
  const pool = TEMPLATES[wf.pos] || TEMPLATES.noun;
  const template = pool[Math.floor(Math.random() * pool.length)];
  return { text: template, capitals: wf.base, answer: wf.answer };
}


export function generateWordFormation() {
  const wf = WORD_FAMILIES[Math.floor(Math.random() * WORD_FAMILIES.length)];
  const pool = TEMPLATES[wf.pos] || TEMPLATES.noun;
  const template = pool[Math.floor(Math.random() * pool.length)];
  return { text: template, capitals: wf.base, answer: wf.answer };
}
