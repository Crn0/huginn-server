import { ForbiddenError } from "@/lib/errors/forbidden-error.js";
import { NotFoundError } from "@/lib/errors/notfound-error.js";

import type { AuthUser } from "@/v1/types/user.types.js";

export type NotificationPolicy = typeof notificationPolicy;

export const notificationPolicy = {
  patch: (user: AuthUser, notification: { receiver: { id: string } } | null) => {
    if (notification === null) {
      throw new NotFoundError("Notification not found");
    }

    if (user.id !== notification.receiver.id) {
      throw new ForbiddenError("Must be the receiver");
    }
  },
  delete: (user: AuthUser, notification: { receiver: { id: string } } | null) => {
    if (notification === null) {
      throw new NotFoundError("Notification not found");
    }

    if (user.id !== notification.receiver.id) {
      throw new ForbiddenError("Must be the receiver");
    }
  },
} as const;
