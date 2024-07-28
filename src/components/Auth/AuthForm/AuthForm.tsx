import { ROUTES } from '@/router';
import { ForgotPassword, ForgotPasswordProps } from '@components/Auth/ForgotPassword';
import { ResetPassword, ResetPasswordProps } from '@components/Auth/ResetPassword';
import { Signin, SigninProps } from '@components/Auth/Signin';
import { Signup, SignupProps } from '@components/Auth/Signup';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface AuthFormProps extends React.HTMLProps<HTMLDivElement> {
  onSignupSubmit: SignupProps['onSubmit'];
  onSigninSubmit: SigninProps['onSubmit'];
  onForgotPasswordSubmit: ForgotPasswordProps['onSubmit'];
  onResetPasswordSubmit: ResetPasswordProps['onSubmit'];
  /**
   * The default form to show.
   * @param {string} defaultForm - The default form to show.
   * @default 'signin'
   * @optional
   * @type 'signup' | 'signin' | 'reset-password' | 'forgot-password'
   * @example
   * defaultForm='signup'
   */
  defaultForm?: 'signup' | 'signin' | 'reset-password' | 'forgot-password';
  disabled?: boolean;
  loading?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = (props) => {
  const {
    onSigninSubmit,
    onSignupSubmit,
    onForgotPasswordSubmit,
    onResetPasswordSubmit,
    defaultForm = 'signin',
    disabled = false,
    loading = false,
    ...divProps
  } = props;

  const { t } = useTranslation();

  let form = null;
  let links = null;

  switch (defaultForm) {
    case 'signup':
      form = <Signup onSubmit={onSignupSubmit} loading={loading} disabled={disabled} />;
      links = (
        <>
          <Link to={ROUTES.signin}>{t('forms.auth.alreadyHaveAccount')}</Link>
        </>
      );
      break;
    case 'signin':
      form = <Signin onSubmit={onSigninSubmit} loading={loading} disabled={disabled} />;
      links = (
        <>
          <Link to={ROUTES.forgotPassword}>{t('forms.auth.forgotPassword')}</Link>
          <Link to={ROUTES.signup}>{t('forms.auth.noAccount')}</Link>
        </>
      );
      break;
    case 'reset-password':
      form = <ResetPassword onSubmit={onResetPasswordSubmit} loading={loading} disabled={disabled} />;
      break;
    case 'forgot-password':
      form = <ForgotPassword onSubmit={onForgotPasswordSubmit} loading={loading} disabled={disabled} />;
      links = (
        <>
          <Link to={ROUTES.signin}>{t('forms.auth.alreadyHaveAccount')}</Link>
        </>
      );
      break;
    default:
      form = <Signin onSubmit={onSigninSubmit} loading={loading} disabled={disabled} />;
  }

  return (
    <div {...divProps}>
      <div>{form}</div>
      <div className="flex flex-col items-center mt-4 text-sm gap-y-1">{links}</div>
    </div>
  );
};
