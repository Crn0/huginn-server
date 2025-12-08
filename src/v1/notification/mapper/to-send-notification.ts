import type { Prisma } from "@/generated/prisma/index.js";
import type { SendNotification } from "@/v1/lib/notification-schema.js";

type MappedData = Prisma.NotificationCreateInput;

export const toSendNotification = (DTO: SendNotification) => {
  const { type, senderId, receiverId } = DTO;

  const data: MappedData = {
    type,
    sender: {
      connect: { id: senderId },
    },
    receiver: {
      connect: { id: receiverId },
    },
  };

  if (DTO.type !== "FOLLOW") {
    data.tweet = {
      connect: {
        id: DTO.tweetId,
      },
    };
  }

  return Object.freeze(data);
};
