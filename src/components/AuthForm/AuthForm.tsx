import { supabase } from '@utils';
import { useTranslation } from 'react-i18next';

export const AuthForm = () => {
  const { t } = useTranslation();

  // TODO: remove this console.log
  console.log(supabase);

  return <div>AuthForm: {t('helloWorld')}</div>;
};
