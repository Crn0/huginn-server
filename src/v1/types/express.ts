import type { Request } from "express";
import type { PaginationCursor } from "../lib/prisma-pagination.js";

export type RequestWithPagination<
  TParams = unknown,
  TResBody = unknown,
  TReqBody = unknown,
> = Request<TParams, TResBody, TReqBody, PaginationCursor>;
