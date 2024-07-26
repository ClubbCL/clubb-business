import { AuthForm, AuthFormProps } from '@components/Auth';
import { useLocation } from 'react-router-dom';

export const Auth = () => {
  const location = useLocation();

  const path = location.pathname.slice(1) as Required<AuthFormProps>['defaultForm'];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm
        className="w-full max-w-sm"
        defaultForm={path}
        onForgotPasswordSubmit={console.log}
        onSigninSubmit={console.log}
        onResetPasswordSubmit={console.log}
        onSignupSubmit={console.log}
      />
    </div>
  );
};
