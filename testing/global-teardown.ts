import path from "node:path";
import fs from "fs/promises";
import { prisma } from "@/db/client/prisma.js";

import { seedTestUser } from "./seed.js";

const removeTempFiles = async () => {
  const tempDir = path.join(import.meta.dirname, "..", "src", "temp");

  const filePaths = await fs.readdir(tempDir);

  await Promise.all(
    filePaths.map(async (filePath) =>
      filePath !== ".gitkeep" ? fs.unlink(filePath) : Promise.resolve()
    )
  );
};

export default async () => {
  await seedTestUser();

  return async () => {
    await Promise.all([
      removeTempFiles(),
      prisma.$transaction([
        prisma.userOIDCAccount.deleteMany(),
        prisma.userProfile.deleteMany(),
        prisma.tweet.deleteMany(),
        prisma.user.deleteMany(),
        prisma.blacklistedToken.deleteMany(),
        prisma.authProvider.deleteMany(),
        prisma.media.deleteMany(),
      ]),
    ]);
  };
};
