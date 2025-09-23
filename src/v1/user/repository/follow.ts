import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { insertOptions } from "./follow-options.js";

export const followUserById = async (userId: string, followId: string) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: userId },
      data: {
        following: {
          connect: { id: followId },
        },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedUser;
};

export const unFollowUserById = async (userId: string, unFollowId: string) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: userId },
      data: {
        following: {
          disconnect: { id: unFollowId },
        },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedUser;
};