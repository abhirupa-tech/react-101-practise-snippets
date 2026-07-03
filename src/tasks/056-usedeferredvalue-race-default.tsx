import { useState } from 'react';

/**
 * Drill #56 — `useDeferredValue` Race
 *
 * Build a UI where stale results visibly persist briefly during fast typing, intentionally, to understand the trade-off.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Performance & Rendering Internals
 */
export default function UsedeferredvalueRace() {
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
