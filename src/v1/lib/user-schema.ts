import z from "zod";

const mediaSizeSchema = z.object({
  url: z.url(),
  w: z.coerce.number(),
  h: z.coerce.number(),
});

const profileMediaSchema = z.object({
  id: z.uuidv7(),
  url: z.url(),
  type: z.enum(["image", "gif"]),
  sizes: z.object({
    small: mediaSizeSchema,
    medium: mediaSizeSchema,
    large: mediaSizeSchema,
  }),
});

// https://regexr.com/8dmei
export const usernameRegex = /^[a-zA-Z0-9{_,.}]+$/;
// https://regexr.com/8dm04
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UserLoginDTO = z.infer<typeof userLoginSchema>;
export type User = z.infer<typeof userSchema>;
export type UserAccountLevel = z.infer<typeof accountLevelEnum>;
export type MediaSize = z.infer<typeof mediaSizeSchema>;

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

export const userSchema = z.object({
  id: z.uuidv7(),
  // email: z.email().trim(),
  username: z.string(),
  // password: z.string(),
  accountLevel: accountLevelEnum,

  profile: z.object({
    displayName: z.string().nullable(),
    bio: z.string().nullable(),
    birthday: z.coerce
      .date()
      .transform((d) => d.toDateString())
      .nullable(),
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

  createdAt: z.date().transform((d) => d.toISOString()),
  updatedAt: z.iso.datetime().nullable(),
  deletedAt: z.iso.datetime().nullable(),
});
