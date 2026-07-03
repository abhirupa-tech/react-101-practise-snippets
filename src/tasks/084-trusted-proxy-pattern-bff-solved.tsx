import { useState } from 'react';

/**
 * Drill #84 — Trusted Proxy Pattern (BFF)
 *
 * Stub out (architecturally, even just in comments/structure) why your React app should never call the agent runtime directly, and build the thin Node proxy layer that should sit between them.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Protocol-Level Agent Infra
 */
export default function TrustedProxyPatternBff() {
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
