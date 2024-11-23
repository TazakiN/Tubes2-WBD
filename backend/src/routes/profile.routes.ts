import { Context, Hono, Next } from "hono";
import { profileController } from "../controllers/profile.controller";
import { jwt } from "hono/jwt";
import { JwtVariables } from "hono/jwt";

export const profileRoutes = new Hono<{ Variables: JwtVariables }>();

profileRoutes.use("*", (c: Context, next: Next) => {
  const secret = process.env.JWT_SECRET!;

  const jwtMiddleware = jwt({
    secret,
    cookie: "token",
  });
  return jwtMiddleware(c, next);
});

profileRoutes.get("/:user_id", async (c) => {
  return await profileController.getProfile(c);
});
