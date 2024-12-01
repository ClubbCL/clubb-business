import type { Meta, StoryObj } from '@storybook/react';
import { supabase } from '@utils/supabase';

import { ProfileForm } from './ProfileForm';

const meta = {
  title: 'Components/ProfileForm',
  component: ProfileForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof ProfileForm>;

export const Primary: Story = {
  args: {
    // onSubmit: fn(),
    onSubmit: async (values) => {
      // create id for file
      if (values.avatar) {
        const id = `${values.username}-${new Date().getTime()}`;
        const { data, error } = await supabase.storage
          .from('clubb_business_public')
          .upload(`public/${id}`, values.avatar[0]);

        if (error) {
          console.error('Error uploading avatar', error);
        }

        if (data) {
          console.log('Avatar uploaded', data);
        }
      }
    },
    disabled: false,
    loading: false,
  },
};
