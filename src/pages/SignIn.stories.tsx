import type { Meta, StoryObj } from '@storybook/react';
import { SignIn } from './SignIn';

const meta = {
  title: 'Pages/SignIn',
  component: SignIn,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SignIn>;

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
