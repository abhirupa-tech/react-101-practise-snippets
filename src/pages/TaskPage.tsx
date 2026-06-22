import { Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TaskNav } from '../components/TaskNav';
import { Terminal } from '../components/Terminal';
import { CodeBlock } from '../components/CodeBlock';
import { StarRating } from '../components/StarRating';
import { DemoBoundary } from '../components/DemoBoundary';
import { getTask, difficultyLabel } from '../lib/tasks';
import { getImpl, getSource, hasImpl, starterStub } from '../lib/registry';
import { NotFoundPage } from './NotFoundPage';

export function TaskPage() {
  const { slug = '' } = useParams();
  const task = getTask(slug);

  if (!task) return <NotFoundPage />;

  const Impl = getImpl(slug);
  const live = hasImpl(slug);
  const source = getSource(slug) ?? starterStub(task);
  const filename = `${slug}.tsx`;

  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-6 py-6">
      {/* Left — floating vertical nav */}
      <aside className="hidden lg:block">
        <TaskNav slug={slug} />
      </aside>

      {/* Right of nav — header + two content columns */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-ink-800 pb-5">
          <div className="flex items-center gap-3 text-xs text-ink-500">
            <Link to="/" className="transition hover:text-accent lg:hidden">
              ← All drills
            </Link>
            <span className="font-mono">
              #{String(task.id).padStart(3, '0')}
            </span>
            <span>·</span>
            <span>{task.category}</span>
            {task.company && (
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-indigo-300">
                {task.company}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight">
              {task.title}
            </h1>
            <StarRating difficulty={task.difficulty} showLabel />
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] ${
                live
                  ? 'border border-accent-dim bg-accent/10 text-accent'
                  : 'border border-ink-800 text-ink-500'
              }`}
            >
              {live ? 'live demo' : 'starter'}
            </span>
          </div>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-400">
            {task.description.replace(/[*`]/g, '')}
          </p>
        </header>

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Middle — live implementation */}
          <section className="flex min-h-0 flex-col">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-600">
              Implementation
            </h2>
            <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-ink-800 bg-ink-900/40 p-6">
              {Impl ? (
                <DemoBoundary resetKey={slug}>
                  <Suspense
                    fallback={
                      <div className="text-sm text-ink-500">Loading demo…</div>
                    }
                  >
                    <Impl />
                  </Suspense>
                </DemoBoundary>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <p className="text-sm text-ink-400">
                    No implementation yet — this one's yours to build.
                  </p>
                  <p className="max-w-sm text-xs text-ink-600">
                    Drop a component at{' '}
                    <code className="font-mono text-ink-400">
                      src/tasks/{filename}
                    </code>{' '}
                    (default export) and it renders here, with its source in the
                    terminal.
                  </p>
                  <p className="mt-1 text-xs text-ink-600">
                    {difficultyLabel[task.difficulty]} · time-box it · no AI.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right — terminal code preview */}
          <section className="flex min-h-0 flex-col">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-600">
              Source
            </h2>
            <div className="min-h-0 flex-1">
              <Terminal filename={filename} copyText={source}>
                <CodeBlock code={source} />
              </Terminal>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
