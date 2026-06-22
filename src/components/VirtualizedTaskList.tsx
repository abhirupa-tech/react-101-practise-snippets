import { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TaskCard } from './TaskCard';
import type { Task } from '../types';

const GAP = 24; // gutter between cards, both axes
const ESTIMATED_ROW = 232; // first-paint guess; real heights are measured

function columnsForWidth(w: number): number {
  if (w >= 1100) return 3;
  if (w >= 720) return 2;
  return 1;
}

/**
 * A windowed grid: only the rows currently in view are mounted, so the full
 * 100-card list scrolls smoothly. Row heights are *measured* (cards grow with
 * their content, especially at 1 column) so rows never overlap, and columns
 * adapt to the container width.
 */
export function VirtualizedTaskList({ tasks }: VirtualizedTaskListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    const update = () => setColumns(columnsForWidth(el.clientWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rowCount = Math.ceil(tasks.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ROW,
    overscan: 4,
    // Measure the real rendered height of each row so variable-height cards
    // (and the bottom gutter) are accounted for exactly.
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  // Re-measure when the column count changes, since row contents change.
  useEffect(() => {
    rowVirtualizer.measure();
  }, [columns, rowVirtualizer]);

  return (
    <div ref={parentRef} className="h-full overflow-y-auto overflow-x-hidden">
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const start = virtualRow.index * columns;
          const rowTasks = tasks.slice(start, start + columns);
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className="absolute left-0 top-0 w-full"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <div
                className="grid items-stretch"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  gap: GAP,
                  paddingBottom: GAP,
                }}
              >
                {rowTasks.map((task) => (
                  <TaskCard key={task.slug} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface VirtualizedTaskListProps {
  tasks: Task[];
}
