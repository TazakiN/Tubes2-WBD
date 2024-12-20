import db from "../config/db";

export class FeedService {
  static async deleteFeed(feed_id: bigint, user_id: bigint) {
    const feed = await db.feed.findUnique({
      where: { id: feed_id },
    });

    if (!feed || feed.user_id !== user_id) {
      throw new Error("Unauthorized or feed not found");
    }

    return await db.feed.delete({
      where: {
        id: feed_id,
        user_id,
      },
    });
  }
  static async updateFeed(feed_id: bigint, content: string, user_id: bigint) {
    const feed = await db.feed.findUnique({
      where: { id: feed_id },
    });

    if (!feed || feed.user_id !== user_id) {
      throw new Error("Unauthorized or feed not found");
    }

    return db.feed.update({
      where: {
        id: feed_id,
      },
      data: {
        content,
        updated_at: new Date(),
      },
    });
  }

  static async createFeed(content: string, userID: bigint) {
    await db.feed.create({
      data: {
        content,
        user_id: userID,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  static async getAllFeeds(limit: number, cursor_id?: bigint) {
    const feeds = await db.feed.findMany({
      take: limit + 1,
      ...(cursor_id && {
        cursor: { id: cursor_id },
      }),
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        content: true,
        created_at: true,
        updated_at: true,
        users: {
          select: {
            id: true,
            full_name: true,
            username: true,
            profile_photo_path: true,
          },
        },
      },
    });

    const hasMore = feeds.length > limit;
    const result = hasMore ? feeds.slice(0, -1) : feeds;

    return result.map(({ id, content, created_at, updated_at, users }) => ({
      id: id.toString(),
      content,
      created_at: created_at.toISOString(),
      updated_at: updated_at.toISOString(),
      user: {
        user_id: users.id.toString(),
        full_name: users.full_name || users.username,
        profile_photo_path: users.profile_photo_path,
      },
    }));
  }

  static async getRelatedFeeds(
    user_id: bigint,
    limit: number = 10,
    cursor: number = 0
  ) {
    const feeds = await db.feed.findMany({
      take: limit,
      skip: cursor * limit,
      orderBy: { created_at: "desc" },
      where: {
        user_id: user_id,
      },
    });

    return feeds;
  }
}
