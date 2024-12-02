import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./connection_request.handlers";
import * as routes from "./connection_request.routes";

const connectionRequestRouter = new OpenAPIHono().openapi(
  routes.getAllConnectionRequests,
  handlers.getAllConnectionRequests
);

export default connectionRequestRouter;
