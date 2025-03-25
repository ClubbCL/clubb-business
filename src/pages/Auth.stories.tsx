import type { Meta, StoryObj } from '@storybook/react';
import { Auth } from './Auth';

const meta = {
  title: 'Pages/Auth',
  component: Auth,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Auth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Tablet view
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
