import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn('text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors', className)}
      {...props}
    />
  );
});
