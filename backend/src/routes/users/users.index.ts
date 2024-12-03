import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./users.handlers";
import * as routes from "./users.routes";

const usersRouter = new OpenAPIHono().openapi(
  routes.getAllUsers,
  handlers.getAllUsers
);

export default usersRouter;
