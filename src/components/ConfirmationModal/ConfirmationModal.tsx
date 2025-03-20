import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  className?: string;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  variant?: 'danger' | 'primary' | 'confirmation';
}

export function ConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  className,
  title,
  description,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  variant = 'primary',
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-[425px] p-0 gap-0', className)}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg font-medium text-gray-900">{title}</DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4">
          <p className="text-sm text-gray-600 leading-[1.375rem] mt-2">{description}</p>

          <div className="flex items-center justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className={cn(
                'h-11 px-5 rounded-xl',
                'border-gray-200',
                'text-gray-900 font-medium',
                'hover:bg-gray-50/50 hover:text-gray-900 hover:border-gray-200',
                'active:bg-gray-100',
                'transition-colors'
              )}
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>

            <Button
              type="button"
              className={cn(
                'h-11 px-5 rounded-xl font-medium transition-colors',
                variant === 'danger'
                  ? ['bg-red-600', 'text-white', 'hover:bg-red-700', 'active:bg-red-800']
                  : variant === 'confirmation'
                    ? ['bg-blue-600', 'text-white', 'hover:bg-blue-700', 'active:bg-blue-800']
                    : ['bg-gray-900', 'text-white', 'hover:bg-gray-800', 'active:bg-gray-950']
              )}
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
