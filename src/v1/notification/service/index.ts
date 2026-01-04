import { BadRequestError } from "@/lib/errors/bad-request-error.js";
import { toPrismaPagination, type PaginationCursor } from "@/v1/lib/prisma-pagination.js";
import * as notificationRepository from "../repository/index.js";
import * as cache from "@/v1/lib/cache.js";

import type { GetNotificationOption } from "../repository/index.types.js";
import type { toUserNotificationsResponse } from "@/v1/user/mapper/to-user-notifications-response.js";

type CachedUserNotifications = ReturnType<Awaited<typeof toUserNotificationsResponse>>;

const NOTIFICATIONS_PAGE_SIZE = 20 as const;

const normalizeHref = (data: unknown[], href: string, enabled: boolean) => {
  if (data.length === 0 || !enabled) return null;

  return href;
};

const normalizeCursor = (cursor: string | undefined, hasHref: boolean) => {
  if (!cursor || !hasHref) return null;

  return cursor;
};

export const sendNotification: typeof notificationRepository.sendNotification = async (DTO) => {
  const notification = await notificationRepository.sendNotification(DTO);

  const receiver = notification.receiver;

  cache.delNamespace("notification", receiver.username);

  return notification;
};

/**
 * Preconditions:
 * - All notification IDs belong to the authenticated receiver
 * - Ownership is enforced by `checkPatchNotification` middleware
 */
export const readNotification = async (ids: string[]) => {
  const notifications = await notificationRepository.readNotification(ids);

  if (notifications.length > 0) {
    const receiver = notifications[0]?.receiver;

    if (!receiver) return notifications;

    const notificationIds = new Set(notifications.map(({ id }) => id));
    const cached = Object.entries(cache.getByNamespace("notification", receiver.username));

    cached.forEach(([key, value]) => {
      const v = value as CachedUserNotifications;
      const { data } = v;

      if (data.some((d) => notificationIds.has(d.id))) {
        cache.update(key, {
          ...v,
          data: v.data.map((d) =>
            !notificationIds.has(d.id)
              ? d
              : {
                  ...d,
                  isRead: true,
                }
          ),
        });
      }
    });
  }

  return notifications;
};

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
