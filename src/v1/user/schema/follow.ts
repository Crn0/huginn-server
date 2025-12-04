import z from "zod";

import { paginationQuerySchema, paginationSchema } from "@/v1/lib/pagination-schema.js";
import { usersSchema } from "@/v1/lib/user-schema.js";

export type FollowUserScope = (typeof followUsersScope)[number];

export const followUsersScope = ["followers", "following"] as const;

export type FollowUsersQueryParam = z.infer<typeof followUsersQueryParamSchema>;

export const followUsersQueryParamSchema = paginationQuerySchema.extend({
  scope: z.enum(followUsersScope).optional().default("followers"),
});

export type FollowUserQueryParam = z.infer<typeof followUsersQueryParamSchema>;

export type FollowUsersPagination = z.infer<typeof followUsersPaginationSchema>;

export const followUserSchema = usersSchema.unwrap().omit({
    _count: true
  })

export const followUsersSchema = z.array(followUserSchema)

export const followUsersPaginationSchema = paginationSchema.extend({
  data: followUsersSchema,
});
