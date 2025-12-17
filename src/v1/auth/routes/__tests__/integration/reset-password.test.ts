import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { generateActionToken } from "@/v1/lib/jwt.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";

import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

let user: Awaited<ReturnType<typeof createUser>>;

beforeAll(async () => {
  const createdUser = await createUser({
    email: "reset.password@gmail.com",
    displayName: "reset-password",
    password: "crnocrno",
    birthday: new Date(),
  });

  user = createdUser;

  return async () => {
    await deleteUserById(createdUser.id);
  };
});

describe("POST /api/v1/auth/reset-password", () => {
  const url = "/api/v1/auth/reset-password" as const;

  const form = {
    email: "reset.password@gmail.com",
  } as const;

  const invalidForm = {
    email: "not-a-email",
  } as const;

  describe("Success cases", () => {
    it("returns an accessToken in the response body and sets an http-only refreshToken cookie", async () => {
      const res = await userRequest.post(url).send(form);

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Validation errors", () => {
      it("returns an validation error when the email is invalid", async () => {
        const res = await userRequest.post(url).send(invalidForm);

        expect(res.body).toMatchObject({
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
        });
      });
    });
  });
});

describe("GET /api/v1/auth/reset-password", () => {
  const url = "/api/v1/auth/reset-password" as const;

  describe("Success cases", () => {
    it("returns an accessToken in the response body and sets an http-only refreshToken cookie", async () => {
      const token = generateActionToken(user.id, { username: user.username });

      const res = await userRequest.get(`${url}/${token}`);

      expect(res.status).toBe(200);

      expect(res.body).toMatchObject({ id: user.id });
    });
  });

  describe("Failure cases", () => {
    describe("Authentication errors", () => {
      it("returns an authentication error when the token is expired", async () => {
        const token = generateActionToken(user.id, { username: user.username }, 0);

        const res = await userRequest.get(`${url}/${token}`);

        expect(res.status).toBe(401);

        expect(res.body).toMatchObject({
          code: "AUTHENTICATION_ERROR",
          message: "jwt expired",
        });
      });
    });
  });
});

describe("PATCH /api/v1/auth/reset-password", () => {
  const url = "/api/v1/auth/reset-password" as const;

  describe("Success cases", () => {
    it("returns an accessToken in the response body and sets an http-only refreshToken cookie", async () => {
      const token = generateActionToken(user.id, { username: user.username });

      const res = await userRequest.patch(url).send({ token, password: "crnocrno123" });

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Authentication errors", () => {
      it("returns an authentication error when the token is expired", async () => {
        const token = generateActionToken(user.id, { username: user.username }, 0);

        const res = await userRequest
          .patch(url)
          .send({ token, userId: user.id, password: "crnocrno123" });

        expect(res.body).toMatchObject({
          code: "AUTHENTICATION_ERROR",
          message: "jwt expired",
        });
      });
    });
  });
});
