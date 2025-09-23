import argon2 from "argon2";

import { env } from "@/configs/env.js";
import { EMAIL_CONFLICT } from "@/v1/constants/error-codes.js";
import { ConflictError } from "@/lib/errors/conflict-error.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { generateUsername } from "@/v1/lib/generate-username.js";
import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { uploadMedia } from "@/v1/storage/cloudinary-service.js";
import { generateId } from "@/v1/lib/generate-id.js";
import * as userRepository from "../repository/user.js";
import * as tweetService from "@/v1/tweet/service/tweet.js";

import type { CreateUserDTO } from "@/v1/lib/user-schema.js";
import type { GetUserByEmailOptions } from "../types/service.types.js";
import type { PatchUserProfileDTO } from "../schema/patch-user-profile.js";
import type { PatchUserProfile } from "../types/repository.types.js";

const debug = createDebug("user-service");
const MAX_USERNAME_RETRY = 20;

const uploadProfileMedia = async (folder: string, mediaPath?: string) => {
  if (!mediaPath) return null;

  const res = await uploadMedia(folder, mediaPath);

  return Object.freeze({ filePath: res.public_id, url: res.secure_url, bytes: res.bytes });
};

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

export const patchUserProfileById = async (id: string, DTO: PatchUserProfileDTO) => {
  const { avatar, banner, ...rest } = DTO;

  const { profile } = await getUserById(id);

  const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/avatars/${id}`;

  const profileAvatar = profile?.avatar;
  const profileBanner = profile?.banner;
  const newProfileAvatar = await uploadProfileMedia(mediaFolder, avatar?.path);
  const newProfileBanner = await uploadProfileMedia(mediaFolder, banner?.path);

  const data: PatchUserProfile = { ...rest };

  if (newProfileAvatar) {
    const avatarId = profileAvatar?.id ?? generateId();

    data.avatar = {
      ...newProfileAvatar,
      id: avatarId,
      type: avatar?.mimetype === "image/gif" ? "GIF" : "IMAGE",
    };
  }

  if (newProfileBanner) {
    const bannerId = profileBanner?.id ?? generateId();

    data.banner = {
      ...newProfileBanner,
      id: bannerId,
      type: banner?.mimetype === "image/gif" ? "GIF" : "IMAGE",
    };
  }

  return userRepository.patchUserProfile(id, data);
};

export const deleteUserById = async (id: string) => {
  const tweetCount = await tweetService.deleteTweetsByAuthorId(id);

  const user = await userRepository.deleteUserById(id);

  return Object.freeze({ user, tweetCount });
};
