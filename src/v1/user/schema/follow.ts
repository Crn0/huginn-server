import z from 'zod'

import { profileMediaSchema } from '@/v1/lib/user-schema.js';

const refineHref = (v: string | null, ctx: z.core.$RefinementCtx) => {
  if (typeof v === "string") {
    const arrStrings = v.split("=");
    const field = arrStrings?.[0]?.split?.("?")?.[1] ?? "";
    const cursorId = arrStrings[1];

    const parsedCursorId = z.uuidv7().safeParse(cursorId);

    if (!parsedCursorId.success) {
      return ctx.addIssue({
        origin: "string",
        code: "invalid_format",
        format: "uuid",
        pattern:
          "/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/",
        path: [field],
        message: "Invalid cursor",
      });
    }
  }
};


export const followSchema = z.object({
  id: z.uuidv7({ error: "Invalid ID" }),
  username: z.string(),
  profile: z.object({
    displayName: z.string().nullable(),
    avatar: profileMediaSchema.nullable(),
    banner: profileMediaSchema.nullable(),
  }),
});


export const followPaginationSchema = z.object({
  nextHref: z.string().nullable().superRefine(refineHref),
  prevHref: z.string().nullable().superRefine(refineHref),
  nextCursor: z.uuidv7().nullable(),
  prevCursor: z.uuidv7().nullable(),
  total: z.coerce.number().default(0),
});