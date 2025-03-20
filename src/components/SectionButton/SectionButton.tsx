import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SectionButtonProps {
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function SectionButton({ title, description, onClick, className }: SectionButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        // Layout
        'h-fit flex items-center justify-between',

        // Visual styles
        'bg-white hover:bg-gray-50/50',
        'rounded-[14px] border border-gray-100',
        'shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]',

        // Typography
        'text-sm font-medium whitespace-nowrap',

        // Interactive states
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        'hover:text-accent-foreground',

        className
      )}
      onClick={onClick}
      data-component-name="_c"
    >
      <div className="flex flex-col items-start text-left" data-component-name="SectionButton">
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-gray-900 font-medium" data-component-name="SectionButton">
            {title}
          </span>
          <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
        </div>
        <span className="text-[13px] text-gray-500 mt-0.5" data-component-name="SectionButton">
          {description}
        </span>
      </div>
    </Button>
  );
}
