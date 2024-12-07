import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const authRouter = new OpenAPIHono()
  .openapi(routes.login, handlers.login)
  .openapi(routes.register, handlers.register)
  .openapi(routes.logout, handlers.logout);

export default authRouter;
