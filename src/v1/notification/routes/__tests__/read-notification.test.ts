import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { createUser } from "@/v1/user/service/user-service.js";
import { deleteUserById } from "@/v1/user/repository/user.js";
import { app } from "v1/__mocks__/server.js";
import { sendNotification } from "../../service/index.js";

const userRequest = request.agent(app);

let senderAccessToken: string;
let receiverAccessToken: string;
const notificationIds: string[] = [];

beforeAll(async () => {
  const senderForm = {
    email: "create-notificatio-sendern@gmail.com",
    displayName: "create-notification-receiver",
    password: "crnocrno",
    birthday: new Date(),
  } as const;

  const receiverForm = {
    email: "create-notificatio-receiver@gmail.com",
    displayName: "create-notification-receiver",
    password: "crnocrno",
    birthday: new Date(),
  } as const;

  const [sender, receiver] = await Promise.all([createUser(senderForm), createUser(receiverForm)]);

  const [senderLogin, receiverLogin] = await Promise.all([
    userRequest.post("/api/v1/auth/login").send(senderForm),
    userRequest.post("/api/v1/auth/login").send(receiverForm),
  ]);

  senderAccessToken = senderLogin.body.token;
  receiverAccessToken = receiverLogin.body.token;

  const notification = await sendNotification({
    type: "FOLLOW",
    senderId: sender.id,
    receiverId: receiver.id,
  });

  notificationIds.push(notification.id);

  return async () => {
    await Promise.all([sender.id, receiver.id].map((id) => deleteUserById(id)));
  };
});

describe("POST /api/v1/notifications", () => {
  const url = "/api/v1/notifications/read" as const;

  describe("Success cases", () => {
    it("returns status 204", async () => {
      const res = await userRequest
        .post(url)
        .set("Authorization", `Bearer ${receiverAccessToken}`)
        .send({ readIds: notificationIds });

      expect(res.status).toBe(204);
    });
  });

  describe("Failure cases", () => {
    describe("Forbidden errors", () => {
      it("returns a forbidden error when non receiver read the notifications", async () => {
        const res = await userRequest
          .post(url)
          .set("Authorization", `Bearer ${senderAccessToken}`)
          .send({ readIds: notificationIds });

        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({
          code: "FORBIDDEN_ERROR",
          message: "Must be the receiver",
        });
      });
    });
  });
});
