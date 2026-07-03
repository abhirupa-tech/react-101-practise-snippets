import { createBrowserRouter, useParams } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Wrapper that forces a full remount of TaskPage on every slug change.
 * Without `key`, React Router keeps the same component instance mounted
 * when navigating between /task/a → /task/b, which can leave stale lazy
 * components or state in place. key={slug} guarantees a clean slate.
 */
function TaskPageRoute() {
  const { slug = '' } = useParams();
  return <TaskPage key={slug} />;
}

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/task/:slug', element: <TaskPageRoute /> },
  { path: '*', element: <NotFoundPage /> },
]);
