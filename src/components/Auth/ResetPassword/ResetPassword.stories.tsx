import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ResetPassword } from './ResetPassword';

const meta = {
  title: 'Components/ResetPassword',
  component: ResetPassword,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof ResetPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
