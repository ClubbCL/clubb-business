import { Button, ButtonProps } from '@components/ui/button';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export interface StepButtonProps extends ButtonProps {
  index?: number;
  status?: 'active' | 'completed' | 'disabled' | 'pending';
}

export const StepButton = (props: StepButtonProps) => {
  const { className, index, children, status = 'pending', ...buttonProps } = props;

  const isCompleted = status === 'completed';
  const isPending = status === 'pending';
  const isActive = status === 'active';

  return (
    <Button
      className={clsx('flex items-center justify-center gap-1 text-sm px-3 py-[6px]', className)}
      variant="ghost"
      {...buttonProps}
    >
      {index && (
        <div
          className={clsx(
            'size-4 flex items-center justify-center text-[11px] rounded-full',
            isCompleted && 'bg-green-500 text-white',
            isActive && 'bg-black text-white',
            isPending && 'text-slate-500 border border-slate-500'
          )}
        >
          {isCompleted ? <Check size={11} strokeWidth={4} /> : index}
        </div>
      )}
      {children}
    </Button>
  );
};
