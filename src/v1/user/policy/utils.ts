import type { UserById } from "../service/user-service.js";

export const isDemoUser = (user: UserById) => {
  return user?.accountLevel === "DEMO";
};
