import z from "zod";

import { followPaginationSchema, followSchema } from "./follow.js";

export type FollowersPagination = z.infer<typeof followersPaginationSchema>

export const followersPaginationSchema = followPaginationSchema.extend({
  followers: z.array(followSchema),
});
