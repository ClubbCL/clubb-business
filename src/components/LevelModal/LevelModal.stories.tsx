import type { Meta, StoryObj } from '@storybook/react';
import { LevelModal } from './LevelModal';

const meta = {
  title: 'Components/LevelModal',
  component: LevelModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LevelModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: (data) => {
      console.log('Form submitted:', data);
    },
  },
};
