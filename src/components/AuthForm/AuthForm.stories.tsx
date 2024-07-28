import type { Meta, StoryObj } from '@storybook/react';

import { AuthForm } from './AuthForm';

const meta = {
  title: 'Components/AuthForm2',
  component: AuthForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
