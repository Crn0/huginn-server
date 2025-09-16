import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { createUserOptions, getUserOptions, updateUserOptions } from "./user-options.js";
import { toPatchUserProfile } from "../mapper/to-patch-user-profile.js";
import { tryCatch } from "@/v1/lib/try-catch.js";

import type { CreateUser } from "../types/user.types.js";
import type { PatchUserProfile } from "../types/repository.types.js";

export const createUser = async (data: CreateUser) => {
  const { error, data: createdUser } = await tryCatch(
    prisma.user.create({
      ...createUserOptions,
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        accountLevel: data.accountLevel,
        profile: {
          create: {
            birthday: data.birthday,
            displayName: data.displayName,
          },
        },
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return createdUser;
};

export const getUserByEmail = async (email: string) => {
  const { error, data: user } = await tryCatch(
    prisma.user.findUnique({ ...getUserOptions, where: { email } }),
    dbErrorHandler
  );

  if (error) throw error;

  return user;
};

export const getUserById = async (id: string) => {
  const { error, data: user } = await tryCatch(
    prisma.user.findUnique({ ...getUserOptions, where: { id } }),
    dbErrorHandler
  );

  if (error) throw error;

  return user;
};

export const isEmailAvailable = async (email: string) => {
  const { error, data: user } = await tryCatch(
    prisma.user.findUnique({ where: { email } }),
    dbErrorHandler
  );

  if (error) throw error;

  if (!user) return true;

  return false;
};

export const isUsernameAvailable = async (username: string) => {
  const { error, data: user } = await tryCatch(
    prisma.user.findUnique({ where: { username } }),
    dbErrorHandler
  );

  if (error) throw error;

  if (!user) return true;

  return false;
};

export const patchUsernameById = async (id: string, username: string) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...updateUserOptions,
      where: { id },
      data: { username },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedUser;
};

export const patchUserProfile = async (id: string, data: PatchUserProfile) => {
  const { error, data: updatedUser } = await tryCatch(
    prisma.user.update({
      ...updateUserOptions,
      where: { id },
      data: {
        profile: {
          update: {
            ...toPatchUserProfile(data),
          },
        },
        updatedAt: new Date(),
      },
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return updatedUser;
};
