import z from "zod";

import { followSchema } from "./follow.js";
import { paginationSchema } from "@/v1/lib/pagination-schema.js";

export type FollowersPagination = z.infer<typeof followersPaginationSchema>;

export const followersPaginationSchema = paginationSchema.extend({
  data: z.array(followSchema),
});
