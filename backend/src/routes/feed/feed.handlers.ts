import { Context } from "hono";
import { FeedService } from "../../services/feed.service";

export const getAllFeeds = async (c: Context) => {
  try {
    const limit = parseInt(c.req.query("limit") || "10", 10);
    const cursor = c.req.query("cursor");

    const feeds = await FeedService.getAllFeeds(
      limit,
      cursor ? BigInt(cursor) : undefined
    );

    const lastItem = feeds[feeds.length - 1];
    const nextCursor = feeds.length === limit ? lastItem?.id : null;

    return c.json(
      {
        success: true,
        message: "Success",
        body: {
          cursor: nextCursor,
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
