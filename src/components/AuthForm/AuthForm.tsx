import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Session } from '@supabase/supabase-js';
import { Button } from '@ui/button';
import { supabase } from '@utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AuthForm = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />;
  }

  const logOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      AuthForm: {t('helloWorld')}
      <div>
        <Button onClick={logOut}>Log Out</Button>
      </div>
    </div>
  );
};
