import z from "zod";

import { followPaginationSchema, followSchema } from "./follow.js";

export type FollowingPagination = z.infer<typeof followingPaginationSchema>

export const followingPaginationSchema = followPaginationSchema.extend({
  following: z.array(followSchema),
});
