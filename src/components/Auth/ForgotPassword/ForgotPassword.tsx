import { ErrorMessage } from '@/components/ui/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import React from 'react';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface ForgotPasswordFormValues {
  email: string;
}

export type ForgotPasswordForm = UseFormReturn<ForgotPasswordFormValues>;
export interface ForgotPasswordProps extends Partial<FormProviderProps> {
  /**
   * Callback function that will be called when the signup form is submitted.
   * @param values - The values entered in the signup form. values = { email: string }
   * @property {string} values.email - The email entered in the signup form.
   */
  onSubmit: (values: ForgotPasswordFormValues, form: ForgotPasswordForm) => void;
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

export const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    email: z.string().email({ message: t('forms.forgotPassword.errors.invalidEmail') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const isDisabled = disabled || loading;
  const formError = form.formState.errors.root;

  return (
    <Form {...formProps} {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.forgotPassword.labels.email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="myemail@gmail.com" disabled={isDisabled} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formError && <ErrorMessage className="mt-4">{formError.message}</ErrorMessage>}
          <Button type="submit" disabled={isDisabled} className="mt-4">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.forgotPassword.labels.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
