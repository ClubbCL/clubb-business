import type { Meta, StoryObj } from '@storybook/react';

import { VerticalStepper } from './VerticalStepper';

const meta = {
  title: 'Components/VerticalStepper',
  component: VerticalStepper,
  tags: ['autodocs'],
  argTypes: {
    steps: { control: { type: 'object' } },
  },
} satisfies Meta<typeof VerticalStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    steps: [
      { index: 1, id: 'step-1', label: 'Datos Legales', status: 'completed' },
      { index: 2, id: 'step-2', label: 'Información de Contacto', status: 'active' },
      { index: 3, id: 'step-3', label: 'Otros Datos', status: 'pending' },
    ],
  },
};
