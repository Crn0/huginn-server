import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { followersPaginationSchema } from "../schema/followers.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";

import type { getFollowersByUsernamePagination } from "../service/follow-service.js";

export type ToFollowersProp = Awaited<ReturnType<typeof getFollowersByUsernamePagination>>;

export const toFollowersResponse = (props: ToFollowersProp, authUser?: { id: string }) => {
  const followers = props.data.map((f) => ({
    ...f,
    followed: !authUser ? false : f.following.some((u) => u.id === authUser.id),
    profile: {
      ...f.profile,
      avatarUrl: transformProfileAvatar(f.profile?.avatar ?? null),
      bannerUrl: transformProfileBanner(f.profile?.banner ?? null),
    },
  }));

  const parsedData = followersPaginationSchema.safeParse({
    ...props,
    data: followers,
  });

  if (!parsedData.success) {
    throw new InternalServerError("Something went wrong. Try again later.");
  }

  return parsedData.data;
};
