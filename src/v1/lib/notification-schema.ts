import z from "zod";

import { baseTweetSchema } from "@/v1/lib/tweet-schema.js";
import { paginationSchema } from "@/v1/lib/pagination-schema.js";

const notificationType = z.enum(["MENTION", "REPLY", "FOLLOW"]);

const userSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  username: z.string(),
  profile: z.object({
    displayName: z.string(),
    avatarUrl: z.url().nullable(),
    bannerUrl: z.url().nullable(),
  }),
});

const baseNotificationSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  isRead: z.boolean(),
  sender: userSchema,
  createdAt: z.coerce.date().transform((d) => d.toISOString()),
  type: notificationType,
});

const tweetNotificationSchema = baseNotificationSchema.extend({
  type: notificationType.exclude(["FOLLOW"]),
  tweet: baseTweetSchema
    .pick({
      id: true,
      content: true,
      media: true,
      author: true,
      createdAt: true,
    })
    .nullable(),
});

const followNotificationSchema = baseNotificationSchema.extend({
  type: z.literal("Follow"),
});

export const notificationSchema = z.discriminatedUnion("type", [
  tweetNotificationSchema,
  followNotificationSchema,
]);

export type Notification = z.infer<typeof notificationSchema>;

export const notificationsSchema = z.array(notificationSchema)

export type Notifications = z.infer<typeof notificationsSchema>;

const baseSendNotificationSchema = z.object({
  receiverId: z.uuidv7({ error: "Invalid ID" }),
  senderId: z.uuidv7({ error: "Invalid ID" }),
  type: notificationType,
});

const sendTweetNotificationSchema = baseSendNotificationSchema.extend({
  tweetId: z.uuidv7({ error: "Invalid ID" }),
  type: notificationType.exclude(["FOLLOW"]),
});

const sendFollowNotificationSchema = baseSendNotificationSchema.extend({
  type: z.literal("FOLLOW"),
});

export const sendNotificationSchema = z.discriminatedUnion("type", [
  sendTweetNotificationSchema,
  sendFollowNotificationSchema,
]);

export type SendNotification = z.infer<typeof sendNotificationSchema>;

export const readNotificationSchema = z.object({
  readIds: z.array(z.uuidv7({ error: "Invalid ID" })),
});

export type ReadNotification = z.infer<typeof readNotificationSchema>;

export const deleteNotificationSchema = z.object({
  deleteIds: z.array(z.uuidv7({ error: "Invalid ID" })),
});

export type DeleteNotification = z.infer<typeof deleteNotificationSchema>;

export const notificationsPaginationSchema = paginationSchema.extend({ data: notificationsSchema });

export type NotificationsPagination = z.infer<typeof notificationsPaginationSchema>;
