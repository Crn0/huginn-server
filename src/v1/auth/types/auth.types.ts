export interface AuthenticateGoogle {
  provider: string;
  accessToken: string;
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string | null;
  avatarUrl: string | null;
}
