import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import HabitCreator from './components/HabitCreator';
import HabitList from './components/HabitList';
import DailyPrompt from './components/DailyPrompt';

const LS_KEY = 'mindful.habits';

function getToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isYesterday(dateStr) {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const ys = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
    return ys === dateStr;
  } catch {
    return false;
  }
}

export default function App() {
  const [habits, setHabits] = useState([]);

  // Load habits
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setHabits(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist habits
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(habits));
    } catch {}
  }, [habits]);

  const addHabit = (habit) => {
    setHabits((prev) => [
      {
        id: crypto.randomUUID(),
        title: habit.title.trim(),
        timeOfDay: habit.timeOfDay,
        streak: 0,
        lastCompletedDate: null,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const completeToday = (id) => {
    const today = getToday();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        if (h.lastCompletedDate === today) return h; // already completed
        const newStreak = h.lastCompletedDate && isYesterday(h.lastCompletedDate) ? (h.streak || 0) + 1 : 1;
        return { ...h, lastCompletedDate: today, streak: newStreak };
      })
    );
  };

  const stats = useMemo(() => {
    const total = habits.length;
    const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);
    return { total, totalStreak };
  }, [habits]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-slate-800">
      <Hero stats={stats} />
      <main className="relative z-10">
        <section id="create" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-20">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">Create a micro habit</h2>
            <HabitCreator onAdd={addHabit} />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <HabitList habits={habits} onComplete={completeToday} onDelete={deleteHabit} />
          </div>
          <div className="md:col-span-1">
            <DailyPrompt />
          </div>
        </section>

        <footer className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-16 mb-10 text-sm text-slate-500">
          <div className="flex items-center justify-between">
            <p>Built for mindful micro-habits. Be gentle with yourself.</p>
            <p>
              Total habits: <span className="font-medium text-slate-700">{stats.total}</span> · Total streaks:{' '}
              <span className="font-medium text-slate-700">{stats.totalStreak}</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
