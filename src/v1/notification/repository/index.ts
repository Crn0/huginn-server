import { prisma } from "@/db/client/prisma.js";
import { tryCatch } from "@/v1/lib/try-catch.js";

import { toSendNotification } from "../mapper/to-send-notification.js";
import {
  sendNotificationOption,
  getNotificationOption,
  mutateNotificationOption,
} from "./options.js";

import type { SendNotification } from "../../lib/notification-schema.js";
import type { GetNotificationOption } from "./index.types.js";

export const sendNotification = async (data: SendNotification) => {
  const { error, data: notification } = await tryCatch(
    prisma.notification.create({
      ...sendNotificationOption,
      data: {
        ...toSendNotification(data),
      },
    })
  );

  if (error) throw error;

  return notification;
};

export const readNotification = async (ids: string[]) => {
  const { error, data: notification } = await tryCatch(
    prisma.notification.updateManyAndReturn({
      ...mutateNotificationOption,
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isRead: true,
        updatedAt: new Date(),
      },
    })
  );

  if (error) throw error;

  return notification;
};

export const getNotification = async (id: string) => {
  const { error, data: notifications } = await tryCatch(
    prisma.notification.findUnique({
      ...getNotificationOption,
      where: {
        id,
      },
    })
  );

  if (error) throw error;

  return notifications;
};

export const getNotifications = async (ids: string[], options?: GetNotificationOption) => {
  const [{ error, data: notifications }, { error: errorCount, data: count }] = await Promise.all([
    tryCatch(
      prisma.notification.findMany({
        distinct: ["id"],
        ...options,
        ...getNotificationOption,
        where: {
          id: {
            in: ids,
          },
        },
      })
    ),
    tryCatch(
      prisma.notification.count({
        where: {
          id: {
            in: ids,
          },
        },
      })
    ),
  ]);

  if (error || errorCount) throw error || errorCount;

  return { notifications, count };
};

export const getLatestNotificationBetweenUsers = async (type: SendNotification["type"],senderId: string, receiverId: string, date: Date) => {
    const { error, data: notification } = await tryCatch(
    prisma.notification.findFirst({
      ...getNotificationOption,
      where: {
        type,
        sender: {
          id: senderId,
        },
        receiver: {
          id: receiverId,
        },
        createdAt: {
          gte: date
        }
      },
      orderBy: { createdAt: 'asc' },
    })
  );

  if (error) throw error;

  return notification;
}

export const getUserNotifications = async (id: string, options?: GetNotificationOption) => {
  const [{ error, data: notifications }, { error: errorCount, data: count }] = await Promise.all([
    tryCatch(
      prisma.notification.findMany({
        distinct: ["id"],
        ...options,
        ...getNotificationOption,
        where: {
          isRead: false,
          receiver: {
            id,
          },
        },
      })
    ),
    tryCatch(
      prisma.notification.count({
        where: {
          receiver: {
            id,
          },
        },
      })
    ),
  ]);

  if (error || errorCount) throw error || errorCount;

  return { notifications, count };
};

export const deleteNotificationsFromDate = async (date: Date) => {
  const { error, data: count } = await tryCatch(
    prisma.notification.deleteMany({
      where: {
        createdAt: {
          gte: date,
        },
      },
    })
  );

  if (error) throw error;

  return count;
};
