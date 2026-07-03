import { useState } from 'react';

/**
 * Drill #26 — Derived State Anti-Pattern
 *
 * Build a component that wrongly copies a prop into state via useState(prop), show the bug when prop changes, then fix it by deriving instead of storing.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · State, Re-renders & Memoization
 */
export default function DerivedStateAntiPattern() {
  const [, rerender] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-400">
        TODO — build your solution here.
      </p>
      <button
        onClick={() => rerender((n) => n + 1)}
        className="self-start rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500"
      >
        re-render
      </button>
    </div>
  );
}
