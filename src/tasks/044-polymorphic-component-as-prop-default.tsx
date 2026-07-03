import { useState } from 'react';

/**
 * Drill #44 — Polymorphic Component (`as` prop)
 *
 * A <Button as="a"> that renders different elements based on a prop, with correct TypeScript typing.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · Component Design Patterns
 */
export default function PolymorphicComponentAsProp() {
  const [, rerender] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-400">
        TODO — build your solution here.
      </p>
      <button
        onClick={() => rerender((n) => n + 1)}
        className="self-start rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500"
      >
        re-render
      </button>
    </div>
  );
}
