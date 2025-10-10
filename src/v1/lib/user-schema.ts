import z from "zod";

import { paginationQuerySchema, paginationSchema } from "./pagination-schema.js";

const MIN_FILTER_LENGTH = 1 as const;
const MAX_FILTER_LENGTH = 36 as const;

const mediaSizeSchema = z.object({
  url: z.url(),
  w: z.coerce.number(),
  h: z.coerce.number(),
});

export const profileMediaSchema = z.object({
  id: z.uuidv7(),
  url: z.url(),
  type: z.enum(["IMAGE", "GIF"]),
  sizes: z.object({
    small: mediaSizeSchema,
    medium: mediaSizeSchema,
    large: mediaSizeSchema,
  }),
});

// https://regexr.com/8h173
export const usernameRegex = /^[a-zA-Z0-9{_,.}]+$/;
// https://regexr.com/8dm04
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UserLoginDTO = z.infer<typeof userLoginSchema>;
export type User = z.infer<typeof userSchema>;
export type UserAccountLevel = z.infer<typeof accountLevelEnum>;
export type MediaSize = z.infer<typeof mediaSizeSchema>;
export type UserFilter = z.infer<typeof userQueryFilterSchema>;
export type UserQuery = z.infer<typeof userQuerySchema>;

export const createUserSchema = z.object({
  email: z.email().trim(),
  displayName: z.string().trim().max(36, {
    message: "Use no more than 36 characters for the 'display name'",
  }),
  birthday: z.coerce.date(),
  password: z.string().refine((val) => passwordRegex.test(val), {
    message:
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number and no spaces",
  }),
});

export const userLoginSchema = z.object({
  email: z.email().trim(),
  password: z.string().refine((val) => passwordRegex.test(val), {
    message:
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number and no spaces",
  }),
});

export const accountLevelEnum = z.enum(["DEMO", "USER", "ADMIN"]);

export const userQueryFilterSchema = z.object({
  s: z
    .string({ error: "Invalid query" })
    .trim()
    .min(MIN_FILTER_LENGTH, "Query cannot be empty")
    .max(MAX_FILTER_LENGTH),
});

export const userSchema = z.object({
  id: z.uuidv7(),
  // email: z.email().trim(),
  username: z.string(),
  // password: z.string(),
  accountLevel: accountLevelEnum,

  profile: z.object({
    displayName: z.string().nullable(),
    bio: z.string().nullable(),
    birthday: z.coerce.date().nullable(),
    location: z.string().nullable(),
    website: z.url().nullable(),

    avatar: profileMediaSchema.nullable(),
    banner: profileMediaSchema.nullable(),
  }),

  openIds: z.array(
    z.object({
      id: z.uuidv7(),
      name: z.enum(["GOOGLE"]),
      avatarUrl: z.url().nullable(),
    })
  ),

  follow: z.object({
    followersCount: z.coerce.number().default(0),
    followingCount: z.coerce.number().default(0),
  }),

  createdAt: z.coerce.date().transform((d) => d.toISOString()),
  updatedAt: z.coerce
    .date()
    .transform((d) => d.toISOString())
    .nullable(),
  deletedAt: z.coerce
    .date()
    .transform((d) => d.toISOString())
    .nullable(),
});

export const getUsersSchema = z.array(
  z.object({
    id: userSchema.shape.id,
    username: userSchema.shape.username,
    createdAt: userSchema.shape.createdAt,
    avatarUrl: z.url().nullable(),
    profile: z.object({
      displayName: userSchema.shape.profile.shape.displayName,
      avatar: userSchema.shape.profile.shape.avatar,
    }),
  })
);

export const getUsersPaginationSchema = paginationSchema.extend({ data: getUsersSchema });

export const userQuerySchema = z.intersection(paginationQuerySchema, userQueryFilterSchema);
