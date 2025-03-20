import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ErrorMessage } from '@/components/ui/error-message';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ChangePasswordFormValues) => void;
  onForgotPassword?: () => void;
  onTitleClick?: () => void;
  className?: string;
}

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
}

export function ChangePasswordModal({
  open,
  onOpenChange,
  onSubmit,
  onForgotPassword,
  onTitleClick,
  className,
}: ChangePasswordModalProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const formSchema = z.object({
    currentPassword: z.string().min(1, { message: 'La contraseña actual es requerida' }),
    newPassword: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .max(20, { message: 'La contraseña no puede tener más de 20 caracteres' })
      .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula' })
      .regex(/[^A-Za-z0-9]/, { message: 'La contraseña debe tener al menos un carácter especial' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const formError = form.formState.errors.root;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onTitleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onTitleClick?.()}
        >
          <ArrowLeft className="h-5 w-5" />
          <h2 className="text-lg font-medium text-gray-900">Cambiar contraseña</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña actual</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showCurrentPassword ? 'text' : 'password'} {...field} />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {onForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-blue-600 text-sm hover:underline text-left -mt-2"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showNewPassword ? 'text' : 'password'} {...field} />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <div className="text-sm text-gray-500">Debe contener al menos 8 caracteres.</div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formError && <ErrorMessage>{formError.message}</ErrorMessage>}

              <div className="flex justify-end gap-3 mt-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Cambiar contraseña</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
