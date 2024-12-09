import { Context } from "hono";
import { FeedService } from "../../services/feed.service";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";

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

export const createFeed = async (c: Context) => {
  try {
    const userID = await getUserIDbyTokenInCookie(c);
    const { content } = await c.req.json();

    const feed = await FeedService.createFeed(
      content.toString(),
      BigInt(userID)
    );

    return c.json(
      {
        success: true,
        message: "Success",
        body: feed,
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
