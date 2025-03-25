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

// Default story (Sign In)
export const Default: Story = {
  parameters: {
    reactRouter: {
      routePath: '/signin',
    },
  },
};

export const SignUp: Story = {
  parameters: {
    reactRouter: {
      routePath: '/signup',
    },
  },
};

export const ForgotPassword: Story = {
  parameters: {
    reactRouter: {
      routePath: '/forgot-password',
    },
  },
};

export const ResetPassword: Story = {
  parameters: {
    reactRouter: {
      routePath: '/reset-password',
    },
  },
};

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    reactRouter: {
      routePath: '/signin',
    },
  },
};

// Tablet view
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    reactRouter: {
      routePath: '/signin',
    },
  },
};
