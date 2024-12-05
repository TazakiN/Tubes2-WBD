import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./connection.handlers";
import * as routes from "./connection.routes";

const connectionRouter = new OpenAPIHono()
  .openapi(routes.getAllConnection, handlers.getAllConnection)
  .openapi(routes.deleteConnection, handlers.deleteConnection)
  .openapi(routes.getAllConnectionInfo, handlers.getAllConnectionInfo);

export default connectionRouter;
