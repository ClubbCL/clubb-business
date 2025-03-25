import AppleLogo from '@/assets/icons/apple.svg?url';
import GoogleLogo from '@/assets/icons/google.svg?url';
import SignInSvg from '@/assets/icons/signin.svg';
import { AuthForm } from '@/components/Auth';
import { ClubbLogo } from '@/components/ClubbLogo';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/router';
import { Button } from '@ui/button';
import { client } from '@utils/client';
import { AuthError } from '@utils/errors';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

interface SignInFormValues {
  email: string;
  password: string;
}

interface SignUpFormValues extends SignInFormValues {
  confirmPassword: string;
}

interface ForgotPasswordFormValues {
  email: string;
}

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const getDefaultForm = (pathname: string): 'signin' | 'signup' | 'forgot-password' | 'reset-password' => {
  if (matchPath(ROUTES.signup, pathname)) return 'signup';
  if (matchPath(ROUTES.forgotPassword, pathname)) return 'forgot-password';
  if (matchPath(ROUTES.resetPassword, pathname)) return 'reset-password';
  return 'signin';
};

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultForm = getDefaultForm(location.pathname);

  useEffect(() => {
    if (user) {
      if (matchPath(ROUTES.signin, location.pathname)) {
        navigate(ROUTES.home);
      }
    }
  }, [user, location.pathname, navigate]);

  const onSignupHandler = async (formValues: SignUpFormValues, form: UseFormReturn<SignUpFormValues>) => {
    setLoading(true);

    const { email, password } = formValues;
    const { error } = await client.signup({ email, password });

    setLoading(false);

    if (error instanceof AuthError) {
      if (error.code === 'user_already_exists') {
        form.setError('root', {
          message: t('forms.signup.errors.userAlreadyExists'),
        });
        return;
      }
    } else if (error) {
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Signup error', error);
    } else {
      form.reset();
      navigate(ROUTES.accountCreated);
    }
  };

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
    }
  };

  const onForgotPasswordHandler = async (
    formValues: ForgotPasswordFormValues,
    form: UseFormReturn<ForgotPasswordFormValues>
  ) => {
    setLoading(true);

    const { email } = formValues;
    const { error } = await client.sendPasswordResetEmail(email);

    setLoading(false);

    if (error) {
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Forgot password error', error);
    } else {
      form.reset();
      navigate(ROUTES.resetPasswordEmailSent);
    }
  };

  const onResetPasswordHandler = async (
    formValues: ResetPasswordFormValues,
    form: UseFormReturn<ResetPasswordFormValues>
  ) => {
    setLoading(true);

    const { password } = formValues;
    const { error } = await client.updateUserPassword(password);

    setLoading(false);

    if (error) {
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Reset password error', error);
    } else {
      form.reset();
      navigate(ROUTES.restPasswordSuccess);
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
            {defaultForm !== 'forgot-password' && defaultForm !== 'reset-password' && (
              <div className="space-y-0">
                <h2 className="text-[18px] leading-[22px] tracking-[0px] font-semibold text-gray-500">
                  {t('pages.auth.signIn.title')}
                </h2>
                <p className="text-[18px] leading-[22px] tracking-[0px] font-semibold text-primary-600">
                  {t('pages.auth.signIn.createAccount')}
                </p>
              </div>
            )}

            {defaultForm !== 'forgot-password' && defaultForm !== 'reset-password' && (
              <>
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
              </>
            )}

            <AuthForm
              className="w-full [&_button]:bg-indigo-600 [&_button]:hover:bg-indigo-700"
              defaultForm={defaultForm}
              loading={loading}
              onSigninSubmit={onSigninHandler}
              onSignupSubmit={onSignupHandler}
              onForgotPasswordSubmit={onForgotPasswordHandler}
              onResetPasswordSubmit={onResetPasswordHandler}
            />

            {defaultForm !== 'forgot-password' && defaultForm !== 'reset-password' && (
              <p className="text-center text-sm text-gray-500">
                <Trans
                  i18nKey="pages.auth.signIn.termsAndPrivacy"
                  components={{
                    terms: (
                      <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-700 hover:text-gray-900"
                      />
                    ),
                    privacy: (
                      <a
                        href="https://google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-700 hover:text-gray-900"
                      />
                    ),
                  }}
                />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
