import { ProtectedRoute } from '@components';
import { Auth, Root } from '@pages';
import { createBrowserRouter } from 'react-router-dom';

export const ROUTES = {
  root: '/',
  signin: '/signin',
  signup: '/signup',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
};

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: ROUTES.root,
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.signin,
    element: <Auth />,
  },
  {
    path: ROUTES.signup,
    element: <Auth />,
  },
  {
    path: ROUTES.forgotPassword,
    element: <Auth />,
  },
  {
    path: ROUTES.resetPassword,
    element: <Auth />,
  },
]);
