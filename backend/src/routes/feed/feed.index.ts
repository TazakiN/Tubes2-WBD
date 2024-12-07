import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./feed.handlers";
import * as routes from "./feed.routes";
import { cache } from "hono/cache";

const feedsRouter = new OpenAPIHono().get(
  "*",
  cache({
    cacheName: "my-cache",
    wait: true,
    cacheControl: "max-age=3600",
    keyGenerator: (c) => c.req.url,
  })
) as OpenAPIHono;
feedsRouter.openapi(routes.getAllFeeds, handlers.getAllFeeds);

export default feedsRouter;
