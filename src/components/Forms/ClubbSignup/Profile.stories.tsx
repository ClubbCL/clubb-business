import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Profile } from './Profile';

const meta = {
  title: 'Components/Forms/ClubbSignup/Profile',
  component: Profile,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
