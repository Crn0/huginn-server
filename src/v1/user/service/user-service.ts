import argon2 from "argon2";

import { EMAIL_CONFLICT } from "@/v1/constants/error-codes.js";
import { ConflictError } from "@/lib/errors/conflict-error.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { generateUsername } from "@/v1/lib/generate-username.js";
import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import * as userRepository from "../repository/user.js";

import type { CreateUserDTO } from "@/v1/lib/user-schema.js";
import type { GetUserByEmailOptions } from "../types/service.types.js";

const debug = createDebug("user-service");
const MAX_USERNAME_RETRY = 20;

export const createUser = async (DTO: CreateUserDTO) => {
  if (!(await userRepository.isEmailAvailable(DTO.email))) {
    throw new ConflictError("Unique constraint violation", {
      path: ["email"],
      code: EMAIL_CONFLICT,
      message: "Email has already been taken.",
    });
  }

  let username: string;
  let retry = 0;

  do {
    if (retry >= MAX_USERNAME_RETRY) {
      debug(
        `Failed to generate unique username for ${DTO.displayName} after ${MAX_USERNAME_RETRY} retries`
      );

      throw new ForbiddenError("Something went wrong");
    }

    username = generateUsername(DTO.displayName);

    retry += 1;
  } while (!(await userRepository.isUsernameAvailable(username)));

  const password = await argon2.hash(DTO.password);

  const data = {
    ...DTO,
    username,
    password,
    accountLevel: "USER" as const,
  };

  return userRepository.createUser(data);
};

export const getUserByEmail = async (
  email: string,
  { shouldThrow = true }: GetUserByEmailOptions = {}
) => {
  const user = await userRepository.getUserByEmail(email);

  if (shouldThrow && !user) {
    throw new NotFoundError("User not found.");
  }

  return user;
};

export const getUserById = async (id: string) => {
  const user = await userRepository.getUserById(id);

  if (!user) throw new NotFoundError("User not found.");

  return user;
};

export const isUsernameAvailable = async (username: string) =>
  userRepository.isUsernameAvailable(username);

export const patchUsernameById = async (id: string, username: string) =>
  userRepository.patchUsernameById(id, username);
