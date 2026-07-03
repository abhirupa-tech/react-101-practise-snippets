import { difficultyLabel } from '../lib/tasks';
import type { Task } from '../types';

interface StarRatingProps {
  difficulty: Task['difficulty'];
  showLabel?: boolean;
}

const tone: Record<Task['difficulty'], string> = {
  1: 'text-emerald-400',
  2: 'text-amber-400',
  3: 'text-rose-400',
};

export function StarRating({ difficulty, showLabel = false }: StarRatingProps) {
  return (
    <span
      className="inline-flex items-center gap-1"
      title={`${difficultyLabel[difficulty]} (${difficulty}/3)`}
      aria-label={`Difficulty ${difficulty} of 3, ${difficultyLabel[difficulty]}`}
    >
      <span className={`text-sm leading-none ${tone[difficulty]}`}>
        {'★'.repeat(difficulty)}
        <span className="text-ink-700">{'★'.repeat(3 - difficulty)}</span>
      </span>
      {showLabel && (
        <span className="text-xs text-ink-500">{difficultyLabel[difficulty]}</span>
      )}
    </span>
  );
}
