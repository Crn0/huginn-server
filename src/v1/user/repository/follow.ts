import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { getOptions, insertOptions } from "./follow-options.js";

import type { GetFollowersOption, GetFollowingOption } from "../types/repository.types.js";

export const followUserByUsername = async (id: string, followUsername: string) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: id },
      data: {
        following: {
          connect: { username: followUsername },
        },
      },
    }),
    (e) => dbErrorHandler(e, "P2025", new NotFoundError("User not found."))
  );

  if (error) throw error;

  return updatedUser;
};

export const followUsersById = async (id: string, followUsernames: string[]) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: id },
      data: {
        following: {
          connect: followUsernames.map((username) => ({ username })),
        },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedUser;
};

export const unFollowUserById = async (id: string, unfollowUsername: string) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...insertOptions,
      where: { id: id },
      data: {
        following: {
          disconnect: { username: unfollowUsername },
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

export const getUserFollowersByUsername = async (
  username: string,
  options?: GetFollowersOption
) => {
  const { error, data: followers } = await tryCatch(
    prisma.user.findMany({
      ...getOptions,
      ...options,
      where: { following: { some: { username } }, username: { not: username } },
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

export const getUserFollowingByUsername = async (
  username: string,
  options?: GetFollowingOption
) => {
  const { error, data: following } = await tryCatch(
    prisma.user.findMany({
      ...getOptions,
      ...options,
      where: { followedBy: { some: { username } }, username: { not: username } },
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

export const getFollowersCountByUsername = async (username: string) => {
  const { error, data: count } = await tryCatch(
    prisma.user.count({
      where: {
        username: { not: username },
        following: { some: { username } },
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

export const getFollowingCountByUsername = async (username: string) => {
  const { error, data: count } = await tryCatch(
    prisma.user.count({
      where: {
        username: { not: username },
        followedBy: { some: { username } },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return count;
};
