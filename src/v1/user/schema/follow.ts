import z from 'zod'

import { profileMediaSchema } from '@/v1/lib/user-schema.js';

export const followSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  username: z.string(),
  profile: z.object({
    displayName: z.string().nullable(),
    avatar: profileMediaSchema.nullable(),
    banner: profileMediaSchema.nullable(),
  }),
});