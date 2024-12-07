import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./feed.handlers";
import * as routes from "./feed.routes";

const feedsRouter = new OpenAPIHono().openapi(
  routes.getAllFeeds,
  handlers.getAllFeeds
);

export default feedsRouter;
