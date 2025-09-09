export interface AuthenticateGoogle {
  provider: string;
  accessToken: string;
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: InstanceType<typeof Date> | null;
  avatarUrl: string | null;
}
