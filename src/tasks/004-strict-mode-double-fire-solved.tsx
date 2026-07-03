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
  const [msg, setMsg] = useState("Hello ");

  useEffect(() => {
    setMsg((msg) => msg + " World");
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-xs text-zinc-500">{msg}</p>
         
        </div>
      </div>
    </div>
  );
}
