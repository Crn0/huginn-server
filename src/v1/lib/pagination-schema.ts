import z from "zod";

const refineHref = (href: string | null, ctx: z.core.$RefinementCtx) => {
  if (typeof href === "string") {
    const regex = /(?:after|before)=([^&]+)/g;
    const arrStrings = href.split("=");
    const field = arrStrings?.[0]?.split?.("?")?.[1] ?? "";
    const matches = [...href.matchAll(regex)];

    for (const m of matches) {
      const parsedCursorId = z.uuidv7().safeParse(m[1]);

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
  }
};

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const paginationQuerySchema = z.object({
  before: z.uuidv7({ error: "Invalid cursor" }).optional(),
  after: z.uuidv7({ error: "Invalid cursor" }).optional(),
});

export const paginationSchema = z.object({
  nextHref: z.string().nullable().superRefine(refineHref),
  prevHref: z.string().nullable().superRefine(refineHref),
  nextCursor: z.uuidv7().nullable(),
  prevCursor: z.uuidv7().nullable(),
  total: z.coerce.number().default(0),
});
