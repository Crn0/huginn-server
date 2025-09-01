import z from "zod";

import { ValidationError } from "@/lib/errors/validation-error.js";

import type { Request, Response, NextFunction } from "express";

type RequestWithQuery<T extends z.ZodType> = Request<
  never,
  never,
  never,
  z.infer<T>
>;

type RequestWithParams<T extends z.ZodType> = Request<
  z.infer<T>,
  never,
  never,
  never
>;

export const ZodBodyValidator =
  <T extends z.ZodType>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (err) {
      let message = "Validation Failed";
      let details: z.core.$ZodIssue[] = [];

      if (err instanceof z.ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in body`;
        details = err.issues;
      }

      const validationError = new ValidationError(message, details);

      next(validationError);
    }
  };

export const ZodQueryValidator =
  <T extends z.ZodType>(schema: T) =>
  (req: RequestWithQuery<T>, _res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);

      next();
    } catch (err) {
      let message = "Validation Failed";
      let details: z.core.$ZodIssue[] = [];

      if (err instanceof z.ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in body`;
        details = err.issues;
      }

      const validationError = new ValidationError(message, details);

      next(validationError);
    }
  };

export const ZodParamValidation =
  <T extends z.ZodType>(schema: T) =>
  (req: RequestWithParams<T>, _res: Response, next: NextFunction) => {
    try {
      req.params = z.parse(schema, req.params);
      next();
    } catch (err) {
      let message = "Query Format Error";
      let details: z.core.$ZodIssue[] = [];

      if (err instanceof z.ZodError) {
        message = `Validation failed: ${err.issues.length} errors detected in body`;
        details = err.issues;
      }

      const validationError = new ValidationError(message, details);

      next(validationError);
    }
  };
