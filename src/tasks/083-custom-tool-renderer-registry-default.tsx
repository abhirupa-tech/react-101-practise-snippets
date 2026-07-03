import { useState } from 'react';

/**
 * Drill #83 — Custom Tool Renderer Registry
 *
 * Build a registerToolRenderer('search_flights', Component) system so different tool calls render different custom UI — the "Custom Tool Renderers" post, made real.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Protocol-Level Agent Infra
 */
export default function CustomToolRendererRegistry() {
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
