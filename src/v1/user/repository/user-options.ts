import { Prisma } from "@/generated/prisma/edge.js";

export const createUserOptions = {
  select: { id: true, username: true },
} satisfies Prisma.UserDefaultArgs;

export const getUserOptions = {
  include: {
    profile: {
      include: {
        avatar: true,
        banner: true,
      },
    },
    openIds: {
      include: {
        provider: true,
      },
    },
    following: {
      select: {
        id: true,
        username: true,
      },
    },
    followedBy: {
      select: {
        id: true,
        username: true,
      },
    },
    _count: {
      select: {
        followedBy: true,
        following: true,
        tweets: true,
      },
    },
  },
} satisfies Prisma.UserDefaultArgs;

export const getUsersOptions = {
  select: {
    id: true,
    username: true,
    createdAt: true,
    profile: {
      select: {
        displayName: true,
        avatar: true,
        banner: true,
      },
    },
    openIds: {
      select: {
        avatarUrl: true,
      },
    },
    following: {
      select: {
        id: true,
        username: true,
      },
    },
    followedBy: {
      select: {
        id: true,
        username: true,
      },
    },
  },
} satisfies Prisma.UserDefaultArgs;

export const updateUserOptions = {
  select: { id: true, username: true },
} satisfies Prisma.UserDefaultArgs;

export const deleteUserOptions = {
  select: { id: true, username: true },
} satisfies Prisma.UserDefaultArgs;
