import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Points } from './Points';

const meta = {
  title: 'Components/Forms/ClubbSignup/Points',
  component: Points,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Points>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
