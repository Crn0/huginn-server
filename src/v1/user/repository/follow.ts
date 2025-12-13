import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getOptions, insertOptions } from "./follow-options.js";

import type { GetFollowingOption, GetFollowOption } from "../types/repository.types.js";

export const followUser = async (id: string, followId: string) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      select: {
        ...insertOptions.select,
        following: {
          where: {
            id: followId,
          },
        },
      },
      where: { id: id },
      data: {
        following: {
          connect: { id: followId },
        },
      },
    }),
    (e) => dbErrorHandler(e, "P2025", new NotFoundError("User not found."))
  );

  if (error) throw error;

  return updatedUser;
};

export const followUsers = async (id: string, followIds: string[]) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: id },
      data: {
        following: {
          connect: followIds.map((id) => ({ id })),
        },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedUser;
};

export const unFollowUser = async (id: string, followId: string) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: id },
      data: {
        following: {
          disconnect: { id: followId },
        },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedUser;
};

export const getUserFollowByUsername = async (username: string, options: GetFollowOption) => {
  const { error, data: following } = await tryCatch(
    prisma.user.findMany({
      ...getOptions,
      ...options,
      where: {
        ...options.where,
        username: { not: username },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return following;
};

export const getFollowCountByUsername = async (
  username: string,
  where: GetFollowOption["where"]
) => {
  const { error, data: count } = await tryCatch(
    prisma.user.count({
      where: {
        ...where,
        username: { not: username },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return count;
};

export const getUserFollowingById = async (id: string, options?: GetFollowingOption) => {
  const { error, data: following } = await tryCatch(
    prisma.user.findMany({
      ...getOptions,
      ...options,
      where: { followedBy: { some: { id } }, id: { not: id } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return following;
};
