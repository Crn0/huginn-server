import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";
import { getUsersPaginationSchema } from "@/v1/lib/user-schema.js";

import type { getUsersPagination } from "../service/user-service.js";

export const toUsersResponse = (props: Awaited<ReturnType<typeof getUsersPagination>>) => {
  const users = props.data.map((user) => ({
    ...user,
    avatarUrl: user.openIds.find((p) => typeof p.avatarUrl === "string")?.avatarUrl ?? null,
    profile: {
      ...user.profile,
      avatarUrl: transformProfileAvatar(user.profile!.avatar),
      bannerUrl: transformProfileBanner(user.profile!.banner),
    },
  }));

  const parsedUsers = getUsersPaginationSchema.safeParse({ ...props, data: users });

  if (!parsedUsers.success) {
    throw new InternalServerError("Something went wrong.");
  }

  return parsedUsers.data;
};
