import type { Prisma } from "@/generated/prisma/index.js";

export type CreateMedia = Pick<Prisma.MediaCreateManyInput, "filePath" | "type" | "bytes" | "url">[];
