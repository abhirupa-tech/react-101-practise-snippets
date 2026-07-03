import { useEffect, useState } from 'react';

/**
 * Drill #4 — Strict Mode Double-Fire
 *
 * In React 18+ dev mode, `useEffect` fires *twice* on mount (mount → unmount →
 * remount) to surface bugs in cleanup logic. This double-invoke only happens in
 * development — production mounts once.
 *
 * TODO:
 *   1. Call a fake "API" inside useEffect and log each call to a visible list.
 *   2. Watch the log double in dev Strict Mode.
 *   3. Add an AbortController / ignore-flag cleanup so the second invoke is
 *      harmless, then explain why the pattern is safe in production.
 */
export default function StrictModeDoubleFire() {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    // TODO: simulate an API call here and append to `log`.
    // Notice it fires twice in dev. Add cleanup so the second call is a no-op.
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs text-zinc-500">effect log</p>
          <button
            onClick={() => setLog([])}
            className="rounded border border-zinc-700 px-2 py-0.5 font-mono text-[11px] text-zinc-500 transition hover:border-zinc-500 hover:text-zinc-300"
          >
            clear
          </button>
        </div>
        {log.length === 0 ? (
          <p className="text-xs text-zinc-600">Nothing logged yet…</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {log.map((entry, i) => (
              <li key={i} className="font-mono text-xs text-emerald-300">
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="max-w-md text-xs leading-relaxed text-zinc-500">
        Why does the log show two entries in dev but only one in production?
        What should your cleanup function return to make the double-fire safe?
      </p>
    </div>
  );
}
