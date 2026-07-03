import { useState } from 'react';

/**
 * Drill #6 — Controlled Chaos
 *
 * Build the same text input as both controlled and uncontrolled, then deliberately break the controlled one by forgetting onChange. Narrate the React warning from memory.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · React Core Mechanics
 */
export default function ControlledChaos() {
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
