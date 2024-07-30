import { ROUTES } from '@/router';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { AuthError, AuthErrorType } from '@utils/errors';
import { supabase } from '@utils/supabase';
import { BaseClient, User } from './types';

export class SupabaseClient implements BaseClient {
  constructor() {}

  private supabaseUserToUser = (user: SupabaseUser): User => ({
    id: user.id,
    email: user.email,
  });

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
        ...(data.user && { user: this.supabaseUserToUser(data.user) }),
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
        ...(user && { user: this.supabaseUserToUser(user) }),
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

  sendPasswordResetEmail: BaseClient['sendPasswordResetEmail'] = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + ROUTES.resetPassword,
    });

    return {
      data: undefined,
      error,
    };
  };

  updateUserPassword: BaseClient['updateUserPassword'] = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    const { user } = data;

    return {
      error,
      data: {
        ...(user && { user: this.supabaseUserToUser(user) }),
      },
    };
  };
}
