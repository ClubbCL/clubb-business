import type { Meta, StoryObj } from '@storybook/react';
import { ChangePasswordModal } from './ChangePasswordModal';

const meta = {
  title: 'Components/ChangePasswordModal',
  component: ChangePasswordModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ChangePasswordModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
    onForgotPassword: () => {
      console.log('Forgot password clicked');
    },
    onTitleClick: () => {
      console.log('Title clicked');
    },
  },
};
