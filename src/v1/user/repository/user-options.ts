import { Prisma } from "@/generated/prisma/edge.js";

export const createUserOptions = {
  select: { id: true, username: true },
} satisfies Prisma.UserDefaultArgs;

export const getUserOptions = {
  include: {
    profile: true,
    openIds: true,
  },
} satisfies Prisma.UserDefaultArgs;
