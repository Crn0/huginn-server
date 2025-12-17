import nodemailer from "nodemailer";

import { env } from "@/configs/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: env.GOOGLE_GMAIL,
    pass: env.GOOGLE_APP_PASSWORD,
  },
});
