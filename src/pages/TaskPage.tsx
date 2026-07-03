import { Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TaskNav } from '../components/TaskNav';
import { Terminal } from '../components/Terminal';
import { CodeBlock } from '../components/CodeBlock';
import { StarRating } from '../components/StarRating';
import { DemoBoundary } from '../components/DemoBoundary';
import { getTask, difficultyLabel } from '../lib/tasks';
import { getImpl, getSource, getFilename, starterStub } from '../lib/registry';
import { NotFoundPage } from './NotFoundPage';

function SolutionToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2">
      <span className={`text-xs transition ${value ? 'text-ink-500' : 'text-ink-300'}`}>
        Exercise
      </span>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-5 w-9 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          value ? 'bg-emerald-500' : 'bg-ink-700'
        }`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className={`text-xs transition ${value ? 'text-emerald-300' : 'text-ink-500'}`}>
        Solution
      </span>
    </label>
  );
}

export function TaskPage() {
  const { slug = '' } = useParams();
  const task = getTask(slug);

  const [showSolution, setShowSolution] = useState(false);

  // Reset the toggle on every navigation (router wrapper also remounts, but
  // this guards against any future cases where remount is skipped).
  useEffect(() => {
    setShowSolution(false);
  }, [slug]);

  if (!task) return <NotFoundPage />;

  const variant: 'default' | 'solved' = showSolution ? 'solved' : 'default';
  const Impl     = getImpl(slug, variant);
  const source   = getSource(slug, variant) ?? starterStub(task);
  const filename = getFilename(task, variant);

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

          <div className="mt-2 flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h1 className="text-xl font-semibold tracking-tight">
                {task.title}
              </h1>
              <StarRating difficulty={task.difficulty} showLabel />
              <span className="rounded-full border border-accent-dim bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                live demo
              </span>
            </div>

            <div className="shrink-0">
              <SolutionToggle value={showSolution} onChange={setShowSolution} />
            </div>
          </div>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-400">
            {task.description.replace(/[*`]/g, '')}
          </p>
        </header>

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Left — live implementation */}
          <section className="flex min-h-0 flex-col">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-ink-600">
              Implementation
            </h2>
            <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-ink-800 bg-ink-900/40 p-6">
              {Impl ? (
                <DemoBoundary resetKey={`${slug}-${variant}`}>
                  <Suspense
                    fallback={
                      <div className="text-sm text-ink-500">Loading…</div>
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
                    {difficultyLabel[task.difficulty]} · time-box it · no AI.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right — terminal source view */}
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
