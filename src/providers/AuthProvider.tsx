import { client } from '@utils/client';
import { BaseClient, Session, User } from '@utils/client/types';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  loading: boolean;
  signOut: (() => Promise<void>) | BaseClient['signOut'];
}>({
  session: null,
  user: null,
  loading: false,
  signOut: async () => {},
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setContextData = async () => {
      const { data, error } = await client.getSession();

      if (error) {
        console.error('Error getting session', error);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSession(data.session);
      setUser(data.session ? { id: data.session.user.id, email: data.session.user.email } : null);
    };

    const unsubscribe = client.onAuthStatusChange((_event, session) => {
      setLoading(false);
      setSession(session);
      setUser(session ? { id: session.user.id, email: session.user.email } : null);
    });

    setContextData();
    return unsubscribe;
  }, []);

  const contextValue = {
    user,
    session,
    loading,
    signOut: client.signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
