import { InternalServerError } from "@/lib/errors/internal-server-error.js";
import { followingPaginationSchema } from "../schema/following.js";

import type { getFollowingByUsernamePagination } from "../service/follow-service.js";

export type ToFollowingProp = Awaited<ReturnType<typeof getFollowingByUsernamePagination>>;

export const toFollowingResponse = (props: ToFollowingProp) => {
  const parsedData = followingPaginationSchema.safeParse({
    ...props,
  });

  if (!parsedData.success) {
    throw new InternalServerError("Something went wrong. Try again later.");
  }

  return parsedData.data;
};
