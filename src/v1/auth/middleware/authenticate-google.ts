import passport from "passport";

export const authenticatePassportGoogle = passport.authenticate("google", {
  prompt: "consent",
  session: false,
});
