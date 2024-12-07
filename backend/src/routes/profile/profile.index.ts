import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./profile.handlers";
import * as routes from "./profile.routes";

const profileRouter = new OpenAPIHono()
  .openapi(routes.getProfileInfo, handlers.getProfileInfo)
  .openapi(routes.getProfile, handlers.getProfile);

export default profileRouter;
