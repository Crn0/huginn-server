import z from "zod";

export const userIdSchema = z.object({
  userId: z.uuidv7({ error: "Invalid user ID" }),
});

export const usernameSchema = z.object({
  username: z.coerce.string(),
});
