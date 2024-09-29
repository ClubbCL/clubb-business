import { Button, ButtonProps } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';

export interface PaginationButtonProps extends ButtonProps {
  isActive?: boolean;
}

export const PaginationButton: React.FC<PaginationButtonProps> = (props) => {
  const { isActive = false, className, ...buttonProps } = props;

  console.log('isActive', isActive);

  return (
    <Button
      variant="outline"
      size="sm"
      className={twMerge(
        'shadow-none min-w-10 min-h-10 border-0 flex items-center justify-center',
        isActive && 'bg-violet-50 font-semibold',
        className
      )}
      {...buttonProps}
    />
  );
};
