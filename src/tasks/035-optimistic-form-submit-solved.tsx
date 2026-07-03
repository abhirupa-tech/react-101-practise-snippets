import { useState } from 'react';

/**
 * Drill #35 — Optimistic Form Submit
 *
 * Submit a form, immediately show success UI, then roll back gracefully if the (fake, delayed) API call fails.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Forms, Events & Real-World Inputs
 */
export default function OptimisticFormSubmit() {
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
