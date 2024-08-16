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
  home: '/home',
  members: '/members',
  analytics: '/analytics',
  points: '/points',
  levels: '/levels',
  myTeam: '/my-team',
  help: '/help',
  qrDownload: '/qr-download',
  shareLink: '/share-link',
};

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: ROUTES.root,
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.home,
        element: <div>Home</div>,
      },
      {
        path: ROUTES.members,
        element: <div>Members</div>,
      },
      {
        path: ROUTES.analytics,
        element: <div>Analytics</div>,
      },
      {
        path: ROUTES.points,
        element: <div>Points</div>,
      },
      {
        path: ROUTES.levels,
        element: <div>Levels</div>,
      },
      {
        path: ROUTES.myTeam,
        element: <div>My Team</div>,
      },
      {
        path: ROUTES.help,
        element: <div>Help</div>,
      },
      {
        path: ROUTES.qrDownload,
        element: <div>QR Download</div>,
      },
      {
        path: ROUTES.shareLink,
        element: <div>Share</div>,
      },
    ],
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
