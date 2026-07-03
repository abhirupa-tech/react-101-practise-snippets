import { useState } from 'react';

/**
 * Drill #98 — Mini Signals (Fine-Grained Reactivity)
 *
 * Implement a tiny signal/effect system (createSignal, createEffect) outside React, then explain how this relates to React Fiber's internals and libraries like bippy.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Mini Systems
 */
export default function MiniSignalsFineGrainedReactivity() {
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
