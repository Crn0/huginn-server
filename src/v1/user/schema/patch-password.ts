import z from "zod";

export type PatchPassword = z.infer<typeof patchPasswordSchema>;

export const patchPasswordSchema = z.object({
  oldPassword: z.string().trim().min(1, { error: "Old password is required." }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password must be at most 64 characters long" }),
});
