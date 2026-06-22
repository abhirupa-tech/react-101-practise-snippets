import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { Task } from '../types';

/**
 * Each drill *may* ship a live implementation at `src/tasks/<slug>.tsx`
 * exporting a default React component. We wire two glob imports:
 *  - lazy module loaders for the rendered demo (middle column)
 *  - eager raw source strings for the terminal code preview (right column)
 *
 * Drills without a file yet fall back to a placeholder + a starter stub, so
 * the whole 100-drill grid is navigable from day one.
 */
const implModules = import.meta.glob('../tasks/*.tsx') as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;

const rawModules = import.meta.glob('../tasks/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const key = (slug: string) => `../tasks/${slug}.tsx`;

export function hasImpl(slug: string): boolean {
  return key(slug) in implModules;
}

export function getImpl(
  slug: string,
): LazyExoticComponent<ComponentType> | null {
  const loader = implModules[key(slug)];
  return loader ? lazy(loader) : null;
}

export function getSource(slug: string): string | null {
  return rawModules[key(slug)] ?? null;
}

/** A friendly TypeScript starter stub for drills not yet implemented. */
export function starterStub(task: Task): string {
  const comp = task.slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');

  return `// Drill #${task.id} — ${task.title}
//
// ${task.description}
//
// Difficulty: ${'★'.repeat(task.difficulty)}${'☆'.repeat(3 - task.difficulty)}
// Category: ${task.category}
//
// No AI autocomplete. Time-box it. Narrate it when you're done.

import { useState } from 'react';

export default function ${comp}() {
  const [state, setState] = useState(0);

  return (
    <div>
      <h2>${task.title}</h2>
      {/* TODO: your turn — build it here. */}
      <button onClick={() => setState((n) => n + 1)}>
        clicked {state} times
      </button>
    </div>
  );
}
`;
}
