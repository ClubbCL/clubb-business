import { ProtectedRoute } from '@components';
import { AccountCreated, Auth, ResetPasswordEmailSent, ResetPasswordSuccess, Root } from '@pages';
import { createBrowserRouter } from 'react-router-dom';

export const ROUTES = {
  root: '/',
  signin: '/signin',
  signup: '/signup',
  accountCreated: '/account-created',
  resetPasswordEmailSent: '/reset-password-email-sent',
  restPasswordSuccess: '/reset-password-success',
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
    path: ROUTES.restPasswordSuccess,
    element: <ResetPasswordSuccess />,
  },
  {
    path: ROUTES.resetPasswordEmailSent,
    element: <ResetPasswordEmailSent />,
  },
  {
    path: ROUTES.accountCreated,
    element: <AccountCreated />,
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
