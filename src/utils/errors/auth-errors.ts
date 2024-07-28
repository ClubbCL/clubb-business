export const AuthErrorCodeMessage = {
  user_already_exists: 'User already exists',
  invalid_credentials: 'Invalid credentials',
};

export type AuthErrorCode = keyof typeof AuthErrorCodeMessage;

export class AuthError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode) {
    super(AuthErrorCodeMessage[code]);
    this.code = code;
  }
}

export type AuthErrorType = Error | AuthError;
