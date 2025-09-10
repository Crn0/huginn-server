import { prisma } from "@/db/client/prisma.js";

import { seedTestUser } from "./seed.js";

export default async () => {
  await seedTestUser();

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
