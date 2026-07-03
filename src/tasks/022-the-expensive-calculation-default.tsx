import { useState } from 'react';

/**
 * Drill #22 — The Expensive Calculation
 *
 * Build a component with a deliberately slow function (nested loop), wire it with and without useMemo, and visibly show the lag difference.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · State, Re-renders & Memoization
 */
export default function TheExpensiveCalculation() {
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
