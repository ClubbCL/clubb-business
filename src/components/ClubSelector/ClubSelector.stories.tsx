import type { Meta, StoryObj } from '@storybook/react';

import { ClubSelector } from './ClubSelector';

const meta = {
  title: 'Components/ClubSelector',
  component: ClubSelector,
  tags: ['autodocs'],
  argTypes: {
    clubs: { control: 'object' },
    value: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
    defaultValue: { control: 'text' },
  },
} satisfies Meta<typeof ClubSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: 'kross-bar',
    clubs: [
      { name: 'Kross Bar', value: 'kross-bar' },
      { name: 'Teclados', value: 'teclados' },
      { name: 'Barba Negra', value: 'barba-negra' },
    ],
  },
};
