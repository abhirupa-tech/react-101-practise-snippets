import { useState } from 'react';

/**
 * Drill #2 — Key Crime Scene
 *
 * Each row owns local state (a checkbox). When the list is keyed by array
 * index, removing/reordering items keeps the same keys in the same positions,
 * so React reuses the wrong DOM node and the local state "scrambles" — the
 * check stays with the slot, not the item. Keying by a stable id fixes it.
 */
interface Item {
  id: number;
  label: string;
}

const initial: Item[] = [
  { id: 1, label: 'Buy milk' },
  { id: 2, label: 'Walk dog' },
  { id: 3, label: 'Write drill' },
  { id: 4, label: 'Ship it' },
];

function Row({ item }: { item: Item }) {
  const [done, setDone] = useState(false);
  return (
    <label className="flex items-center gap-2 rounded-md border border-zinc-800 px-3 py-2 text-sm">
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => setDone(e.target.checked)}
        className="accent-emerald-400"
      />
      <span className={done ? 'text-zinc-500 line-through' : 'text-zinc-200'}>
        {item.label}
      </span>
    </label>
  );
}

export default function KeyCrimeScene() {
  const [items, setItems] = useState(initial);
  const [useIndexKey, setUseIndexKey] = useState(true);

  const removeFirst = () => setItems((xs) => xs.slice(1));
  const reset = () => setItems(initial);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={removeFirst}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500"
        >
          Remove first
        </button>
        <button
          onClick={reset}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-400 transition hover:border-zinc-500"
        >
          Reset
        </button>
        <label className="ml-auto flex items-center gap-2 text-xs text-zinc-400">
          <input
            type="checkbox"
            checked={useIndexKey}
            onChange={(e) => setUseIndexKey(e.target.checked)}
            className="accent-rose-400"
          />
          key = index (buggy)
        </label>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <Row key={useIndexKey ? i : item.id} item={item} />
        ))}
      </div>

      <p className="max-w-md text-xs leading-relaxed text-zinc-500">
        Check a couple of boxes, then “Remove first”. With{' '}
        <code className="text-rose-300">key = index</code> the checks stay glued
        to their <em>position</em> and jump to the wrong item. Toggle it off to
        key by stable id and watch the checks follow the right rows.
      </p>
    </div>
  );
}
