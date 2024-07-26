import { Auth } from '@pages';
import { createBrowserRouter } from 'react-router-dom';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/signin',
    element: <Auth />,
  },
  {
    path: '/signup',
    element: <Auth />,
  },
  {
    path: '/forgot-password',
    element: <Auth />,
  },
  {
    path: '/reset-password',
    element: <Auth />,
  },
]);
