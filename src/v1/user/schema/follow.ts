import z from "zod";

import { paginationQuerySchema, paginationSchema } from "@/v1/lib/pagination-schema.js";
import { getUsersSchema } from "@/v1/lib/user-schema.js";

export type FollowUserScope = (typeof followUsersScope)[number];

export const followUsersScope = ["followers", "following"] as const;

export type FollowUsersQueryParam = z.infer<typeof followUsersQueryParamSchema>;

export const followUsersQueryParamSchema = paginationQuerySchema.extend({
  scope: z.enum(followUsersScope).optional().default("followers"),
});

export type FollowUserQueryParam = z.infer<typeof followUsersQueryParamSchema>;

export type FollowUsersPagination = z.infer<typeof followUsersPaginationSchema>;

export const followUserSchema = getUsersSchema.unwrap().safeExtend({
  profile: z.object({
    ...getUsersSchema.unwrap().shape.profile.shape,
    bio: z.string().nullable().default(null),
  }),
});

export const followUsersPaginationSchema = paginationSchema.extend({
  data: z.array(followUserSchema),
});
