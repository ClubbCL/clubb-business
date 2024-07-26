import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import React from 'react';
import { FormProviderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupProps extends Partial<FormProviderProps> {
  /**
   * Callback function that will be called when the signup form is submitted.
   * @param values - The values entered in the signup form. values = { email: string, password: string, confirmPassword: string }
   * @property {string} values.email - The email entered in the signup form.
   * @property {string} values.password - The password entered in the signup form.
   * @property {string} values.confirmPassword - The confirmed password entered in the signup form.
   */
  onSubmit: (values: SignupFormValues) => void;
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

export const Signup: React.FC<SignupProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z
    .object({
      email: z.string().email({ message: t('forms.signup.errors.invalidEmail') }),
      password: z
        .string()
        .min(8, { message: t('forms.signup.errors.minPasswordLength') })
        .max(20, { message: t('forms.signup.errors.maxPasswordLength') })
        .regex(/[A-Z]/, { message: t('forms.signup.errors.passwordUppercase') })
        .regex(/[^A-Za-z0-9]/, { message: t('forms.signup.errors.passwordSpecialChars') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('forms.signup.errors.passwordDoesNotMatch'),
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.signup.labels.email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="myemail@gmail.com" disabled={isDisabled} {...field} />
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
                <FormLabel>{t('forms.signup.labels.password')}</FormLabel>
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
                <FormLabel>{t('forms.signup.labels.passwordConfirmation')}</FormLabel>
                <FormControl>
                  <Input type="password" disabled={isDisabled} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled} className="mt-4">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.signup.labels.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
