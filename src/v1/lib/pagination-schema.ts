import z from "zod";

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const paginationQuerySchema = z.object({
  before: z.uuidv7({ error: "Invalid cursor" }).optional(),
  after: z.uuidv7({ error: "Invalid cursor" }).optional(),
});