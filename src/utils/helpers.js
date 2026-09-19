export function normalize(str) {
  return str.toLowerCase().trim().replace(/[^\w\s']/g, "").replace(/\s+/g, " ");
}

export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}


export function answerMatches(value, answer) {
  const options = Array.isArray(answer) ? answer : [answer];
  return options.some((a) => normalize(value) === normalize(a));
}


export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function computeStreak(days) {
  if (!days || days.length === 0) return 0;
  const set = new Set(days);
  let streak = 0;
  let d = new Date();
  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (set.has(key)) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}


export function fmtTime(ms) {
  const s = Math.round(ms / 1000);
  if (s < 60) return s + "s";
  return Math.floor(s / 60) + "m " + (s % 60) + "s";
}


