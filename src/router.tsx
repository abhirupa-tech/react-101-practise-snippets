import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/task/:slug', element: <TaskPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
