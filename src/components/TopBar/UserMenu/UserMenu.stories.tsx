import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';
import { UserMenu } from './UserMenu';

const meta = {
  title: 'Components/TopBar/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
    },
    title: {
      control: 'text',
    },
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Guillermo Puente',
    items: [
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
  },
};
