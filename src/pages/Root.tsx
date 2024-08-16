import { ClubSelector } from '@/components/ClubSelector';
import { HelpMenu } from '@/components/HelpMenu';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/router';
import { AppLayout } from '@components/AppLayout';
import { NavSection, Sidebar } from '@components/Sidebar';
import { Button } from '@ui/button';
import { useTranslation } from 'react-i18next';
import { matchPath, Outlet, useLocation } from 'react-router-dom';

export const Root = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const location = useLocation();
  const pathname = location.pathname;

  const topContent = (
    <ClubSelector
      defaultValue="kross-bar"
      clubs={[
        { name: 'Kross Bar', value: 'kross-bar' },
        { name: 'Teclados', value: 'teclados' },
        { name: 'Barba Negra', value: 'barba-negra' },
      ]}
    />
  );

  const bottomContent = (
    <HelpMenu
      title={t('components.sidebar.helpMenu.title')}
      items={[
        {
          icon: 'book-check',
          title: t('components.sidebar.helpMenu.documentation'),
          href: 'https://google.com',
          id: 'documentation',
        },
        {
          icon: 'headset',
          title: t('components.sidebar.helpMenu.helpCenter'),
          href: 'https://google.com',
          id: 'help-center',
        },
        {
          icon: 'file-text',
          title: t('components.sidebar.helpMenu.blog'),
          href: 'https://google.com',
          id: 'blog',
        },
      ]}
    />
  );

  const navigationContent = (
    <>
      <NavSection
        items={[
          {
            id: 'home',
            icon: 'house',
            title: t('components.sidebar.navigation.home'),
            isSelected: !!matchPath(ROUTES.home, pathname),
            paidFeature: false,
            to: ROUTES.home,
          },
        ]}
      />
      <NavSection
        title={t('components.sidebar.navigation.data')}
        items={[
          {
            id: 'members',
            icon: 'users',
            title: t('components.sidebar.navigation.members'),
            isSelected: !!matchPath(ROUTES.members, pathname),
            paidFeature: false,
            to: ROUTES.members,
          },
          {
            id: 'analytics',
            icon: 'chart-line',
            title: t('components.sidebar.navigation.analytics'),
            isSelected: !!matchPath(ROUTES.analytics, pathname),
            paidFeature: true,
            to: ROUTES.analytics,
          },
        ]}
      />
      <NavSection
        title={t('components.sidebar.navigation.settings')}
        items={[
          {
            icon: 'medal',
            isSelected: !!matchPath(ROUTES.points, pathname),
            paidFeature: false,
            title: t('components.sidebar.navigation.points'),
            to: ROUTES.points,
            id: 'points',
          },
          {
            icon: 'sliders',
            isSelected: !!matchPath(ROUTES.levels, pathname),
            paidFeature: false,
            title: t('components.sidebar.navigation.levels'),
            to: ROUTES.levels,
            id: 'levels',
          },
          {
            icon: 'user-config',
            isSelected: !!matchPath(ROUTES.myTeam, pathname),
            paidFeature: false,
            title: t('components.sidebar.navigation.myTeam'),
            to: ROUTES.myTeam,
            id: 'my-team',
          },
          {
            icon: 'circle-help',
            isSelected: !!matchPath(ROUTES.help, pathname),
            paidFeature: false,
            title: t('components.sidebar.navigation.help'),
            to: ROUTES.help,
            id: 'help',
          },
        ]}
      />
      <NavSection
        title={t('components.sidebar.navigation.share')}
        items={[
          {
            icon: 'qr-code',
            isSelected: !!matchPath(ROUTES.qrDownload, pathname),
            paidFeature: false,
            title: t('components.sidebar.navigation.qrDownload'),
            to: ROUTES.qrDownload,
            id: 'qr-code',
          },
          {
            icon: 'share',
            isSelected: !!matchPath(ROUTES.shareLink, pathname),
            paidFeature: false,
            title: t('components.sidebar.navigation.shareLink'),
            to: ROUTES.shareLink,
            id: 'share',
          },
        ]}
      />
    </>
  );

  const sidebar = (
    <Sidebar
      className="border-r border-gray-200"
      topContent={topContent}
      bottomContent={bottomContent}
      navigationContent={navigationContent}
    />
  );

  return (
    <AppLayout
      className="h-screen"
      nav={sidebar}
      header={
        <div className="flex w-full h-14 items-center justify-end px-5">
          <span className="mr-4">{user?.email}</span>
          <Button onClick={() => signOut()}>Signout</Button>
        </div>
      }
    >
      <div className="px-5">
        <Outlet />
      </div>
    </AppLayout>
  );
};
