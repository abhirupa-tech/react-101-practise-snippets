import { useState } from 'react';

/**
 * Drill #28 — The `key` Reset Trick
 *
 * Use a changing key prop to intentionally force-remount a component and reset all its internal state, on purpose, as a pattern (not a bug this time).
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · State, Re-renders & Memoization
 */
export default function TheKeyResetTrick() {
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
