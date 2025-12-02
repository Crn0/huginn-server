import z from "zod";

import { paginationQuerySchema } from "@/v1/lib/pagination-schema.js";
import { MAX_CONTENT_LENGTH } from "@/v1/tweet/constants/index.js";


export const mediaPaginationSchema = paginationQuerySchema.extend({   search: z.string({ error: "Invalid query" }).min(1, { error: "Required"}).max(MAX_CONTENT_LENGTH),}) 

export type MediaPagination = z.infer<typeof mediaPaginationSchema>