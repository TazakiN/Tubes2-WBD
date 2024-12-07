import { OpenAPIHono } from "@hono/zod-openapi";

import * as handlers from "./profile.handlers";
import * as routes from "./profile.routes";
import { cache } from "hono/cache";

const profileRouter = new OpenAPIHono().get(
  "*",
  cache({
    cacheName: "my-cache",
    wait: true,
    cacheControl: "max-age=3600",
    keyGenerator: (c) => c.req.url,
  })
) as OpenAPIHono;

profileRouter
  .openapi(routes.getProfileInfo, handlers.getProfileInfo)
  .openapi(routes.getProfile, handlers.getProfile);

export default profileRouter;
