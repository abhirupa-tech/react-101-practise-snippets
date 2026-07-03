import { useState } from 'react';

/**
 * Drill #95 — Mini React Query (Cache + Stale Time)
 *
 * A useQuery(key, fetchFn) hook with in-memory cache and a staleTime before refetching.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · Mini Systems
 */
export default function MiniReactQueryCacheStaleTime() {
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
