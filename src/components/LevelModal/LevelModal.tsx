import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LevelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: { name: string; requiredPoints: number }) => void;
  className?: string;
}

export function LevelModal({ open, onOpenChange, onSubmit, className }: LevelModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const requiredPoints = Number(formData.get('requiredPoints'));

    onSubmit?.({ name, requiredPoints });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-[425px] p-0 gap-0', className)}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg font-semibold">Nuevo nivel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="space-y-4">
            <div>
              <Input
                id="name"
                name="name"
                placeholder="Nombre del nivel"
                className={cn(
                  'w-full h-11',
                  'placeholder:text-gray-500',
                  'focus-visible:ring-offset-0',
                  'border-gray-200',
                  'rounded-xl',
                  'px-4'
                )}
                required
              />
            </div>

            <div>
              <Input
                id="requiredPoints"
                name="requiredPoints"
                type="number"
                min={0}
                placeholder="Pesos requeridos"
                className={cn(
                  'w-full h-11',
                  'placeholder:text-gray-500',
                  'focus-visible:ring-offset-0',
                  'border-gray-200',
                  'rounded-xl',
                  'px-4'
                )}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className={cn(
                  'h-11 px-5 rounded-xl',
                  'border-gray-200',
                  'text-gray-900 font-medium',
                  'hover:bg-gray-50/50 hover:text-gray-900',
                  'active:bg-gray-100'
                )}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className={cn(
                  'h-11 px-5 rounded-xl',
                  'bg-gray-900 text-white font-medium',
                  'hover:bg-gray-800',
                  'active:bg-gray-950'
                )}
              >
                Crear nivel
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
