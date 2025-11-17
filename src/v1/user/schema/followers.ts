import z from "zod";

import { paginationSchema } from "@/v1/lib/pagination-schema.js";
import { getUsersSchema } from "@/v1/lib/user-schema.js";

export type FollowersPagination = z.infer<typeof followersPaginationSchema>;

export const followersPaginationSchema = paginationSchema.extend({
  data: getUsersSchema,
});
