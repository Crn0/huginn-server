import { prisma } from "@/db/client/prisma.js";

export default async () => {
  return async () => {
    await prisma.$transaction([
      prisma.userOIDCAccount.deleteMany(),
      prisma.userProfile.deleteMany(),
      prisma.user.deleteMany(),
      prisma.blacklistedToken.deleteMany(),
      prisma.authProvider.deleteMany(),
      prisma.media.deleteMany(),
    ]);
  };
};
