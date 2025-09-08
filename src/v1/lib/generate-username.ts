import { faker } from "@faker-js/faker";

export const generateUsername = (firstName: string, lastName?: string) =>
  faker.internet.username({ firstName, lastName: lastName ?? "" });
