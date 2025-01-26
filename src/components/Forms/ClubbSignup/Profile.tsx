import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import React from 'react';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface ProfileFormValues {
  name: string;
  account: string;
}

export type ProfileForm = UseFormReturn<ProfileFormValues>;

export interface ProfileFormProps extends Partial<FormProviderProps> {
  onSubmit: (values: ProfileFormValues, form: ProfileForm) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Profile: React.FC<ProfileFormProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    name: z.string(),
    account: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      account: '',
    },
  });

  const isDisabled = disabled || loading;

  return (
    <Form {...formProps} {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.profile.nameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.clubbSetup.profile.namePlaceholder')}
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.profile.accountLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.clubbSetup.profile.accountPlaceholder')}
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <span className="text-xs text-slate-500">
                  {t('forms.clubbSetup.profile.accountSubLabel', { account: field.value })}
                </span>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled} className="mt-4 bg-indigo-400 hover:bg-indigo-500">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.clubbSetup.profile.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
