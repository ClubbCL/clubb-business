import { Signin, SigninProps } from '@components/Auth/Signin';
import { Signup, SignupProps } from '@components/Auth/Signup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface AuthFormProps {
  onSignupSubmit: SignupProps['onSubmit'];
  onSigninSubmit: SigninProps['onSubmit'];
  /**
   * The default form to show.
   * @param {string} defaultForm - The default form to show.
   * @default 'signin'
   * @optional
   * @type 'signup' | 'signin'
   * @example
   * defaultForm='signup'
   */
  defaultForm?: 'signup' | 'signin';
}

export const AuthForm: React.FC<AuthFormProps> = (props) => {
  const { onSigninSubmit, onSignupSubmit, defaultForm = 'signin' } = props;

  const [isSignup, setIsSignup] = useState(defaultForm === 'signup');
  const { t } = useTranslation();

  useEffect(() => {
    setIsSignup(defaultForm === 'signup');
  }, [defaultForm]);

  return (
    <div>
      <div>{isSignup ? <Signup onSubmit={onSignupSubmit} /> : <Signin onSubmit={onSigninSubmit} />}</div>
      <div className="flex flex-col items-center mt-4 text-sm gap-y-1">
        <Link to="/forgot-password">{t('forms.auth.forgotPassword')}</Link>
        <Link to="/signup">{t('forms.auth.noAccount')}</Link>
      </div>
    </div>
  );
};
