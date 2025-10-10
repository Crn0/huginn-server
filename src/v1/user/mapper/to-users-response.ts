import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileMedia } from "./transform-profile-media.js";
import { getUsersPaginationSchema } from "@/v1/lib/user-schema.js";

import type { getUsersPagination } from "../service/user-service.js";

export const toUsersResponse = (props: Awaited<ReturnType<typeof getUsersPagination>>) => {
  const users = props.data.map((user) => ({
    ...user,
    avatarUrl: user.openIds.find((p) => typeof p.avatarUrl === "string") ?? null,
    profile: {
      ...user.profile,
      avatar: transformProfileMedia(user.profile?.avatar ?? null),
      banner: transformProfileMedia(user.profile?.banner ?? null),
    },
  }));

  const parsedUsers = getUsersPaginationSchema.safeParse({ ...props, data: users });

  if (!parsedUsers.success) {
    throw new InternalServerError("Something went wrong.");
  }

  return parsedUsers.data;
};
