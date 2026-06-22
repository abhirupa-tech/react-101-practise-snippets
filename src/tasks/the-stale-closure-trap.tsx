import { useEffect, useRef, useState } from 'react';

/**
 * Drill #3 — The Stale Closure Trap
 *
 * A setInterval created once in an empty-dep useEffect closes over `count`
 * from the first render forever, so `setCount(count + 1)` always computes
 * 0 + 1 = 1 and the counter freezes at 1. Two fixes:
 *   1. Functional update — `setCount(c => c + 1)` ignores the captured value.
 *   2. Ref mirror — read the latest value from a ref inside the interval.
 */
type Mode = 'broken' | 'functional' | 'ref';

export default function TheStaleClosureTrap() {
  const [mode, setMode] = useState<Mode>('broken');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {(['broken', 'functional', 'ref'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg border px-3 py-1.5 text-sm capitalize transition ${
              mode === m
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Remount on mode change so each variant starts clean. */}
      <Ticker key={mode} mode={mode} />

      <p className="max-w-md text-xs leading-relaxed text-zinc-500">
        <strong className="text-rose-300">broken</strong> freezes at 1 — the
        interval captured <code>count = 0</code> on mount.{' '}
        <strong className="text-emerald-300">functional</strong> and{' '}
        <strong className="text-emerald-300">ref</strong> both keep climbing.
      </p>
    </div>
  );
}

function Ticker({ mode }: { mode: Mode }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    const id = setInterval(() => {
      if (mode === 'broken') {
        setCount(count + 1); // stale: `count` is always 0 here
      } else if (mode === 'functional') {
        setCount((c) => c + 1);
      } else {
        setCount(countRef.current + 1);
      }
    }, 500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="font-mono text-5xl tabular-nums text-emerald-400">
      {count}
    </div>
  );
}
