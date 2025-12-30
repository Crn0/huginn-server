import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { createDebug } from "@/v1/lib/debug.js";
import { transformTweetMedia } from "@/v1/tweet/mapper/transform-tweet-media.js";
import {
  transformProfileAvatar,
  transformProfileBanner,
} from "@/v1/user/mapper/transform-profile-media.js";
import { notificationsPaginationSchema } from "v1/lib/notification-schema.js";

import type { getUserNotificationsPagination } from "v1/notification/service/index.js";

const debug = createDebug("user:mapper:toUserNotificationsResponse");

export const toUserNotificationsResponse = (
  props: Awaited<ReturnType<typeof getUserNotificationsPagination>>,
  user: { id: string }
) => {
  const notifications = props.data.map((notification) => {
    const sender = {
      ...notification.sender,
      profile: {
        ...notification.sender?.profile,
        avatarUrl:
          transformProfileAvatar(notification.sender?.profile?.avatar ?? null) ??
          notification.sender?.openIds.find((p) => typeof p.avatarUrl === "string")?.avatarUrl ??
          null,
        bannerUrl: transformProfileBanner(notification.sender?.profile?.banner ?? null),
      },
    };

    if (notification.type === "FOLLOW") {
      return {
        ...notification,
        sender,
        isRepost: false,
      };
    }

    return {
      ...notification,
      sender,
      tweet: notification.tweet
        ? {
            ...notification.tweet,
            isRepost: false,
            media: notification.tweet.media.map(transformTweetMedia) ?? [],
            liked: notification.tweet.likes.some(({ user: u }) => u.id === user.id),
            author: {
              ...sender,
              followed: sender.followedBy?.some((u) => u.id === user.id) ?? false,
            },
            replyTo: notification.tweet.replyTo
              ? {
                  id: notification.tweet.replyTo.author.id,
                  tweetId: notification.tweet.replyTo.id,
                  username: notification.tweet.replyTo.author.username,
                }
              : null,
          }
        : null,
    };
  });

  const parsed = notificationsPaginationSchema.safeParse({
    ...props,
    data: notifications,
  });

  if (!parsed.success) {
    debug("issues", parsed.error.issues);
    throw new InternalServerError("Something went wrong. Try again later");
  }

  return parsed.data;
};
