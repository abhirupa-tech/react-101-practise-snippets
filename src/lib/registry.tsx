import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { Task } from '../types';

/**
 * Every drill ships exactly two files under src/tasks/:
 *   {id_padded}-{slug}-default.tsx   — the exercise scaffold
 *   {id_padded}-{slug}-solved.tsx    — the solution (may be identical until solved)
 *
 * This module globs all task files, extracts slug + variant from the filename,
 * and exposes type-safe helpers used by TaskPage.
 */

// ── Glob imports ──────────────────────────────────────────────────────────────

const implModules = import.meta.glob('../tasks/*.tsx') as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;

const rawModules = import.meta.glob('../tasks/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// ── Build slug → { default, solved } path map ─────────────────────────────────
//    Filename pattern: 001-the-liars-counter-default.tsx

type VariantEntry = { default?: string; solved?: string };
const variantMap = new Map<string, VariantEntry>();

for (const path of Object.keys(rawModules)) {
  const filename = path.split('/').pop()!;
  const m = filename.match(/^\d{3}-(.+)-(default|solved)\.tsx$/);
  if (!m) continue;
  const [, slug, variant] = m as [string, string, 'default' | 'solved'];
  if (!variantMap.has(slug)) variantMap.set(slug, {});
  variantMap.get(slug)![variant] = path;
}

// ── Lazy-component cache (avoids creating a new React type on every render) ───
const lazyCache = new Map<string, LazyExoticComponent<ComponentType>>();

function makeLazy(path: string): LazyExoticComponent<ComponentType> | null {
  if (lazyCache.has(path)) return lazyCache.get(path)!;
  const loader = implModules[path];
  if (!loader) return null;
  const component = lazy(loader);
  lazyCache.set(path, component);
  return component;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** True when the drill has both -default and -solved variant files. */
export function hasVariants(slug: string): boolean {
  return variantMap.has(slug);
}

/** True when the drill has any implementation (always true after full migration). */
export function hasImpl(slug: string): boolean {
  return variantMap.has(slug);
}

/** Returns a lazy-loaded component for the given variant. */
export function getImpl(
  slug: string,
  variant: 'default' | 'solved' = 'default',
): LazyExoticComponent<ComponentType> | null {
  const path = variantMap.get(slug)?.[variant];
  if (!path) return null;
  return makeLazy(path);
}

/** Returns the raw source string for the given variant. */
export function getSource(
  slug: string,
  variant: 'default' | 'solved' = 'default',
): string | null {
  const path = variantMap.get(slug)?.[variant];
  if (!path) return null;
  return rawModules[path] ?? null;
}

/** Filename shown in the terminal chrome for the given drill and variant. */
export function getFilename(task: Task, variant: 'default' | 'solved'): string {
  const id = String(task.id).padStart(3, '0');
  return `${id}-${task.slug}-${variant}.tsx`;
}

/** A friendly TypeScript starter stub — kept for fallback/debugging use. */
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

import { useState } from 'react';

export default function ${comp}() {
  const [state, setState] = useState(0);

  return (
    <div>
      <h2>${task.title}</h2>
      {/* TODO: your turn */}
      <button onClick={() => setState((n) => n + 1)}>
        clicked {state} times
      </button>
    </div>
  );
}
`;
}
