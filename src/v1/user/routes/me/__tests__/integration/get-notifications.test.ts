import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { generateId } from "@/v1/lib/generate-id.js";
import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { sendNotification } from "@/v1/notification/service/index.js";
import { app } from "v1/__mocks__/server.js";

let accessToken: string;
let nextCursor: string;
let prevCursor: string;

const userRequest = request(app);

beforeAll(async () => {
  const form = {
    email: "username.get@notifications.com",
    displayName: "get-notifications.data",
    password: "crnocrno123",
    birthday: new Date(),
  } as const;

  const createdUser = await createUser(form);

  const [login, users] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(form),
    Promise.all(
      Array.from({ length: 40 }).map(async (_, index) =>
        createUser({
          email: `username${index}.get@notifications.com`,
          displayName: `username.notifications${index}`,
          password: "Crnocrno123",
          birthday: new Date(),
        })
      )
    ),
  ]);

  accessToken = login.body.token;

  await Promise.all(
    users.map(async (user) =>
      sendNotification({
        type: "FOLLOW",
        senderId: user.id,
        receiverId: createdUser.id,
      })
    )
  );

  return async () => {
    const usersToDelete = [...users, createdUser] as const;

    await Promise.all(usersToDelete.map(async (user) => deleteUserById(user.id)));
  };
});

describe("GET /api/v1/users/me/notifications", () => {
  const url = "/api/v1/users/me/notifications" as const;

  describe("Success cases", () => {
    it("returns a list of notifications, total and the next and previous href", async () => {
      const res = await userRequest.get(url).set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: expect.any(String),
        prevHref: null,
        nextCursor: expect.any(String),
        prevCursor: null,
        total: 40,
      });
      expect(res.body.data.length).toBe(20);

      nextCursor = res.body.nextCursor;
    });

    it("paginates results using 'after' cursor query param", async () => {
      const res = await userRequest
        .get(`${url}?after=${nextCursor}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: null,
        prevHref: expect.any(String),
        nextCursor: null,
        prevCursor: expect.any(String),
        total: 40,
      });
      expect(res.body.data.length).toBe(20);

      prevCursor = res.body.prevCursor;
    });

    it("paginates results using 'before' cursor query param", async () => {
      const res = await userRequest
        .get(`${url}?before=${prevCursor}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.body).toMatchObject({
        data: expect.any(Array),
        nextHref: expect.any(String),
        prevHref: null,
        nextCursor: expect.any(String),
        prevCursor: null,
        total: 40,
      });
      expect(res.body.data.length).toBe(20);
    });
  });

  describe("Failure cases", () => {
    describe("Bad Request errors", () => {
      it("returns a bad request error when the query param 'after' is invalid", async () => {
        const res = await userRequest
          .get(`${url}?after=${generateId()}`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({
          code: "BAD_REQUEST_ERROR",
          message: "Invalid Cursor",
        });
      });

      it("returns a Validation error when the query param 'before' is invalid", async () => {
        const res = await userRequest
          .get(`${url}?before=${generateId()}`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({
          code: "BAD_REQUEST_ERROR",
          message: "Invalid Cursor",
        });
      });
    });
  });
});
