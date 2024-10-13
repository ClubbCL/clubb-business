import type { Meta, StoryObj } from '@storybook/react';

import { PageSelector } from './PagesSelector';

const meta = {
  title: 'Components/PageSelector',
  component: PageSelector,
  tags: ['autodocs'],
  argTypes: {
    rowsSelection: { control: 'object' },
    value: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
    defaultValue: { control: 'text' },
  },
} satisfies Meta<typeof PageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: '10',
    rowsSelection: [10, 25, 50],
  },
};
