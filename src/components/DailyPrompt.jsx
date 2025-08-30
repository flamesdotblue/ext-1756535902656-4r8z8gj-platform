import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

const PROMPTS = [
  'Take 3 slow breaths: in for 4, out for 6.',
  'Notice 5 things you can see right now.',
  'Relax your jaw and drop your shoulders.',
  'Place a hand on your heart. Feel the rise and fall for 20 seconds.',
  'Do a mindful sip of water. Notice temperature and texture.',
  'Name an emotion you feel. Say “Hi” to it without judgment.',
  'Look out a window. Find one color you hadn’t noticed before.',
  'Stretch gently for 30 seconds. Breathe with the movement.',
  'Close your eyes and listen to sounds for 20 seconds.',
  'Write one thing you’re grateful for today.',
];

const LS_PROMPT_KEY = 'mindful.promptIndex';

export default function DailyPrompt() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_PROMPT_KEY);
      if (raw) setIndex(Number(raw) % PROMPTS.length);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_PROMPT_KEY, String(index));
    } catch {}
  }, [index]);

  const nextPrompt = () => setIndex((i) => (i + 1) % PROMPTS.length);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-lg">
      <div className="mb-3 flex items-center gap-2 text-slate-600">
        <Calendar className="h-4 w-4" />
        <span className="text-sm">{today}</span>
      </div>
      <h4 className="text-lg font-semibold text-slate-800">Mindful nudge</h4>
      <p className="mt-2 text-slate-600">Small actions build big calm. Try this:</p>
      <div className="mt-4 rounded-xl bg-sky-50 p-4 text-sky-900 ring-1 ring-sky-200">
        <p className="leading-relaxed">{PROMPTS[index]}</p>
      </div>
      <button onClick={nextPrompt} className="mt-4 w-full rounded-xl bg-slate-900 text-white py-2.5 text-sm font-medium hover:bg-slate-800 active:bg-slate-950">
        New prompt
      </button>
    </div>
  );
}
