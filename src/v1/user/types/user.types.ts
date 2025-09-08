type UserAccountLevel = "DEMO" | "USER" | "ADMIN"

export interface CreateUser {
  email: string;
  username: string;
  displayName: string;
  password: string | null;
  birthday: InstanceType<typeof Date> | null;
  accountLevel: UserAccountLevel;
}

export interface CreateUserOIDCAccount {
  email: string;
  username: string;
  displayName: string;
  birthday: string | null;
  accountLevel: UserAccountLevel;
  providerPk: number;
  sub: string; // provider user ID
  accessToken: string; // OIDC access token
  avatarUrl: string | null;
}
