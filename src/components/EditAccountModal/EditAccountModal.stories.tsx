import type { Meta, StoryObj } from '@storybook/react';
import { EditAccountModal } from './EditAccountModal';

const meta = {
  title: 'Components/EditAccountModal',
  component: EditAccountModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditAccountModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    defaultValues: {
      fullName: 'Fernando Silanes',
      email: 'fernandosilanes@gmail.com',
      username: 'fernandosilanes',
    },
    onSubmit: (data) => {
      console.log('Form submitted:', data);
    },
    onEditPassword: () => {
      console.log('Edit password clicked');
    },
  },
};
