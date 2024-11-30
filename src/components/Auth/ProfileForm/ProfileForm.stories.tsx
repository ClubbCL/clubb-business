import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ProfileForm } from './ProfileForm';

const meta = {
  title: 'Components/ProfileForm',
  component: ProfileForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof ProfileForm>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
