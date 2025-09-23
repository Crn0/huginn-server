import { Prisma } from "@/generated/prisma/edge.js";

export const insertOptions = {
  select: { id: true, username: true },
} satisfies Prisma.UserDefaultArgs;