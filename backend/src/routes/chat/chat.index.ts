import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./chat.handlers";
import * as routes from "./chat.routes";

const chatRouter = new OpenAPIHono().openapi(
  routes.getChatInterlocutorsHistory,
  handlers.getChatInterlocutorsHistory
);

export default chatRouter;
