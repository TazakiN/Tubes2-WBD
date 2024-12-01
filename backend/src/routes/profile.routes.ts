import { Hono } from "hono";
import { profileController } from "../controllers/profile.controller";
import { JwtVariables } from "hono/jwt";
import verifyJWT from "../middlewares/verifyJWT";

const profileRoutes = new Hono<{ Variables: JwtVariables }>();

profileRoutes.use("*", verifyJWT);

profileRoutes.get("/info", async (c) => {
  return await profileController.getProfileInfo(c);
});

profileRoutes.get("/:user_id", async (c) => {
  return await profileController.getProfile(c);
});

export default profileRoutes;
