import type { Meta, StoryObj } from '@storybook/react';

import { FilterSelector } from './FilterSelector';

const meta = {
  title: 'Components/FilterSelector',
  component: FilterSelector,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    value: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
    defaultValue: { control: 'text' },
  },
} satisfies Meta<typeof FilterSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: 'all',
    items: [
      { name: 'All', value: 'all' },
      { name: 'King', value: 'king' },
      { name: 'Expert', value: 'expert' },
      { name: 'Beginner', value: 'beginner' },
    ],
  },
};
