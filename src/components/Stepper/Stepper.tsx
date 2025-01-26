import { useMemo } from 'react';
import { StepButton } from './components';

type StepItemType = 'step-item' | 'separator';
type StepItems = Array<(StepType & { type: StepItemType }) | { type: StepItemType; id: string }>;

export type StepType = {
  index?: number;
  id: string;
  label: string;
  status?: 'active' | 'completed' | 'disabled' | 'pending';
};

export interface StepperProps {
  steps: StepType[];
  activeStepId: string;
  onChange: (step: StepType) => void;
}

const mapStepsToStepsItems = (steps: StepType[]): StepItems => {
  return steps.reduce<StepItems>((acc, step, index) => {
    acc.push({ ...step, type: 'step-item' });
    if (index < steps.length - 1) {
      acc.push({ type: 'separator', id: `separator-${step.id}` });
    }
    return acc;
  }, []);
};

export const Stepper = (props: StepperProps) => {
  const { steps, activeStepId, onChange } = props;

  const stepItems = useMemo(() => mapStepsToStepsItems(steps), [steps]);

  return (
    <div className="flex items-center justify-center">
      {stepItems.map((stepItem) => {
        if (stepItem.type === 'separator') {
          return <div key={stepItem.id} className="min-w-5 h-[1px] bg-slate-300 mx-[1px]" />;
        }

        const step = stepItem as StepType;

        return (
          <StepButton
            key={step.id}
            index={step.index}
            status={activeStepId === step.id ? 'active' : step.status}
            onClick={() => onChange(step)}
            className={step.id === activeStepId ? 'text-primary' : ''}
          >
            {step.label}
          </StepButton>
        );
      })}
    </div>
  );
};
