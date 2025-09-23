import z from "zod";

export const userIdSchema = z.object({
  userId: z.uuidv7({ error: "Invalid user ID" }),
});
