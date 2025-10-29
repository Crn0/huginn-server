import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { followingPaginationSchema } from "../schema/following.js";
import { transformProfileAvatar, transformProfileBanner } from "./transform-profile-media.js";

import type { getFollowingByUsernamePagination } from "../service/follow-service.js";

export type ToFollowingProp = Awaited<ReturnType<typeof getFollowingByUsernamePagination>>;

export const toFollowingResponse = (props: ToFollowingProp) => {
  const following = props.data.map((f) => ({
    ...f,
    profile: {
      ...f.profile,
      avatarUrl: transformProfileAvatar(f.profile?.avatar ?? null),
      bannerUrl: transformProfileBanner(f.profile?.banner ?? null),
    },
  }));

  const parsedData = followingPaginationSchema.safeParse({
    ...props,
    data: following,
  });

  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new InternalServerError("Something went wrong. Try again later.");
  }

  return parsedData.data;
};
