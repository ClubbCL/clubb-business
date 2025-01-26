import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Location } from './Location';

const meta = {
  title: 'Components/Forms/ClubbSignup/Location',
  component: Location,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Location>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: fn(),
    disabled: false,
    loading: false,
  },
};
