import { AuthError, AuthErrorType } from '@utils/errors';
import { supabase } from '@utils/supabase';
import { BaseClient } from './types';

export class SupabaseClient implements BaseClient {
  constructor() {}

  signup: BaseClient['signup'] = async (user) => {
    const { data, error: supabaseError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    let error: AuthErrorType | null = supabaseError;

    if (data.user?.identities?.length === 0) {
      error = new AuthError('user_already_exists');
    }

    return {
      error,
      data: {
        ...(data.user && { user: { email: data.user.email, id: data.user.id } }),
      },
    };
  };

  signIn: BaseClient['signIn'] = async (email, password) => {
    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    let error: AuthErrorType | null = supabaseError;

    if (error?.message.toLocaleLowerCase() === 'invalid login credentials') {
      error = new AuthError('invalid_credentials');
    }

    const { session, user } = data;

    return {
      error,
      data: {
        ...(session && { session }),
        ...(user && { user: { email: user.email, id: user.id } }),
      },
    };
  };

  getSession: BaseClient['getSession'] = async () => {
    return await supabase.auth.getSession();
  };

  onAuthStatusChange: BaseClient['onAuthStatusChange'] = (callback) => {
    const result = supabase.auth.onAuthStateChange(callback);
    return result.data.subscription.unsubscribe;
  };

  signOut: BaseClient['signOut'] = async () => {
    const result = await supabase.auth.signOut();

    return {
      data: undefined,
      error: result.error,
    };
  };
}
