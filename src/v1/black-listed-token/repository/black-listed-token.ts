import { prisma } from "@/db/client/prisma.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

import type { BlackListToken } from "../types/blacked-list-token.types.js";

export const blackListToken = async (data: BlackListToken) => {
  const { error, data: token } = await tryCatch(
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
    }),
    (e) => dbErrorHandler(e, "P2025", new NotFoundError("User not found."))
  );

  if (error) throw error;

  return token;
};

export const getBlackListedTokenByJwtId = async (jwtId: string) =>
  prisma.blacklistedToken.findUnique({ where: { jwtId } });
