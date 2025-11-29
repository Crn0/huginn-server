import z from "zod";

import { paginationQuerySchema, paginationSchema } from "./pagination-schema.js";

const MIN_FILTER_LENGTH = 1 as const;
const MAX_FILTER_LENGTH = 36 as const;

// https://regexr.com/8h173
export const usernameRegex = /^[a-zA-Z0-9{_,.}]+$/;

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UserLoginDTO = z.infer<typeof userLoginSchema>;
export type User = z.infer<typeof userSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type UserAccountLevel = z.infer<typeof accountLevelEnum>;
export type UserFilter = z.infer<typeof userQueryFilterSchema>;
export type UserQuery = z.infer<typeof userQuerySchema>;

export const createUserSchema = z.object({
  email: z.email().trim(),
  displayName: z.string().trim().max(36, {
    error: "Use no more than 36 characters for the 'display name'",
  }),
  birthday: z.coerce.date().refine(
    (birthday) => {
      return new Date() > birthday;
    },
    { error: "Birthday must be in the past" }
  ),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(64, { error: "Password must be at most 64 characters long" }),
});

export const userLoginSchema = z.object({
  email: z.email().trim(),
  password: z.coerce.string().trim().min(1, { error: "Password is required" }),
});

export const accountLevelEnum = z.enum(["DEMO", "USER", "ADMIN"]);

export const userQueryFilterSchema = z.object({
  by: z
    .string({ error: "Invalid query" })
    .trim()
    .min(MIN_FILTER_LENGTH, "Query cannot be empty")
    .max(MAX_FILTER_LENGTH),
});

const baseUserSchema = z.object({
  id: z.uuidv7(),
  username: z.string(),
  profile: z.object({
    displayName: z.string().nullable(),
    bio: z.string().nullable(),
    location: z.string().nullable(),
    website: z.url().nullable(),

    avatarUrl: z.url().nullable(),
    bannerUrl: z.url().nullable(),
  }),

  _count: z.object({
    followedBy: z.coerce.number().default(0),
    following: z.coerce.number().default(0),
    tweets: z.coerce.number().default(0),
  }),

  createdAt: z.coerce.date().transform((d) => d.toISOString()),
  updatedAt: z.coerce
    .date()
    .transform((d) => d.toISOString())
    .nullable(),
});

export const userSchema = baseUserSchema.extend({
  followed: z.boolean().default(false),
});

export const authUserSchema = userSchema.extend({
  email: z.email().trim(),
  accountLevel: accountLevelEnum,
  profile: z.object({
    ...userSchema.shape.profile.shape,

    birthday: z.coerce.date().nullable(),
  }),

  openIds: z.array(
    z.object({
      name: z.enum(["GOOGLE"]),
    })
  ),
});

export const getUsersSchema = z.array(
  z.object({
    id: userSchema.shape.id,
    username: userSchema.shape.username,
    createdAt: userSchema.shape.createdAt,
    followed: userSchema.shape.followed,
    profile: z.object({
      displayName: userSchema.shape.profile.shape.displayName,
      avatarUrl: userSchema.shape.profile.shape.avatarUrl,
      bannerUrl: userSchema.shape.profile.shape.bannerUrl,
    }),
  })
);

export const getUsersPaginationSchema = paginationSchema.extend({ data: getUsersSchema });

export const userQuerySchema = z.intersection(paginationQuerySchema, userQueryFilterSchema);
