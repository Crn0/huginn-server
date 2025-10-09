import z from "zod";

export type PatchUserProfileDTO = z.infer<typeof patchUserProfileSchema> & {
  avatar: z.infer<typeof userProfileMediaSchema>;
  banner: z.infer<typeof userProfileMediaSchema>;
};

export const MAX_FILE_SIZE = 10_000_000 as const; // 10mb
export const SUPPORTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const userProfileMediaSchema = z.object(
  {
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.enum(SUPPORTED_FILE_TYPES, {
      error: `Only ${SUPPORTED_FILE_TYPES.slice(0, -1).join(", ")} or ${SUPPORTED_FILE_TYPES.at(-1)} formats are supported.`,
    }),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z
      .number()
      .refine((val) => val <= MAX_FILE_SIZE, { error: "Max image size is 10MB." })
      .or(z.bigint().refine((val) => val <= MAX_FILE_SIZE, { error: "Max image size is 10MB." })),
  },
  { error: "Invalid file" }
);

export const patchUserProfileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, { error: "Display name is required" })
    .max(36, {
      message: "Use no more than 36 characters for the 'display name'",
    })
    .optional(),
  bio: z.string().trim().max(160, { error: "Bio must be at most 160 characters" }).optional(),
  birthday: z.coerce.date().optional(),
  location: z
    .string()
    .trim()
    .max(30, { error: "Location must be at most 30 characters" })
    .optional(),
  website: z.url().trim().max(160, { error: "Website must be at most 160 characters" }).optional(),
});
