import { useState } from 'react';

/**
 * Drill #86 — Speculative UI / Pre-fill from Streamed Args
 *
 * As tool call arguments stream in (before the call completes), progressively pre-fill a form/UI with partial data.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Protocol-Level Agent Infra
 */
export default function SpeculativeUiPreFillFromStreamedArgs() {
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
