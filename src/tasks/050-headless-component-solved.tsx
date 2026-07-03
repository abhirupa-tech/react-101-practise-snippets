import { useState } from 'react';

/**
 * Drill #50 — Headless Component
 *
 * Build a useAccordion() hook that returns state + handlers only, with ZERO markup, then render two completely different-looking accordions using it.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Component Design Patterns
 */
export default function HeadlessComponent() {
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
