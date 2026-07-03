import { Link } from 'react-router-dom';
import { getNeighbours } from '../lib/tasks';
import type { Task } from '../types';

interface TaskNavProps {
  slug: string;
}

const dot: Record<Task['difficulty'], string> = {
  1: 'bg-emerald-400',
  2: 'bg-amber-400',
  3: 'bg-rose-400',
};

function NavItem({ task, active }: { task: Task; active?: boolean }) {
  return (
    <Link
      to={`/task/${task.slug}`}
      title={task.title}
      className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition ${
        active
          ? 'bg-ink-800 text-ink-50'
          : 'text-ink-500 hover:bg-ink-900 hover:text-ink-50'
      }`}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${dot[task.difficulty]}`} />
      <span className="w-7 shrink-0 font-mono text-[11px] text-ink-600">
        {String(task.id).padStart(2, '0')}
      </span>
      <span className="truncate text-[12.5px]">{task.title}</span>
    </Link>
  );
}

/**
 * Floating vertical navigation showing the 10 drills before and 10 after the
 * current one, so you can hop around without returning to the index.
 */
export function TaskNav({ slug }: TaskNavProps) {
  const { before, current, after } = getNeighbours(slug, 10);
  if (!current) return null;

  return (
    <nav className="sticky top-6 max-h-[calc(100vh-3rem)] w-64 shrink-0 overflow-y-auto rounded-2xl border border-ink-800 bg-ink-900/40 p-3 backdrop-blur">
      <Link
        to="/"
        className="mb-2 flex items-center gap-2 px-2.5 py-1.5 text-xs text-ink-400 transition hover:text-accent"
      >
        ← All drills
      </Link>

      <p className="px-2.5 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-ink-600">
        Earlier
      </p>
      <div className="flex flex-col gap-0.5">
        {before.map((t) => (
          <NavItem key={t.slug} task={t} />
        ))}
      </div>

      <p className="px-2.5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-ink-600">
        Now
      </p>
      <NavItem task={current} active />

      <p className="px-2.5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-wider text-ink-600">
        Up next
      </p>
      <div className="flex flex-col gap-0.5">
        {after.map((t) => (
          <NavItem key={t.slug} task={t} />
        ))}
      </div>
    </nav>
  );
}
