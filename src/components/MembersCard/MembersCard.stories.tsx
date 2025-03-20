import type { Meta, StoryObj } from '@storybook/react';
import { MembersCard } from './MembersCard';

const meta = {
  title: 'Components/MembersCard',
  component: MembersCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MembersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalMembers: 7345,
    newMembers: 374,
    membersUrl: '#',
  },
};
