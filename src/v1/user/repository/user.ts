import { prisma } from "@/db/client/prisma.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { ConflictError } from "@/lib/errors/conflict-error.js";
import { EMAIL_CONFLICT, USERNAME_CONFLICT } from "@/v1/constants/error-codes.js";
import {
  createUserOptions,
  deleteUserOptions,
  getUserOptions,
  getUsersOptions,
  updateUserOptions,
} from "./user-options.js";
import { toPatchUserProfile } from "../mapper/to-patch-user-profile.js";
import { tryCatch } from "@/v1/lib/try-catch.js";

import type { CreateUser, GetUsersOption } from "../types/user.types.js";
import type { PatchUserProfile } from "../types/repository.types.js";
import type { Pagination } from "@/v1/lib/prisma-pagination.js";

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
    (e) =>
      dbErrorHandler(
        e,
        "P2002",
        new ConflictError("Unique constraint violation", {
          path: ["email"],
          code: EMAIL_CONFLICT,
          message: "Email has already been taken.",
        })
      )
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

export const getUserByUsername = async (username: string) => {
  const { error, data: user } = await tryCatch(
    prisma.user.findUnique({ ...getUserOptions, where: { username } }),
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

export const getUsersByUsernameOrDisplayName = async (
  name: string,
  pagination: Omit<Pagination, "direction">
) => {
  const { error, data: users } = await tryCatch(
    prisma.user.findMany({
      ...getUsersOptions,
      ...pagination,
      where: {
        deletedAt: null,
        username: {
          contains: name,
          mode: "insensitive",
        },
        profile: {
          displayName: { contains: name, mode: "insensitive" },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        } as const,
        { id: "desc" } as const,
      ],
    }),
    dbErrorHandler
  );

  if (error) throw error;

  return users;
};

export const getUsersCount = async (where: GetUsersOption["where"] = { deletedAt: null }) => {
  const { error, data: count } = await tryCatch(prisma.user.count({ where }), dbErrorHandler);

  if (error) throw error;

  return count;
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
    (e) =>
      dbErrorHandler(
        e,
        "P2002",
        new ConflictError("Unique constraint violation", {
          path: ["username"],
          code: USERNAME_CONFLICT,
          message: "Username has already been taken.",
        })
      )
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

export const deleteUserById = async (id: string) => {
  const { error, data: deletedUser } = await tryCatch(
    prisma.user.delete({
      ...deleteUserOptions,
      where: { id },
    }),
    (e) => dbErrorHandler(e, "P2025", new NotFoundError("User not found."))
  );

  if (error) throw error;

  return deletedUser;
};
