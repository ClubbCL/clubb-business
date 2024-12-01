import { Button } from '@/components/ui/button';
import { validateRUT } from '@/utils/rut';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export interface ProfileMetaFormValues {
  rut: string;
  birthdate: string;
}

export type ProfileForm = UseFormReturn<ProfileMetaFormValues>;

export interface ProfileMetaFormProps extends Partial<FormProviderProps> {
  onSubmit: (values: ProfileMetaFormValues, form: ProfileForm) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const ProfileMetaForm: React.FC<ProfileMetaFormProps> = (props) => {
  const { onSubmit, disabled, loading } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    rut: z.string().refine((value) => validateRUT(value), {
      message: t('forms.profile.errors.rutInvalid'),
    }),
    birthdate: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rut: '',
      birthdate: '',
    },
  });

  const isDisabled = disabled || loading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
        <div className="grid gap-4 mt-8">
          <FormField
            control={form.control}
            name="rut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.profile.labels.rut')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.profile.placeholders.rut')}
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <span className="mt-2 text-xs text-slate-500">{t('forms.profile.labels.rutDescription')}</span>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.profile.labels.birthday')}</FormLabel>
                <FormControl className="w-full">
                  <input
                    type="date"
                    className="w-full h-9 border rounded-md px-3 text-sm shadow-sm outline-none focus:ring-1 focus:ring-black"
                    required
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="bg-indigo-400 w-full hover:bg-indigo-500 mt-8" disabled={isDisabled}>
          {t('forms.profile.labels.submit')}
        </Button>
      </form>
    </Form>
  );
};
