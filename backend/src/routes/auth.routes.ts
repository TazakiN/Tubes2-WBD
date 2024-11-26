import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { deleteCookie, setCookie } from "hono/cookie";

export const authRoutes = new Hono();

authRoutes.post("/login", zValidator("json", loginSchema), async (c) => {
  const { identifier, password } = c.req.valid("json");
  try {
    const token = await AuthController.login(identifier, password);
    setCookie(c, "token", token, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: false,
      path: "/",
    });
    return c.json({ success: true, token }, 200);
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

authRoutes.post("/register", zValidator("json", registerSchema), async (c) => {
  try {
    const { username, email, name, password } = c.req.valid("json");
    const token = await AuthController.register(
      username,
      email,
      password,
      name
    );

    setCookie(c, "token", token, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: false,
    });

    return c.json({ success: true, token }, 201);
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

authRoutes.post("/logout", async (c) => {
  try {
    deleteCookie(c, "token");
    return c.json({ message: "Logout successful" }, 200);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 500);
  }
});
