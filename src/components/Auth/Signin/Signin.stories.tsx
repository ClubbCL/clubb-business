import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Signin } from './Signin';

const meta = {
  title: 'Components/Signin',
  component: Signin,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Signin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
