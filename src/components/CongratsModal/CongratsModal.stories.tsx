import type { Meta, StoryObj } from '@storybook/react';
import { CongratsModal } from './CongratsModal';

const meta = {
  title: 'Components/CongratsModal',
  component: CongratsModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CongratsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: '¡Hola Fernando! Felicitaciones, el clubb Krossbar ya está listo.',
    description:
      'Ya puedes descargar la App móvil para editar el perfil público y compartir contenidos con tus miembros.',
    buttonLabel: 'Comenzar',
    onButtonClick: () => {
      console.log('Button clicked');
    },
  },
};
