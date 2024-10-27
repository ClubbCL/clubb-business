import type { Meta, StoryObj } from '@storybook/react';

import { PercentageInput } from './PercentageInput';

const meta = {
  title: 'Components/PercentageInput',
  component: PercentageInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PercentageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
