import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ForgotPassword } from './ForgotPassword';

const meta = {
  title: 'Components/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof ForgotPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
