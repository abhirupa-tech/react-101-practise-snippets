import { useState } from 'react';

/**
 * Drill #76 — Restart Mid-Stream
 *
 * User sends a new message while a previous stream is still running — old stream must be discarded/ignored cleanly, not race into the new message.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Streaming & Agent UI Fundamentals
 */
export default function RestartMidStream() {
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
