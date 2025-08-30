import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

export default function HabitCreator({ onAdd }) {
  const [title, setTitle] = useState('1 mindful breath');
  const [timeOfDay, setTimeOfDay] = useState('Anytime');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, timeOfDay });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Habit name</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., 1 minute of mindful breathing"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Time of day</label>
        <div className="relative">
          <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-9 pr-8 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option>Morning</option>
            <option>Midday</option>
            <option>Evening</option>
            <option>Anytime</option>
          </select>
        </div>
      </div>
      <div className="sm:col-span-6">
        <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-white text-sm font-medium shadow-lg shadow-sky-600/20 hover:bg-sky-700 active:bg-sky-800">
          <Plus className="h-4 w-4" /> Add habit
        </button>
      </div>
    </form>
  );
}
