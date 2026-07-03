import { useEffect, useState } from 'react';

/**
 * Drill #3 — The Stale Closure Trap
 *
 * A setInterval created once in an empty-dep useEffect closes over `count`
 * from the first render forever, so `setCount(count + 1)` always computes
 * 0 + 1 = 1 and the counter freezes at 1.
 *
 * TODO: Fix the stale closure so the counter keeps climbing.
 *       Hint: there are (at least) two ways — one uses a functional updater,
 *       the other uses a ref.
 */
export default function TheStaleClosureTrap() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="font-mono text-5xl tabular-nums text-emerald-400">
        {count}
      </div>
      <p className="max-w-md text-xs leading-relaxed text-zinc-500">
        The counter should climb every 500 ms — but it freezes at 1. Why?
        Fix it without adding <code>count</code> to the dependency array.
      </p>
    </div>
  );
}
