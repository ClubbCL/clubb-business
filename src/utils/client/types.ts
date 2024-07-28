import { AuthChangeEvent, Session as SupabaseSession } from '@supabase/supabase-js';
import { AuthErrorType } from '@utils/errors';

export type SignupUser = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email?: string;
};

type BaseClientResponse<Data, Err = Error> = {
  data: Data;
  error: Err | null;
};

type OnAuthStatusChangeUnsubscribe = () => void;

export type Session = SupabaseSession;

export interface BaseClient {
  signup(user: SignupUser): Promise<BaseClientResponse<{ user?: User }, AuthErrorType>>;
  signIn(
    email: string,
    password: string
  ): Promise<BaseClientResponse<{ user?: User; session?: Session | null }, AuthErrorType>>;
  getSession(): Promise<BaseClientResponse<{ session: Session | null }, Error>>;
  onAuthStatusChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void | Promise<void>
  ): OnAuthStatusChangeUnsubscribe;
  signOut(): Promise<BaseClientResponse<undefined, Error>>;
  sendPasswordResetEmail(email: string): Promise<BaseClientResponse<undefined, AuthErrorType>>;
  updateUserPassword(newPassword: string): Promise<BaseClientResponse<{ user?: User }, AuthErrorType>>;
}
