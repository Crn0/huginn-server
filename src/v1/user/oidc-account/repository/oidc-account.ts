import { prisma } from "@/db/client/prisma.js";
import { oidcOptions } from "./oidc-account-options.js";

import type { CreateUserOIDCAccount } from "../../types/user.types.js";

export const upsertUserOIDCAccount = async (data: CreateUserOIDCAccount) =>
  prisma.userOIDCAccount.upsert({
    where: {
      providerPk_sub: { providerPk: data.providerPk, sub: data.sub },
    },
    create: {
      provider: {
        connect: {
          primaryKey: data.providerPk,
        },
      },
      sub: data.sub,
      accessToken: data.accessToken,
      avatarUrl: data.avatarUrl,
      user: {
        create: {
          email: data.email,
          username: data.username,
          accountLevel: data.accountLevel,
          profile: {
            create: {
              displayName: data.displayName,
              birthday: data.birthday,
            },
          },
        },
      },
    },

    update: {
      accessToken: data.accessToken,
      avatarUrl: data.avatarUrl,
    },
    include: oidcOptions.include.create,
  });

export const getUserOIDCAccountByPkAndSub = async (providerPk: number, sub: string) =>
  prisma.userOIDCAccount.findUnique({
    where: {
      providerPk_sub: { providerPk, sub },
    },
    include: oidcOptions.include.get,
  });
