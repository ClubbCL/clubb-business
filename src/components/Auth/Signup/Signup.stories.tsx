import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Signup } from './Signup';

const meta = {
  title: 'Components/Signup',
  component: Signup,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Signup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
