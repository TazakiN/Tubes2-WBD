import { setCookie } from "hono/cookie";
import AuthService from "../services/auth.service";
import { Context } from "hono";

export class AuthController {
  static async register(c: Context) {
    try {
      const body = await c.req.json();
      const { username, email, password } = body;

      if (!username || !email || !password) {
        return c.json(
          {
            success: false,
            message: "Username, email, and password are required",
          },
          400
        );
      }

      const token = await AuthService.register(username, email, password);
      return c.json(
        {
          success: true,
          message: "Register successful",
          body: {
            token: token,
          },
        },
        201
      );
    } catch (error) {
      return c.json({ message: (error as Error).message }, 500);
    }
  }

  static async login(c: Context) {
    try {
      const body = await c.req.json();
      const { identifier, password } = body;

      if (!identifier || !password) {
        return c.json({ message: "Identifier and password are required" }, 400);
      }

      const token = await AuthService.login(identifier, password);
      setCookie(c, "token", token, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      });

      return c.json({ message: "Login successful", token }, 200);
    } catch (error) {
      return c.json({ message: (error as Error).message }, 500);
    }
  }
}
