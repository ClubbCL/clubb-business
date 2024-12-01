import { ProfileFormProps, ProfileFormValues } from '@/components/Auth/ProfileForm';
import { ProfileMetaFormProps } from '@/components/Auth/ProfileMetaForm';
import { ROUTES } from '@/router';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';

import ClubbLogo from '@/assets/icons/clubb_simple.svg';

export interface ParentOutletContext {
  formState: ProfileFormValues;
  onSubmitStep1: ProfileFormProps['onSubmit'];
  onSubmitStep2: ProfileMetaFormProps['onSubmit'];
}

export const CompleteProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const onSubmitStep1: ProfileFormProps['onSubmit'] = (values) => {
    setFormState((prev) => ({ ...prev, ...values }));

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(ROUTES.completeProfileStep2);
      });
    } else {
      navigate(ROUTES.completeProfileStep2);
    }
  };

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
