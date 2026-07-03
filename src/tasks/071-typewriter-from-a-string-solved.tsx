import { useEffect, useState } from 'react';

/**
 * Drill #71 — Typewriter From a String
 *
 * Reveal a hardcoded string one character at a time using setInterval, so it
 * feels like streaming text. Don't forget to clean up the interval so timers
 * don't leak when the component unmounts or re-mounts (React Strict Mode
 * double-mounts components in development).
 *
 * TODO: Implement the typewriter effect.
 *   1. Track how many characters to show (start at 0).
 *   2. Use setInterval to advance the count every ~35 ms.
 *   3. Stop when the full string is revealed.
 *   4. Clear the interval on cleanup.
 *   5. Wire up the Replay button.
 */
const SCRIPT =
  'Streaming, one token at a time… this is how an agent UI feels before the real SSE shows up.';

export default function TypewriterFromAString() {
  const [count, setCount] = useState(0);

  // TODO: add the interval effect here

  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-28 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 font-mono text-sm leading-relaxed text-zinc-200">
        {/* TODO: show only the first `count` characters of SCRIPT */}
        {SCRIPT.slice(0, count)}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCount(0)}
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
