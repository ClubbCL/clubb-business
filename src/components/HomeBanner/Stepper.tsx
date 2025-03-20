import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type StepStatus = 'completed' | 'in_progress' | 'pending';

interface Step {
  id: string;
  title: string;
  status: StepStatus;
}

interface StepperProps {
  steps: Step[];
  className?: string;
}

const StepIcon = ({ status, stepNumber }: { status: StepStatus; stepNumber: number }) => {
  if (status === 'completed') {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
        <Check className="h-4 w-4 text-white" strokeWidth={3} />
      </div>
    );
  }

  if (status === 'in_progress') {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
        <span className="text-sm font-semibold text-purple-700">{stepNumber}</span>
      </div>
    );
  }

  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
      <span className="text-sm font-semibold text-white/50">{stepNumber}</span>
    </div>
  );
};

export const Stepper = ({ steps, className }: StepperProps) => {
  return (
    <div className={cn('flex items-center gap-4 rounded-[28px] bg-purple-800/50 px-6 py-4', className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <StepIcon status={step.status} stepNumber={index + 1} />

          {/* Step Title */}
          <span
            className={cn(
              'ml-2 text-sm font-semibold',
              step.status === 'completed' || step.status === 'in_progress' ? 'text-white' : 'text-white/50'
            )}
          >
            {step.title}
          </span>

          {/* Separator */}
          {index < steps.length - 1 && (
            <div className={cn('mx-4 h-[2px] w-12', step.status === 'completed' ? 'bg-green-500' : 'bg-white/20')} />
          )}
        </div>
      ))}
    </div>
  );
};
