import z from "zod";

import { userLoginSchema } from "@/v1/lib/user-schema.js";

export const requestResetPasswordSchema = userLoginSchema.omit({
  password: true,
});

export type RequestResetPassword = z.infer<typeof requestResetPasswordSchema>;

export const resetPasswordSchema = userLoginSchema
  .omit({
    email: true,
  })
  .extend({
    token: z.string(),
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
