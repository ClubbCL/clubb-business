import CongratsIcon from '@/assets/icons/congrats.png';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CongratsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
  className?: string;
}

export function CongratsModal({
  open,
  onOpenChange,
  title,
  description,
  buttonLabel,
  onButtonClick,
  className,
}: CongratsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-[425px] text-center', className)}>
        <div className="flex flex-col items-center">
          <img src={CongratsIcon} alt="Congratulations" className="w-full h-auto mb-6" />

          <h2 className="text-lg font-medium text-gray-900">{title}</h2>

          <p className="mt-2 text-sm text-gray-600 leading-[1.375rem]">{description}</p>

          <Button
            onClick={onButtonClick}
            className="mt-6 h-11 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium"
          >
            {buttonLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
