import { BadRequestError } from "@/lib/errors/bad-request-error.js";
import { toPrismaPagination, type PaginationCursor } from "@/v1/lib/prisma-pagination.js";
import * as notificationRepository from "../repository/index.js";

import type { GetNotificationOption } from "../repository/index.types.js";

const NOTIFICATIONS_PAGE_SIZE = 20 as const;

const normalizeHref = (data: unknown[], href: string, enabled: boolean) => {
  if (data.length === 0 || !enabled) return null;

  return href;
};

const normalizeCursor = (cursor: string | undefined, hasHref: boolean) => {
  if (!cursor || !hasHref) return null;

  return cursor;
};

export const sendNotification = notificationRepository.sendNotification;

export const readNotification = notificationRepository.readNotification;

export const deleteNotificationsFromDate = notificationRepository.deleteNotificationsFromDate;

export const getNotifications = notificationRepository.getNotifications;

export const getUserNotifications = notificationRepository.getUserNotifications;

export const getLatestNotificationBetweenUsers =
  notificationRepository.getLatestNotificationBetweenUsers;

export const getUserNotificationsPagination = async (
  userId: string,
  query: { cursor: PaginationCursor }
) => {
  const { cursor } = query;
  const { after, before } = cursor;

  const { direction, ...rest } = toPrismaPagination({
    after,
    before,
    pageSize: NOTIFICATIONS_PAGE_SIZE,
  });

  if (after && before) {
    throw new BadRequestError("Cannot provide both 'after' and 'before' cursors");
  }

  const cursorId = after ?? before;

  if (cursorId) {
    const cursorNotification = await notificationRepository.getNotification(cursorId);

    if (!cursorNotification) {
      throw new BadRequestError("Invalid Cursor");
    }
  }

  const options = {
    ...rest,
    orderBy: [
      {
        createdAt: "desc",
      } as const,
      { id: "desc" } as const,
    ],
  } satisfies GetNotificationOption;

  const { notifications: res, count: total } = await notificationRepository.getUserNotifications(
    userId,
    options
  );

  const notifications =
    direction === "backward"
      ? res.slice(-NOTIFICATIONS_PAGE_SIZE)
      : res.slice(0, NOTIFICATIONS_PAGE_SIZE);

  const hasMore = res.length > NOTIFICATIONS_PAGE_SIZE;

  const nextCursor = notifications.at?.(-1)?.id;
  const prevCursor = notifications.at?.(0)?.id;

  const normalizedNextHref = normalizeHref(
    notifications,
    `/notifications?after=${nextCursor}`,
    direction === "backward" || hasMore
  );

  const normalizedPrevHref = normalizeHref(
    notifications,
    `/notifications?before=${prevCursor}`,
    direction === "forward" || (direction === "backward" && hasMore)
  );

  return Object.freeze({
    data: notifications,
    nextHref: normalizedNextHref,
    prevHref: normalizedPrevHref,
    nextCursor: normalizeCursor(nextCursor, normalizedNextHref !== null),
    prevCursor: normalizeCursor(prevCursor, normalizedPrevHref !== null),
    total: notifications.length > 0 ? total : 0,
  });
};
