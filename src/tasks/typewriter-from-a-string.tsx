import { useEffect, useRef, useState } from 'react';

/**
 * Drill #71 — Typewriter From a String
 *
 * The "hello world" of agent UIs: fake streaming by revealing a hardcoded
 * string one character at a time. An interval advances an index; cleanup clears
 * it so React Strict Mode's double-mount (and restarts) never leak timers.
 */
const SCRIPT =
  'Streaming, one token at a time… this is how an agent UI feels before the real SSE shows up.';

export default function TypewriterFromAString() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(true);
  const speed = useRef(35);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setCount((n) => {
        if (n >= SCRIPT.length) return n;
        return n + 1;
      });
    }, speed.current);
    return () => clearInterval(id);
  }, [running]);

  const done = count >= SCRIPT.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-28 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 font-mono text-sm leading-relaxed text-zinc-200">
        {SCRIPT.slice(0, count)}
        {!done && (
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-emerald-400" />
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          disabled={done}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500 disabled:opacity-40"
        >
          {running ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={() => {
            setCount(0);
            setRunning(true);
          }}
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
        >
          Replay
        </button>
        <span className="ml-auto self-center font-mono text-xs text-zinc-600">
          {count}/{SCRIPT.length}
        </span>
      </div>
    </div>
  );
}
