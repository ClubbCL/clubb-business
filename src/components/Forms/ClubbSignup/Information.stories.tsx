import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Information } from './Information';

const meta = {
  title: 'Components/Forms/ClubbSignup/Information',
  component: Information,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Information>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
