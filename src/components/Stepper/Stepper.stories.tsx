import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Stepper } from './Stepper';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    activeStepId: { control: { type: 'text' } },
    steps: { control: { type: 'object' } },
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    steps: [
      { index: 1, id: 'step-1', label: 'Datos de la empresa', status: 'completed' },
      { index: 2, id: 'step-2', label: 'Verificación' },
      { index: 3, id: 'step-3', label: 'Pesos' },
      { index: 4, id: 'step-4', label: 'Perfil público' },
    ],
    activeStepId: 'step-2',
    onChange: fn(),
  },
};
