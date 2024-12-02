import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./connection.handlers";
import * as routes from "./connection.routes";

const connectionRequestRouter = new OpenAPIHono().openapi(
  routes.getAllConnect,
  handlers.getAllConnection
);

export default connectionRequestRouter;
