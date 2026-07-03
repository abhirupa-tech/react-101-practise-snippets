import { useState } from 'react';

/**
 * Drill #37 — Drag to Reorder
 *
 * Basic drag-and-drop reordering of a list using native HTML5 drag events (no library).
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · Forms, Events & Real-World Inputs
 */
export default function DragToReorder() {
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
