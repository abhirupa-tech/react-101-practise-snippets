import { useState } from 'react';

/**
 * Drill #10 — Render Count Detective
 *
 * Add a render counter (via useRef) to 3 nested components and figure out, by reasoning alone before testing, which ones re-render when a grandparent's unrelated state changes.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · React Core Mechanics
 */
export default function RenderCountDetective() {
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
