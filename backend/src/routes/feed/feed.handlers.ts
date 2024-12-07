import { Context } from "hono";
import { FeedService } from "../../services/feed.service";

export const getAllFeeds = async (c: Context) => {
  try {
    const limitParam = c.req.query("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    const feeds = await FeedService.getAllFeeds(limit);

    return c.json(
      {
        success: true,
        message: "Success",
        body: feeds,
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
