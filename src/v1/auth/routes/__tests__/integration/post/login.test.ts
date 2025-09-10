import { describe, expect, it } from "vitest";
import request from "supertest";

import { testUserLoginForm } from "testing/seed.js";
import { app } from "v1/__mocks__/server.js";

const userRequest = request.agent(app);

describe("POST /api/v1/auth/login", () => {
  const url = "/api/v1/auth/login" as const;

  const invalidForm = {
    email: "crnocrnok@test.com",
    password: "crnocrno123",
  } as const;

  describe("Success cases", () => {
    it("returns an accessToken in the response body and sets an http-only refreshToken cookie", async () => {
      const res = await userRequest.post(url).send(testUserLoginForm);

      const cookies = res.headers["set-cookie"] as string[] | undefined;

      const refreshToken = cookies?.[0];

      expect(res.body.token).toBeTypeOf("string");
      expect(refreshToken).toBeTypeOf("string");
    });
  });

  describe("Failure cases", () => {
    describe("Authentication errors", () => {
      it("returns an authentication error when the credentials are invalid", async () => {
        const res = await userRequest.post(url).send({
          ...testUserLoginForm,
          email: invalidForm.email,
        });

        expect(res.body).toMatchObject({
          code: "AUTHENTICATION_ERROR",
          message: "Invalid credentials.",
        });
      });
    });

    describe("Rate-limit errors", () => {
      it("returns a rate-limit error when the maximum attempts are exceeded", async () => {
        await Promise.all(
          Array.from({ length: 10 }).map(async () => userRequest.post(url).send(testUserLoginForm))
        );

        const res = await userRequest.post(url).send(testUserLoginForm);

        expect(res.headers["retry-after"]).toBe("60");
        expect(res.body).toMatchObject({
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many login attempts. Try again later.",
          retryAfter: 60,
        });
      });
    });
  });
});
