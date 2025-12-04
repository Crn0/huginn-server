import { Prisma } from "@/generated/prisma/edge.js";

const baseOptions = {
  include: {
    tweet: true,
   user: {
    omit: {
        email: true,
        password: true,
    }
   },
  },
} satisfies Prisma.RepostDefaultArgs;

export const mutateRepostOption = {
  ...baseOptions,
} satisfies Prisma.RepostDefaultArgs;
