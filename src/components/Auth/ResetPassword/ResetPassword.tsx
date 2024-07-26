import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import React from 'react';
import { FormProviderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordProps extends Partial<FormProviderProps> {
  /**
   * Callback function that will be called when the signup form is submitted.
   * @param values - The values entered in the signup form. values = { password: string, confirmPassword: string }
   * @property {string} values.password - The password entered in the signup form.
   * @property {string} values.confirmPassword - The confirmed password entered in the signup form.
   */
  onSubmit: (values: ResetPasswordFormValues) => void;
  /**
   * If `true`, the form will be disabled.
   * @param {boolean} disabled - If `true`, the form will be disabled.
   * @default false
   * @optional
   * @type boolean
   * @example
   * disabled={true}
   */
  disabled?: boolean;
  /**
   * If `true`, the form is in a loading state.
   * @param {boolean} loading - If `true`, the form is in a loading state.
   * @default false
   * @optional
   * @type boolean
   * @example
   * loading={true}
   */
  loading?: boolean;
}

export const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: t('forms.resetPassword.errors.minPasswordLength') })
        .max(20, { message: t('forms.resetPassword.errors.maxPasswordLength') })
        .regex(/[A-Z]/, { message: t('forms.resetPassword.errors.passwordUppercase') })
        .regex(/[^A-Za-z0-9]/, { message: t('forms.resetPassword.errors.passwordSpecialChars') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('forms.resetPassword.errors.passwordDoesNotMatch'),
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const isDisabled = disabled || loading;

  return (
    <Form {...formProps} {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.resetPassword.labels.password')}</FormLabel>
                <FormControl>
                  <Input type="password" disabled={isDisabled} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.resetPassword.labels.passwordConfirmation')}</FormLabel>
                <FormControl>
                  <Input type="password" disabled={isDisabled} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled} className="mt-4">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.resetPassword.labels.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
