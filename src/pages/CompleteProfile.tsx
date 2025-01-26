import { ProfileFormProps, ProfileFormValues } from '@/components/Auth/ProfileForm';
import { ProfileMetaFormProps } from '@/components/Auth/ProfileMetaForm';
import { ROUTES } from '@/router';
import { supabase } from '@utils/supabase';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';

import ClubbLogo from '@/assets/icons/clubb_simple.svg';
import { useAuth } from '@/hooks/useAuth';
import { hash } from '@/utils';

export interface ParentOutletContext {
  formState: ProfileFormValues;
  onSubmitStep1: ProfileFormProps['onSubmit'];
  onSubmitStep2: ProfileMetaFormProps['onSubmit'];
}

export const CompleteProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formState, setFormState] = useState<ProfileFormValues>({
    name: '',
    username: '',
    avatar: undefined,
    emailNotifications: false,
  });

  const pathname = location.pathname;

  useEffect(() => {
    if (matchPath(ROUTES.completeProfile, pathname)) {
      // redirect to completeProfileStep1
      navigate(ROUTES.completeProfileStep1);
    }
  }, []);

  const onSubmitStep1: ProfileFormProps['onSubmit'] = useCallback(
    async (values) => {
      if (!user) return;

      const { data: isUsernamaTaken, error } = await supabase.rpc('username_already_taken', {
        username_input: values.username,
      });

      if (error) {
        console.error('Error checking username', error);
        return;
      }

      if (isUsernamaTaken) {
        console.error('Username already taken');
        return;
      }

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate(ROUTES.completeProfileStep2);
        });
      } else {
        navigate(ROUTES.completeProfileStep2);
      }

      setFormState((prev) => ({ ...prev, ...values }));

      const avatarFile = values.avatar?.[0];
      const avatarId = await hash(user.id);

      const avatarFragment = avatarFile ? { avatar: avatarId } : {};

      const { error: updateUserError } = await supabase
        .from('users')
        .update({ username: values.username, name: values.name, ...avatarFragment })
        .eq('id', user.id);

      if (updateUserError) {
        console.error('Error updating user', updateUserError);
        return;
      }

      if (avatarFile) {
        const { error: uploadAvatarError } = await supabase.storage
          .from('clubb_business_public')
          .upload(`public/${avatarId}`, avatarFile, { upsert: true });

        if (uploadAvatarError) {
          console.error('Error uploading avatar', uploadAvatarError);
          return;
        }
      }
    },
    [user]
  );

  const onSubmitStep2: ProfileMetaFormProps['onSubmit'] = (values) => {
    const fullFormState = { ...formState, ...values };

    // submit formState to API
    console.log('fullFormState', fullFormState);
  };

  return (
    <div className="py-9 px-11">
      <div className="flex gap-2">
        <div className="mb-1">
          <ClubbLogo />
        </div>
        <span className="text-slate-500 text-[22px] font-semibold">Business</span>
      </div>
      <div className="flex justify-center">
        <div className="mt-24 max-w-80">
          <h1 className="text-lg font-semibold mb-8">
            <Trans
              i18nKey="forms.profile.labels.title"
              components={{
                span: <span className="text-slate-500" />,
              }}
            />
          </h1>
          <Outlet
            context={{
              formState,
              onSubmitStep1,
              onSubmitStep2,
            }}
          />
        </div>
      </div>
    </div>
  );
};
