import { useState, useContext, createContext, useEffect, useRef } from 'react';
import { todayStr, computeStreak } from '../utils/helpers';
import { supabase, syncEnabled } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

const StatsContext = createContext(null);

const EMPTY_STATS = { correct: 0, incorrect: 0, timeMs: 0, byType: {}, mistakes: [], activeDays: [] };

export function StatsProvider({ children }) {
  const { user } = useAuth();
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem("c2-stats-v1");
      return saved ? JSON.parse(saved) : EMPTY_STATS;
    } catch (e) {
      return EMPTY_STATS;
    }
  });
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | pulling | synced | error
  const pushTimer = useRef(null);
  const pulledForUser = useRef(null);

  // Pull remote progress once we know who's logged in — remote becomes the
  // source of truth for this session, so switching devices picks up where
  // you left off rather than merging two histories.
  useEffect(() => {
    if (!syncEnabled || !user || pulledForUser.current === user.id) return;
    setSyncStatus("pulling");
    supabase
      .from('user_progress')
      .select('data')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        pulledForUser.current = user.id;
        if (!error && data && data.data) {
          setStats(data.data);
          try {
            localStorage.setItem("c2-stats-v1", JSON.stringify(data.data));
          } catch (e) {}
        }
        setSyncStatus(error ? "error" : "synced");
      });
  }, [user]);

  function pushToRemote(next) {
    if (!syncEnabled || !user) return;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      supabase
        .from('user_progress')
        .upsert({ user_id: user.id, data: next, updated_at: new Date().toISOString() })
        .then(({ error }) => setSyncStatus(error ? "error" : "synced"));
    }, 1200);
  }

  function persist(next) {
    try {
      localStorage.setItem("c2-stats-v1", JSON.stringify(next));
    } catch (e) {}
    pushToRemote(next);
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
    setStats(EMPTY_STATS);
    try {
      localStorage.removeItem("c2-stats-v1");
    } catch (e) {}
    pushToRemote(EMPTY_STATS);
  }

  const streak = computeStreak(stats.activeDays);

  return (
    <StatsContext.Provider value={{ stats, streak, syncStatus, record, addMistake, removeMistake, reorderMistake, reset }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  return useContext(StatsContext);
}

