import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "v1/__mocks__/server.js";

const userRequest = request(app);

describe("POST /api/v1/auth/register", () => {
  const url = "/api/v1/auth/register";

  const form = {
    email: "crno@test.com",
    displayName: "crno",
    password: "Crnocrno123",
    birthday: "1999-04-25",
  } as const;

  const invalidForm = {
    email: "crno@@test.com",
    displayName: Array.from({ length: 50 }, () => "crno").join(""),
    password: "crnocrno123",
    birthday: "1999-25-04",
  } as const;

  describe("Success cases", () => {
    it("returns the id and username when creating a user", async () => {
      const res = await userRequest.post(url).send(form);

      expect(res.body).toMatchObject({
        id: expect.any(String),
        username: expect.any(String),
      });
    });
  });

  describe("Failure cases", () => {
    describe("Validation errors", () => {
      const scenarios = [
        {
          scenario: "email is invalid",
          payload: { ...form, email: invalidForm.email },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                origin: "string",
                code: "invalid_format",
                format: "email",
                pattern:
                  "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
                path: ["email"],
                message: "Invalid email address",
              },
            ],
          },
        },
        {
          scenario: "displayName is invalid",
          payload: { ...form, displayName: invalidForm.displayName },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                origin: "string",
                code: "too_big",
                maximum: 36,
                inclusive: true,
                path: ["displayName"],
                message: "Use no more than 36 characters for the 'display name'",
              },
            ],
          },
        },
        {
          scenario: "password is invalid",
          payload: { ...form, password: invalidForm.password },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                code: "custom",
                path: ["password"],
                message:
                  "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number and no spaces",
              },
            ],
          },
        },
        {
          scenario: "birthday is invalid",
          payload: { ...form, birthday: invalidForm.birthday },
          responseBody: {
            code: "VALIDATION_ERROR",
            message: "Validation failed: 1 errors detected in body",
            issues: [
              {
                expected: "date",
                code: "invalid_type",
                received: "Invalid Date",
                path: ["birthday"],
                message: "Invalid input: expected date, received Date",
              },
            ],
          },
        },
      ] as const;

      it.each(scenarios)(
        "returns a validation error when $scenario",
        async ({ payload, responseBody }) => {
          const res = await userRequest.post(url).send(payload);

          expect(res.body).toMatchObject(responseBody);
        }
      );
    });

    describe("Conflict errors", () => {
      it("returns a conflict error when email is already taken", async () => {
        const res = await userRequest.post(url).send(form);

        expect(res.body).toMatchObject({
          code: "CONFLICT_ERROR",
          field: {
            code: "email_conflict",
            message: "Email has already been taken.",
            path: ["email"],
          },
          message: "Email conflict",
        });
      });
    });
  });
});
