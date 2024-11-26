import { z } from "zod";

export const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
