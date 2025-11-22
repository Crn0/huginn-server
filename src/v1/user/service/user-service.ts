import argon2 from "argon2";

import { env } from "@/configs/env.js";
import { prisma } from "@/db/client/prisma.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { dbErrorHandler } from "@/v1/lib/db-error-handler.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";
import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { AuthenticationError } from "@/lib/errors/auth-error.js";
import { ConflictError } from "@/lib/errors/conflict-error.js";
import { StorageError } from "@/lib/errors/storage-error.js";
import { generateUsername } from "@/v1/lib/generate-username.js";
import { createDebug } from "@/v1/lib/debug.js";
import { uploadMedia } from "@/v1/storage/cloudinary-service.js";
import { generateId } from "@/v1/lib/generate-id.js";
import { toPrismaPagination, type PaginationCursor } from "@/v1/lib/prisma-pagination.js";
import { EMAIL_CONFLICT } from "@/v1/constants/error-codes.js";
import * as userRepository from "../repository/user.js";
import * as mediaService from "@/v1/media/service/media.js";
import * as oidcService from "../oidc-account/service/oidc-account.js";
import * as storage from "@/v1/storage/cloudinary-service.js";

import type { CreateUserDTO, UserFilter } from "@/v1/lib/user-schema.js";
import type { GetUserByEmailOptions } from "../types/service.types.js";
import type { PatchUserProfileDTO } from "../schema/patch-user-profile.js";
import type { PatchUserProfile } from "../types/repository.types.js";
import type { PatchPassword } from "../schema/patch-password.js";

export type UserById = Awaited<ReturnType<typeof getUserById>>;
export type UserByUsername = Awaited<ReturnType<typeof getUserByUsername>>;

const debug = createDebug("user-service");
const MAX_USERNAME_RETRY = 20 as const;
const USERS_PAGE_SIZE = 20 as const;

const uploadProfileMedia = async (folder: string, mediaPath?: string) => {
  if (!mediaPath) return null;

  const res = await uploadMedia(folder, mediaPath);

  return Object.freeze({ filePath: res.public_id, url: res.secure_url, bytes: res.bytes });
};

const normalizeHref = (data: unknown[], href: string, enabled: boolean) => {
  if (data.length === 0 || !enabled) return null;

  return href;
};

const normalizeCursor = (cursor: string | undefined, hasHref: boolean) => {
  if (!cursor || !hasHref) return null;

  return cursor;
};

export const createUser = async (DTO: CreateUserDTO) => {
  let username: string;
  let retry = 0;

  const isEmailAvailable = await userRepository.isEmailAvailable(DTO.email);

  if (!isEmailAvailable) {
    throw new ConflictError("Unique constraint violation", {
      path: ["email"],
      code: EMAIL_CONFLICT,
      message: "Email has already been taken.",
    });
  }

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

export const getUserByUsername = async (username: string) => {
  const user = await userRepository.getUserByUsername(username);

  if (!user) throw new NotFoundError("User not found.");

  return user;
};

export const getAuthUser = async (id: string) => {
  const user = await userRepository.getUserById(id);

  if (!user) throw new NotFoundError("User not found.");

  return user;
};

export const getUsersPagination = async (query: {
  cursor: PaginationCursor;
  filter: UserFilter;
}) => {
  const {
    cursor,
    filter: { by },
  } = query;

  const { direction, ...rest } = toPrismaPagination({ ...cursor, pageSize: USERS_PAGE_SIZE });

  const [res, total] = await Promise.all([
    userRepository.getUsersByUsernameOrDisplayName(by, rest),
    userRepository.getUsersCount({
      deletedAt: null,
      username: {
        contains: by,
        mode: "insensitive",
      },
      profile: {
        displayName: { contains: by, mode: "insensitive" },
      },
    }),
  ]);

  const users =
    direction === "backward" ? res.slice(-USERS_PAGE_SIZE) : res.slice(0, USERS_PAGE_SIZE);

  const hasMore = res.length > USERS_PAGE_SIZE;

  const nextCursor = users.at?.(-1)?.id;
  const prevCursor = users.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    users,
    `/users?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    users,
    `/users?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: users,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total,
  });
};

export const isUsernameAvailable = async (username: string) =>
  userRepository.isUsernameAvailable(username);

export const patchUsernameById = async (id: string, username: string) =>
  userRepository.patchUsernameById(id, username);

export const patchPasswordById = async (id: string, DTO: PatchPassword) => {
  const user = await userRepository.getUserById(id);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (!user.password) {
    throw new ForbiddenError(
      "Password change not allowed for this account. Use password reset instead."
    );
  }

  const isMatch = await argon2.verify(user.password, DTO.oldPassword);

  if (!isMatch) {
    throw new AuthenticationError("Incorrect old password.");
  }

  const newPassword = await argon2.hash(DTO.password);

  return userRepository.patchPasswordById(id, newPassword);
};

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
  const avatarsFolder = `${env.CLOUDINARY_ROOT_FOLDER}/avatars/${id}`;

  const transaction = await prisma.$transaction(
    async (ctx) => {
      await oidcService.deleteOIDCAccountsByUserId(id);
      await mediaService.deleteMediaByUploaderId(id);

      const { error: mediaError } = await tryCatch(
        ctx.media.deleteMany({ where: { uploader: { id } } }),
        dbErrorHandler
      );

      if (mediaError) throw mediaError;

      const { error: tweetError, data: tweetCount } = await tryCatch(
        ctx.tweet.deleteMany({
          where: { author: { id } },
        }),
        dbErrorHandler
      );

      if (tweetError) throw tweetError;

      const { error: userError, data: user } = await tryCatch(
        ctx.user.delete({
          where: { id },
        }),
        (e) => dbErrorHandler(e, "P2025", new NotFoundError("User not found."))
      );

      if (userError) throw userError;

      const { error } = await tryCatch<Promise<never>, InstanceType<typeof StorageError>>(
        storage.deleteFolder(avatarsFolder)
      );

      if (error?.status !== 404) throw error;

      return Object.freeze({ user, tweetCount });
    },
    { maxWait: env.TRANSACTION_MAX_TIMEOUT }
  );

  return transaction;
};
