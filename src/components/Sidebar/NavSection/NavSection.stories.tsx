import type { Meta, StoryObj } from '@storybook/react';

import { NavSection } from './NavSection';

const meta = {
  title: 'Components/Sidebar/NavSection',
  component: NavSection,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    items: {
      control: 'object',
    },
  },
} satisfies Meta<typeof NavSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Configuración',
    items: [
      {
        icon: 'medal',
        isSelected: false,
        paidFeature: false,
        title: 'Puntos',
        to: '/dashboard/puntos',
        id: 'puntos',
      },
      {
        icon: 'sliders',
        isSelected: false,
        paidFeature: true,
        title: 'Niveles',
        to: '/dashboard/niveles',
        id: 'niveles',
      },
      {
        icon: 'user-config',
        isSelected: true,
        paidFeature: false,
        title: 'Mi Equipo',
        to: '/dashboard/mi-equipo',
        id: 'mi-equipo',
      },
      {
        icon: 'circle-help',
        isSelected: false,
        paidFeature: false,
        title: 'Ayuda',
        to: '/dashboard/ayuda',
        id: 'ayuda',
      },
    ],
  },
};
