import { useState } from 'react';

/**
 * Drill #24 — Context Re-render Bomb
 *
 * Build a Context Provider wrapping 5 consumers; change one piece of context state and prove ALL consumers re-render. Then split context to fix it.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · State, Re-renders & Memoization
 */
export default function ContextReRenderBomb() {
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
