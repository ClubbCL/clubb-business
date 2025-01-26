import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Verification } from './Verification';

const meta = {
  title: 'Components/Forms/ClubbSignup/Verification',
  component: Verification,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Verification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
