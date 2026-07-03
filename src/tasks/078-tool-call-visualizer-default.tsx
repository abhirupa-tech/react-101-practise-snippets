import { useState } from 'react';

/**
 * Drill #78 — Tool Call Visualizer
 *
 * Mock an agent response containing tool_call_start → tool_call_args (streamed in pieces) → tool_call_result events; render a live-updating "card" for the tool call.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Streaming & Agent UI Fundamentals
 */
export default function ToolCallVisualizer() {
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
