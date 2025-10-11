import z from "zod";

import { passwordRegex } from "@/v1/lib/user-schema.js";

export type PatchPassword = z.infer<typeof patchPasswordSchema>;

export const patchPasswordSchema = z.object({
  oldPassword: z.string().trim().min(1, { error: "Old password is required." }),
  password: z.string().refine((val) => passwordRegex.test(val), {
    message:
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number and no spaces",
  }),
});
