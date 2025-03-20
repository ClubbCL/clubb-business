import type { Meta, StoryObj } from '@storybook/react';
import { QrCard } from './QrCard';

const meta = {
  title: 'Components/QrCard',
  component: QrCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof QrCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Comparte Krossbar Clubb',
    url: 'https://clubb.com/share/123',
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Comparte tu negocio',
    url: 'https://clubb.com/share/456',
  },
};
