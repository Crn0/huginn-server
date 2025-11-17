import { Prisma } from "@/generated/prisma/edge.js";

const omit = {
  password: true,
} satisfies Prisma.User$followedByArgs["omit"];

const distinct = ["id"] satisfies Prisma.User$followedByArgs["distinct"];

const profile = {
  include: {
    avatar: true,
    banner: true,
  },
} satisfies Prisma.User$profileArgs;

export const insertOptions = {
  select: { id: true, username: true },
} satisfies Prisma.UserDefaultArgs;

export const getOptions = {
  omit,
  distinct,
  include: {
    profile,
    following: { select: { id: true, username: true } },
  },
} satisfies Prisma.User$followedByArgs;
