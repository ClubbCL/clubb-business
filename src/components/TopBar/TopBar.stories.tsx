import { Banner } from '@components/TopBar/Banner';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TopBar } from './TopBar';

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'text',
    },
    userMenu: {
      control: 'object',
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    user: 'Guillermo Puente',
    userMenu: [
      {
        id: 'settings',
        icon: 'settings',
        title: 'Configuración',
        to: '/settings',
      },
      {
        id: 'profile',
        icon: 'user',
        title: 'Perfil',
        to: '/profile',
        separator: true,
      },
      {
        id: 'logout',
        icon: 'logout',
        title: 'Cerrar sesión',
        onClick: fn(),
      },
    ],
    children: (
      <Banner
        type="info"
        message="Clubb es completamente gratuito, puedes crear tu propio Clubb y administrarlo: gratis."
      />
    ),
  },
};
