import { prisma } from "@/db/client/prisma.js";
import * as oidcRepository from "../repository/oidc-account.js";
import type { CreateUserOIDCAccount } from "../../types/user.types.js";
import { createDebug } from "@/v1/lib/debug.js";

const debug = createDebug("oidc-service");

const unlinkGoogle = async (token: string) => {
  debug("Requesting google to remove tokenId");
  debug(`tokenId: ${token}`);
  const res = await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (!res.ok) {
    debug("Request to revoke googles access token: unsuccessful");
    debug(await res.json());
  } else {
    debug("Request to revoke googles access token: successful");
  }
};

export const upsertUserOIDCAccount = async (DTO: CreateUserOIDCAccount) =>
  oidcRepository.upsertUserOIDCAccount(DTO);

export const getUserOIDCAccountByPkAndSub = async (providerPk: number, sub: string) =>
  oidcRepository.getUserOIDCAccountByPkAndSub(providerPk, sub);

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
