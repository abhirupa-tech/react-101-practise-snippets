import { useMemo, useState } from 'react';
import { VirtualizedTaskList } from '../components/VirtualizedTaskList';
import { tasks } from '../lib/tasks';
import type { Task } from '../types';

type DiffFilter = 0 | 1 | 2 | 3;

const diffChips: { value: DiffFilter; label: string }[] = [
  { value: 0, label: 'All' },
  { value: 1, label: '★ Warm-up' },
  { value: 2, label: '★★ Rust-check' },
  { value: 3, label: '★★★ Senior-bar' },
];

export function HomePage() {
  const [query, setQuery] = useState('');
  const [diff, setDiff] = useState<DiffFilter>(0);

  const filtered = useMemo<Task[]>(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (diff !== 0 && t.difficulty !== diff) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.company?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, diff]);

  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col px-6 py-8">
      <header className="shrink-0">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              React 101 · Practice Drills
            </h1>
            <p className="mt-1 text-sm text-ink-400">
              100 unassisted coding drills — React fundamentals to agent UI
              infra.
            </p>
          </div>
          <span className="hidden font-mono text-xs text-ink-600 sm:block">
            {filtered.length} / {tasks.length} drills
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-600">
              ⌕
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search drills, topics, companies…"
              className="w-full rounded-xl border border-ink-800 bg-ink-900/60 py-2.5 pl-9 pr-3 text-sm text-ink-50 placeholder:text-ink-600 outline-none transition focus:border-accent-dim focus:bg-ink-900"
            />
          </div>
          <div className="flex gap-1.5">
            {diffChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setDiff(chip.value)}
                className={`rounded-lg border px-3 py-2 text-xs transition ${
                  diff === chip.value
                    ? 'border-accent-dim bg-accent/10 text-accent'
                    : 'border-ink-800 text-ink-400 hover:border-ink-700 hover:text-ink-50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-6 min-h-0 flex-1">
        {filtered.length > 0 ? (
          <VirtualizedTaskList tasks={filtered} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-500">
            No drills match “{query}”.
          </div>
        )}
      </div>
    </div>
  );
}
