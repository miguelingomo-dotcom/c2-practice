import { useState, useContext, createContext } from 'react';
import { todayStr, computeStreak } from '../utils/helpers';

const StatsContext = createContext(null);

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem("c2-stats-v1");
      return saved ? JSON.parse(saved) : { correct: 0, incorrect: 0, timeMs: 0, byType: {}, mistakes: [], activeDays: [] };
    } catch (e) {
      return { correct: 0, incorrect: 0, timeMs: 0, byType: {}, mistakes: [], activeDays: [] };
    }
  });

  function persist(next) {
    try {
      localStorage.setItem("c2-stats-v1", JSON.stringify(next));
    } catch (e) {}
    return next;
  }

  function record(type, correctDelta, incorrectDelta, timeMsDelta) {
    setStats((s) => {
      const t = s.byType[type] || { correct: 0, incorrect: 0, timeMs: 0, attempts: 0 };
      const byType = {
        ...s.byType,
        [type]: {
          correct: t.correct + correctDelta,
          incorrect: t.incorrect + incorrectDelta,
          timeMs: t.timeMs + timeMsDelta,
          attempts: t.attempts + 1
        }
      };
      const today = todayStr();
      const activeDays = (s.activeDays || []).includes(today) ? s.activeDays : [...(s.activeDays || []), today];
      const next = {
        ...s,
        correct: s.correct + correctDelta,
        incorrect: s.incorrect + incorrectDelta,
        timeMs: s.timeMs + timeMsDelta,
        byType,
        activeDays
      };
      return persist(next);
    });
  }

  function addMistake(item) {
    setStats((s) => {
      const mistakes = (s.mistakes || []).filter((m) => m.key !== item.key);
      mistakes.push(item);
      return persist({ ...s, mistakes });
    });
  }

  function removeMistake(key) {
    setStats((s) => persist({ ...s, mistakes: (s.mistakes || []).filter((m) => m.key !== key) }));
  }

  function reorderMistake(key) {
    setStats((s) => {
      const list = s.mistakes || [];
      const found = list.find((m) => m.key === key);
      if (!found) return s;
      const rest = list.filter((m) => m.key !== key);
      return persist({ ...s, mistakes: [...rest, found] });
    });
  }

  function reset() {
    const empty = { correct: 0, incorrect: 0, timeMs: 0, byType: {}, mistakes: [], activeDays: [] };
    setStats(empty);
    try {
      localStorage.removeItem("c2-stats-v1");
    } catch (e) {}
  }

  const streak = computeStreak(stats.activeDays);

  return <StatsContext.Provider value={{ stats, streak, record, addMistake, removeMistake, reorderMistake, reset }}>{children}</StatsContext.Provider>;
}

export function useStats() {
  return useContext(StatsContext);
}

