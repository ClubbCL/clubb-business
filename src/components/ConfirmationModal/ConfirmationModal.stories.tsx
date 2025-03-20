import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationModal } from './ConfirmationModal';

const meta = {
  title: 'Components/ConfirmationModal',
  component: ConfirmationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: 'Confirmar acción',
    description: 'Esta acción no se puede deshacer. ¿Estás seguro de continuar?',
    onConfirm: () => {
      console.log('Confirm clicked');
    },
  },
};

export const DangerVariant: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: '¿Estás seguro de deshabilitar el Clubb?',
    description: 'El Clubb no será listado y todas las funcionalidades quedarán pausadas.',
    confirmLabel: 'Deshabilitar',
    variant: 'danger',
    onConfirm: () => {
      console.log('Disable clubb clicked');
    },
  },
};

export const ConfirmationVariant: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: 'Continua la activación del Clubb',
    description: 'Para habilitar el Clubb tienes que completar el proceso de registro.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Continuar con la activación',
    variant: 'confirmation',
    onConfirm: () => {
      console.log('Continue activation clicked');
    },
  },
};
