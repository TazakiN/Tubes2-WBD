import { Context, MiddlewareHandler } from "hono";
import CacheStore from "../utils/cache";

export const cacheMiddleware = (
  duration: number = 300000
): MiddlewareHandler => {
  return async (c: Context, next: () => Promise<void>) => {
    if (c.req.method !== "GET") {
      return await next();
    }

    const cache = CacheStore;
    const key = c.req.url;

    c.header("Cache-Control", `max-age=${Math.floor(duration / 1000)}, public`);
    c.header("Expires", new Date(Date.now() + duration).toUTCString());

    const cachedResponse = cache.get(key);
    if (cachedResponse) {
      c.header("X-Cache", "HIT");
      return c.json(cachedResponse);
    }

    c.header("X-Cache", "MISS");
    await next();

    const response = c.res;
    if (response) {
      try {
        const clonedResponse = response.clone();
        const body = await clonedResponse.json();

        cache.set(key, body);

        setTimeout(() => {
          cache.delete(key);
        }, duration);
      } catch (error) {
        console.error("Failed to cache response:", error);
      }
    }
  };
};
