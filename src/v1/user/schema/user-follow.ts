import z from "zod";

export const userFollowSchema = z.object({
  username: z.coerce.string({ error: "Invalid follow username" }),
});
