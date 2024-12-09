import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./feed.handlers";
import * as routes from "./feed.routes";

const feedsRouter = new OpenAPIHono()
  .openapi(routes.getAllFeeds, handlers.getAllFeeds)
  .openapi(routes.createFeed, handlers.createFeed)
  .openapi(routes.updateFeed, handlers.updateFeed)
  .openapi(routes.deleteFeed, handlers.deleteFeed);

export default feedsRouter;
