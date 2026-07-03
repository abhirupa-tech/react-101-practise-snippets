import { useState } from 'react';

/**
 * Drill #100 — Hanachi's First Breath
 *
 * Combine drills #79 (state machine), #90 (trace exporter), and #43 (HOC/hook pattern) into the actual MVP of Hanachi: a component that visibly reacts (idle/thinking/streaming/error) to a mock agent's live event stream. This is where every drill above stops being an exercise and becomes your portfolio.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Mini Systems
 */
export default function HanachisFirstBreath() {
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
