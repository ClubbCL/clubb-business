import type { Meta, StoryObj } from '@storybook/react';
import { SectionButton } from './SectionButton';

const meta = {
  title: 'Components/SectionButton',
  component: SectionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Perfil público',
    description: 'Edita al nombre de tu club, la URL y las imágenes.',
    onClick: () => console.log('Section button clicked'),
  },
};

export const CustomStyle: Story = {
  args: {
    title: 'Configuración',
    description: 'Ajusta las preferencias de tu cuenta',
    onClick: () => console.log('Section button clicked'),
    className: 'bg-gray-50',
  },
};
