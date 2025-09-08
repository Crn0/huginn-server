import { prisma } from "@/db/client/prisma.js";

export const createAuthProvider = async (key: string, name: string) =>
  prisma.authProvider.create({
    data: {
      key,
      name,
    },
  });

export const getAuthProviderByKey = async (key: string) =>
  prisma.authProvider.findUnique({ where: { key } });
