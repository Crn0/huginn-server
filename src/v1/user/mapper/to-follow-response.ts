import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";

import type { getFollowByUsernamePagination } from "../service/follow-service.js";
import { followUsersPaginationSchema, type FollowUserQueryParam } from "../schema/follow.js";

export type ToFollowProp = Awaited<ReturnType<typeof getFollowByUsernamePagination>>;

const isFollowed = (
  user: { following: { id: string }[] },
  authUser: { id: string },
  scope: FollowUserQueryParam["scope"]
) => {
  if (scope !== "following") {
    if (!authUser) {
      return false;
    }
    return user.following.some((u) => u.id === authUser.id);
  }

  return true;
};

export const toFollowResponse = (
  props: ToFollowProp,
  authUser: { id: string },
  scope: FollowUserQueryParam["scope"]
) => {
  const follow = props.data.map((f) => ({
    ...f,
    followed: isFollowed(f, authUser, scope),
    profile: {
      ...f.profile,
      avatarUrl: transformProfileAvatar(f.profile?.avatar ?? null),
      bannerUrl: transformProfileBanner(f.profile?.banner ?? null),
    },
  }));

  const parsedData = followUsersPaginationSchema.safeParse({
    ...props,
    data: follow,
  });

  if (!parsedData.success) {
    throw new InternalServerError("Something went wrong. Try again later.");
  }

  return parsedData.data;
};
