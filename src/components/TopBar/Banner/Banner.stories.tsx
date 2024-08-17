import type { Meta, StoryObj } from '@storybook/react';

import { Banner } from './Banner';
const meta = {
  title: 'Components/TopBar/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
    },
    message: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'info',
    message: 'Clubb es completamente gratuito, puedes crear tu propio Clubb y administrarlo: gratis.',
  },
};
