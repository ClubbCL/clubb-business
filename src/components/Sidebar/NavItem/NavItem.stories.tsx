import type { Meta, StoryObj } from '@storybook/react';

import { NavItem } from './NavItem';

const meta = {
  title: 'Components/Sidebar/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'house',
        'users',
        'chart-line',
        'medal',
        'sliders',
        'user-config',
        'circle-help',
        'qr-code',
        'share',
        'store',
        'coins',
        'hand-coins',
      ],
    },
    isSelected: {
      control: 'boolean',
    },
    paidFeature: {
      control: 'boolean',
    },
    to: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: 'house',
    isSelected: false,
    paidFeature: false,
    title: 'Home',
    to: '/dashboard/home',
  },
};
