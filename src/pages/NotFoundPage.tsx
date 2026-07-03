import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-ink-600">404</p>
      <h1 className="text-2xl font-semibold">This drill doesn't exist</h1>
      <p className="max-w-md text-sm text-ink-400">
        The drill you're looking for isn't in the list. It may have been renamed.
      </p>
      <Link
        to="/"
        className="rounded-lg border border-accent-dim bg-accent/10 px-4 py-2 text-sm text-accent transition hover:bg-accent/20"
      >
        ← Back to all drills
      </Link>
    </div>
  );
}
