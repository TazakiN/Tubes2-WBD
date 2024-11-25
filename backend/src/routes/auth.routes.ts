import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";

export const authRoutes = new Hono();

authRoutes.post("/login", async (c) => {
  return await AuthController.login(c);
});

authRoutes.post("/register", async (c) => {
  return await AuthController.register(c);
});

authRoutes.post("/logout", async (c) => {
  return await AuthController.logout(c);
});
