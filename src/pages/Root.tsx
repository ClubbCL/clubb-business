import { ClubSelector } from '@/components/ClubSelector';
import { HelpMenu } from '@/components/HelpMenu';
import { useAuth, useCompany } from '@/hooks';
import { ROUTES } from '@/router';
import { AppLayout } from '@components/AppLayout';
import { NavItemProps, NavSection, Sidebar } from '@components/Sidebar';
import { Banner, TopBar } from '@components/TopBar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, Outlet, useLocation } from 'react-router-dom';

const companiesMap = {
  'kross-bar': {
    id: 'kross-bar',
    name: 'KrossBar',
  },
  teclados: {
    id: 'teclados',
    name: 'Teclados',
  },
  'barba-negra': {
    id: 'barba-negra',
    name: 'Barba Negra',
  },
};

type RouteKeys =
  | 'home'
  | 'members'
  | 'analytics'
  | 'companyProfile'
  | 'myTeam'
  | 'points'
  | 'redeem'
  | 'levels'
  | 'help'
  | 'qrDownload'
  | 'shareLink';

export const Root = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const company = useCompany();

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (!company.id) {
      company.setCompany(companiesMap['kross-bar']);
    }
  }, [company]);

  const items: Record<
    RouteKeys,
    NavItemProps & {
      id: string;
      showBanner?: boolean;
    }
  > = {
    home: {
      id: 'home',
      icon: 'house',
      title: t('components.sidebar.navigation.home'),
      isSelected: !!matchPath(ROUTES.home, pathname),
      paidFeature: false,
      to: ROUTES.home,
      showBanner: true,
    },
    members: {
      id: 'members',
      icon: 'users',
      title: t('components.sidebar.navigation.members'),
      isSelected: !!matchPath(ROUTES.members, pathname),
      paidFeature: false,
      to: ROUTES.members,
    },
    analytics: {
      id: 'analytics',
      icon: 'chart-line',
      title: t('components.sidebar.navigation.analytics'),
      isSelected: !!matchPath(ROUTES.analytics, pathname),
      paidFeature: true,
      to: ROUTES.analytics,
    },
    companyProfile: {
      icon: 'store',
      isSelected: !!matchPath(ROUTES.companyProfile, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.companyProfile'),
      to: ROUTES.companyProfile,
      id: 'company-profile',
    },
    myTeam: {
      icon: 'user-config',
      isSelected: !!matchPath(ROUTES.myTeam, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.myTeam'),
      to: ROUTES.myTeam,
      id: 'my-team',
    },
    points: {
      icon: 'hand-coins',
      isSelected: !!matchPath(ROUTES.points, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.points', { companyName: company.name }),
      to: ROUTES.points,
      id: 'points',
    },
    redeem: {
      icon: 'coins',
      isSelected: !!matchPath(ROUTES.redeem, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.redeem'),
      to: ROUTES.redeem,
      id: 'redeem',
    },
    levels: {
      icon: 'medal',
      isSelected: !!matchPath(ROUTES.levels, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.levels'),
      to: ROUTES.levels,
      id: 'levels',
    },
    help: {
      icon: 'circle-help',
      isSelected: !!matchPath(ROUTES.help, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.help'),
      to: ROUTES.help,
      id: 'help',
    },
    qrDownload: {
      icon: 'qr-code',
      isSelected: !!matchPath(ROUTES.qrDownload, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.qrDownload'),
      to: ROUTES.qrDownload,
      id: 'qr-code',
    },
    shareLink: {
      icon: 'share',
      isSelected: !!matchPath(ROUTES.shareLink, pathname),
      paidFeature: false,
      title: t('components.sidebar.navigation.shareLink'),
      to: ROUTES.shareLink,
      id: 'share',
    },
  };

  const selectedItem = Object.values(items).find((item) => item.isSelected);

  const topContent = (
    <ClubSelector
      defaultValue={company.id || 'kross-bar'}
      onValueChange={(value) => company.setCompany(companiesMap[value as keyof typeof companiesMap])}
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
      <NavSection items={[items.home]} />
      <NavSection title={t('components.sidebar.navigation.data')} items={[items.members, items.analytics]} />
      <NavSection
        title={t('components.sidebar.navigation.settings')}
        items={[items.companyProfile, items.myTeam, items.points, items.redeem, items.levels, items.help]}
      />
      <NavSection title={t('components.sidebar.navigation.share')} items={[items.qrDownload, items.shareLink]} />
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

  const topbar = (
    <TopBar
      user={user?.email || ''}
      userMenu={[
        {
          id: 'settings',
          icon: 'settings',
          title: t('components.topbar.userMenu.settings'),
          to: ROUTES.settings,
        },
        {
          id: 'profile',
          icon: 'user',
          title: t('components.topbar.userMenu.profile'),
          to: ROUTES.profile,
          separator: true,
        },
        {
          id: 'logout',
          icon: 'logout',
          title: t('components.topbar.userMenu.logout'),
          onClick: signOut,
        },
      ]}
    >
      {selectedItem?.showBanner ? (
        <Banner type="info" message={t('components.topbar.banner.freeApp')} />
      ) : (
        <div className="inline-flex items-center">
          <h1 className="font-semibold text-xl">{selectedItem?.title}</h1>
          <p className="bg-indigo-600 text-white font-bold text-xs rounded-full py-1 px-2 ml-4">DEMO</p>
        </div>
      )}
    </TopBar>
  );

  return (
    <AppLayout className="h-screen min-w-[1280px] min-h-[640px]" nav={sidebar} header={topbar}>
      <div className="px-12">
        <Outlet />
      </div>
    </AppLayout>
  );
};
