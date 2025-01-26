import { validateRUT } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import React from 'react';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { COMPANY_CATEGORIES } from './mocks';

export interface InformationFormValues {
  companyName: string;
  id: string;
  type: string;
}

export type InformationForm = UseFormReturn<InformationFormValues>;

export interface InformationFormProps extends Partial<FormProviderProps> {
  onSubmit: (values: InformationFormValues, form: InformationForm) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Information: React.FC<InformationFormProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    companyName: z.string(),
    id: z.string().refine((value) => validateRUT(value), {
      message: t('forms.profile.errors.rutInvalid'),
    }),
    type: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      id: '',
      type: '',
    },
  });

  const isDisabled = disabled || loading;

  return (
    <Form {...formProps} {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.information.companyNameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.clubbSetup.information.companyNamePlaceholder')}
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
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.information.idLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.clubbSetup.information.idPlaceholder')}
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <span className="text-xs text-slate-500">{t('forms.clubbSetup.information.idSubLabel')}</span>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.information.typeLabel')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('forms.clubbSetup.information.typePlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COMPANY_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled} className="mt-4 bg-indigo-400 hover:bg-indigo-500">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.clubbSetup.information.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
