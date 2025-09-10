import type { Prisma } from "@/generated/prisma/index.js";
import type { UserAccountLevel } from "@/v1/lib/user-schema.js";
import type { getUserOptions } from "../repository/user-options.js";

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
  birthday: InstanceType<typeof Date> | null;
  accountLevel: UserAccountLevel;
  providerPk: number;
  sub: string; // provider user ID
  accessToken: string; // OIDC access token
  avatarUrl: string | null;
}

export type GetUserBy = Prisma.UserGetPayload<{ include: typeof getUserOptions.include }>;
