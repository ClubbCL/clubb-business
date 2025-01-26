import clsx from 'clsx';
import { Check } from 'lucide-react';

export type VerticalStepType = {
  index?: number;
  id: string;
  label: string;
  status?: 'active' | 'completed' | 'disabled' | 'pending';
};

export interface VerticalStepperProps {
  steps: VerticalStepType[];
}

export const VerticalStepper: React.FC<VerticalStepperProps> = (props) => {
  const { steps } = props;

  return (
    <div className="relative">
      <div className="absolute w-2 h-full -z-10 flex items-center justify-center">
        <div className=" w-[1px] bg-slate-200 h-[calc(100%-16px)]" />
      </div>
      <ul>
        {steps.map((step) => {
          const isCompleted = step.status === 'completed';
          const isPending = step.status === 'pending';

          return (
            <li key={step.id} className="flex items-center gap-2">
              <div className="flex items-center">
                <span
                  className={clsx('text-[8px] w-2 flex items-center justify-center', isPending && 'text-slate-200')}
                >
                  ●
                </span>
                <span className={clsx('text-sm ml-2', isPending && 'text-slate-300')}>{step.label}</span>
                {isCompleted && <Check size={12} strokeWidth={4} className="text-green-500 ml-2" />}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
