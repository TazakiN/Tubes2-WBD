import { Context } from "hono";
import { FeedService } from "../../services/feed.service";

export const getAllFeeds = async (c: Context) => {
  try {
    const limit = parseInt(c.req.query("limit") || "10", 10);
    const cursor = parseInt(c.req.query("cursor") || "0", 10);
    const feeds = await FeedService.getAllFeeds(limit, BigInt(cursor));

    return c.json(
      {
        success: true,
        message: "Success",
        body: {
          cursor: cursor + feeds.length,
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
