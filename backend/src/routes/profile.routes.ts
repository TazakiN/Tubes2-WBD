import { Hono } from "hono";
import { profileController } from "../controllers/profile.controller";
import { JwtVariables } from "hono/jwt";
import verifyJWT from "../middlewares/verifyJWT";

export const profileRoutes = new Hono<{ Variables: JwtVariables }>();

profileRoutes.use("*", verifyJWT);

profileRoutes.get("/:user_id", async (c) => {
  return await profileController.getProfile(c);
});
