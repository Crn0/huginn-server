import z from "zod";

export const followSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  username: z.string(),
  profile: z.object({
    displayName: z.string().nullable(),
    avatarUrl: z.url().nullable(),
    bannerUrl: z.url().nullable(),
  }),
});
