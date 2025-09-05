import { PrismaClient } from "@/generated/prisma/index.js";
import { env } from "@/configs/env.js";

const databaseUrl = env.DATABASE_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});