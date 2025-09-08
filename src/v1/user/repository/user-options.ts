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
        provider: true
      }
    },
  },
} satisfies Prisma.UserDefaultArgs;