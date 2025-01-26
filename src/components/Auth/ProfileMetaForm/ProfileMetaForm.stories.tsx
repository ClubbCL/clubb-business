import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ProfileMetaForm } from './ProfileMetaForm';

const meta = {
  title: 'Components/ProfileMetaForm',
  component: ProfileMetaForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof ProfileMetaForm>;

export default meta;
type Story = StoryObj<typeof ProfileMetaForm>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
