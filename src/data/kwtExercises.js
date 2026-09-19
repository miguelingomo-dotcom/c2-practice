export const KWT_EXERCISES = [
  {
    id: 1,
    label: "Inversion",
    prompt: "I had never seen such a beautiful sunset before that evening.",
    keyWord: "NEVER",
    before: "",
    after: " such a beautiful sunset before that evening.",
    answers: ["never had i seen", "never before had i seen"],
    explanation: "Fronted negative or restrictive adverbials (never, rarely, seldom, not only...) trigger subject-auxiliary inversion: 'Never had I seen' rather than 'I had never seen'. This is typical of formal or emphatic C2 register."
  },
  {
    id: 2,
    label: "Mixed conditional",
    prompt: "She didn't study medicine at university, so she isn't a doctor now.",
    keyWord: "HAD",
    before: "If she ",
    after: " medicine at university, she would be a doctor now.",
    answers: ["had studied"],
    explanation: "Mixed conditional: a hypothetical past condition (third conditional, 'if + past perfect') combines with a present hypothetical result (second conditional, 'would + base form + now') because an unreal past action has consequences that persist into the present."
  },
  {
    id: 3,
    label: "Cleft sentence",
    prompt: "John's attitude annoyed me most about the whole situation.",
    keyWord: "WAS",
    before: "What annoyed me most about the whole situation ",
    after: ".",
    answers: ["was john's attitude", "was his attitude"],
    explanation: "A wh-cleft (pseudo-cleft) sentence fronts a 'What...' clause and uses a form of 'be' to introduce the emphasised element at the end, singling out 'John's attitude' as the true focus."
  },
  {
    id: 4,
    label: "Idiom",
    prompt: "No one in the department can match her expertise in tax law.",
    keyWord: "SECOND",
    before: "Her expertise in tax law is ",
    after: " in the department.",
    answers: ["second to none"],
    explanation: "'Second to none' is a fixed idiom meaning unparalleled or the best — a more idiomatic, emphatic alternative to 'unmatched'."
  },
  {
    id: 5,
    label: "Result clause",
    prompt: "The proposal was so controversial that the board postponed the vote entirely.",
    keyWord: "SUCH",
    before: "It was ",
    after: " that the board postponed the vote entirely.",
    answers: ["such a controversial proposal"],
    explanation: "'Such a/an + adjective + noun + that' is an alternative result-clause structure to 'so + adjective + that', with 'such' governing the whole noun phrase rather than just the adjective."
  },
  {
    id: 6,
    label: "Unreal past wish",
    prompt: "She regrets not having negotiated a better salary when she was hired.",
    keyWord: "WISHES",
    before: "She ",
    after: " a better salary when she was hired.",
    answers: ["wishes she had negotiated"],
    explanation: "'Wishes + past perfect' expresses regret about something that did not happen in the past — the standard structure for unreal past wishes."
  },
  {
    id: 7,
    label: "Phrasal verb",
    prompt: "The team needs to think of a solution before Friday's deadline.",
    keyWord: "COME",
    before: "The team needs to ",
    after: " a solution before Friday's deadline.",
    answers: ["come up with"],
    explanation: "'Come up with' (produce an idea to solve a problem) is a more natural, idiomatic C2 alternative to 'think of'."
  },
  {
    id: 8,
    label: "Phrasal verb",
    prompt: "He wonders whether he can avoid punishment for missing the deadline.",
    keyWord: "AWAY",
    before: "He wonders whether he can ",
    after: " missing the deadline.",
    answers: ["get away with"],
    explanation: "'Get away with' (escape punishment for something) is the standard phrasal verb for avoiding consequences."
  },
  {
    id: 9,
    label: "Phrasal verb",
    prompt: "It takes real courage to defend yourself against someone who intimidates you.",
    keyWord: "UP",
    before: "It takes real courage to ",
    after: " someone who intimidates you.",
    answers: ["stand up to"],
    explanation: "'Stand up to' (defend oneself against) is the idiomatic phrasal verb for resisting an intimidating person."
  },
  {
    id: 10,
    label: "Phrasal verb",
    prompt: "Nothing can compensate for the years the company lost through inaction.",
    keyWord: "UP",
    before: "Nothing can ",
    after: " the years the company lost through inaction.",
    answers: ["make up for"],
    explanation: "'Make up for' (compensate for a loss or trouble) is the natural phrasal-verb equivalent of 'compensate for'."
  },
  {
    id: 11,
    label: "Phrasal verb",
    prompt: "She has never learned to tolerate criticism gracefully.",
    keyWord: "PUT",
    before: "She has never learned to ",
    after: " criticism gracefully.",
    answers: ["put up with"],
    explanation: "'Put up with' (tolerate) is the standard idiomatic phrasal verb for enduring something unpleasant."
  },
  {
    id: 12,
    label: "Idiom",
    prompt: "His diagnosis of the problem was exactly right.",
    keyWord: "NAIL",
    before: "His diagnosis of the problem ",
    after: ".",
    answers: ["hit the nail on the head"],
    explanation: "'Hit the nail on the head' is a fixed idiom meaning to say or identify exactly the right thing."
  },
  {
    id: 13,
    label: "Idiom",
    prompt: "The management refuses to acknowledge that the product is failing.",
    keyWord: "SAND",
    before: "The management is ",
    after: " about the fact that the product is failing.",
    answers: ["burying its head in the sand", "burying their head in the sand", "burying their heads in the sand"],
    explanation: "'Bury one's head in the sand' means to deliberately avoid or ignore an unpleasant reality."
  },
  {
    id: 14,
    label: "Idiom",
    prompt: "Renovating the old house turned out to be extremely expensive.",
    keyWord: "ARM",
    before: "Renovating the old house turned out to ",
    after: ".",
    answers: ["cost an arm and a leg"],
    explanation: "'Cost an arm and a leg' is a fixed idiom meaning to be very expensive."
  },
  {
    id: 15,
    label: "Idiom",
    prompt: "The host told a joke to ease the tension when the guests first arrived.",
    keyWord: "ICE",
    before: "The host told a joke to ",
    after: " when the guests first arrived.",
    answers: ["break the ice"],
    explanation: "'Break the ice' means to ease initial social tension when people first meet."
  },
  {
    id: 16,
    label: "Inversion (no sooner)",
    prompt: "The meeting had just started when the fire alarm went off.",
    keyWord: "SOONER",
    before: "",
    after: " started than the fire alarm went off.",
    answers: ["no sooner had the meeting"],
    explanation: "'No sooner had X happened than Y' is a fronted negative adverbial requiring subject-auxiliary inversion, used for near-simultaneous events."
  },
  {
    id: 17,
    label: "Inversion (not only)",
    prompt: "The proposal was rejected, and it also damaged the team's reputation.",
    keyWord: "ONLY",
    before: "",
    after: " rejected, but it also damaged the team's reputation.",
    answers: ["not only was the proposal"],
    explanation: "'Not only' fronted for emphasis triggers subject-auxiliary inversion, paired with 'but also' in the second clause."
  },
  {
    id: 18,
    label: "Cleft (it wasn't until)",
    prompt: "She didn't realise her mistake until she reviewed the report a second time.",
    keyWord: "UNTIL",
    before: "It wasn't ",
    after: " reviewed the report a second time that she realised her mistake.",
    answers: ["until she had"],
    explanation: "'It wasn't until X that Y' is a cleft structure emphasising the point in time at which something became true."
  },
  {
    id: 19,
    label: "Comparative correlative",
    prompt: "As he practised more, his confidence grew.",
    keyWord: "MORE",
    before: "",
    after: " he practised, the more his confidence grew.",
    answers: ["the more"],
    explanation: "'The more..., the more...' is a comparative correlative structure linking two proportional changes."
  },
  {
    id: 20,
    label: "Idiom",
    prompt: "The results were not at all conclusive.",
    keyWord: "FAR",
    before: "The results were ",
    after: " conclusive.",
    answers: ["far from"],
    explanation: "'Far from' means 'not at all' — a common way to negate an adjective more emphatically than 'not'."
  },
  {
    id: 21,
    label: "Subjunctive",
    prompt: "Everyone must submit the form by Friday, no exceptions.",
    keyWord: "ESSENTIAL",
    before: "It is ",
    after: " everyone submit the form by Friday.",
    answers: ["essential that"],
    explanation: "After adjectives like 'essential', 'vital' or 'important', the subjunctive (bare infinitive form, no third-person -s) is used in the that-clause."
  },
  {
    id: 22,
    label: "Idiom",
    prompt: "He can't even boil an egg, so cooking a full meal is out of the question.",
    keyWord: "ALONE",
    before: "He can't even boil an egg, ",
    after: " cook a full meal.",
    answers: ["let alone"],
    explanation: "'Let alone' means 'much less' — used after a negative statement to dismiss an even less likely possibility."
  },
  {
    id: 23,
    label: "Present perfect idiom",
    prompt: "The company has not found a solution to the problem so far.",
    keyWord: "YET",
    before: "The company ",
    after: " a solution to the problem.",
    answers: ["has yet to find"],
    explanation: "'Have yet to do sth' is a formal way of saying something has not happened up to now, often implying it is expected to."
  },
  {
    id: 24,
    label: "Idiom",
    prompt: "Someone revealed the surprise party plans before the big day.",
    keyWord: "BEANS",
    before: "Someone ",
    after: " about the surprise party plans before the big day.",
    answers: ["spilled the beans"],
    explanation: "'Spill the beans' means to reveal a secret, often unintentionally or prematurely."
  },
  {
    id: 25,
    label: "Idiom",
    prompt: "By combining the two errands, she managed to achieve two things with a single trip.",
    keyWord: "BIRDS",
    before: "By combining the two errands, she managed to ",
    after: " with a single trip.",
    answers: ["kill two birds with one stone"],
    explanation: "'Kill two birds with one stone' means to achieve two objectives with a single action."
  },
  {
    id: 26,
    label: "Idiom",
    prompt: "The job offer arrived completely unexpectedly.",
    keyWord: "BLUE",
    before: "The job offer arrived ",
    after: ".",
    answers: ["out of the blue"],
    explanation: "'Out of the blue' means suddenly and without warning."
  },
  {
    id: 27,
    label: "Idiom",
    prompt: "The manager deliberately ignored the minor rule violations.",
    keyWord: "BLIND",
    before: "The manager ",
    after: " the minor rule violations.",
    answers: ["turned a blind eye to"],
    explanation: "'Turn a blind eye to' means to deliberately ignore something one is aware of."
  },
  {
    id: 28,
    label: "Idiom",
    prompt: "He almost lost his nerve about signing the contract at the last moment.",
    keyWord: "FEET",
    before: "He almost ",
    after: " about signing the contract at the last moment.",
    answers: ["got cold feet"],
    explanation: "'Get cold feet' means to suddenly lose confidence or courage about a planned action."
  },
  {
    id: 29,
    label: "Idiom",
    prompt: "The rescue team arrived just in time to save the climbers.",
    keyWord: "NICK",
    before: "The rescue team arrived ",
    after: " to save the climbers.",
    answers: ["in the nick of time"],
    explanation: "'In the nick of time' means at the last possible moment, just before it would have been too late."
  },
  {
    id: 30,
    label: "Passive reporting",
    prompt: "People say that the recipe originally came from a small village in the north.",
    keyWord: "SAID",
    before: "The recipe ",
    after: " originally come from a small village in the north.",
    answers: ["is said to have"],
    explanation: "'Is said to have + past participle' is a passive reporting structure used to attribute an unverified claim about the past to people in general."
  }
];

