import { Context } from "hono";
import { AuthController } from "../../controllers/auth.controller";
import { deleteCookie, setCookie } from "hono/cookie";

export const login = async (c: Context) => {
  const { identifier, password } = await c.req.json();
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
};

export const register = async (c: Context) => {
  try {
    const { username, email, name, password } = await c.req.json();
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
};

export const logout = async (c: Context) => {
  try {
    deleteCookie(c, "token");
    return c.json({ message: "Logout successful" }, 200);
  } catch (error) {
    return c.json({ message: (error as Error).message }, 500);
  }
};
