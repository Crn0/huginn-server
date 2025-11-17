import z from "zod";

import { paginationSchema } from "@/v1/lib/pagination-schema.js";
import { getUsersSchema } from "@/v1/lib/user-schema.js";

export type FollowingPagination = z.infer<typeof followingPaginationSchema>;

export const followingPaginationSchema = paginationSchema.extend({
  data: getUsersSchema,
});
