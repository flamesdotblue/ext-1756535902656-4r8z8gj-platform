import Spline from '@splinetool/react-spline';

export default function Hero({ stats }) {
  return (
    <header className="relative h-[72vh] min-h-[480px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vK0TK9mHEhvY3bf1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-start justify-center px-4 sm:px-6 lg:px-8">
        <span className="rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200">Serene mindful micro habits</span>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800">
          Build calm, one tiny habit at a time
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600">
          Create small, sustainable mindfulness habits. Track streaks, celebrate progress, and come back to your breath.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <a href="#create" className="inline-flex items-center rounded-xl bg-sky-600 text-white px-5 py-3 text-sm font-medium shadow-lg shadow-sky-600/20 hover:bg-sky-700 active:bg-sky-800">
            Start a habit
          </a>
          <div className="rounded-xl bg-white/80 backdrop-blur px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
            <span className="font-semibold text-slate-800">{stats.total}</span> habits • <span className="font-semibold text-slate-800">{stats.totalStreak}</span> total streaks
          </div>
        </div>
      </div>
    </header>
  );
}
