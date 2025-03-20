import type { Meta, StoryObj } from '@storybook/react';
import { Top5MembersCard } from './Top5MembersCard';

const meta = {
  title: 'Components/Top5MembersCard',
  component: Top5MembersCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Top5MembersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    members: [
      { name: 'fernandosilanes', value: 55677 },
      { name: 'camilafuenzalida', value: 54667 },
      { name: 'lucianita3', value: 52990 },
      { name: 'juanvue', value: 46778 },
      { name: 'anita445', value: 44556 },
    ],
    membersUrl: '#',
  },
};
