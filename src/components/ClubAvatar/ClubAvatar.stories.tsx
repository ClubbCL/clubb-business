import type { Meta, StoryObj } from '@storybook/react';

import { ClubAvatar } from './ClubAvatar';

const meta = {
  title: 'Components/ClubAvatar',
  component: ClubAvatar,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    size: { control: 'number' },
  },
} satisfies Meta<typeof ClubAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'kross bar',
    size: 30,
  },
};
