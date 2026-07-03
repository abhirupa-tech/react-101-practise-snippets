import { useState } from 'react';

/**
 * Drill #1 — The Liar's Counter
 *
 * Inside a single React event handler, multiple setState calls are *batched*:
 * they queue one re-render, not three. Reading `count` then setting it to
 * `count + 1` three times all see the same stale `count`, so the screen only
 * moves by one. The functional form `c => c + 1` queues against the latest
 * value, so it correctly jumps by three.
 */
export default function TheLiarsCounter() {
  const [count, setCount] = useState(0);

  const lie = () => {
    // All three read the same `count` from this render → only +1 lands.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  const truth = () => {
    // Each update queues against the latest queued value → +3.
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="font-mono text-5xl tabular-nums text-emerald-400">
        {count}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={lie}
          className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-500/20"
        >
          +1 ×3 (stale read → +1)
        </button>
        <button
          onClick={truth}
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
        >
          +1 ×3 (functional → +3)
        </button>
        <button
          onClick={() => setCount(0)}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-500"
        >
          reset
        </button>
      </div>
      <p className="max-w-md text-xs leading-relaxed text-zinc-500">
        The red button calls <code className="text-zinc-300">setCount(count + 1)</code>{' '}
        three times — all three read the same stale <code>count</code>, so React
        batches them into a single +1. The green button uses the functional
        updater and correctly lands +3.
      </p>
    </div>
  );
}
