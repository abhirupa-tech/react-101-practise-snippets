import { useState } from 'react';

/**
 * Drill #15 — `useFetch` with Abort
 *
 * Custom data-fetching hook with loading/error/data states AND AbortController cleanup on unmount.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Hooks From Scratch
 */
export default function UsefetchWithAbort() {
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
