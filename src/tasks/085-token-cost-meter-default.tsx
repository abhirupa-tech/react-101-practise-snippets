import { useState } from 'react';

/**
 * Drill #85 — Token Cost Meter
 *
 * Given a stream of tokens with a per-token cost constant, build a live-updating "$ spent so far" counter — the seed of your "Cost-Aware Frontend Architecture" post.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Protocol-Level Agent Infra
 */
export default function TokenCostMeter() {
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
