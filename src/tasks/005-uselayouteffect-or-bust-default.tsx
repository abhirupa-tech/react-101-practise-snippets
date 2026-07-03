import { useEffect, useRef, useState } from 'react';

/**
 * Drill #5 — useLayoutEffect or Bust
 *
 * The tooltip below is positioned by measuring the button's DOM rect inside
 * `useEffect`. Because `useEffect` fires *after* the browser has already
 * painted, the tooltip briefly appears at (0, 0) before jumping to the correct
 * position — a visible flicker on every show.
 *
 * TODO:
 *   1. Hover the button and notice the tooltip flicker / jump.
 *   2. Switch `useEffect` → `useLayoutEffect` and observe the flicker disappear.
 *   3. Explain *why* the timing difference fixes it.
 */
export default function UseLayoutEffectOrBust() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const buttonRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // BUG: useEffect runs after paint → tooltip flickers from (0,0) to final pos.
  // TODO: replace with useLayoutEffect to fix the flicker.
  useEffect(() => {
    if (showTooltip && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({ x: rect.left, y: rect.top - 40 });
    }
  }, [showTooltip]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={buttonRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="inline-flex cursor-default items-center rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-200 transition hover:border-zinc-500"
      >
        Hover me to show tooltip
      </div>

      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{ position: 'fixed', top: coords.y, left: coords.x }}
          className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-100 shadow-lg"
        >
          I flickered on the way here 👋
        </div>
      )}

      <p className="max-w-md text-xs leading-relaxed text-zinc-500">
        Can you spot the flicker? Switch to{' '}
        <code className="text-amber-300">useLayoutEffect</code> and it vanishes.
      </p>
    </div>
  );
}
