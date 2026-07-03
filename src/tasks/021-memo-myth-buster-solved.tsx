import { memo, useRef, useState } from 'react';

/**
 * Drill #21 — Memo Myth-Buster
 *
 * React.memo only skips a re-render if every prop is referentially equal. Pass
 * a fresh inline arrow each render and memo is defeated — the child still
 * re-renders even though nothing meaningful changed.
 *
 * TODO: Stop the child from re-rendering on every parent re-render.
 *       Hint: the problem is in how `handler` is defined.
 */
const Child = memo(function Child({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-zinc-700 px-4 py-3 text-left text-sm transition hover:border-zinc-500"
    >
      <div className="text-zinc-200">{label}</div>
      <div className="font-mono text-xs text-zinc-500">
        child renders: <span className="text-amber-400">{renders.current}</span>
      </div>
    </button>
  );
});

export default function MemoMythBuster() {
  const [, force] = useState(0);
  const rerender = () => force((n) => n + 1);

  // BUG: fresh function identity every render → memo can't help.
  const handler = () => {};

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={rerender}
        className="self-start rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
      >
        Re-render parent
      </button>

      <Child label="memoised child" onClick={handler} />

      <p className="max-w-md text-xs leading-relaxed text-zinc-500">
        Click "Re-render parent" a few times. The render count keeps climbing
        even though <code>Child</code> is wrapped in <code>memo</code>. Why?
        Fix it so the count stays at 1.
      </p>
    </div>
  );
}
