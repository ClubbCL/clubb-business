import { ClubbLogo } from '@/components/ClubbLogo';
import { useAuth } from '@/hooks';
import { ROUTES } from '@/router';
import { AuthForm, AuthFormProps } from '@components/Auth';
import { client } from '@utils/client';
import { AuthError } from '@utils/errors';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

const getDefaultForm = (pathname: string): Required<AuthFormProps>['defaultForm'] => {
  if (matchPath(ROUTES.signin, pathname)) return 'signin';
  if (matchPath(ROUTES.signup, pathname)) return 'signup';
  if (matchPath(ROUTES.forgotPassword, pathname)) return 'forgot-password';
  if (matchPath(ROUTES.resetPassword, pathname)) return 'reset-password';
  return 'signin';
};

export const Auth = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  useEffect(() => {
    if (user) {
      if (matchPath(ROUTES.signin, pathname)) return navigate(ROUTES.root);
    }
  }, [user, pathname]);

  const onSignupHandler: AuthFormProps['onSignupSubmit'] = async (formValues, form) => {
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
      return;
    } else if (error) {
      // Unknown error
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Signup error', error);
    } else {
      // User successfully signed up
      form.reset();
      navigate(ROUTES.accountCreated);
    }
  };

  const onSigninHandler: AuthFormProps['onSigninSubmit'] = async (formValues, form) => {
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
      // Unknown error
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Signin error', error);
    } else {
      // User is signed in
      form.reset();
    }
  };

  const onForgotPasswordSubmit: AuthFormProps['onForgotPasswordSubmit'] = async (formValues, form) => {
    setLoading(true);

    const { email } = formValues;
    const { error } = await client.sendPasswordResetEmail(email);

    setLoading(false);

    if (error) {
      // Unknown error
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Forgot password error', error);
    } else {
      form.reset();
      navigate(ROUTES.resetPasswordEmailSent);
    }
  };

  const onResetPasswordSubmit: AuthFormProps['onResetPasswordSubmit'] = async (formValues, form) => {
    setLoading(true);

    const { password } = formValues;
    const { error } = await client.updateUserPassword(password);

    setLoading(false);

    if (error) {
      // Unknown error
      form.setError('root', {
        message: t('errors.general'),
      });
      console.error('Reset password error', error);
    } else {
      // Password successfully reset
      form.reset();
      navigate(ROUTES.restPasswordSuccess);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
      <div className="bg-[#f2f491] flex flex-col flex-1 h-screen p-4">
        <ClubbLogo />
        <p className="font-paytone-one text-[40px] md:text-[60px] lg:text-[90px] justify-center items-center text-center text-[#1a1944] flex flex-1">
          {t('pages.auth.header')}
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 w-full">
        <AuthForm
          className="w-full max-w-sm"
          loading={loading}
          defaultForm={getDefaultForm(pathname)}
          onForgotPasswordSubmit={onForgotPasswordSubmit}
          onSigninSubmit={onSigninHandler}
          onResetPasswordSubmit={onResetPasswordSubmit}
          onSignupSubmit={onSignupHandler}
        />
      </div>
    </div>
  );
};
