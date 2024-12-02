import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./connection_request.handlers";
import * as routes from "./connection_request.routes";

const connectionRequestRouter = new OpenAPIHono()
  .openapi(routes.getAllConnectionRequests, handlers.getAllConnectionRequests)
  .openapi(routes.createConnectionRequest, handlers.createConnectionRequest)
  // .openapi(routes.getConnectionRequest, handlers.getConnectionRequest)
  .openapi(routes.acceptConnectionRequest, handlers.acceptConnectionRequest)
  .openapi(routes.rejectConnectionRequest, handlers.rejectConnectionRequest);
// .openapi(routes.updateConnectionRequest, handlers.updateConnectionRequest);

export default connectionRequestRouter;
