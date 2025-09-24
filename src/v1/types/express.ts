import type { Request } from "express";
import type { PaginationCursor } from "../lib/prisma-pagination.js";

export type RequestWithPagination = Request<unknown, unknown, unknown, PaginationCursor>;