import { ProtectedRoute } from '@components';
import {
  AccountCreated,
  Auth,
  ClubbSignup,
  CompleteProfile,
  FakePage,
  Members,
  Points,
  ProfileStep1,
  ProfileStep2,
  Redeem,
  ResetPasswordEmailSent,
  ResetPasswordSuccess,
  Root,
} from '@pages';
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
  settings: '/settings',
  profile: '/profile',
  companyProfile: '/company-profile',
  redeem: '/redeem',
  completeProfile: '/complete-profile',
  completeProfileStep1: '/complete-profile/step-1',
  completeProfileStep2: '/complete-profile/step-2',
  clubbSifnup: '/clubb-signup',
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
        element: <FakePage title="Home" />,
      },
      {
        path: ROUTES.members,
        element: <Members />,
      },
      {
        path: ROUTES.analytics,
        element: <FakePage title="Analytics" />,
      },
      {
        path: ROUTES.points,
        element: <Points />,
      },
      {
        path: ROUTES.levels,
        element: <FakePage title="Levels" />,
      },
      {
        path: ROUTES.myTeam,
        element: <FakePage title="My Team" />,
      },
      {
        path: ROUTES.help,
        element: <FakePage title="Help" />,
      },
      {
        path: ROUTES.qrDownload,
        element: <FakePage title="QR Download" />,
      },
      {
        path: ROUTES.shareLink,
        element: <FakePage title="Share Link" />,
      },
      {
        path: ROUTES.settings,
        element: <FakePage title="Settings" />,
      },
      {
        path: ROUTES.profile,
        element: <FakePage title="Profile" />,
      },
      {
        path: ROUTES.companyProfile,
        element: <FakePage title="Company Profile" />,
      },
      {
        path: ROUTES.redeem,
        element: <Redeem />,
      },
    ],
  },
  {
    path: ROUTES.completeProfile,
    element: (
      <ProtectedRoute>
        <CompleteProfile />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.completeProfileStep1,
        element: <ProfileStep1 />,
      },
      {
        path: ROUTES.completeProfileStep2,
        element: <ProfileStep2 />,
      },
    ],
  },
  {
    path: ROUTES.clubbSifnup,
    element: (
      <ProtectedRoute>
        <ClubbSignup />
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
