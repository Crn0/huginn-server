import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getOptions, insertOptions } from "./follow-options.js";

import type { GetFollowersOption, GetFollowingOption } from "../types/repository.types.js";

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

export const followUsersById = async (userId: string, followIds: string[]) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: userId },
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

export const getUserFollowersById = async (id: string, options?: GetFollowersOption) => {
  const { error, data: followers } = await tryCatch(
    prisma.user.findMany({
      ...getOptions,
      ...options,
      where: { following: { some: { id } }, id: { not: id } },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return followers;
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

export const getFollowersCountById = async (id: string) => {
  const { error, data: count } = await tryCatch(
    prisma.user.count({
      where: {
        id: { not: id },
        following: { some: { id } },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return count;
};

export const getFollowingCountById = async (id: string) => {
  const { error, data: count } = await tryCatch(
    prisma.user.count({
      where: {
        id: { not: id },
        followedBy: { some: { id } },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return count;
};
