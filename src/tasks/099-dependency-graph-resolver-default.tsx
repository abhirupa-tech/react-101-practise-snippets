import { useState } from 'react';

/**
 * Drill #99 — Dependency Graph Resolver
 *
 * Given a list of {id, dependsOn: []} tasks, write a topological sort to determine valid execution order — directly reusable for any future DAG/orchestration work.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★★ · Mini Systems
 */
export default function DependencyGraphResolver() {
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
