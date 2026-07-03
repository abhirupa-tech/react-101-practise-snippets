import { useState } from 'react';

/**
 * Drill #81 — Hand-Rolled AG-UI Client
 *
 * Implement a minimal client that parses a stream of typed JSON events (text_message_content, tool_call_start, etc.) into rendered UI, no library.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Protocol-Level Agent Infra
 */
export default function HandRolledAgUiClient() {
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
