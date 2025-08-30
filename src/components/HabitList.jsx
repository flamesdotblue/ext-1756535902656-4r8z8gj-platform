import { Check, Trash2, Flame } from 'lucide-react';

function HabitItem({ habit, onComplete, onDelete }) {
  const completedToday = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const today = `${y}-${m}-${day}`;
    return habit.lastCompletedDate === today;
  })();

  return (
    <div className="group relative flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3 shadow-sm hover:shadow-md">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={() => !completedToday && onComplete(habit.id)}
          disabled={completedToday}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
            completedToday ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300 text-slate-500 hover:border-emerald-500 hover:text-emerald-600'
          }`}
          aria-label={completedToday ? 'Completed' : 'Mark complete'}
        >
          <Check className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-800">{habit.title}</p>
          <p className="text-xs text-slate-500">{habit.timeOfDay}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1 text-orange-700 ring-1 ring-orange-200">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-semibold">{habit.streak || 0}</span>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          className="invisible group-hover:visible rounded-lg p-2 text-slate-400 hover:text-red-600 hover:bg-red-50"
          aria-label="Delete habit"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default function HabitList({ habits, onComplete, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Your habits</h3>
        <p className="text-sm text-slate-500">Tap the check to complete today</p>
      </div>
      {habits.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
          <p className="text-slate-500">No habits yet. Create your first calming habit above.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {habits.map((h) => (
            <HabitItem key={h.id} habit={h} onComplete={onComplete} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
