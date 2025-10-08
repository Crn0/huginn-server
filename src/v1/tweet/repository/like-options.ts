import { Prisma } from "@/generated/prisma/edge.js";

const baseOptions = {
  include: {
    user: {
      select: {
        id: true,
        username: true,
        profile: { select: { displayName: true, avatar: true, banner: true } },
      },
    },
    tweet: {
      select: {
        id: true,
      },
    },
  },
} satisfies Prisma.LikeDefaultArgs;

export const createLikeOptions = {
  ...baseOptions,
} satisfies Prisma.LikeDefaultArgs;

export const unlikeOptions = {
  select: {
    user: { select: { id: true } },
    tweet: { select: { id: true } },
  },
} satisfies Prisma.LikeDefaultArgs;

export const getLikeOptions = {
  ...baseOptions,
} satisfies Prisma.LikeDefaultArgs;
