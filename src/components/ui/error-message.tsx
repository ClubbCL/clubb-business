import { cn } from '@/lib/utils';

export const ErrorMessage: React.FC<React.HTMLProps<HTMLParagraphElement>> = ({ children, className, ...props }) => (
  <p className={cn('text-[0.8rem] font-medium text-destructive', className)} {...props}>
    {children}
  </p>
);
