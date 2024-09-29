import type { Meta, StoryObj } from '@storybook/react';

import { faker } from '@/utils/client';
import { fn } from '@storybook/test';
import { MembersTable } from './MembersTable';

const meta = {
  title: 'Components/MembersTable',
  component: MembersTable,
  tags: ['autodocs'],
  argTypes: {
    members: { control: { type: 'object' } },
    onMemberAction: { action: 'onMemberAction' },
  },
} satisfies Meta<typeof MembersTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    members: faker.fakeMembers(250),
    onMemberAction: fn(),
  },
};
