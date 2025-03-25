import AppleLogo from '@/assets/icons/apple.svg?url';
import GoogleLogo from '@/assets/icons/google.svg?url';
import SignInSvg from '@/assets/icons/signin.svg';
import { AuthForm } from '@/components/Auth';
import { ClubbLogo } from '@/components/ClubbLogo';
import { ROUTES } from '@/router';
import { Button } from '@ui/button';
import { client } from '@utils/client';
import { AuthError } from '@utils/errors';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SignInFormValues {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSigninHandler = async (formValues: SignInFormValues, form: UseFormReturn<SignInFormValues>) => {
    setLoading(true);

    const { email, password } = formValues;
    const { error } = await client.signIn(email, password);

    setLoading(false);

    if (error instanceof AuthError) {
      if (error.code === 'invalid_credentials') {
        form.setError('root', {
          message: t('forms.signin.errors.invalidCredentials'),
        });
      }
    } else if (error) {
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Signin error', error);
    } else {
      form.reset();
      navigate(ROUTES.home);
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Left Section - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-50">
        <div className="absolute top-8 left-8">
          <ClubbLogo />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center max-w-[480px] px-12">
            <div className="w-full">
              <SignInSvg />
            </div>
            <div className="mt-8 text-center">
              <h1 className="text-2xl font-semibold mb-2">
                {t('pages.auth.header.title')} <span className="text-gray-500">{t('pages.auth.header.subtitle')}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="hidden lg:block absolute top-0 left-1/2 w-px bg-gray-200 h-full -translate-x-1/2" />

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        {/* Mobile Logo */}
        <div className="lg:hidden relative z-20 p-8">
          <ClubbLogo />
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-8 relative z-20">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-0">
              <h2 className="text-[18px] leading-[22px] tracking-[0px] font-semibold text-gray-500">
                {t('pages.auth.signIn.title')}
              </h2>
              <p className="text-[18px] leading-[22px] tracking-[0px] font-semibold text-primary-600">
                {t('pages.auth.signIn.createAccount')}
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="w-full py-6 text-base font-medium flex items-center justify-center"
                disabled
              >
                <img src={GoogleLogo} alt="Google" className="w-4 h-4 mr-2" />
                {t('pages.auth.signIn.socialLogin.google')}
              </Button>
              <Button
                variant="outline"
                className="w-full py-6 text-base font-medium flex items-center justify-center"
                disabled
              >
                <img src={AppleLogo} alt="Apple" className="w-5 h-5 mr-2" />
                {t('pages.auth.signIn.socialLogin.apple')}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('pages.auth.signIn.divider')}</span>
              </div>
            </div>

            <AuthForm
              className="w-full"
              defaultForm="signin"
              loading={loading}
              onSigninSubmit={onSigninHandler}
              onSignupSubmit={() => {}}
              onForgotPasswordSubmit={() => {}}
              onResetPasswordSubmit={() => {}}
            />

            <p className="text-center text-sm text-gray-500">{t('pages.auth.signIn.termsAndPrivacy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
