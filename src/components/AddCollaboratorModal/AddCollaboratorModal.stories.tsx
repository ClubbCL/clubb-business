import type { Meta, StoryObj } from '@storybook/react';
import { AddCollaboratorModal } from './AddCollaboratorModal';

const meta = {
  title: 'Components/AddCollaboratorModal',
  component: AddCollaboratorModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddCollaboratorModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSubmit: (data) => {
      console.log('Form submitted:', data);
    },
  },
};
