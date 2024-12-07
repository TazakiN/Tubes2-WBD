import db from "../config/db";

export class FeedService {
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
