import { useState } from 'react';

/**
 * Drill #66 — Parallel vs Sequential Fetches
 *
 * Fetch 3 independent resources in parallel with Promise.all, then show why sequential await would be slower, with timing logs.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · Async, Data Fetching & Race Conditions
 */
export default function ParallelVsSequentialFetches() {
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
