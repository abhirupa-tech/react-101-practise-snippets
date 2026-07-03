import { useState } from 'react';

/**
 * Drill #30 — Diffing Two Lists
 *
 * Without React, by hand, write the pseudocode/logic for how React's reconciler decides whether to update vs. replace a list item given old/new arrays + keys.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · State, Re-renders & Memoization
 */
export default function DiffingTwoLists() {
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
