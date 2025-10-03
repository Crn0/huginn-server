import path from "node:path";
import fs from "fs/promises";
import { prisma } from "@/db/client/prisma.js";

import { seedTestUser } from "./seed.js";
import { env } from "@/configs/env.js";
import { tryCatch } from "@/v1/lib/try-catch.js";
import { deleteFolder } from "@/v1/storage/cloudinary-service.js";

const removeTempFiles = async () => {
  const tempDir = path.join(import.meta.dirname, "..", "src", "temp");

  const filePaths = await fs.readdir(tempDir);

  await Promise.all(
    filePaths.map(async (filePath) => {
      if (filePath !== ".gitkeep") {
        const fullPath = `${tempDir}/${filePath}`;

        return fs.unlink(fullPath);
      }

      return Promise.resolve();
    })
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

    const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-17"

    const mediaFolder = `${env.CLOUDINARY_ROOT_FOLDER}/tweets/${today}`;

    await tryCatch(deleteFolder(mediaFolder));
  };
};
