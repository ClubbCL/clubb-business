import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ClubbSignup } from './ClubbSignup';

const meta = {
  title: 'Components/ClubbSignup',
  component: ClubbSignup,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
  },
} satisfies Meta<typeof ClubbSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
  },
};
