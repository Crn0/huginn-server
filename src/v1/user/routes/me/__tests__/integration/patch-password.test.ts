import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { app } from "v1/__mocks__/server.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";

const userRequest = request.agent(app);

let accessToken: string;

beforeAll(async () => {
  const form = {
    email: "patch.password@patch.com",
    displayName: "patch.user.password",
    password: "Crnocrno123",
    birthday: new Date(),
  } as const;

  const user = await createUser(form);

  const login = await userRequest.post("/api/v1/auth/login").send(form);

  accessToken = login.body.token;

  return async () => {
    await deleteUserById(user.id);
  };
});

describe("PATCH /api/v1/users/me/password", () => {
  const url = "/api/v1/users/me/password";

  const form = {
    oldPassword: "Crnocrno123",
    password: "Krnokrno123",
  } as const;

  const invalidForm = {
    oldPassword: "Crnocrno123",
    password: "Krno",
  } as const;

  describe("Success cases", () => {
    it("returns status 204 and logout the user", async () => {
      const res = await userRequest
        .patch(url)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(form);

      expect(res.status).toBe(204);
      expect(res.header["set-cookie"]?.[0]).not.toBeUndefined();
      expect(res.header["set-cookie"]?.[0]).toBe(
        "refreshToken=; Path=/api; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"
      );
    });
  });

  describe("Failure cases", () => {
    beforeAll(async () => {
      const login = await userRequest.post("/api/v1/auth/login").send({
        ...form,
        email: "patch.password@patch.com",
        password: "Krnokrno123",
      });

      accessToken = login.body.token;
    });

    describe("Unauthorized errors", () => {
      it("returns a unauthorized error when the password is in-correct", async () => {
        const res = await userRequest
          .patch(url)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(form);

        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({
          message: "Incorrect old password.",
        });
      });
    });

    describe("Validation errors", () => {
      it("returns a validation error when the password is invalid", async () => {
        const res = await userRequest
          .patch(url)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(invalidForm);

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject({
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
        });
      });
    });
  });
});
