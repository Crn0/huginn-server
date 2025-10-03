import { createUser } from "@/v1/user/service/user-service.js";

export const testUserLoginForm = { email: "crno@gmail.com", password: "Crnocrno123" } as const;

export const testDeleteUserLoginForm = { email: "jojo@gmail.com", password: "Crnocrno123" };

export const testUserGetMediaLoginForm = { email: "test@get.media", password: "Crnocrno123" };

export const seedTestUser = async () => {
  await Promise.all([
    createUser({
      email: "crno@gmail.com",
      displayName: ".crno.",
      birthday: new Date("1990-04-25"),
      password: "Crnocrno123",
    }),
    createUser({
      email: testDeleteUserLoginForm.email,
      displayName: ".crno.",
      birthday: new Date("1990-04-25"),
      password: testDeleteUserLoginForm.password,
    }),
    createUser({
      email: testUserGetMediaLoginForm.email,
      displayName: ".krno.",
      birthday: new Date("1990-04-25"),
      password: testUserGetMediaLoginForm.password,
    }),
  ]);
};
