import { useState } from 'react';

/**
 * Drill #25 — Lifting State Properly
 *
 * Take two sibling components silently duplicating the same state and lift it to the right common ancestor — no Context, no library.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · State, Re-renders & Memoization
 */
export default function LiftingStateProperly() {
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
