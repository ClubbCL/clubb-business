import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { ErrorMessage } from '@ui/error-message';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import React from 'react';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface SigninFormValues {
  email: string;
  password: string;
}

export type SigninForm = UseFormReturn<SigninFormValues>;

export interface SigninProps extends Partial<FormProviderProps> {
  /**
   * Callback function that will be called when the signup form is submitted.
   * @param values - The values entered in the signup form. values = { email: string, password: string }
   * @property {string} values.email - The email entered in the signup form.
   * @property {string} values.password - The password entered in the signup form.
   */
  onSubmit: (values: SigninFormValues, form: SigninForm) => void;
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

export const Signin: React.FC<SigninProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    email: z.string().email({ message: t('forms.signin.errors.invalidEmail') }),
    password: z.string().min(1, { message: t('forms.signin.errors.minPasswordLength') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
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
                <FormLabel>{t('forms.signin.labels.email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Ingresa tu email" disabled={isDisabled} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.signin.labels.password')}</FormLabel>
                <FormControl>
                  <Input type="password" disabled={isDisabled} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {formError && <ErrorMessage className="mt-4">{formError.message}</ErrorMessage>}
          <Button type="submit" disabled={isDisabled} className="mt-4">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.signin.labels.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
