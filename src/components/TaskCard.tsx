import { Link } from 'react-router-dom';
import { StarRating } from './StarRating';
import { hasImpl } from '../lib/registry';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const live = hasImpl(task.slug);

  return (
    <Link
      to={`/task/${task.slug}`}
      className="group relative flex h-full flex-col gap-3 rounded-2xl border border-ink-800 bg-ink-900/50 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-ink-700 hover:bg-ink-900 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-ink-500">
          #{String(task.id).padStart(3, '0')}
        </span>
        <StarRating difficulty={task.difficulty} />
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-ink-50 transition group-hover:text-accent">
        {task.title}
      </h3>

      <p className="line-clamp-3 text-[13px] leading-relaxed text-ink-400">
        {task.description.replace(/[*`]/g, '')}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <span className="rounded-full border border-ink-800 px-2 py-0.5 text-[11px] text-ink-500">
          {task.category}
        </span>
        {task.company && (
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] text-indigo-300">
            {task.company}
          </span>
        )}
        {live ? (
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-accent">
            <span className="size-1.5 rounded-full bg-accent" /> live
          </span>
        ) : (
          <span className="ml-auto text-[11px] text-ink-600">starter</span>
        )}
      </div>
    </Link>
  );
}
