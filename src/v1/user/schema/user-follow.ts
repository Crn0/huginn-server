import z from "zod";

export const userFollowSchema = z.object({
  followId: z.uuidv7({ error: "Invalid ID" }),
});
