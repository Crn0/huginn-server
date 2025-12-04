import z from "zod";

import { usernameRegex } from "@/v1/lib/user-schema.js";

export const patchUsernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters and no more than 15 characters long")
    .max(15, "Username must be at least 3 characters and no more than 15 characters long")
    .refine((val) => usernameRegex.test(val), {
      message:
        "Username can only contain letters (A-Z, a-z), numbers (0-9), and the characters: _ , .",
    }),
});
