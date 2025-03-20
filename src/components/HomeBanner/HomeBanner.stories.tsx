import type { Meta, StoryObj } from '@storybook/react';
import { HomeBanner } from './HomeBanner';

const meta = {
  title: 'Components/HomeBanner',
  component: HomeBanner,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof HomeBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonSteps = [
  { id: 'empresa', title: 'Empresa' },
  { id: 'verificacion', title: 'Verificación' },
  { id: 'pesos', title: 'Pesos' },
  { id: 'perfil', title: 'Perfil público' },
];

export const Step1: Story = {
  args: {
    currentStep: 1,
    totalSteps: 4,
    title: 'Comienza la activación de tu Clubb',
    subtitle: 'Completa la información necesaria de tu empresa.',
    steps: [
      { ...commonSteps[0], status: 'in_progress' },
      { ...commonSteps[1], status: 'pending' },
      { ...commonSteps[2], status: 'pending' },
      { ...commonSteps[3], status: 'pending' },
    ],
    onContinue: () => {
      console.log('Continue clicked');
    },
  },
};

export const Step2: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    title: 'Continúa la activación de tu Clubb',
    subtitle: 'Verifica los datos de la empresa.',
    steps: [
      { ...commonSteps[0], status: 'completed' },
      { ...commonSteps[1], status: 'in_progress' },
      { ...commonSteps[2], status: 'pending' },
      { ...commonSteps[3], status: 'pending' },
    ],
    onContinue: () => {
      console.log('Continue clicked');
    },
  },
};

export const Step3: Story = {
  args: {
    currentStep: 3,
    totalSteps: 4,
    title: 'Continúa la activación de tu Clubb',
    subtitle: 'Define cómo acumularán pesos los miembros del club.',
    steps: [
      { ...commonSteps[0], status: 'completed' },
      { ...commonSteps[1], status: 'completed' },
      { ...commonSteps[2], status: 'in_progress' },
      { ...commonSteps[3], status: 'pending' },
    ],
    onContinue: () => {
      console.log('Continue clicked');
    },
  },
};

export const Step4: Story = {
  args: {
    currentStep: 4,
    totalSteps: 4,
    title: 'Continúa la activación de tu Clubb',
    subtitle: 'Así te verán tus miembros en la App.',
    steps: [
      { ...commonSteps[0], status: 'completed' },
      { ...commonSteps[1], status: 'completed' },
      { ...commonSteps[2], status: 'completed' },
      { ...commonSteps[3], status: 'in_progress' },
    ],
    onContinue: () => {
      console.log('Continue clicked');
    },
  },
};
