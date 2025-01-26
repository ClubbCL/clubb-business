import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { cx } from 'class-variance-authority';
import React from 'react';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const AVAILABLE_COUNTRIES = [{ label: 'Chile', value: 'CL' }];
const AVAILABLE_STATES = [
  { label: 'Región de Arica y Parinacota', value: 'AP' },
  { label: 'Región de Tarapacá', value: 'TA' },
  { label: 'Región de Antofagasta', value: 'AN' },
  { label: 'Región de Atacama', value: 'AT' },
  { label: 'Región de Coquimbo', value: 'CO' },
  { label: 'Región de Valparaíso', value: 'VA' },
  { label: 'Región Metropolitana de Santiago', value: 'RM' },
  { label: 'Región del Libertador General Bernardo O’Higgins', value: 'LI' },
  { label: 'Región del Maule', value: 'MA' },
  { label: 'Región del Ñuble', value: 'NB' },
  { label: 'Región del Biobío', value: 'BI' },
  { label: 'Región de La Araucanía', value: 'AR' },
  { label: 'Región de Los Ríos', value: 'LR' },
  { label: 'Región de Los Lagos', value: 'LL' },
  { label: 'Región de Aysén del General Carlos Ibáñez del Campo', value: 'AI' },
  { label: 'Región de Magallanes y de la Antártica Chilena', value: 'MA' },
];

export interface LocationFormValues {
  isMainAddress: boolean;
  country: string;
  state: string;
  addressLine1: string;
  addressLine2?: string;
}

export type LocationForm = UseFormReturn<LocationFormValues>;

export interface LocationFormProps extends Partial<FormProviderProps> {
  onSubmit: (values: LocationFormValues, form: LocationForm) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Location: React.FC<LocationFormProps> = (props) => {
  const { onSubmit, disabled = false, loading = false, ...formProps } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    isMainAddress: z.boolean(),
    country: z.string(),
    state: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isMainAddress: true,
      country: 'CL',
      state: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const isDisabled = disabled || loading;

  return (
    <Form {...formProps} {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.location.countryLabel')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('forms.clubbSetup.location.country')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AVAILABLE_COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.clubbSetup.location.mainLocation')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cx(field.value === '' && 'text-slate-500')}>
                      <SelectValue placeholder={t('forms.clubbSetup.location.state')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AVAILABLE_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.clubbSetup.location.address1')}
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
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.clubbSetup.location.address2')}
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled} className="mt-4 bg-indigo-400 hover:bg-indigo-500">
            {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : t('forms.clubbSetup.location.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
