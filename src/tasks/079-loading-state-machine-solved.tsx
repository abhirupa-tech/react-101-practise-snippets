import { useState } from 'react';

/**
 * Drill #79 — Loading State Machine
 *
 * Model an agent's lifecycle (idle → thinking → streaming → tool_call → done/error) with useReducer, not a pile of booleans.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · Streaming & Agent UI Fundamentals
 */
export default function LoadingStateMachine() {
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
