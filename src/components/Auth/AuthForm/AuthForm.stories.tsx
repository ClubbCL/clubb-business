import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { AuthForm } from './AuthForm';

const meta = {
  title: 'Components/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  parameters: {
    route: '/signin',
  },
  argTypes: {
    onSigninSubmit: { action: 'signin' },
    onSignupSubmit: { action: 'signup' },
    defaultForm: {
      control: 'radio',
      options: ['signin', 'signup'],
    },
  },
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSigninSubmit: fn(),
    onSignupSubmit: fn(),
    defaultForm: 'signin',
  },
};
