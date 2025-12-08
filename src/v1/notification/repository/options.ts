import { Prisma } from "@/generated/prisma/edge.js";

const baseOption = {
  include: {
    sender: {
      select: {
        id: true,
        username: true,
        profile: { select: { displayName: true, avatar: true, banner: true } },
        openIds: {
          select: {
            avatarUrl: true,
          },
        },
      },
    },
    receiver: {
      select: {
        id: true,
        username: true,
        profile: { select: { displayName: true, avatar: true, banner: true } },
        openIds: {
          select: {
            avatarUrl: true,
          },
        },
      },
    },
    tweet: {
      include: {
        media: {
          include: {
            tweet: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.NotificationDefaultArgs;

export const sendNotificationOption = {
  ...baseOption,
} satisfies Prisma.NotificationDefaultArgs;

export const mutateNotificationOption = {
  include: {
    sender: { select: { id: true } },
    receiver: { select: { id: true } },
    tweet: { select: { id: true } },
  },
} satisfies Prisma.NotificationDefaultArgs;

export const getNotificationOption = {
  ...baseOption,
} satisfies Prisma.NotificationDefaultArgs;
