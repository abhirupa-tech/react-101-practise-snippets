import { useRef, useState, ChangeEvent } from 'react';

/**
 * Drill #6 — Controlled Chaos
 *
 * Side-by-side: a controlled input (React owns the value via state) and an
 * uncontrolled input (the DOM owns the value; React reads it on demand via ref).
 *
 * Key difference: the controlled input re-renders on every keystroke — you can
 * see the render count tick up. The uncontrolled input never triggers a re-render
 * while you type; React only reads the DOM node when you explicitly ask for it.
 */
export default function ControlledChaos() {
  const [renderCount, setRenderCount] = useState(0);
  const [controlledText, setControlledText] = useState('');

  // Uncontrolled: ref points directly at the DOM node. No state, no re-renders.
  const uncontrolledRef = useRef<HTMLInputElement>(null);
  const [uncontrolledSnapshot, setUncontrolledSnapshot] = useState<string | null>(null);

  const onControlledChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRenderCount((n) => n + 1);
    setControlledText(event.target.value);
  };

  const readUncontrolled = () => {
    setUncontrolledSnapshot(uncontrolledRef.current?.value ?? '');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── Controlled ── */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Controlled — re-renders: {renderCount}
        </p>
        <input
          type="text"
          value={controlledText}
          onChange={onControlledChange}
          placeholder="Type here…"
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-300 placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
        <p className="text-xs text-zinc-600">
          React holds the value: <span className="text-zinc-400">"{controlledText}"</span>
        </p>
      </div>

      <div className="border-t border-zinc-800" />

      {/* ── Uncontrolled ── */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Uncontrolled — DOM owns the value
        </p>
        <input
          ref={uncontrolledRef}
          type="text"
          defaultValue=""
          placeholder="Type here…"
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-300 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <button
          onClick={readUncontrolled}
          className="self-start rounded-md border border-zinc-700 px-3 py-1 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
        >
          Read value
        </button>
        {uncontrolledSnapshot !== null && (
          <p className="text-xs text-zinc-600">
            Last read: <span className="text-zinc-400">"{uncontrolledSnapshot}"</span>
          </p>
        )}
      </div>
    </div>
  );
}
