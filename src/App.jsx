import { useState } from 'react';
import { TabButton } from './components/common';
import { Dashboard } from './components/Dashboard';
import { Practice } from './components/Practice';
import { Game } from './components/Game';
import { Dictionary } from './components/Dictionary';
import { AIGenerator } from './components/AIGenerator';
import { ReviewPanel } from './components/ReviewPanel';
import { StatsPanel } from './components/StatsPanel';

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "practice", label: "Practice" },
    { id: "game", label: "Game" },
    { id: "dictionary", label: "Dictionary" },
    { id: "ai", label: "AI Generator" },
    { id: "review", label: "Review" },
    { id: "stats", label: "Statistics" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">C2 Proficiency Practice</h1>
        </div>
        <span className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full border-2 border-gold text-gold font-serif text-lg">
          C2
        </span>
      </header>
      <nav className="flex gap-1 border-b border-ink/10 dark:border-paper/10 mb-8 overflow-x-auto">
        {tabs.map((t) => (
          <TabButton key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </TabButton>
        ))}
      </nav>
      {tab === "dashboard" && <Dashboard />}
      {tab === "practice" && <Practice />}
      {tab === "game" && <Game />}
      {tab === "dictionary" && <Dictionary />}
      {tab === "ai" && <AIGenerator />}
      {tab === "review" && <ReviewPanel />}
      {tab === "stats" && <StatsPanel />}
    </div>
  );
}
