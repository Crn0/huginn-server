import { prisma } from "@/db/client/prisma.js";

import type { BlackListToken } from "../types/blacked-list-token.types.js";

export const blackListToken = async (data: BlackListToken) =>
  prisma.blacklistedToken.create({
    data: {
      jwtId: data.jwtId,
      expiresAt: data.expiresAt,
      type: data.type,
      user: {
        connect: {
          id: data.sub,
        },
      },
    },
  });

export const getBlackListedTokenByJwtId = async (jwtId: string) =>
  prisma.blacklistedToken.findUnique({ where: { jwtId } });
