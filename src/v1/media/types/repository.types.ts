import type { Prisma } from "@/generated/prisma/index.js";

export type CreateMedia = Pick<
  Prisma.MediaCreateManyInput,
  "filePath" | "type" | "bytes" | "url"
>[];

export type GetMediaOption = Omit<Prisma.MediaFindManyArgs, "where" | "include" | "select">;
