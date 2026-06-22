import rawTasks from '../data/tasks.json';
import type { Task } from '../types';

export const tasks: Task[] = (rawTasks as Task[])
  .slice()
  .sort((a, b) => a.id - b.id);

const bySlug = new Map(tasks.map((t) => [t.slug, t]));
const indexBySlug = new Map(tasks.map((t, i) => [t.slug, i]));

export function getTask(slug: string): Task | undefined {
  return bySlug.get(slug);
}

/**
 * Returns up to `radius` tasks before and after the given slug, plus the
 * current task — used to build the floating side nav.
 */
export function getNeighbours(slug: string, radius = 10) {
  const idx = indexBySlug.get(slug);
  if (idx === undefined) return { before: [], current: undefined, after: [] };
  return {
    before: tasks.slice(Math.max(0, idx - radius), idx),
    current: tasks[idx],
    after: tasks.slice(idx + 1, idx + 1 + radius),
  };
}

export const difficultyLabel: Record<Task['difficulty'], string> = {
  1: 'Warm-up',
  2: 'Rust-check',
  3: 'Senior-bar',
};
