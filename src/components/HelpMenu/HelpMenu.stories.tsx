import type { Meta, StoryObj } from '@storybook/react';

import { HelpMenu } from './HelpMenu';

const meta = {
  title: 'Components/HelpMenu',
  component: HelpMenu,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
    },
    title: {
      control: 'text',
    },
  },
} satisfies Meta<typeof HelpMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Ayuda',
    items: [
      {
        icon: 'book-check',
        title: 'Documentación',
        href: 'https://docs.example.com',
        id: 'documentation',
      },
      {
        icon: 'headset',
        title: 'Centro de ayuda',
        href: 'https://help.example.com',
        id: 'help-center',
      },
      {
        icon: 'file-text',
        title: 'Blog',
        href: 'https://blog.example.com',
        id: 'blog',
      },
    ],
  },
};
