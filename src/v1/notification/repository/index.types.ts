import type { Prisma } from "@/generated/prisma/index.js";

export type GetNotificationOption = Pick<
  Prisma.NotificationFindManyArgs,
  "where" | "cursor" | "orderBy" | "skip" | "take" | "distinct"
>;
