import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { PhoneInput } from '@ui/phone-input';
import React from 'react';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface VerificationFormValues {
  phone: string;
  email: string;
  acceptTermsAndConditions: boolean;
}

export type VerificationForm = UseFormReturn<VerificationFormValues>;

export interface VerificationFormProps extends Partial<FormProviderProps> {
  onSubmit: (values: VerificationFormValues, form: VerificationForm) => void;
  disabled?: boolean;
  loading?: boolean;
  initialValues?: Partial<VerificationFormValues>;
}

export const Verification: React.FC<VerificationFormProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, initialValues = {}, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    phone: z.string(),
    email: z.string().email(),
    acceptTermsAndConditions: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...{
        phone: '',
        email: '',
        acceptTermsAndConditions: false,
      },
      ...initialValues,
    },
  });

  const isDisabled = disabled || loading;
  const isSubmitDisabled = isDisabled || !form.getValues().acceptTermsAndConditions;

  return (
    <Form {...formProps} {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.verification.phoneLabel')}</FormLabel>
                <FormControl>
                  <PhoneInput defaultCountry="CL" searchPlaceholder="Buscar país..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.verification.emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('forms.clubbSetup.verification.emailPlaceholder')}
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <span className="text-xs">{t('forms.clubbSetup.verification.emailSubLabel')}</span>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTermsAndConditions"
            render={({ field }) => (
              <FormItem className="flex items-start mt-8">
                <FormControl>
                  <Checkbox
                    id="terms-and-conditions"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isDisabled}
                    className="mt-[2px] data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white border-indigo-600 data-[state=checked]:border-none"
                  />
                </FormControl>

                <label htmlFor="terms-and-conditions" className="!mt-0 text-sm pl-[10px] cursor-pointer">
                  <Trans
                    i18nKey="forms.clubbSetup.verification.termsAndConditions"
                    components={{
                      a: <a href="https://www.google.com" target="_blank" className="text-indigo-600 underline" />,
                    }}
                  />
                </label>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitDisabled} className="mt-8 bg-indigo-400 hover:bg-indigo-500">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.clubbSetup.profile.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
