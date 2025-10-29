import z from "zod";

import { followSchema } from "./follow.js";
import { paginationSchema } from "@/v1/lib/pagination-schema.js";

export type FollowingPagination = z.infer<typeof followingPaginationSchema>;

export const followingPaginationSchema = paginationSchema.extend({
  data: z.array(followSchema),
});
