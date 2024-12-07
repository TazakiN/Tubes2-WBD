import { Context } from "hono";
import { FeedService } from "../../services/feed.service";

export const getAllFeeds = async (c: Context) => {
  try {
    const limitParam = c.req.query("limit");
    const cursorParam = c.req.query("cursor");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const cursor = cursorParam ? parseInt(cursorParam, 10) : 0;
    const feeds = await FeedService.getAllFeeds(limit, cursor);

    return c.json(
      {
        success: true,
        message: "Success",
        body: {
          cursor: cursor + limit,
          feeds,
        },
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: (error as Error).message,
      },
      500
    );
  }
};
