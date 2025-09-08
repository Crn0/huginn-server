import { prisma } from "@/db/client/prisma.js";
import { createUserOptions, getUserOptions } from "./user-options.js";

import type { CreateUser } from "../types/user.types.js";

export const createUser = async (data: CreateUser) =>
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
  });

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    ...getUserOptions,
    where: { email },
  });

export const getUserById = async (id: string) =>
  prisma.user.findUnique({
    ...getUserOptions,
    where: { id },
  });

export const isEmailAvailable = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return true;

  return false;
};

export const isUsernameAvailable = async (username: string) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) return true;

  return false;
};
