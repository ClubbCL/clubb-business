import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { FormProviderProps, useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];

export interface ProfileFormValues {
  name: string;
  username: string;
  avatar?: FileList;
  emailNotifications: boolean;
}

export type ProfileForm = UseFormReturn<ProfileFormValues>;

export interface ProfileFormProps extends Partial<FormProviderProps> {
  onSubmit: (values: ProfileFormValues, form: ProfileForm) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  const { onSubmit, disabled, loading } = props;

  const { t } = useTranslation();

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: t('forms.profile.errors.minNameLength') })
      .max(50, { message: t('forms.profile.errors.maxNameLength') }),
    // username can not conatain special characters or spaces
    username: z
      .string()
      .min(2, { message: t('forms.profile.errors.minUsernameLength') })
      .max(50, { message: t('forms.profile.errors.maxUsernameLength') })
      .regex(/^[a-zA-Z0-9_]*$/, { message: t('forms.profile.errors.usernameSpecialChars') }),
    // avatar is a File object
    avatar: z
      .instanceof(FileList)
      .optional()
      .refine((files) => !files || ACCEPTED_FILE_TYPES.includes(files[0].type), {
        message: t('forms.profile.errors.avatarFileType'),
      })
      .refine((files) => !files || files[0].size < MAX_FILE_SIZE_MB * 1024 * 1024, {
        message: t('forms.profile.errors.avatarFileSize'),
      }),
    // boolean value for email notifications
    emailNotifications: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      avatar: undefined,
      emailNotifications: true,
    },
  });

  const isDisabled = disabled || loading;
  const avatarFile = form.getValues().avatar;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSubmit(data, form))}>
        <div className="flex flex-col items-center">
          <label htmlFor="file-input" className="cursor-pointer">
            <Avatar className="size-[120px] border-8 border-slate-200">
              <AvatarImage
                className="object-cover"
                src={
                  avatarFile
                    ? URL.createObjectURL(avatarFile[0])
                    : 'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'
                }
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
          </label>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl>
                  <>
                    <label htmlFor="file-input" className="cursor-pointer text-indigo-600 text-xs">
                      {t('forms.profile.labels.uploadAvatar')}
                    </label>
                    <Input
                      id="file-input"
                      type="file"
                      accept={ACCEPTED_FILE_TYPES.join(',')}
                      disabled={isDisabled}
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 mt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.profile.labels.fullName')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.profile.placeholders.fullName')}
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forms.profile.labels.username')}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t('forms.profile.placeholders.username')}
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <span className="text-slate-500 text-xs mt-2">
                  {t('forms.profile.labels.profileUrl', { username: field.value })}
                </span>
              </FormItem>
            )}
          />
        </div>
        <Button className="bg-indigo-400 w-full hover:bg-indigo-500 mt-8" disabled={isDisabled}>
          {t('forms.profile.labels.submit')}
        </Button>
        <div className="mt-6">
          <FormField
            control={form.control}
            name="emailNotifications"
            render={({ field }) => (
              <FormItem className="flex items-start">
                <FormControl>
                  <Checkbox
                    id="email-notifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isDisabled}
                    className="mt-[2px] data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white border-indigo-600 data-[state=checked]:border-none"
                  />
                </FormControl>
                <label htmlFor="email-notifications" className="!mt-0 text-sm pl-[10px] cursor-pointer">
                  {t('forms.profile.labels.emailNotifications')}
                </label>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
