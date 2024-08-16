import { ClubSelector } from '@components/ClubSelector';
import { HelpMenu } from '@components/HelpMenu';
import { NavSection } from '@components/Sidebar/NavSection';
import type { Meta, StoryObj } from '@storybook/react';

import { matchPath, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    topContent: {
      control: 'object',
    },
    navigationContent: {
      control: 'object',
    },
  },
  decorators: (Story) => (
    <div className="h-[800px]">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const NavigationContent = () => {
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <>
      <NavSection
        items={[
          {
            id: 'home',
            icon: 'house',
            title: 'Home',
            isSelected: !!matchPath('/dashboard/home', pathname),
            paidFeature: false,
            to: '/dashboard/home',
          },
        ]}
      />
      <NavSection
        title="Data"
        items={[
          {
            id: 'miembros',
            icon: 'users',
            title: 'Miembros',
            isSelected: !!matchPath('/dashboard/miembros', pathname),
            paidFeature: false,
            to: '/dashboard/miembros',
          },
          {
            id: 'analytics',
            icon: 'chart-line',
            title: 'Analytics',
            isSelected: !!matchPath('/dashboard/analytics', pathname),
            paidFeature: true,
            to: '/dashboard/analytics',
          },
        ]}
      />
      <NavSection
        title="Configuración"
        items={[
          {
            icon: 'medal',
            isSelected: !!matchPath('/dashboard/puntos', pathname),
            paidFeature: false,
            title: 'Puntos',
            to: '/dashboard/puntos',
            id: 'puntos',
          },
          {
            icon: 'sliders',
            isSelected: !!matchPath('/dashboard/niveles', pathname),
            paidFeature: false,
            title: 'Niveles',
            to: '/dashboard/niveles',
            id: 'niveles',
          },
          {
            icon: 'user-config',
            isSelected: !!matchPath('/dashboard/mi-equipo', pathname),
            paidFeature: false,
            title: 'Mi Equipo',
            to: '/dashboard/mi-equipo',
            id: 'mi-equipo',
          },
          {
            icon: 'circle-help',
            isSelected: !!matchPath('/dashboard/ayuda', pathname),
            paidFeature: false,
            title: 'Ayuda',
            to: '/dashboard/ayuda',
            id: 'ayuda',
          },
        ]}
      />
      <NavSection
        title="Share"
        items={[
          {
            icon: 'qr-code',
            isSelected: !!matchPath('/dashboard/qr-download', pathname),
            paidFeature: false,
            title: 'Descargar QR',
            to: '/dashboard/qr-download',
            id: 'qr-code',
          },
          {
            icon: 'share',
            isSelected: !!matchPath('/dashboard/share-link', pathname),
            paidFeature: false,
            title: 'Compartir Enlace',
            to: '/dashboard/share-link',
            id: 'share',
          },
        ]}
      />
    </>
  );
};

export const Primary: Story = {
  args: {
    topContent: (
      <ClubSelector
        defaultValue="kross-bar"
        clubs={[
          { name: 'Kross Bar', value: 'kross-bar' },
          { name: 'Teclados', value: 'teclados' },
          { name: 'Barba Negra', value: 'barba-negra' },
        ]}
      />
    ),
    navigationContent: <NavigationContent />,
    bottomContent: (
      <HelpMenu
        title="Ayuda"
        items={[
          {
            icon: 'book-check',
            title: 'Documentación',
            href: 'https://docs.example.com',
            id: 'documentation',
          },
          {
            icon: 'headset',
            title: 'Centro de ayuda',
            href: 'https://help.example.com',
            id: 'help-center',
          },
          {
            icon: 'file-text',
            title: 'Blog',
            href: 'https://blog.example.com',
            id: 'blog',
          },
        ]}
      />
    ),
  },
};
