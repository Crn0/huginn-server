import { prisma } from "@/db/client/prisma.js";
import * as oidcRepository from "../repository/oidc-account.js";
import type { CreateUserOIDCAccount } from "../../types/user.types.js";
import { createDebug } from "@/v1/lib/debug.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

const debug = createDebug("oidc-service");

const unlinkGoogle = async (token: string) => {
  debug("Requesting google to remove tokenId");
  debug(`tokenId: ${token}`);
  const res = await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (!res.ok) {
    debug(await res.json());
    throw new Error("Request to revoke googles access token: unsuccessful");
  } else {
    debug("Request to revoke googles access token: successful");
  }
};

export const upsertUserOIDCAccount = async (DTO: CreateUserOIDCAccount) =>
  oidcRepository.upsertUserOIDCAccount(DTO);

export const getUserOIDCAccountByPkAndSub = async (providerPk: number, sub: string) =>
  oidcRepository.getUserOIDCAccountByPkAndSub(providerPk, sub);

export const deleteOIDCAccount = async (userId: string, provider: string) => {
  return prisma.$transaction(async (ctx) => {
    const [user, _provider] = await Promise.all([
      ctx.user.findUnique({
        where: { id: userId },
        select: { primaryKey: true },
      }),
      ctx.authProvider.findUnique({
        where: { key: provider },
        select: { primaryKey: true },
      }),
    ]);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!_provider) {
      throw new NotFoundError("Provider not supported.");
    }

    const odic = await ctx.userOIDCAccount.delete({
      where: {
        providerPk_userPk: {
          providerPk: _provider.primaryKey,
          userPk: user.primaryKey,
        },
      },
    });

    if (provider.toLowerCase() === "google") {
      await unlinkGoogle(odic.accessToken);
    }

    return odic;
  });
};

export const deleteOIDCAccountsByUserId = async (userId: string) => {
  return prisma.$transaction(async (ctx) => {
    const oidcAccounts = await ctx.userOIDCAccount.findMany({
      where: { user: { id: userId } },
      select: { id: true, accessToken: true, provider: { select: { name: true } } },
    });

    const idsToDelete = oidcAccounts.map((o) => o.id);

    if (!idsToDelete.length) {
      return { count: 0 };
    }

    const oidc = await ctx.userOIDCAccount.deleteMany({
      where: {
        id: { in: idsToDelete },
      },
    });

    const providers = oidcAccounts.map((o) => ({ name: o.provider.name, token: o.accessToken }));

    await Promise.all(
      providers.map(async ({ name, token }) => {
        if (name.toLowerCase() === "google") {
          unlinkGoogle(token);
        }
      })
    );

    return oidc;
  });
};
