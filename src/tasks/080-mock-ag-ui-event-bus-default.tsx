import { useState } from 'react';

/**
 * Drill #80 — Mock AG-UI Event Bus
 *
 * Build a tiny typed event emitter that simulates AG-UI's TEXT_MESSAGE_START/CONTENT/END and TOOL_CALL_ events on a timer, and a component that subscribes and renders accordingly.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Streaming & Agent UI Fundamentals
 */
export default function MockAgUiEventBus() {
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
