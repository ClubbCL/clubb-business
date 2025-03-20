import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import * as React from 'react';

interface EditAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: { fullName: string; email: string; username: string }) => void;
  onEditPassword?: () => void;
  defaultValues?: {
    fullName?: string;
    email?: string;
    username?: string;
  };
  className?: string;
}

export function EditAccountModal({
  open,
  onOpenChange,
  onSubmit,
  onEditPassword,
  defaultValues,
  className,
}: EditAccountModalProps) {
  const [showPasswordIcon, setShowPasswordIcon] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,

      username: formData.get('username') as string,
    };

    onSubmit?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-[425px] p-0 gap-0', className)}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg font-medium text-gray-900">Editar cuenta personal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Nombre completo
              </Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={defaultValues?.fullName}
                className={cn(
                  'w-full h-11',
                  'border-gray-200',
                  'rounded-xl',
                  'px-4',
                  'focus-visible:ring-offset-0',
                  'focus-visible:border-gray-300',
                  'focus-visible:ring-transparent',
                  'transition-colors'
                )}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={defaultValues?.email}
                className={cn(
                  'w-full h-11',
                  'border-gray-200',
                  'rounded-xl',
                  'px-4',
                  'focus-visible:ring-offset-0',
                  'focus-visible:border-gray-300',
                  'focus-visible:ring-transparent',
                  'transition-colors'
                )}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <div
                className={cn(
                  'relative group',
                  'w-full h-11',
                  'border border-gray-200 rounded-xl',
                  'bg-white',
                  'flex items-center px-4',
                  'cursor-pointer',
                  'hover:border-gray-300',
                  'transition-colors'
                )}
                onClick={onEditPassword}
                onMouseEnter={() => setShowPasswordIcon(true)}
                onMouseLeave={() => setShowPasswordIcon(false)}
              >
                <span className="text-gray-600">********</span>
                {showPasswordIcon && (
                  <Pencil className={cn('absolute right-3 top-1/2 -translate-y-1/2', 'text-blue-600', 'w-4 h-4')} />
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Nombre de usuario
              </Label>
              <Input
                id="username"
                name="username"
                defaultValue={defaultValues?.username}
                className={cn(
                  'w-full h-11',
                  'border-gray-200',
                  'rounded-xl',
                  'px-4',
                  'focus-visible:ring-offset-0',
                  'focus-visible:border-gray-300',
                  'focus-visible:ring-transparent',
                  'transition-colors'
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
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
