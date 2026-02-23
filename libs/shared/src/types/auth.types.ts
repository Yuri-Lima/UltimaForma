export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  mfaRequired: boolean;
  user: AuthUser;
}
