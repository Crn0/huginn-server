import { createUser } from "@/v1/user/service/user-service.js";

export const testUserLoginForm = { email: "crno@gmail.com", password: "Crnocrno123" } as const;

export const seedTestUser = async () => {
  await createUser({
    email: "crno@gmail.com",
    displayName: ".crno.",
    birthday: new Date("1990-04-25"),
    password: "Crnocrno123",
  });
};
