import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./connection_request.handlers";
import * as routes from "./connection_request.routes";

const connectionRequestRouter = new OpenAPIHono()
  .openapi(routes.getAllConnectionRequests, handlers.getAllConnectionRequests)
  .openapi(routes.getConnectionRequest, handlers.getConnectionRequest) // ! belum ditest
  .openapi(routes.createConnectionRequest, handlers.createConnectionRequest)
  .openapi(routes.cancelConnectionRequest, handlers.cancelConnectionRequest)
  .openapi(routes.acceptConnectionRequest, handlers.acceptConnectionRequest)
  .openapi(routes.rejectConnectionRequest, handlers.rejectConnectionRequest);

export default connectionRequestRouter;
