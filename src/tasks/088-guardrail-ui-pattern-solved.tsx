import { useState } from 'react';

/**
 * Drill #88 — Guardrail UI Pattern
 *
 * Build a UI affordance that intercepts a tool call requiring "confirmation" (e.g. delete_record) and blocks execution until the user approves — human-in-the-loop, rendered.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Protocol-Level Agent Infra
 */
export default function GuardrailUiPattern() {
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
