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
    if ((error as Error).message === "Identifiers or password is incorrect") {
      return c.json({ success: false, message: (error as Error).message }, 401);
    }
    return c.json({ success: false, message: "Internal server error" }, 500);
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
    if ((error as Error).message === "Username or Email already exists") {
      return c.json({ success: false, message: (error as Error).message }, 409);
    }
    return c.json({ success: false, message: "Internal server error" }, 500);
  }
};

export const logout = async (c: Context) => {
  try {
    deleteCookie(c, "token");
    return c.json({ success: true, message: "Logout successful" }, 200);
  } catch (error) {
    return c.json(
      { success: false, message: "An unexpected error occurred during logout" },
      500
    );
  }
};
