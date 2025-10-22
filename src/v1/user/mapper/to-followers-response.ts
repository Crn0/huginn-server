import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { followersPaginationSchema } from "../schema/followers.js";

import type { getFollowersByUsernamePagination } from "../service/follow-service.js";

export type ToFollowersProp = Awaited<ReturnType<typeof getFollowersByUsernamePagination>>;

export const toFollowersResponse = (props: ToFollowersProp) => {
  const parsedData = followersPaginationSchema.safeParse({
    ...props,
  });

  if (!parsedData.success) {
    throw new InternalServerError("Something went wrong. Try again later.");
  }

  return parsedData.data;
};
